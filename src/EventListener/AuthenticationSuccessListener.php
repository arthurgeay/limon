<?php


namespace App\EventListener;
use App\Repository\SubscriptionRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{

    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $data['data'] = array(
            'email' => $user->getUsername(),
            'fullname' => $user->getFullname(),
            'birthday' => $user->getBirthday(),
            'subscription' => $user->getSubscription(),
            'roles' => $user->getRoles()
        );

        $event->setData($data);
    }
}