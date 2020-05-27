<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/admin", name="admin_")
 * @IsGranted("ROLE_ADMIN")
 */
class AdminController extends AbstractController
{
    /**
     * @Route("/stats", name="stats", methods={"GET"})
     */
    public function index(UserRepository $userRepository)
    {
        $stats = $userRepository->getStats();
        return $this->json($stats, 200, [], ['groups' => ['stats']]);
    }
}
