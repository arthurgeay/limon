<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/category", name="category_")
 */
class CategoryController extends AbstractController
{
    /**
     * Get all categories
     * @Route("/all", name="all", methods={"GET"})
     */
    public function show(CategoryRepository $categoryRepository)
    {
        $categories = $categoryRepository->findBy([], ['name' => 'ASC']);

        return $this->json($categories, 200, [], ['groups' => ['movie']]);
    }
}
