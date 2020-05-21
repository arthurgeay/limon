<?php

namespace App\Repository;

use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Movie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Movie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Movie[]    findAll()
 * @method Movie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Movie::class);
    }

    /**
     * @param $query
     * @param $searchBy
     * @param $orderBy
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function findByNameOrCategoryAndFilters($query, $searchBy, $orderBy) {
        $result = $this->createQueryBuilder('m');

        // Search by name or category
        switch($searchBy) {
            case 'category':
                $result
                    ->innerJoin('m.category', 'c')
                    ->addSelect('c')
                    ->andWhere('c.name = :val')
                    ->setParameter('val', $query)
                ;
                break;
            default:
                $result
                    ->andWhere('m.title LIKE :val')
                    ->setParameter('val', '%'.$query.'%')
                ;
                break;
        }

        // Orderby id, date or price
        switch($orderBy) {
            case 'desc':
                $result
                    ->orderBy('m.id', $orderBy);
                break;
            case 'date-asc':
                $result
                    ->orderBy('m.release_date', 'ASC');
                break;
            case 'date-desc':
                $result
                    ->orderBy('m.release_date', 'DESC');
                break;
            case 'price-asc':
                $result
                    ->orderBy('m.price', 'ASC');
                break;
            case 'price-desc':
                $result
                    ->orderBy('m.price', 'DESC');
        }

        return $result;

    }

    /**
     * @param $movieId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findWithRatingsAndReviews($movieId)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.id = :id')
            ->setParameter('id', $movieId)
            ->innerJoin('m.ratings', 'ra')
            ->addSelect('AVG(ra.score) AS avg_score')
            ->innerJoin('m.productor', 'p')
            ->addSelect('p')
            ->innerJoin('m.category', 'c')
            ->addSelect('c')
            ->getQuery()
            ->getOneOrNullResult()
            ;

    }

    // /**
    //  * @return Movie[] Returns an array of Movie objects
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
    public function findOneBySomeField($value): ?Movie
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
