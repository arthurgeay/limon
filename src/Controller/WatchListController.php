<?php

namespace App\Controller;

use App\Repository\WatchListRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
            return $this->json(['status' => 'Aucun film dans la watchlist']);
        }

        return $this->json($watchList, 200, [], ['groups' => ['watchlist']]);
    }
}
