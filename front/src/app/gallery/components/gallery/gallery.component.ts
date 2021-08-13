import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: Image[] = [
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
