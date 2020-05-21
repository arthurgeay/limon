<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\LexikJWTAuthenticationBundle;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;


/**
 * @Route("/api", name="security_")
 */
class SecurityController extends AbstractController
{
    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder, EntityManagerInterface $entityManager, ValidatorInterface $validator, JWTTokenManagerInterface $JWT)
    {
        $email = $request->request->get('email');
        $password = $request->request->get('password');

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($encoder->encodePassword($user, $password));

        $errors = $validator->validate($user);

        if(count($errors)) {
            $errorsMsg = [];
            foreach($errors as $error) {
                $errorsMsg[] = $error->getMessage();
            }

            return $this->json(['status' => 'Validation failed', 'errorMessages' => $errorsMsg], 400);
        }


        $entityManager->persist($user);
        $entityManager->flush();

        $token = $JWT->create($user); // Generate token


        return $this->json(['status' => 'User successfully registered', 'token' => $token]);
    }
}
