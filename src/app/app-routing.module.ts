import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { FilmComponent } from './film/film.component';
import { CreatefilmComponent } from './createfilm/createfilm.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'films', component: FilmsComponent},
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: 'film/:slug', component: FilmComponent},
  { path: 'createfilm', component: CreatefilmComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
