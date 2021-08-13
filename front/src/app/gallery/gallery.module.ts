import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';

@NgModule({
  declarations: [
    GalleryComponent,
    ThumbnailComponent,
    ImageUploadComponent,
    DropZoneDirective
  ],
  imports: [
    CommonModule
  ]
})
export class GalleryModule { }
