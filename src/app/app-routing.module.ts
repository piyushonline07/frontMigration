import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "angular",
    pathMatch: 'full'
  },
  {
    path : "angular",
    component: MainComponent
  },
  {
    path : "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
