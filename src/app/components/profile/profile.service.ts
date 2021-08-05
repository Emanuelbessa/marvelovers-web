import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdatePassProfile, UpdateUserDto, UserToken } from '@shared/model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseURL = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<UserToken> {
    return this.http.get<UserToken>(`${this.baseURL}/${id}`);
  }

  patchPass(user: UpdatePassProfile): Observable<UpdatePassProfile> {
    return this.http.patch<UpdatePassProfile>(`${this.baseURL}/updatepass`, user);
  }

  putProfile(user: UpdateUserDto): Observable<UpdateUserDto> {
    return this.http.put<UpdateUserDto>(`${this.baseURL}`, user);
  }
}
