import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../../models/image.model';
import { EnvironmentService } from '../../services/environment.service';
import { ImagePreviewService } from '../../services/image-preview.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {
  @Input() image: Image;
  @Output() imageClicked = new EventEmitter<Image>();

  constructor(
    public environment: EnvironmentService,
  ) { }

  ngOnInit() {
  }

  emitImageClicked() {
    this.imageClicked.emit(this.image);
  }
}
