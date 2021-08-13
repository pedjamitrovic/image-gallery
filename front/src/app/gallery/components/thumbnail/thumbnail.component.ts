import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {
  @Input() image: Image;

  constructor() { }

  ngOnInit(): void {
  }

}
