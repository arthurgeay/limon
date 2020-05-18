<?php

namespace App\Entity;

use App\Repository\MovieRepository;
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
     * @Groups("movie")
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
}
