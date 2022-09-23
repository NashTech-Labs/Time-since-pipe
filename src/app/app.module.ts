import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimeSincePipe } from './time-since-pipe/time-since.pipe';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeSincePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimeSincePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
