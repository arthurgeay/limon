<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/movie", name="movie_")
 */
class MovieController extends AbstractController
{
    /**
     * @Route("/search", name="search", methods={"GET"})
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
            return $this->json(['status' => 'Aucun film trouvé'], 200);
        }

        return $this->json([
            'current_page' => $pagination->getCurrentPageNumber(),
            'movies' => $pagination,
            'items_per_page' => $pagination->getItemNumberPerPage(),
            'total_item_count' => $pagination->getTotalItemCount()
            ], 200, [], ['groups' => ['movie']]);
    }
}
