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
    { name: 'MyImage.jpg', path: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', thumbnailPath: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
