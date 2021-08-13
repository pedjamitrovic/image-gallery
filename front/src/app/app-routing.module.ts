import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/components/gallery/gallery.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: '**',
    redirectTo: 'gallery',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
