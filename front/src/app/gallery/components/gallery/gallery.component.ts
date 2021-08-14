import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';
import { PagedList } from '../../models/paged-list.model';
import { GalleryService } from '../../services/gallery.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  imageList: PagedList<Image>;
  page = 1;
  dateTo = new Date();
  loading = true;

  constructor(
    private galleryService: GalleryService,
  ) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.loading = true;

    const params = { page: this.page, dateTo: this.dateTo.toISOString() };

    this.galleryService.getList(params)
      .pipe(finalize(() => this.loading = false))
      .subscribe((imageList) => this.imageList = imageList);
  }

  imageUploaded(image: Image) {
    console.log(image);
    this.page = 1;
    this.dateTo = new Date();
    this.getPhotos();
  }

}

