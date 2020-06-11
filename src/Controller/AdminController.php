<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/admin", name="admin_")
 * @IsGranted("ROLE_ADMIN")
 */
class AdminController extends AbstractController
{
    /**
     * Get stats for admin user
     * @Route("/stats", name="stats", methods={"GET"})
     */
    public function stats(UserRepository $userRepository)
    {
        $stats = $userRepository->getStats();
        return $this->json($stats, 200, [], ['groups' => ['stats']]);
    }

    /**
     * Get all users
     * @Route("/users", name="show_users", methods={"GET"})
     */
    public function allUsers(Request $request, UserRepository $userRepository)
    {
        $users = $userRepository->findAll();

        if(!$users) {
            return $this->json(['status' => 'Aucun utilisateur'], 404);
        }

        return $this->json($users, 200, [], ['groups' => ['profile']]);
    }
}
