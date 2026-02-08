import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  token: string = '';
  counter: number = 0;

  ngOnInit() {
    // Read the demo auth token from localStorage (set by shell)
    this.token = localStorage.getItem('demoAuthToken') || 'No token found';
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  reset() {
    this.counter = 0;
  }
}
