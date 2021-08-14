import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';
import { PagedList } from '../models/paged-list.model';
import { CommonHttpService } from './common-http.service';
import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private apiUrl = `${this.environment.apiUrl}/gallery`;

  constructor(
    private environment: EnvironmentService,
    private http: HttpClient,
    private commonHttpService: CommonHttpService,
  ) {
  }

  getList(queryParams?: any) {
    const params = this.commonHttpService.parseParams(queryParams);
    return this.http.get<PagedList<Image>>(`${this.apiUrl}/photos`, { params });
  }

  uploadPhoto(file: File) {
    const formData: any = new FormData();
    formData.append("photo", file);
    return this.http.post(
      `${this.apiUrl}/photos`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }
}
