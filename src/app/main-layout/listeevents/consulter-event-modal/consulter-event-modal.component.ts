import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from 'src/app/models/event';

@Component({
  selector: 'app-consulter-event-modal',
  templateUrl: './consulter-event-modal.component.html',
  styleUrls: ['./consulter-event-modal.component.css']
})
export class ConsulterEventModalComponent implements OnInit {
  @Input() event: Evenement | null = null;
  constructor() { }

  ngOnInit(): void {
    console.log(this.event);
  }

}