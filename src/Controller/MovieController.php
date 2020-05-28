<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Repository\MovieRepository;
use App\Repository\PurchaseRepository;
use Knp\Component\Pager\PaginatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/movie", name="movie_")
 */
class MovieController extends AbstractController
{
    /**
     * @Route("/all", name="all", methods={"GET"})
     */
    public function all(Request $request, MovieRepository $movieRepository, PaginatorInterface $paginator)
    {
        $page = $request->query->getInt('page', 1);
        $movies = $movieRepository->findAll();

        $pagination = $paginator->paginate($movies, $page, 10);

        if(count($pagination) == 0) {
            return $this->json(['status' => 'Aucun film trouvé'], 404);
        }

        return $this->json([
            'current_page' => $pagination->getCurrentPageNumber(),
            'items_per_page' => $pagination->getItemNumberPerPage(),
            'total_item_count' => $pagination->getTotalItemCount(),
            'movies' => $movies
        ], 200, [], ['groups' => ['movie']]);
    }

    /**
     * @Route("/search", name="search", methods={"GET"})
     *
     */
    public function search(Request $request, MovieRepository $movieRepository, PaginatorInterface $paginator)
    {
        $query = $request->query->get('query', null);
        $searchBy = $request->query->get('searchBy', 'name');
        $orderBy = $request->query->get('orderBy');
        $page = $request->query->getInt('page', 1);

        $movies = $movieRepository->findByNameOrCategoryAndFilters($query, $searchBy, $orderBy);

        $pagination = $paginator->paginate($movies, $page, 10);

        if(!$query || count($pagination) == 0) {
            return $this->json(['status' => 'Aucun film trouvé'], 404);
        }

        return $this->json([
            'current_page' => $pagination->getCurrentPageNumber(),
            'movies' => $pagination,
            'items_per_page' => $pagination->getItemNumberPerPage(),
            'total_item_count' => $pagination->getTotalItemCount()
            ], 200, [], ['groups' => ['movie']]);
    }

    /**
     * @Route("/{id}", name="show", requirements={"id"="\d+"}, methods={"GET"})
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function show($id, MovieRepository $movieRepository)
    {

        $movie = $movieRepository->findWithRatingsAndReviews($id);

        if(!$movie || $movie[0] == null) {
            return $this->json(['status' => 'Aucun film trouvé'], 404);
        }

        return $this->json($movie, 200, [], ['groups' => ['movie']]);
    }

    /**
     * @Route("/{id}/download", name="download", methods={"GET"})
     * @IsGranted("ROLE_USER")
     */
    public function download($id, PurchaseRepository $purchaseRepository, KernelInterface $kernel)
    {
        $purchased = $purchaseRepository->findOneBy(['movie' => $id ]);

        if($this->getUser()->getSubscription() || !$purchased) {
            return $this->json(['status' => 'Vous ne pouvez pas télécharger ce film'], 401);
        }

        $file = new File($kernel->getProjectDir() . '/public/movies/movie.mp4');

        return $this->file($file);

    }
}
