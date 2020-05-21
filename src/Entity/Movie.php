<?php

namespace App\Entity;

use App\Repository\MovieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MovieRepository::class)
 */
class Movie
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("movie")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("movie")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups("movie")
     */
    private $synopsis;

    /**
     * @ORM\Column(type="text")
     * @Groups("movie")
     */
    private $poster_img;

    /**
     * @ORM\Column(type="text")
     * @Groups("movie")
     */
    private $hero_img;

    /**
     * @ORM\Column(type="float")
     * @Groups("movie")
     */
    private $price;

    /**
     * @ORM\Column(type="date")
     * @Groups("movie")
     */
    private $release_date;

    /**
     * @ORM\Column(type="text")
     */
    private $download_url;

    /**
     * @ORM\ManyToOne(targetEntity=Productor::class, inversedBy="movies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("movie")
     */
    private $productor;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="movies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("movie")
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

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
        $this->ratings = new ArrayCollection();
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

    public function getDownloadUrl(): ?string
    {
        return $this->download_url;
    }

    public function setDownloadUrl(string $download_url): self
    {
        $this->download_url = $download_url;

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
}
