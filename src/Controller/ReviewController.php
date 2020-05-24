<?php

namespace App\Controller;

use App\Entity\Movie;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/review", name="review_")
 */
class ReviewController extends AbstractController
{
    /**
     * @Route("/{id}", name="add", methods={"POST"})
     * @IsGranted("ROLE_USER")
     */
    public function index(Movie $movie, Request $request)
    {
        //On récupère les infos
        //
    }
}
