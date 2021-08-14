import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
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

    const file = fileList.item(0);

    if (!this.isFileImage(file)) {
      this.state = ImageUploadState.INVALID_TYPE;
      this.scheduleInitialState();
      return;
    }

    this.uploadPhoto(fileList.item(0));
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (this.state !== ImageUploadState.INITIAL || !input?.files || !input.files[0]) {
      input.value = '';
      return;
    }

    const file = input.files[0];

    if (!this.isFileImage(file)) {
      this.state = ImageUploadState.INVALID_TYPE;
      input.value = '';
      this.scheduleInitialState();
      return;
    }

    this.uploadPhoto(file);

    input.value = '';
  }

  scheduleInitialState() {
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
            this.scheduleInitialState();
            this.imageUploaded.emit(event.body);
            break;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error?.error === 'duplicate') {
          this.state = ImageUploadState.DUPLICATE;
          this.scheduleInitialState();
        } else if (err.error?.error === 'invalid_type') {
          this.state = ImageUploadState.INVALID_TYPE;
          this.scheduleInitialState();
        } else {
          this.state = ImageUploadState.ERROR;
          this.scheduleInitialState();
        }
      }
    );
  }

  private isFileImage(file: File) {
    const fileType = file.type;
    return fileType.startsWith('image');
  }
}
