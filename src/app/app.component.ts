import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // timeStamp = new Date();
  timeStamp= 1661421600000;
  changeTime = false;

  changeToTimeSince(){
  this.changeTime = !this.changeTime;
  }
}
