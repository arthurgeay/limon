<?php

namespace App\Repository;

use App\Entity\MovieWatch;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MovieWatch|null find($id, $lockMode = null, $lockVersion = null)
 * @method MovieWatch|null findOneBy(array $criteria, array $orderBy = null)
 * @method MovieWatch[]    findAll()
 * @method MovieWatch[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieWatchRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MovieWatch::class);
    }

    public function findByHistory($user)
    {
        return $this->createQueryBuilder('mv')
            ->andWhere('mv.user = :user')
            ->setParameter('user', $user)
            ->innerJoin('mv.movie', 'm')
            ->addSelect('m')
            ->innerJoin('m.productor', 'p')
            ->addSelect('p')
            ->innerJoin('m.category', 'c')
            ->addSelect('c')
            ->orderBy('mv.date', 'DESC')
            ->getQuery()
            ->getResult()
            ;
    }

    // /**
    //  * @return MovieWatch[] Returns an array of MovieWatch objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MovieWatch
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
