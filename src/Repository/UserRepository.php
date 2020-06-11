<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    /**
     * Get users informations
     * @param $email
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findEmailAndSubscription($val) {
       $query = $this->createQueryBuilder('u')
           ->leftJoin('u.subscription', 's')
           ->addSelect('s')
           ;

            if(is_int($val)) {
                $query->andWhere('u.id = :id')
                    ->setParameter('id', $val)
                    ;
            } else {
                $query->andWhere('u.email = :email')
                    ->setParameter('email', $val)
                ;
            }

           return $query->getQuery()
           ->getOneOrNullResult()
           ;
    }

    /**
     * Query for get all stats
     * @return mixed
     * @throws \Doctrine\DBAL\DBALException
     */
    public function getStats()
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT COUNT(user.id) AS total_number_user, 
            (SELECT COUNT(purchase.id) FROM purchase) AS total_number_sales, 
            (SELECT CAST(SUM(movie.price) AS DECIMAL(10, 2)) FROM purchase INNER JOIN movie ON movie.id = purchase.movie_id) AS sum_sales,
            (SELECT COUNT(purchase.id) FROM purchase WHERE purchase.date BETWEEN adddate(now(),-7) AND NOW() ) AS total_sales_on_7day,
            (SELECT CAST(SUM(movie.price) AS DECIMAL(10, 2)) FROM purchase INNER JOIN movie ON movie.id = purchase.movie_id WHERE purchase.date BETWEEN adddate(now(),-7) AND NOW()) AS sum_sales_on_7day
            FROM user
        ';

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetch();

    }

    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
