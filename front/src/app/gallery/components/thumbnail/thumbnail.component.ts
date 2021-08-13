import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';
import { ImagePreviewService } from '../../services/image-preview.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {
  @Input() image: Image;

  constructor(
    private imagePreviewService: ImagePreviewService,
  ) { }

  ngOnInit(): void {
  }

  openImagePreview() {
    this.imagePreviewService.open(this.image.path);
  }

}
