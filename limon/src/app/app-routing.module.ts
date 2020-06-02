import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmResultComponent } from './film-result/film-result.component';
import { DetailComponent } from './detail/detail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminComponent } from './admin/admin.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MemberListComponent } from './member-list/member-list.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AgreementComponent } from './agreement/agreement.component';
import { DoneComponent } from './done/done.component';


const routes: Routes = [
  {path: '', component: FilmResultComponent },
  {path: 'search', component: FilmResultComponent },
  {path: 'detail/:id', component: DetailComponent },
  {path: 'complete/:id', component: DoneComponent },
  {path: 'complete', component: DoneComponent },
  {path: 'subscribed', component: DoneComponent },
  {path: 'login', component: ConnexionComponent },
  {path: 'signin', component: ConnexionComponent },
  {path: 'profil', component: ProfilComponent },
  {path: 'admin', component: AdminComponent },
  {path: 'edit', component: EditFilmComponent },
  {path: 'history', component: PlaylistComponent },
  {path: 'purchase', component: PlaylistComponent },
  {path: 'watchlist', component: PlaylistComponent },
  {path: 'subscription', component: SubscribeComponent },
  {path: 'members', component: MemberListComponent },
  {path: 'user/:id', component: ProfilComponent },
  {path: 'agreement', component: AgreementComponent },
  {path: 'privacy', component: AgreementComponent },
  {path: '**', component: FilmResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
