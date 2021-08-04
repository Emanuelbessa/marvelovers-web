import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Params } from './dto/params.dto';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  baseURL = `${environment.baseUrl}/character`;

  constructor(private http: HttpClient) {}

  readAllCharacters(params: Params): Observable<any> {
    const parameters = new HttpParams({ fromObject: { ...params } });
    return this.http.get<any>(`${this.baseURL}`, {
      params: parameters,
    });
  }
}
