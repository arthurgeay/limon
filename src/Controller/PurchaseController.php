<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Entity\Purchase;
use App\Repository\PurchaseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/purchase", name="purchase_")
 */
class PurchaseController extends AbstractController
{
    /**
     * @Route("/{id}", name="movie", methods={"GET"})
     */
    public function buy(Movie $movie, PurchaseRepository $purchaseRepository, EntityManagerInterface $em)
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

        return $this->json(['status' => 'Film acheté', 'url_download' => $purchase->getMovie()->getDownloadUrl()]);
    }
}
