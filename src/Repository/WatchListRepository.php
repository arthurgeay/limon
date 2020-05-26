<?php

namespace App\Repository;

use App\Entity\WatchList;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WatchList|null find($id, $lockMode = null, $lockVersion = null)
 * @method WatchList|null findOneBy(array $criteria, array $orderBy = null)
 * @method WatchList[]    findAll()
 * @method WatchList[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WatchListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WatchList::class);
    }

    public function getAllMoviesByUser($user)
    {
        return $this->createQueryBuilder('w')
            ->innerJoin('w.movie', 'm')
            ->addSelect('m')
            ->innerJoin('m.productor', 'p')
            ->addSelect('p')
            ->innerJoin('m.category', 'c')
            ->addSelect('c')
            ->andWhere('w.user = :user')
            ->setParameter('user', $user)
            ->orderBy('w.id', 'DESC')
            ->getQuery()
            ->getResult()
            ;
    }

    public function findByMovieAndUser($movieId, $user)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.movie = :movieId')
            ->setParameter('movieId', $movieId)
            ->andWhere('w.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getOneOrNullResult()
            ;
    }


    // /**
    //  * @return WatchList[] Returns an array of WatchList objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WatchList
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
