
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  
    public dateNow = new Date();
    public dDay = new Date('Aug 20 2021 15:00:00');
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    public daysToDday;


    private getTimeDifference () {
        this.timeDifference = this.dDay.getTime() - new  Date().getTime();
        this.allocateTimeUnits(this.timeDifference);
    }

  private allocateTimeUnits (timeDifference) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

    ngOnInit() {
       this.subscription = interval(1000)
           .subscribe(x => { this.getTimeDifference(); });
    }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

}