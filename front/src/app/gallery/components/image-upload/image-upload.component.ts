import { Component, HostListener, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  state = 0;
  isFileOver = false;

  constructor() { }

  ngOnInit(): void {
  }

  fileListDropped(fileList: FileList) {
    console.log(fileList);
  }
}
