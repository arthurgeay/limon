<?php

namespace App\Controller;

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
     */
    public function show(UserRepository $userRepository)
    {
        $user = $userRepository->findEmailAndSubscription($this->getUser( )->getUsername());

        return $this->json($user, 200, [], ['groups' => ['profile']]);
    }

    /**
     * @Route("/", name="edit", methods={"PUT"})
     * @throws \Exception
     */
    public function editProfile(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $user = $this->getUser();
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
    public function historyMoviesWatched(Request $request, MovieWatchRepository $movieWatchRepository, PaginatorInterface $paginator) {
        $page = $request->query->getInt('page', 1);
        $movies = $movieWatchRepository->findByHistory($this->getUser());
        $pagination = $paginator->paginate($movies, $page, 10);

        if(count($pagination) == 0) {
            return $this->json(['status' => 'Aucun film trouvé'], 404);
        }

        return $this->json([
            'current_page' => $pagination->getCurrentPageNumber(),
            'movies-watched' => $pagination,
            'items_per_page' => $pagination->getItemNumberPerPage(),
            'total_item_count' => $pagination->getTotalItemCount()
        ], 200, [], ['groups' => ['history.watched']]);
    }

    /**
     * @Route("/movies-purchased", name="movies_purchased", methods={"GET"})
     */
    public function historyMoviePurchased(Request $request, PurchaseRepository $purchaseRepository, PaginatorInterface $paginator)
    {
        $page = $request->query->getInt('page', 1);
        $moviesPurchased = $purchaseRepository->all($this->getUser());
        $pagination = $paginator->paginate($moviesPurchased, $page, 10);

        if(count($pagination) == 0) {
            return $this->json(['status' => 'Aucun film trouvé'], 404);
        }

        return $this->json([
            'current_page' => $pagination->getCurrentPageNumber(),
            'movies-purchased' => $pagination,
            'items_per_page' => $pagination->getItemNumberPerPage(),
            'total_item_count' => $pagination->getTotalItemCount()
        ], 200, [], ['groups' => ['history.purchased']]);
    }
}
