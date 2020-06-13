# Limon - Streaming et VOD
![enter image description here](https://limon.app-tricycle.com/assets/logo.svg)

**Limon** est un site web Angular et Symfony qui permet de visionner et acheter des films en ligne, cette application a été crée pour un projet de deuxième année d'informatique *(par conséquent) aucun film n'est achetable réellement sur le site)*.


Le lien vers le site [Limon](https://limon.app-tricycle.com/)

## Fonctionnement
Le site est géré par **Angular** et échange des données avec une **API** qui fonctionne en **Symfony** permet d'échanger les données utilisateurs de gérer les films, les **factures** et le **téléchargement** des films.

Le site possède **15** pages:

	- La page **catalogue** permet de rechercher un film.
	- La page de **profil** consulter son profil.
	- La tableau de bord d'**administration** permet de voir les statistiques du site.
	- La page de **connexion** permet de se connecter à son compte.
	- La page d'**inscription** permet de créer un compte sur le site.
	- La page de **historique** permet de consulter l'historique des films.
	- La page de **watchlist** permet de regrouper les films que l'on souhaite regarder plus tard.
	- La page d'**achat** permet de voir les films achetés sur le site.
	- La page d'**abonnement** permet de s'abonner au Premium pour voir des films.
	- La page de **téléchargement d'un film** permet de télécharger un film que l'on a acheté.
	- La page de **création/édition d'un film** permet d’ajouter ou modifier un film.
	- La page de **liste des membres** permet de gérer tout les membres du site
	- La page de **politique de confidentialité** 
	- La page de **mentions légales** 
	- La page de **documentation de l'API** permet aux développeurs d'accéder à notre catalogue


## Technologies utilisées
- La framework **Angular 9.1.7**
- Le framework **Symfony 5.0.8**
- Stripe Elements permettant de créer un formulaire de paiement
- Gravatar pour la gestion des photo de profil

## Déploiement de l'application
L'application à été déployé sur un serveur dédié virtuel chez OVH, cela comprend la site web limon.app-tricycle.com et l'API à l'adresse api-limon.app-tricycle.com.

## Présentation détaillée

### Page de catalogue
![enter image description here](https://cloud-image-dlcn.netlify.com/limon/home.png)
Dans la page de **catalogue** on peut découvrir les dernières nouveautés du site et les films les plus populaires (qui les meilleurs moyennes).
On peut y faire un **recherche de film** grâce au champ de recherche et même **filtrer** par **catégorie** en sélectionnant une catégorie. 
Une fois la recherche effectué on peut **trier** les résultats:
- par **date de sortie**
- par **prix**
- par **ordre alphabétique**

Si la recherche possède un trop grande nombre de résultats, ces résultats seront répartis par page.

### Page de détails d'un film
![enter image description here](https://cloud-image-dlcn.netlify.com/limon/detail2.png)
Sur cette page on peut retrouver les **informations** d'un film précis:
- le **nom** du film
- la **société** de production
- **l'année** de sortie
- la **catégorie**
- le **synopsis** du film
- le **prix** du film
- la **note** moyenne des utilisateurs
- les **avis** des utilisateurs


![Notes et commentaires](https://cloud-image-dlcn.netlify.com/limon/note.png)
Plus bas dans la page, on peut lire les **commentaires** des utilisateurs, d'y attribué sa **propre note** sur 5 et on peut aussi **écrire un commentaire.**

### Page de profil
![enter image description here](https://cloud-image-dlcn.netlify.com/limon/profil.png)
La page de **profil** permet de consulter ses informations **personnelles** et d'accéder à différentes pages liées à son compte (historique, watchlist et liste des achats).

On peut aussi modifier les informations de son compte ou le supprimer en cliquant sur l'icône ⚙ *(Paramètres)*  ainsi que se déconnecter de son compte.

### Historique
![historique](https://cloud-image-dlcn.netlify.com/limon/history.png)
Depuis le **menu** ou le **profil** on peut accéder à la page d'historique permettant de parcourir la liste des films regardées récemment sur ce compte.
On peut y **acheter** un film *(ou le **télécharger** si il a déjà été acheté)* et voir quelques informations sur le film, on peut aussi connaître la dernière **date et heure de visionnage.**

### Watchlist

![watchlist](https://cloud-image-dlcn.netlify.com/limon/watch.png)
Depuis le **menu** ou le **profil** on peut accéder à la watchlist permettant de voir les films que l'on a enregistré, cette page est similaire à *"À regarder plus tard"* de YouTube ou une liste de *favoris*.

On peut **l'acheter**/**télécharger** et le **supprimer** de la watchlist.

### Achats
![Achats](https://cloud-image-dlcn.netlify.com/limon/achats.png)
La page d'achats *(accessible depuis le profil)*  permet de consulter les films achetées et leur factures associées, on peut aussi y télécharger le film.

### Tableau de bord pour Administrateur
![admin](https://cloud-image-dlcn.netlify.com/limon/admin.png)
L'administration possède un tableau de bord pour voir les revenues générer sur le site, le nombre de membres et de ventes au global et sur les 7 derniers jours.


# API

Au niveau backend, nous avons choisi de mettre en place une API. 
Cette API fonctionne grâce au framework **Symfony** avec une base de données **MySQL**.

**Bundles utilisés**
- **knplabs/knp-paginator-bundle** : Paginer les résultats
- **lexik/jwt-authentication-bundle** : Générer et authentifier les utilisateurs avec des Json Web Token
- **nelmio/api-doc-bundle** : Générer une doc en ligne pour une partie de l'API
- **nelmio/cors-bundle** : Gérer les CORS
- **spipu/html2pdf** : Générer des documents PDF depuis un template HTML


🎬 - Films
- 

**Endpoints accessible à tous sans token**

- Récupérer les films pour la page d'accueil [Méthode GET] :  **/api/movie/all**
=> Retourne les derniers films ajoutés et les films les mieux notés (12 résultats pour chaque)

``` 
{
	"last_movies": [
		{
			// data du movie
		},...
	],
	"most_rating_movies": [
		{
			// data du movie
		}
	]
}
```

---
- Rechercher un film [Méthode GET] : 
**/api/movie/search?query=marecherche&searchBy=name&orderBy=&page=1**

=> Retourne les résultats de recherche

**query** : le contenu de la recherche
**searchBy** : **Paramètre facultatif**. L'élément à rechercher : la valeur est soit name ou category
**orderBy** : **Paramètre facultatif** . Trier les résultats

Par défaut, les résultats sont retourné dans l'ordre.
orderBy=desc : trie par ordre décroissant (plus récent au moins récent)
orderBy=date-asc : trie par date de parution croissante (du moins récent au plus récent)
orderBy=date-desc : trie par date de parution décroissante (récent au moins récent)
orderBy=price-asc : trie par prix croissant 
orderBy=price-desc trie par prix décroissant

Les résultats sont paginés
**page** : par défaut à 1. 

Pagination : 
- **current_page** 
- **items_per_page** 
- **total_item_count**
- **nb_pages**

```
{
	"current_page": 1,
	"nb_pages": 3, 
	"movies": [
		{...}
	],
	"items_per_page": 18,
	"total_item_count": 39
}
```

---
- Accéder à un film [Méthode GET] : **/api/movie/{id}** 
{id} correspond à l'id du film en base

=> Retourne le film, les avis liés au film, la note moyenne

```
{
	"movie": {
		...(data du film)
		avg_score: 1
	}
	"buy": true,
	"user_note": null
}
```

---
- Récupérer les différentes catégories de film : [Méthode GET] : **/api/category/all**
=> Retourne toutes les catégories

```
[
	{
		"id": 37,
		"name: "Action"
	},
	...
]
```

---
**Endpoints accessible avec token**

- Télécharger un film [Method GET] : **/api/movie/{id}/download**
{id} : id du film
=> Retourne le film


🔐 - Authentification et inscription
-

**Les endpoints doivent être accessible par tous**

- Inscription : [Méthode POST] **/api/register**
Données à envoyer :
```
{
	"email": "monemail",
	"password": "monsuperMOTDEPASSE",
	"birthday": "1997-09-01",
	"fullname": "Arthur Geay"
}
```
=> Renvoie un token, le rôle de l'utilisateur, la date d'expiration du token et si l'utilisateur est abonné ou non

- Connexion [Méthode POST] **/api/login**

```
{
	"username": "arthur.geay@ynov.com",
	"password": "limon"
}
```

=> Renvoie un token, le rôle de l'utilisateur ainsi qu'une date d'expiration du token et si l'utilisateur est abonné ou non
 
 ---

👨‍🎨 - Profil utilisateur 
-

**Endpoint accessible uniquement au personne connecté. 
Envoi du token dans l'entête de la requête**

- Affichage profil utilisateur [Méthode GET] : **/api/user/**
=> Retourne les infos du profil utilisateur de la personne connecté

```
{

	"id": 199,

	"email": "arthur.geay@ynov.com",

	"roles": [

		"ROLE_USER"

	],

	"fullname": "Arthur Geay",

	"birthday": "1997-09-01T00:00:00+00:00",

	"subscription": {

	"id": 76,

	"price": 60,

	"end_date": "2021-06-06T15:41:24+00:00",

	"activate": true,

	"date_subscription": "2020-06-06T15:41:24+00:00"

	}

}
```

ROUTE ACCESSIBLE A L'UTILISATEUR ET AUX ADMINISTRATEUR
- Modifier profil utilisateur pour l'utilisateur [Méthode PUT]:  **/api/user/**
- Modifier profil utilisateur par un administrateur [Méthode PUT] : **/api/user/?userId=443**
userId = l'id de l'utilisateur

```
{
	"email": "monemail",
	"birthday": "1997-09-01",
	"fullname": "Arthur Geay"
}
```

ROUTE ACCESSIBLE A L'UTILISATEUR ET AUX ADMINISTRATEUR
- Supprimer son compte par un utilisateur [Méthode DELETE] : **/api/user/**
- Supprimer un compte par un administrateur [Méthode DELETE] : **/api/user/?userId=443**
- Récupérer l'historique des films achetés : [Méthode GET] : **/api/user/movies-purchased?page=2**
Paramètre page par défaut à 1
- Récupérer l'historique des films achetés par un administrateur : [Méthode GET] : **/api/user/movies-purchased?userId=442**

---
- Récupérer l'historique des films regardés : [Méthode GET] : **/api/user/movies-watched?page=2**
- Ajouter un film à l'historique des films visionnés : [Méthode GET] : **/api/user/movie-watch/{id}** (id du film)


📝 - Avis & Score
-

**Endpoint accessible uniquement au personne connecté. 
Envoi du token dans l'entête de la requête**

- Donner une note au film [POST] **/api/rating/{id du film}**
Données à envoyer : 
```
{
	"score": 2
}
```

- Donner un avis au film [Méthode POST] : **/api/review/{id du film}**
Données à envoyer : 
```
{
	"message": "Mon avis"
}
```

- Modifier un avis [Méthode PUT]:  **/api/review/{id de l'avis}**
Données à envoyer : 
```
{
	"message": "Mon avis"
}
```

- Supprimer un avis [Méthode DELETE] : **/api/review/{id de l'avis} (Par l'auteur ou l'administrateur)**


----

💰 - Abonnement
-

**Endpoint accessible uniquement au personne connecté. 
Envoi du token dans l'entête de la requête**

- S'abonner à la formule [Méthode GET] : **/api/subscription**


💵 - Achat
-

**Endpoint accessible uniquement au personne connecté. 
Envoi du token dans l'entête de la requête**

- Achat d'un film : [Méthode GET]:  **/api/purchase/{id du film}**
- Téléchargement d'une facture [Méthode GET] : **/api/purchase/invoice/{id de l'achat}**


🕵️‍♂️ - Watchlist
-

**Endpoint accessible uniquement au personne connecté. 
Envoi du token dans l'entête de la requête**

- Accéder à sa watchlist : [Méthode GET] **/api/watchlist**
- Ajouter un film : [Méthode POST] **/api/watchlist**
Données à envoyer (id du film): 
```
{
	"movie": 345
}
```
- Supprimer un film : [Méthode DELETE] **/api/watchlist/{id du film}**
- Vérifier si un film existe déjà dans la watchlist : [Méthode GET] **/api/watchlist/added/{id}**


👮‍♀️ - Administration
-

**Endpoint accessible uniquement au personne connecté (ADMIN). 
Envoi du token dans l'entête de la requête**

- Stats du site : [Méthode GET] **/api/admin/stats**
- Liste des membres : [Méthode GET] **/api/admin/users?page=1**

**Membres**
- Afficher un profil : [Méthode GET]  **/api/user/?userId=33**
- Modifier un membre : [Méthode PUT]  **/api/user/?userId=33**
- Supprimer un membre : [Méthode DELETE] **/api/user/?userId=33**

** Avis **
- Supprimer l'avis d'un membre : [Méthode DELETE] **/api/review/{id de l'avis}**

** Historique des films achetés **
- Récupérer l'historique des films achetés par un administrateur : [Méthode GET] : **/api/user/movies-purchased?userId=442**

**Films**

**Endpoint accessible uniquement au personne connecté (ADMIN). 
Envoi du token dans l'entête de la requête**

- Ajouter un film : [Méthode POST] **/api/movie/**

Données à envoyer :
``` 
{
	"title": "montitre"
	"date": "2010-01-01",
	"price": "3.5"
	"production": "OUAIS"
	"hero_img": "url",
	"poster_img": "url",
	"category": "Action",
	"synopsis": "oeeoufe"
}
```


- Modifier un film : [Méthode PUT] **/api/movie/{id film}**
Données à envoyer :
``` 
{
	"title": "montitre"
	"date": "2010-01-01",
	"price": "3.5"
	"production": "OUAIS"
	"hero_img": "url",
	"poster_img": "url",
	"category": "Action",
	"synopsis": "oeeoufe"
}
```

- Supprimer un film : [Méthode DELETE] **/api/movie/{id}**

