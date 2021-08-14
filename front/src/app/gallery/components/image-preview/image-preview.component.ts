import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../../models/image.model';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'cif-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  @Input() image: Image;
  @Output() closed = new EventEmitter<any>();

  constructor(
    public environment: EnvironmentService,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.closed.emit();
  }

}
