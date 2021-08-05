import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComicFavs } from './dto/comic.dto';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  baseURL = `${environment.baseUrl}/comic`;

  constructor(private http: HttpClient) {}

  readAllComics(params: Params): Observable<any> {
    const parameters = new HttpParams({ fromObject: { ...params } });
    return this.http.get<any>(`${this.baseURL}`, {
      params: parameters,
    });
  }

  readAllComicsFavs(): Observable<ComicFavs[]> {
    return this.http.get<ComicFavs[]>(`${this.baseURL}/favorites`);
  }

  favorite(comic: ComicFavs): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/favorite`, comic);
  }
}
