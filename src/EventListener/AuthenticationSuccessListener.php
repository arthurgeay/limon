<?php


namespace App\EventListener;
use App\Repository\SubscriptionRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTDecodedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{

    /**
     * @var JWTEncoderInterface
     */
    private $encoder;

    public function __construct(JWTEncoderInterface $encoder ) {
        $this->encoder = $encoder;
    }

    /**
     * @param AuthenticationSuccessEvent $event
     * @throws \Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $exp = $this->encoder->decode($data['token'])['exp'];
        $dateExp = new \DateTime();
        $dateExp->setTimestamp($exp);

        $data['expires'] = $dateExp;

        if($user-getSubscription()) {
            $data['data']['subscription'] = [
                'end_date' => $user->getSubscription()->getEndDate(),
                'date_subscription' => $user->getSubscription()->getDateSubscription()
            ];
        } else {
            $data['data']['subscription'] = null;
        }

        $data['data'] = array(
            'email' => $user->getUsername(),
            'fullname' => $user->getFullname(),
            'birthday' => $user->getBirthday(),
            'roles' => $user->getRoles()
        );

        $event->setData($data);
    }
}