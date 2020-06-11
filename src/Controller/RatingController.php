<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\Rating;
use App\Repository\RatingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/rating", name="rating_")
 * @IsGranted("ROLE_USER")
 */
class RatingController extends AbstractController
{
    /**
     * @Route("/{id}", methods={"POST"})
     */
    public function rateAMovie(Movie $movie, Request $request, RatingRepository $ratingRepository, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $score = $request->request->getInt('score');

        if($score < 1 || $score > 5) {
            return $this->json(['status' => 'La note d\'un film doit être comprise entre 1 et 5'], 400);
        }

        $rating = $ratingRepository->findOneBy(['user' => $this->getUser(), 'movie' => $movie]);

        if(!$rating) {
            $rating = new Rating();
        }

        $rating->setMovie($movie);
        $rating->setScore($score);
        $rating->setUser($this->getUser());

        $errors = $validator->validate($rating);

        if(count($errors)) {
            $errorsMsg = [];
            foreach($errors as $error) {
                $errorsMsg[] = $error->getMessage();
            }

            return $this->json(['status' => 'Validation failed', 'errorMessages' => $errorsMsg], 400);
        }


        $em->persist($rating);
        $em->flush();

        $avg = $ratingRepository->getAvg($movie);

        return $this->json(['status' => 'Note ajouté pour le film ' . $movie->getTitle(), 'avg' => $avg['avg']], 200);
    }
}
