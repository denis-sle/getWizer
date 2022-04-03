import {Component, OnDestroy} from '@angular/core';
import {DataService} from './data.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'getWizer Test Page';
  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  terminalStr: string = '';

  constructor(private dataService: DataService) {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getCalculator(x: string, y: string) {
    this.dataService.getCalc(x, y).pipe(takeUntil(this.destroy$)).subscribe((resp: any) => {
      this.terminalStr = resp.data;
    })
  }

  sendPing() {
    this.dataService.sendPing().pipe(takeUntil(this.destroy$)).subscribe((resp: any) => {
      this.terminalStr = resp.data;
    })
  }

  viewPings() {
    this.dataService.viewPings().pipe(takeUntil(this.destroy$)).subscribe((resp: any) => {
      this.terminalStr = '';
      for (let i = 0; i < resp.data.length; i++) {
        this.terminalStr += JSON.stringify(resp.data[i]) + "\n";
      }
    })
  }
}

