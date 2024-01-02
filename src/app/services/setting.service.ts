import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private apiUrl: string = '';

  constructor(private http: HttpClient) { }

  public getSetting() {

    return this.http.get('assets/config/config.json')
      .toPromise().then((data: any) => {
        this.apiUrl = data.apiUrl;
        return Promise.resolve(data.apiUrl);
      });
  }


  public getConfigApiUrl(): string {
    return this.apiUrl;
  }

}
