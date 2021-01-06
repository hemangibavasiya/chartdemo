import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  constructor(
    private http: HttpClient
  ) { }
  getData() {
    let url = "https://jsonplaceholder.typicode.com/users"
    return this.http.get(url).pipe(map(response => {return response}))
  }
}
