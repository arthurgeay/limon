# Limon - Streaming et VOD
![enter image description here](https://limon.app-tricycle.com/assets/logo.svg)

**Limon** est un site web Angular et Symfony qui permet de visionner et acheter des films en ligne, cette application a été crée pour un projet de deuxième année d'informatique *(par conséquent) aucun film n'est achetable réellement sur le site)*.


Le lien vers le site [Limon](https://limon.app-tricycle.com/)

## Fonctionnement
Le site est géré par **Angular** et échange des données avec une **API** qui fonctionne en **Symfony** permet d'échanger les données utilisateurs de gérer les films, les **factures** et le **téléchargement** des films.

Le site possède **15** pages:
	-	La page **catalogue** permet de rechercher un film.
	-	La page de **profil** consulter son profil.
	-	La tableau de bord d'**administration** permet de voir les statistiques du site.
	-	La page de **connexion** permet de se connecter à son compte.
	-	La page d'**inscription** permet de créer un compte sur le site.
	-	La page de **historique** permet de consulter l'historique des films.
	-	La page de **watchlist** permet de regrouper les films que l'on souhaite regarder plus tard.
	-	La page d'**achat** permet de voir les films achetés sur le site.
	-	La page d'**abonnement** permet de s'abonner au Premium pour voir des films.
	-	La page de **téléchargement d'un film** permet de télécharger un film que l'on a acheté.
	-	La page de **création/édition d'un film** permet d’ajouter ou modifier un film.
	-	La page de **liste des membres** permet de gérer tout les membres du site
	-	La page de **politique de confidentialité** 
	-	La page de **mentions légales** 
	-	La page de **documentation de l'API** permet aux développeurs d'accéder à notre catalogue


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
La page de **profil** permet de consulter ses informations **personnelles** et d'accéder à différentes pages liées à sont compte (historique, watchlist et liste des achats.

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


