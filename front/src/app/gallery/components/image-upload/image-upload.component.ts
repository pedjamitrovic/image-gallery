import { Component, OnInit } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { ImageUploadState } from '../../models/image-upload-state.model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  state = ImageUploadState.INITIAL;
  isFileOver = false;
  messageTimeout = 3000;

  constructor() { }

  ngOnInit(): void {
  }

  fileListDropped(fileList: FileList) {
    console.log(fileList);
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input?.files || !input.files[0]) { return; }

    const fileType = input.files[0].type;

    if (!fileType.startsWith('image')) {
      this.state = ImageUploadState.INVALID_TYPE;
      input.value = '';
      this.setInitialState();
      return;
    }

    console.log(input.files);
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
}
