<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\MovieWatch;
use App\Repository\MovieWatchRepository;
use App\Repository\PurchaseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Knp\Component\Pager\PaginatorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/user", name="user_")
 * @IsGranted("ROLE_USER")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="show", methods={"GET"})
     * @throws NonUniqueResultException
     * @Security("is_granted('ROLE_USER') or is_granted('ROLE_ADMIN')")
     */
    public function show(Request $request, UserRepository $userRepository)
    {
        $user = $this->getUser();
        $userInfo = $userRepository->findEmailAndSubscription($this->getUser( )->getUsername());

        $userId = $request->query->getInt('userId');

        if($this->isGranted('ROLE_ADMIN') && $userId) {
            $userInfo = $userRepository->findEmailAndSubscription($userId);

            if(!$userInfo) {
                return $this->json(['status' => 'Cet utilisateur n\'existe pas !'], 400);
            }
        }

        return $this->json($userInfo, 200, [], ['groups' => ['profile']]);
    }

    /**
     * @Route("/", name="edit", methods={"PUT"})
     * @throws \Exception
     * @Security("is_granted('ROLE_USER') or is_granted('ROLE_ADMIN')")
     */
    public function editProfile(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator, UserRepository $userRepository)
    {
        $user = $this->getUser();

        if($this->isGranted('ROLE_ADMIN')) {
            $userId = $request->query->getInt('userId');
            $user = $userRepository->find($userId);

            if(!$user) {
                return $this->json(['status' => 'Cet utilisateur n\'existe pas !'], 400);
            }
        }

        $user->setEmail($request->request->get('email'));
        $user->setFullname($request->request->get('fullname'));
        $user->setBirthday(new \DateTime(strval($request->request->get('birthday'))));

        $errors = $validator->validate($user);

        if(count($errors)) {
            $errorsMsg = [];
            foreach($errors as $error) {
                $errorsMsg[] = $error->getMessage();
            }

            return $this->json(['status' => 'Validation failed', 'errorMessages' => $errorsMsg], 400);
        }

        $entityManager->flush();

        return $this->json(['status' => 'Profil mis à jour', 'editItem' => $user], 200, [], ['groups' => ['profile']]);
    }

    /**
     * @Route("/", name="delete", methods={"DELETE"})
     * @Security("is_granted('ROLE_USER') or is_granted('ROLE_ADMIN')")
     */
    public function deleteAccount(Request $request, EntityManagerInterface $em, UserRepository $userRepository)
    {
        $user = $this->getUser();

        if($this->isGranted('ROLE_ADMIN')) {
            $userId = $request->query->getInt('userId');
            $user = $userRepository->find($userId);

            if(!$user) {
                return $this->json(['status' => 'Cet utilisateur n\'existe pas !'], 400);
            }
        }

        $em->remove($user);
        $em->flush();

        return $this->json(['status' => 'Compte utilisateur supprimé']);
    }

    /**
     * @Route("/movies-watched", name="movies_watched", methods={"GET"})
     */
    public function historyMoviesWatched(MovieWatchRepository $movieWatchRepository) {
        $movies = $movieWatchRepository->findByHistory($this->getUser());

        if(count($movies) == 0) {
            return $this->json(['status' => 'Aucun film trouvé', 'empty' => true]);
        }

        return $this->json($movies, 200, [], ['groups' => ['history.watched']]);
    }

    /**
     * @Route("/movies-purchased", name="movies_purchased", methods={"GET"})
     */
    public function historyMoviePurchased(Request $request, PurchaseRepository $purchaseRepository)
    {
        $moviesPurchased = $purchaseRepository->all($this->getUser());
        $userId = $request->query->getInt('userId');

        if($this->isGranted('ROLE_ADMIN') && $userId) {
            $moviesPurchased = $purchaseRepository->all($userId);
        }

        if(count($moviesPurchased) == 0) {
            return $this->json(['status' => 'Aucun film trouvé', 'empty' => true]);
        }

        return $this->json($moviesPurchased, 200, [], ['groups' => ['history.purchased']]);
    }

    /**
     * @Route("/movie-watch/{id}", name="add_movie_in_history", methods={"GET"})
     */
    public function addMovieWatch(Movie $movie, EntityManagerInterface $entityManager)
    {
        $movieWatch = new MovieWatch();
        $movieWatch->setMovie($movie);
        $movieWatch->setUser($this->getUser());
        $movieWatch->setDate(new \DateTime());

        $entityManager->persist($movieWatch);
        $entityManager->flush();

        return $this->json(['status' => "Film ajouté à l'historique"], 200);
    }
}
