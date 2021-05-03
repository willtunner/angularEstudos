import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug-form',
  templateUrl: './debug-form.component.html',
  styleUrls: ['./debug-form.component.scss']
})

export class DebugFormComponent implements OnInit {
  @Input() form: any;

  constructor() { }

  ngOnInit(): void {
  }

}
