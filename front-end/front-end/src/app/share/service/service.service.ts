import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export interface Restaurant{
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = environment.apiUrl;
  sidebarToggler = new EventEmitter<void>();
  constructor(private http: HttpClient) { }

  getAllRestaurant(){
    return this.http.get<Restaurant[]>(this.url + '/api/restaurant/get/all');
  }
}
