<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\Rating;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/rating", name="rating_")
 * @IsGranted("ROLE_USER")
 */
class RatingController extends AbstractController
{
    /**
     * @Route("/{id}", methods={"POST"})
     */
    public function rateAMovie(Movie $movie, Request $request, EntityManagerInterface $em)
    {
        $score = $request->request->getInt('score');

        if($score < 1 || $score > 5) {
            return $this->json(['status' => 'La note d\'un film doit être comprise entre 1 et 5'], 400);
        }

        $rating = new Rating();
        $rating->setMovie($movie);
        $rating->setScore($score);
        $rating->setUser($this->getUser());

        $em->persist($rating);
        $em->flush();

        return $this->json(['status' => 'Note ajouté pour le film ' . $movie->getTitle()], 200);
    }
}
