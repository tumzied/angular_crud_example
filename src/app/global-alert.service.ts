import { Injectable } from '@angular/core';

export class AlertType{
  static success= 'success'
  static info='info'
  static warning= 'warning'
}

export interface Alert {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalAlertService {
  private alerts:Alert[]=[]
  constructor() { }

  
  public get getAlerts() : Alert[] {
    return this.alerts;
  }
  

  addAlert(alert:Alert){
    this.alerts.push(alert);
  }

  removeAlert(idx:number){
    this.alerts.splice(idx,1);
  }

  clearAll(){
    this.alerts=[];
  }


}
