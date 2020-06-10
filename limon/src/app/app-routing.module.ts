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
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';


const routes: Routes = [
  {path: '', component: FilmResultComponent },
  {path: 'search', component: FilmResultComponent },
  {path: 'detail/:id', component: DetailComponent },
  {path: 'complete/:id',canActivate: [AuthGuard], component: DoneComponent },
  {path: 'complete',canActivate: [AuthGuard], component: DoneComponent },
  {path: 'subscribed',canActivate: [AuthGuard], component: DoneComponent },
  {path: 'login', component: ConnexionComponent },
  {path: 'signin', component: ConnexionComponent },
  {path: 'register', component: ConnexionComponent },
  {path: 'profil',canActivate: [AuthGuard], component: ProfilComponent },
  {path: 'admin',canActivate: [AdminGuard], component: AdminComponent },
  {path: 'create',canActivate: [AdminGuard], component: EditFilmComponent },
  {path: 'edit/:id',canActivate: [AdminGuard], component: EditFilmComponent },
  {path: 'history',canActivate: [AuthGuard], component: PlaylistComponent },
  {path: 'purchase',canActivate: [AuthGuard], component: PlaylistComponent },
  {path: 'purchase/:id',canActivate: [AuthGuard], component: PlaylistComponent },
  {path: 'watchlist',canActivate: [AuthGuard], component: PlaylistComponent },
  {path: 'subscription', component: SubscribeComponent },
  {path: 'members',canActivate: [AdminGuard], component: MemberListComponent },
  {path: 'user/:id',canActivate: [AdminGuard], component: ProfilComponent },
  {path: 'agreement', component: AgreementComponent },
  {path: 'privacy', component: AgreementComponent },
  {path: '**', component: FilmResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
