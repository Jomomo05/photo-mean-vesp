import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Photo} from '../interfaces/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  URI = 'http://localhost:3500/api/photos';

constructor(private http:HttpClient) {}
  createPhoto(title:string, description:string, photo:File){
    if (photo.size > 30000000){
      alert("File is too big!")
    }
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(this.URI, fd);
  }
}
