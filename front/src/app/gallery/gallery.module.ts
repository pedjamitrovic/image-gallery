import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    GalleryComponent,
    ThumbnailComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GalleryModule { }
