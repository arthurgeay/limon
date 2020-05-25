<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\Purchase;
use App\Repository\PurchaseRepository;
use App\Services\HTMLPDF;
use App\Services\Mail;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/purchase", name="purchase_")
 * @IsGranted("ROLE_USER")
 */
class PurchaseController extends AbstractController
{
    /**
     * @Route("/{id}", name="movie", methods={"GET"})
     */
    public function buy(Movie $movie, PurchaseRepository $purchaseRepository, EntityManagerInterface $em, HTMLPDF $HTMLPDF, Mail $mail)
    {
        $isAlreadyPurchase = $purchaseRepository->isAlreadyBuy($movie, $this->getUser());

        if($isAlreadyPurchase) {
            return $this->json(['status' => 'Vous avez déjà acheté ce film']);
        }

        $purchase = new Purchase();
        $purchase->setUser($this->getUser());
        $purchase->setDate(new \DateTime());
        $purchase->setMovie($movie);

        $em->persist($purchase);
        $em->flush();

        // Generate PDF
        $HTMLPDF->create('P', 'A4', 'fr', true, 'UTF-8', array(10, 15, 10, 15));
        $template = $this->render('purchase/invoice.html.twig', [
            'purchase' => $purchase,
        ]);
        $invoice = $HTMLPDF->generatePdf($template, 'invoice', 'S');

        // Envoi du mail
        $mail->sendMail(
            'Achat du film '.$purchase->getMovie()->getTitle(),
            $purchase->getUser()->getUsername(),
            'emails/invoice-purchase.html.twig',
            ['purchase' => $purchase],
            ['file' => $invoice, 'filename' => 'facture-limon.pdf', 'content-type' => 'application/pdf']
        );

        return $this->json(['status' => 'Film acheté', 'url_download' => $purchase->getMovie()->getDownloadUrl()]);
    }



    // ROUTE POUR DOWNLOAD Facture achat
}
