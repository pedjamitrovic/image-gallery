import { Component, OnDestroy, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';
import { PagedList } from '../../models/paged-list.model';
import { GalleryService } from '../../services/gallery.service';
import { finalize, mergeMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  imageList: PagedList<Image>;
  dateTo = new Date();
  loading = true;
  changeCheckInterval = 10000;
  changeCheckSubscription: Subscription;
  newestList: PagedList<Image>;
  newestDateTo: Date;

  constructor(
    private galleryService: GalleryService,
  ) { }

  ngOnInit() {
    this.getPhotos(1);
    this.initializeChangeListener();
  }

  ngOnDestroy() {
    if (this.changeCheckSubscription) { this.changeCheckSubscription.unsubscribe(); }
  }

  getPhotos(page: number) {
    this.loading = true;

    const params = { page, dateTo: this.dateTo.toISOString() };

    this.galleryService.getList(params)
      .pipe(finalize(() => this.loading = false))
      .subscribe((imageList) => this.imageList = imageList);
  }

  imageUploaded(image: Image) {
    console.log(image);
    this.dateTo = new Date();
    this.getPhotos(1);
  }

  initializeChangeListener() {
    if (this.changeCheckSubscription) { this.changeCheckSubscription.unsubscribe(); }
    this.changeCheckSubscription = interval(this.changeCheckInterval)
      .pipe(
        mergeMap(
          () => this.galleryService.getList()
        )
      )
      .subscribe(
        (imageList) => {
          if (this.imageList.totalCount === imageList.totalCount) { return; }

          if (this.imageList.page === 1) {
            // Refresh items if user is on first page
            this.imageList = imageList;
          } else {
            // Inform user that he can refresh items
            this.newestList = imageList;
            this.newestDateTo = new Date();
          }
        }
      );
  }

  loadNewestList() {
    this.imageList = this.newestList;
    this.dateTo = this.newestDateTo;

    this.newestList = null;
    this.newestDateTo = null;
  }

}

