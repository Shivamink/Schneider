import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'HomeComponent', component: HomeComponent },
  { path: 'ContentComponent', component: ContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
