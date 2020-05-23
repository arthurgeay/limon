import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FilmResultComponent } from './film-result/film-result.component';
import { CategoryComponent } from './category/category.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { DetailComponent } from './detail/detail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminComponent } from './admin/admin.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FilmResultComponent,
    CategoryComponent,
    FilmCardComponent,
    DetailComponent,
    ConnexionComponent,
    ProfilComponent,
    AdminComponent,
    PlaylistComponent,
    PlaylistItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
