import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Metric } from './metric';
import { Output } from './output';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetricService {
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getData(): Observable<Metric[]> {
    let url =
      'http://localhost:8081/metric-converter/api/converter/get-all-metrics';
    return this.http.get<Metric[]>(url);
  }

  // HttpClient API post() method => Create employee
  doConversion(input): Observable<Output> {
    let url = 'http://localhost:8081/metric-converter/api/converter/convert/'+input.value+'/'+input.unit+'/'+input.metric;
    return this.http.get<Output>(url);
  }
}
