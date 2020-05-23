import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmResultComponent } from './film-result/film-result.component';
import { DetailComponent } from './detail/detail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminComponent } from './admin/admin.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MemberListComponent } from './member-list/member-list.component';


const routes: Routes = [
  {path: '', component: FilmResultComponent },
  {path: 'search', component: FilmResultComponent },
  {path: 'detail/:id', component: DetailComponent },
  {path: 'login', component: ConnexionComponent },
  {path: 'signin', component: ConnexionComponent },
  {path: 'profil', component: ProfilComponent },
  {path: 'admin', component: AdminComponent },
  {path: 'history', component: PlaylistComponent },
  {path: 'purchase', component: PlaylistComponent },
  {path: 'watchlist', component: PlaylistComponent },
  {path: 'members', component: MemberListComponent },
  {path: 'user/:id', component: DetailComponent },
  {path: '**', component: FilmResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
