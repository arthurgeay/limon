<?php

namespace App\Repository;

use App\Entity\Rating;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Rating|null find($id, $lockMode = null, $lockVersion = null)
 * @method Rating|null findOneBy(array $criteria, array $orderBy = null)
 * @method Rating[]    findAll()
 * @method Rating[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RatingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Rating::class);
    }

    public function getAvg($movie)
    {
        return $this->createQueryBuilder('r')
            ->select('AVG(r.score) AS avg')
            ->andWhere('r.movie = :movie')
            ->setParameter('movie', $movie)
            ->getQuery()
            ->getOneOrNullResult()
            ;
    }

    public function getMostRatingMovies()
    {
        return $this->createQueryBuilder('r')
            ->addSelect('AVG(r.score) AS avg')
            ->innerJoin('r.movie', 'm')
            ->addSelect('m')
            ->groupBy('m.id')
            ->orderBy('avg', 'desc')
            ->setMaxResults(12)
            ->getQuery()
            ->getResult()
            ;
    }

    // /**
    //  * @return Rating[] Returns an array of Rating objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Rating
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
