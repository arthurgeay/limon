<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/movie", name="movie_")
 */
class MovieController extends AbstractController
{
    /**
     * @Route("/search", name="search")
     */
    public function search(MovieRepository $movieRepository)
    {
        $movies = $movieRepository->findAll();
        return $this->json(['movies' => $movies]);
    }
}
