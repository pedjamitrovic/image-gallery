import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { ImageUploadState } from '../../models/image-upload-state.model';
import { GalleryService } from '../../services/gallery.service';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter<Image>();

  state = ImageUploadState.INITIAL;
  uploadProgress = 0;
  isFileOver = false;
  messageTimeout = 2000;

  constructor(
    private galleryService: GalleryService,
  ) { }

  ngOnInit(): void {
  }

  fileListDropped(fileList: FileList) {
    if (this.state !== ImageUploadState.INITIAL || !fileList.length) { return; }
    this.uploadPhoto(fileList.item(0));
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (this.state !== ImageUploadState.INITIAL || !input?.files || !input.files[0]) {
      input.value = '';
      return;
    }

    const fileType = input.files[0].type;

    if (!fileType.startsWith('image')) {
      this.state = ImageUploadState.INVALID_TYPE;
      input.value = '';
      this.setInitialState();
      return;
    }

    this.uploadPhoto(input.files[0]);

    input.value = '';
  }

  setInitialState() {
    timer(this.messageTimeout).subscribe(() => { this.state = ImageUploadState.INITIAL });
  }

  setIsFileOver(isFileOver: boolean) {
    this.isFileOver = isFileOver;
    if (this.isFileOver) {
      this.state = ImageUploadState.FILE_OVER;
    } else {
      this.state = ImageUploadState.INITIAL;
    }
  }

  uploadPhoto(file: File) {
    this.uploadProgress = 0;
    this.galleryService.uploadPhoto(file).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.state = ImageUploadState.UPLOADING;
            break;
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            this.state = ImageUploadState.SUCCESS;
            this.setInitialState();
            this.imageUploaded.emit(event.body);
            break;
        }
      }
    );
  }
}
