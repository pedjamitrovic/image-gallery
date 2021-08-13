import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {
  @Output() isFileOver = new EventEmitter<boolean>();
  @Output() fileListDropped = new EventEmitter<FileList>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver.emit(false);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver.emit(false);
    if (event.dataTransfer) {
      this.fileListDropped.emit(event.dataTransfer.files)
    }
  }

}
