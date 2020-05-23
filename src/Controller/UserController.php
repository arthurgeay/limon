<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/user", name="user_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="show")
     */
    public function show(Request $request)
    {
        // Récupération du token
        // Décodage du token
        // Find dans la bdd si l'utilisateur c'est ok
        // On retourne les infos de l'utilisateur
    }
}
