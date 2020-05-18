<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Movie;
use App\Entity\Productor;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $actionCategory = new Category();
        $actionCategory->setName('ABC Studio');

        $comedyCategory = new Category();
        $comedyCategory->setName('EPIC');

        $horrorCategory = new Category();
        $horrorCategory->setName('WAHOU');


        $abcProd = new Productor();
        $abcProd->setName('ABC Studio');

        $epicProd = new Productor();
        $epicProd->setName('EPIC');

        $wahouProd = new Productor();
        $wahouProd->setName('WAHOU');

        $manager->persist($actionCategory);
        $manager->persist($comedyCategory);
        $manager->persist($horrorCategory);

        $manager->persist($abcProd);
        $manager->persist($epicProd);
        $manager->persist($wahouProd);

        $categories = [$actionCategory, $comedyCategory, $horrorCategory];
        $productors = [$abcProd, $epicProd, $wahouProd];

        for($i = 0; $i < 10; $i++) {

            $movie = new Movie();
            $movie->setTitle($faker->name);
            $movie->setSynopsis($faker->realText());
            $movie->setPosterImg('https://images-na.ssl-images-amazon.com/images/I/71wbalyU7tL._AC_SL1481_.jpg');
            $movie->setHeroImg('https://cdn.radiofrance.fr/s3/cruiser-production/2019/08/421a4e4c-1931-4907-906b-06946a6b1c5d/1200x680_joker.jpg');
            $movie->setPrice($faker->randomFloat(2));
            $movie->setReleaseDate($faker->dateTime);
            $movie->setDownloadUrl($faker->url);
            $movie->setProductor($productors[array_rand($productors, 1)]);
            $movie->setCategory($categories[array_rand($categories, 1)]);

            $manager->persist($movie);
        }


        $manager->flush();
    }
}
