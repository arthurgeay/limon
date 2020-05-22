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
     * @Route("/all", name="all")
     */
    public function show(CategoryRepository $categoryRepository)
    {
        $categories = $categoryRepository->findAll();

        return $this->json($categories, 200, [], ['groups' => ['movie']]);
    }
}
