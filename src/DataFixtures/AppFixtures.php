<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Movie;
use App\Entity\MovieWatch;
use App\Entity\Productor;
use App\Entity\Purchase;
use App\Entity\Rating;
use App\Entity\Review;
use App\Entity\Subscription;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder) {
        $this->encoder = $userPasswordEncoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $movies = [];

        // Categories
        $actionCategory = new Category();
        $actionCategory->setName('Action');

        $comedyCategory = new Category();
        $comedyCategory->setName('Comédie');

        $horrorCategory = new Category();
        $horrorCategory->setName('Horreur');

        // Productors
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


        // Movies
        for($i = 0; $i < 40; $i++) {

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
            $movies[] = $movie;
        }

        // Users
        for($i = 0; $i < 15; $i++) {
            $user = new User();
            if($i == 0) {
                $user->setEmail('arthur.geay@ynov.com');
                $user->setPassword($this->encoder->encodePassword($user, 'limon'));
                $user->setFullname('Arthur Geay');
                $user->setBirthday(new \DateTime('1997-09-01'));
            } else {
                $user->setEmail($faker->email);
                $user->setPassword($this->encoder->encodePassword($user, $faker->password));
                $user->setFullname($faker->name);
                $user->setBirthday($faker->dateTime);
            }

            if($faker->boolean(95)) {
                for($j = 0; $j < 3; $j++) {
                    $movieWatch = new MovieWatch();
                    $movieWatch->setDate(new \DateTime());
                    $movieWatch->setMovie($movies[array_rand($movies, 1)]);
                    $movieWatch->setUser($user);
                    $manager->persist($movieWatch);

                    $rating = new Rating();
                    $rating->setScore($faker->numberBetween(1, 5));
                    $rating->setUser($user);
                    $rating->setMovie($movies[array_rand($movies, 1)]);
                    $rating->setCreatedAt(new \DateTime());
                    $rating->setUpdatedAt(new \DateTime());

                    $manager->persist($rating);
                }
            }

            if($faker->boolean(50)) {
                $subscription = new Subscription();
                $subscription->setActivate(true);
                $subscription->setDateSubscription(new \DateTime());
                $date = new \DateTime();
                $date->modify('+1 month');
                $subscription->setEndDate($date);
                $subscription->setPrice(5.0);
                $subscription->setUser($user);

                $manager->persist($subscription);

                $purchasedMovie = new Purchase();
                $purchasedMovie->setMovie($movies[array_rand($movies, 1)]);
                $purchasedMovie->setDate(new \DateTime());
                $purchasedMovie->setUser($user);

                $manager->persist($purchasedMovie);

            }

            if($faker->boolean(85)) {
                $review = new Review();
                $review->setContent($faker->text);
                $review->setMovie($movies[array_rand($movies, 1)]);
                $review->setUser($user);
                $review->setCreatedAt(new \DateTime());
                $review->setUpdatedAt(new \DateTime());
                $manager->persist($review);
            }

            $manager->persist($user);
        }


        // Reviews


        $manager->flush();
    }
}
