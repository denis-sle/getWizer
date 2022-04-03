import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost/api";

  constructor(private httpClient: HttpClient) {
  }

  public sendPing() {
    return this.httpClient.get(this.REST_API_SERVER + '/ping');
  }

  public viewPings() {
    return this.httpClient.get(this.REST_API_SERVER + '/pings');
  }

  public getCalc(x: string, y: string) {
    return this.httpClient.post(this.REST_API_SERVER + '/calculator', {x, y});
  }
}
