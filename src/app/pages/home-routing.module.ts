import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule)
      },
      { path: 'personal', component: PersonalComponent},
      { path: '**', redirectTo: 'movies/popular'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
