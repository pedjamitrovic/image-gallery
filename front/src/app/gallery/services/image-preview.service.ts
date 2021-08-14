import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ImagePreviewComponent } from '../components/image-preview/image-preview.component';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagePreviewService {
  activeImageOverlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
  ) { }

  open(image: Image) {
    if (this.activeImageOverlayRef) { this.close(); }

    const config = new OverlayConfig(
      {
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      }
    );

    this.activeImageOverlayRef = this.overlay.create(config);
    const imagePreviewPortal = new ComponentPortal(ImagePreviewComponent);
    const componentRef = this.activeImageOverlayRef.attach(imagePreviewPortal);
    componentRef.instance.image = image;
    componentRef.instance.closed.subscribe(() => this.close());

    this.activeImageOverlayRef.backdropClick().subscribe(() => this.close());
    this.activeImageOverlayRef.keydownEvents().subscribe(
      (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      }
    );
  }

  close() {
    if (this.activeImageOverlayRef) { this.activeImageOverlayRef.dispose(); }
    this.activeImageOverlayRef = null;
  }

}
