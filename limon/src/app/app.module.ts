import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member/member.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { ReviewComponent } from './review/review.component';
import { WriteReviewComponent } from './write-review/write-review.component';
import { NoteComponent } from './note/note.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AgreementComponent } from './agreement/agreement.component';
import { DoneComponent } from './done/done.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { FooterComponent } from './footer/footer.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';
import { VideoComponent } from './video/video.component';

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
    PlaylistItemComponent,
    MemberListComponent,
    MemberComponent,
    EditFilmComponent,
    ReviewComponent,
    WriteReviewComponent,
    NoteComponent,
    SubscribeComponent,
    AgreementComponent,
    DoneComponent,
    RgpdComponent,
    FooterComponent,
    SearchbarComponent,
    CheckoutComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
