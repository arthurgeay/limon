import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmResultComponent } from './film-result/film-result.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {path: '', component: FilmResultComponent },
  {path: 'search', component: FilmResultComponent },
  {path: 'detail', component: DetailComponent },
  {path: '**', component: FilmResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
