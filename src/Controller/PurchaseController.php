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
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\HttpKernel\KernelInterface;
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

        // Send mail
        $mail->sendMail(
            'Achat du film '.$purchase->getMovie()->getTitle(),
            $purchase->getUser()->getUsername(),
            'emails/invoice-purchase.html.twig',
            ['purchase' => $purchase],
            ['file' => $invoice, 'filename' => 'facture-limon.pdf', 'content-type' => 'application/pdf']
        );

        return $this->json(['status' => 'Film acheté', 'movie' => $purchase->getMovie()], 200, [], ['groups' => ['history.purchased']]);
    }

    /**
     * @Route("/invoice/{id}", name="invoice", methods={"GET"})
     */
    public function downloadInvoice(Purchase $purchase, HTMLPDF $HTMLPDF)
    {
        if($purchase->getUser()->getUsername() != $this->getUser()->getUsername() && !$this->isGranted('ROLE_ADMIN')) {
            return $this->json(['status' => 'Vous n\'êtes pas l\'auteur de cet achat']);
        }

        // Generate PDF
        $HTMLPDF->create('P', 'A4', 'fr', true, 'UTF-8', array(10, 15, 10, 15));
        $template = $this->render('purchase/invoice.html.twig', [
            'purchase' => $purchase,
        ]);
        $invoice = $HTMLPDF->generatePdf($template, 'invoice');

        return $invoice;

    }


}
