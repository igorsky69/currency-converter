import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingService } from './setting.service';
import { IHistory } from '../models/ihistory';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  
  histroies: IHistory[]=[];
  

  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private setting: SettingService) { 
      if (this.getLocalStorage('converter')){
        this.histroies=JSON.parse(this.getLocalStorage('converter'));
      }
     }


  /* #region Events functions */
  
  addHistory(history: IHistory){
    this.histroies.push(history);
    this.setLocalStorage('converter',this.histroies);
  }

  getHistories() : IHistory[]{
    return this.histroies;
  }

  /* #endregion */

  /* #region Local Storage functions */

  setLocalStorage(objectName: string, object: Object) {
    localStorage.setItem(objectName, JSON.stringify(object));
  }

  getLocalStorage(objectName: string): string {
    return localStorage.getItem(objectName)!;
  }

  /* #endregion */


  /* #region Http functions */

    getCurrencyPairs(): Observable<any>{
      return this.http.get<any>(this.setting.getConfigApiUrl())
      .pipe(catchError(this.handleError));
    }

  /* #endregion */

  /* #region services functions */

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error', errorResponse);
    }

    return throwError('This is a problem with the service.');
  }

  showSpinner() {
    this.spinner.show('detailsSpinner', {
      type: 'ball-spin-clockwise',
      size: 'medium',
      bdColor: 'rgba(37,37,41, .25)',
      color: 'black'
    });
  }

  hideSpinner() {
    this.spinner.hide('detailsSpinner');
  }

  /* #endregion */
}

//"apiUrl":"http://api.exchangeratesapi.io/v1/latest?access_key=050beeaad0ad5cda72460c6758d5a11e&amp;format=1"
//"apiUrl":"https://localhost:7120/Test/GetRates"