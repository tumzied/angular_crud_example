import { Component } from '@angular/core';
import { GlobalAlertService } from './global-alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud_example';
  constructor(public alertService:GlobalAlertService){}



}
