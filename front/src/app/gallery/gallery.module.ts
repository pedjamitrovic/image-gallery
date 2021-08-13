import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';

@NgModule({
  declarations: [
    GalleryComponent,
    ThumbnailComponent,
    ImageUploadComponent,
    ImagePreviewComponent,
    DropZoneDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class GalleryModule { }
