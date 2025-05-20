import { Component, OnInit } from '@angular/core';
import {  IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-header-component',
  templateUrl: './my-header-component.component.html',
  styleUrls: ['./my-header-component.component.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
  ],
})
export class MyHeaderComponentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
