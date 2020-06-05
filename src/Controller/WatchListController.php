<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\WatchList;
use App\Repository\MovieRepository;
use App\Repository\WatchListRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/watchlist", name="watch_list_")
 * @IsGranted("ROLE_USER")
 */
class WatchListController extends AbstractController
{
    /**
     * @Route("/", name="show", methods={"GET"})
     */
    public function show(WatchListRepository $watchListRepository)
    {
        $watchList = $watchListRepository->getAllMoviesByUser($this->getUser());

        if(!$watchList) {
            return $this->json(['status' => 'Aucun film dans la watchlist', 'empty' => true]);
        }

        return $this->json($watchList, 200, [], ['groups' => ['watchlist']]);
    }

    /**
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request, MovieRepository $movieRepository, WatchListRepository $watchListRepository, EntityManagerInterface $em)
    {
        $movieId = $request->request->getInt('movie');
        $movie = $movieRepository->findOneBy(['id' => $movieId]);

        if(!$movie) {
            return $this->json(['status' => 'Ce film n\'existe pas.'], 404);
        }

        $movieAlreadyAdd = $watchListRepository->findByMovieAndUser($movie, $this->getUser());

        if($movieAlreadyAdd) {
            return $this->json(['status' => $movie->getTitle(). ' est déjà présent dans la watchlist'], 403);
        }

        $watchList = new WatchList();
        $watchList->setUser($this->getUser());
        $watchList->setMovie($movie);
        $em->persist($watchList);
        $em->flush();

        return $this->json(['status' => 'Film ajouté', 'newItem' => $watchList], 200, [], ['groups' => ['watchlist']]);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(Movie $movie, WatchListRepository $watchListRepository, EntityManagerInterface $em)
    {
        $movie = $watchListRepository->findByMovieAndUser($movie, $this->getUser());

        if(!$movie) {
            return $this->json(['status' => 'Ce film n\'existe pas dans votre watchlist'], 404);
        }

        $em->remove($movie);
        $em->flush();

        return $this->json(['status' => 'Film supprimé'], 200);
    }

    /**
     * @Route("/added/{id}", name="added", methods={"GET"})
     */
    public function added($id, WatchListRepository $watchListRepository) {
        $movieAlreadyAdd = $watchListRepository->findByMovieAndUser($id, $this->getUser());
        $result = $movieAlreadyAdd ? true : false;

        return $this->json(['already_add' => $result]);

    }
}
