<?php

namespace App\Controller;

use App\Repository\MovieWatchRepository;
use App\Repository\PurchaseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\NonUniqueResultException;
use Knp\Component\Pager\PaginatorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

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
