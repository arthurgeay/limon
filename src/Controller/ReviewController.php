<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\Review;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/review", name="review_")
 */
class ReviewController extends AbstractController
{
    /**
     * @Route("/{id}", name="add", methods={"PUT"})
     * @IsGranted("ROLE_USER")
     */
    public function edit(Review $review, Request $request, ValidatorInterface $validator, EntityManagerInterface $em)
    {
        if($review->getUser() != $this->getUser()) {
            return $this->json(['status' => 'Vous n\'êtes pas l\'auteur de cet avis.'], 401);
        }

        $message = $request->request->get('message') ?? '';

        $review = $review->setContent($message);

        $errors = $validator->validate($review);

        if(count($errors)) {
            $errorsMsg = [];
            foreach($errors as $error) {
                $errorsMsg[] = $error->getMessage();
            }

            return $this->json(['status' => 'Validation failed', 'errorMessages' => $errorsMsg], 400);
        }

        $em->flush();

        return $this->json(['status' => 'Avis mis à jour'], 200);

    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @Security("is_granted('ROLE_USER') or is_granted('ROLE_ADMIN')")
     */
    public function delete(Review $review, EntityManagerInterface $em)
    {
        if($this->getUser()->getRoles() == ['ROLE_USER'] && $review->getUser() != $this->getUser()) {
            return $this->json(['status' => 'Vous n\'êtes pas l\'auteur de cet avis.'], 401);
        }

        $em->remove($review);
        $em->flush();

        return $this->json(['status' => 'Avis supprimé'], 200);
    }

    /**
     * @Route("/{id}", name="add", methods={"POST"})
     * @IsGranted("ROLE_USER")
     */
    public function add(Movie $movie, Request $request, ValidatorInterface $validator, EntityManagerInterface $em)
    {
        $message = $request->request->get('message') ?? '';

        $review = new Review();
        $review->setUser($this->getUser());
        $review->setMovie($movie);
        $review->setContent($message);

        $errors = $validator->validate($review);

        if(count($errors)) {
            $errorsMsg = [];
            foreach($errors as $error) {
                $errorsMsg[] = $error->getMessage();
            }

            return $this->json(['status' => 'Validation failed', 'errorMessages' => $errorsMsg], 400);
        }

        $em->persist($review);
        $em->flush();

        return $this->json(['status' => 'Votre avis pour le film '. $movie->getTitle() . ' a bien été enregistré'], 200);
    }


}
