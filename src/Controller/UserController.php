<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\NonUniqueResultException;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/user", name="user_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="show", methods={"GET"})
     * @IsGranted("ROLE_USER")
     * @throws JWTDecodeFailureException
     * @throws NonUniqueResultException
     */
    public function show(Request $request, JWTEncoderInterface $encoder, UserRepository $userRepository)
    {
        $token = substr($request->headers->get('Authorization'), 7);
        $decodedToken = $encoder->decode($token);

        //$user = $userRepository->findOneBy(['email' => $decodedToken['username']]);
        $user = $userRepository->findByEmail($decodedToken['username']);

        return $this->json($user, 200, [], ['groups' => ['profile']]);
    }
}
