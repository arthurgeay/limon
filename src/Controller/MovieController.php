<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Movie;
use App\Entity\Productor;
use App\Repository\CategoryRepository;
use App\Repository\MovieRepository;
use App\Repository\ProductorRepository;
use App\Repository\PurchaseRepository;
use App\Repository\RatingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Nelmio\ApiDocBundle\Annotation\Areas;
use Nelmio\ApiDocBundle\Annotation\Model;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Swagger\Annotations as SWG;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Swagger\Annotations\Swagger;

/**
 * @Route("/api/movie", name="movie_")
 */
class MovieController extends AbstractController
{
    /**
     * @Route("/all", name="all", methods={"GET"})
     */
    public function all(Request $request, MovieRepository $movieRepository, RatingRepository $ratingRepository)
    {
        $lastMovies = $movieRepository->findBy([], ['id' => 'desc'], 12);
        $mostRatingMovies = $ratingRepository->getMostRatingMovies();

        $result = ['last_movies' => $lastMovies, 'most_rating_movies' => $mostRatingMovies];

        return $this->json($result, 200, [], ['groups' => ['movie.all']]);
    }

    /**
     * @Route("/search", name="search", methods={"GET"})
     * @SWG\Response(
     *     response=200,
     *     description="Retourne un film selon certains critères",
     *     @SWG\Schema(
     *          type="array",
     *          @SWG\Items(ref=@Model(type=Movie::class, groups={"movie"}))
     *     )
     * )
     * @SWG\Parameter(
     *     name="query",
     *     in="query",
     *     type="string",
     *     description="Nom du film ou de la catégorie d'un film"
     * )
     * @SWG\Parameter(
     *     name="searchBy",
     *     in="query",
     *     type="string",
     *     description="Chercher par nom ou catégorie"
     * )
     * @SWG\Parameter(
     *     name="orderBy",
     *     in="query",
     *     type="string",
     *     description="Trier les résultats dans l'ordre croissant ou décroissant"
     * )
     * @SWG\Parameter(
     *     name="page",
     *     in="query",
     *     type="integer",
     *     description="Retourne les résultats liés à la page demandé"
     * )
     * @SWG\Tag(name="movie")
     * @Areas({"default"})
     */
    public function search(Request $request, MovieRepository $movieRepository, PaginatorInterface $paginator)
    {
        $query = $request->query->get('query');
        $searchBy = $request->query->get('searchBy', 'name');
        $categoryName = str_replace('-', ' ', $request->query->get('category_name'));
        $orderBy = $request->query->get('orderBy');
        $page = $request->query->getInt('page', 1);

        $movies = $movieRepository->findByNameOrCategoryAndFilters($query, $searchBy, $categoryName, $orderBy);
        $pagination = $paginator->paginate($movies, $page, 18);


        if(count($pagination) == 0) {
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
     * @SWG\Response(
     *     response=200,
     *     description="Retourne un film selon son id",
     *     @SWG\Schema(
     *          @SWG\Items(ref=@Model(type=Movie::class, groups={"movie"}))
     *     )
     * )
     * @SWG\Tag(name="movie")
     * @Areas({"default"})
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

        if(!$purchased) {
            return $this->json(['status' => 'Vous ne pouvez pas télécharger ce film'], 401);
        }

        $file = new File($kernel->getProjectDir() . '/public/movies/movie.mp4');

        return $this->file($file);

    }

    /**
     * @Route("/", name="add", methods={"POST"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function create(Request $request, EntityManagerInterface $em, CategoryRepository $categoryRepository, ProductorRepository $productorRepository, ValidatorInterface $validator)
    {
        $title = $request->request->get('title');
        $date = $request->request->get('date');
        $price = (float) $request->request->get('price');
        $production = $request->request->get('production');
        $heroImg = $request->request->get('hero_img');
        $posterImg = $request->request->get('poster_img');
        $category = $request->request->get('category');
        $synopsis = $request->request->get('synopsis');

        $movie = new Movie();
        $movie->setTitle($title);
        $movie->setSynopsis($synopsis);
        $movie->setPrice($price);
        $movie->setReleaseDate(new \DateTime($date));
        $movie->setHeroImg($heroImg);
        $movie->setPosterImg($posterImg);

        $productor = $productorRepository->findOneBy(['name' => $production]);

        if(!$productor) {
            $productor = new Productor();
            $productor->setName($production);
            $em->persist($productor);
        }

        $categoryItem = $categoryRepository->findOneBy(['name' => $category]);

        if(!$categoryItem) {
            $categoryItem = new Category();
            $categoryItem->setName($category);
            $em->persist($categoryItem);
        }

        $movie->setCategory($categoryItem);
        $movie->setProductor($productor);

        $errors = $validator->validate($movie);

        if(count($errors)) {
            $errorsMsg = [];
            foreach($errors as $error) {
                $errorsMsg[] = $error->getMessage();
            }

            return $this->json(['status' => 'Validation failed', 'errorMessages' => $errorsMsg], 400);
        }

        $em->persist($movie);
        $em->flush();

        return $this->json(['status' => 'Film ajouté', 'newItem' => $movie], 200, [], ['groups' => ['movie']]);

    }

    /**
     * @Route("/{id}", name="edit", methods={"PUT"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function edit(Movie $movie, Request $request, EntityManagerInterface $em, CategoryRepository $categoryRepository, ProductorRepository $productorRepository, ValidatorInterface $validator)
    {
        $title = $request->request->get('title');
        $date = $request->request->get('date');
        $price = (float) $request->request->get('price');
        $production = $request->request->get('production');
        $heroImg = $request->request->get('hero_img');
        $posterImg = $request->request->get('poster_img');
        $category = $request->request->get('category');
        $synopsis = $request->request->get('synopsis');

        $movie->setTitle($title);
        $movie->setSynopsis($synopsis);
        $movie->setPrice($price);
        $movie->setReleaseDate(new \DateTime($date));
        $movie->setHeroImg($heroImg);
        $movie->setPosterImg($posterImg);

        $productor = $productorRepository->findOneBy(['name' => $production]);

        if(!$productor) {
            $productor = new Productor();
            $productor->setName($production);
            $em->persist($productor);
        }

        $categoryItem = $categoryRepository->findOneBy(['name' => $category]);

        if(!$categoryItem) {
            $categoryItem = new Category();
            $categoryItem->setName($category);
            $em->persist($categoryItem);
        }

        $movie->setCategory($categoryItem);
        $movie->setProductor($productor);

        $errors = $validator->validate($movie);

        if(count($errors)) {
            $errorsMsg = [];
            foreach($errors as $error) {
                $errorsMsg[] = $error->getMessage();
            }

            return $this->json(['status' => 'Validation failed', 'errorMessages' => $errorsMsg], 400);
        }

        $em->flush();

        return $this->json(['status' => 'Film mis à jour', 'editItem' => $movie], 200, [], ['groups' => ['movie']]);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(Movie $movie, EntityManagerInterface $em)
    {
        $em->remove($movie);
        $em->flush();

        return $this->json(['status' => 'Film supprimé'], 200);
    }
}
