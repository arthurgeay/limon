<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\Subscription;
use App\Services\HTMLPDF;
use App\Services\Mail;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/subscription", name="subscription_")
 * @IsGranted("ROLE_USER")
 */
class SubscriptionController extends AbstractController
{

    /**
     * @Route("/", name="subscribe", methods={"GET"})
     */
    public function subscribeToOffer(EntityManagerInterface $em, HTMLPDF $HTMLPDF, Mail $mail)
    {
        if($this->getUser()->getSubscription()) {
            return $this->json(['status' => 'Vous êtes déjà abonné']);
        }

        $subscribe = new Subscription();
        $subscribe->setUser($this->getUser());
        $subscribe->setActivate(true);
        $subscribe->setDateSubscription(new \DateTime());
        $endDate = new \DateTime();
        $endDate->modify('+1 year');
        $subscribe->setEndDate($endDate);
        $subscribe->setPrice(46.99);

        $em->persist($subscribe);
        $em->flush();

        // Generate PDF
        $HTMLPDF->create('P', 'A4', 'fr', true, 'UTF-8', array(10, 15, 10, 15));
        $template = $this->render('subscription/invoice.html.twig', [
            'subscription' => $subscribe,
        ]);
        $invoice = $HTMLPDF->generatePdf($template, 'invoice', 'S');

        // Send mail
        $mail->sendMail('Facture abonnement Limon',
            $this->getUser()->getUsername(),
            'emails/invoice-subscription.html.twig',
            ['subscription' => $subscribe],
            ['file' => $invoice, 'filename' => 'facture-limon.pdf', 'content-type' => 'application/pdf']
            );


        return $this->json(['status' => 'Abonnement effectué', 'subscription' => $subscribe], 200, [], ['groups' => ['profile']]);
    }
}
