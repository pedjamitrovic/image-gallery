import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cif-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  @Input() imgSrc: string;
  @Output() closed = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.closed.emit();
  }

}
