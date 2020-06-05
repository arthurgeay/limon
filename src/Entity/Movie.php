<?php

namespace App\Entity;

use App\Repository\MovieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=MovieRepository::class)
 */
class Movie
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     * @Assert\NotBlank(message="Le champ de titre est requis")
     * @Assert\Length(max="80", maxMessage="Le titre ne doit pas dépasser 80 caractères")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     * @Assert\NotBlank(message="Le synopsis est requis")
     * @Assert\Length(max="500", maxMessage="Le synopsis ne doit pas dépasser 500 caractères")
     */
    private $synopsis;

    /**
     * @ORM\Column(type="text")
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     * @Assert\NotBlank(message="L'image de poster est requis")
     */
    private $poster_img;

    /**
     * @ORM\Column(type="text")
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     * @Assert\NotBlank(message="L'image hero est requise")
     */
    private $hero_img;

    /**
     * @ORM\Column(type="float")
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     * @Assert\NotBlank(message="Le prix est requis")
     */
    private $price;

    /**
     * @ORM\Column(type="date")
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     * @Assert\NotBlank(message="La date est requise")
     */
    private $release_date;

    /**
     * @ORM\ManyToOne(targetEntity=Productor::class, inversedBy="movies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     */
    private $productor;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="movies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"movie", "movie.all", "history.watched", "history.purchased", "watchlist"})
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="movie")
     * @Groups("movie")
     */
    private $reviews;

    /**
     * @ORM\OneToMany(targetEntity=Rating::class, mappedBy="movie")
     */
    private $ratings;

    /**
     * @ORM\OneToMany(targetEntity=Purchase::class, mappedBy="movie")
     */
    private $purchases;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
        $this->ratings = new ArrayCollection();
        $this->purchases = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSynopsis(): ?string
    {
        return $this->synopsis;
    }

    public function setSynopsis(string $synopsis): self
    {
        $this->synopsis = $synopsis;

        return $this;
    }

    public function getPosterImg(): ?string
    {
        return $this->poster_img;
    }

    public function setPosterImg(string $poster_img): self
    {
        $this->poster_img = $poster_img;

        return $this;
    }

    public function getHeroImg(): ?string
    {
        return $this->hero_img;
    }

    public function setHeroImg(string $hero_img): self
    {
        $this->hero_img = $hero_img;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getReleaseDate(): ?\DateTimeInterface
    {
        return $this->release_date;
    }

    public function setReleaseDate(\DateTimeInterface $release_date): self
    {
        $this->release_date = $release_date;

        return $this;
    }

    public function getProductor(): ?Productor
    {
        return $this->productor;
    }

    public function setProductor(?Productor $productor): self
    {
        $this->productor = $productor;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|Review[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setMovie($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->contains($review)) {
            $this->reviews->removeElement($review);
            // set the owning side to null (unless already changed)
            if ($review->getMovie() === $this) {
                $review->setMovie(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Rating[]
     */
    public function getRatings(): Collection
    {
        return $this->ratings;
    }

    public function addRating(Rating $rating): self
    {
        if (!$this->ratings->contains($rating)) {
            $this->ratings[] = $rating;
            $rating->setMovie($this);
        }

        return $this;
    }

    public function removeRating(Rating $rating): self
    {
        if ($this->ratings->contains($rating)) {
            $this->ratings->removeElement($rating);
            // set the owning side to null (unless already changed)
            if ($rating->getMovie() === $this) {
                $rating->setMovie(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Purchase[]
     */
    public function getPurchases(): Collection
    {
        return $this->purchases;
    }

    public function addPurchase(Purchase $purchase): self
    {
        if (!$this->purchases->contains($purchase)) {
            $this->purchases[] = $purchase;
            $purchase->setMovie($this);
        }

        return $this;
    }

    public function removePurchase(Purchase $purchase): self
    {
        if ($this->purchases->contains($purchase)) {
            $this->purchases->removeElement($purchase);
            // set the owning side to null (unless already changed)
            if ($purchase->getMovie() === $this) {
                $purchase->setMovie(null);
            }
        }

        return $this;
    }
}
