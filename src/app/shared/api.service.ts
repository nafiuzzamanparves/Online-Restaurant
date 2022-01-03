
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // Create Restaurant
  postRestaurant(data: any) {
    return this._http.post<any>("http://localhost:3000/post", data).pipe(map((res: any) => {
      return res;
    }))
  }

  // Get All Restaurent
  getRestaurant() {
    return this._http.get<any>("http://localhost:3000/post").pipe(map((res: any) => {
      return res;
    }))
  }

  // Update Restaurant
  updateRestaurant(data: any, id: number) {
    return this._http.put<any>("http://localhost:3000/post/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  // Delete Restaurant
  deleteRestaurant(id: number) {
    return this._http.delete<any>("http://localhost:3000/post/" + id,).pipe(map((res: any) => {
      return res;
    }))
  }
}
