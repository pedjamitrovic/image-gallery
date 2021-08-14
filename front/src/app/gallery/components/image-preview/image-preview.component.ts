import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { Image } from '../../models/image.model';
import { PagedList } from '../../models/paged-list.model';
import { EnvironmentService } from '../../services/environment.service';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'cif-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  @Input() startImageIndex: number;
  @Input() dateTo: Date;
  @Output() closed = new EventEmitter<any>();

  imageList: PagedList<Image>;
  loading = true;
  image: Image;

  constructor(
    public environment: EnvironmentService,
    public galleryService: GalleryService,
  ) { }

  ngOnInit() {
    this.getPhoto(this.startImageIndex);
  }

  close() {
    this.closed.emit();
  }

  pageChanged(event: PageEvent) {
    this.getPhoto(event.pageIndex + 1);
  }

  getPhoto(page: number) {
    this.loading = true;

    const params = { pageSize: 1, page, dateTo: this.dateTo.toISOString() };

    this.galleryService.getList(params)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (imageList) => {
          this.imageList = imageList;
          this.image = this.imageList.items[0];
        }
      );
  }

}
