import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss'],
})
export class DisplayUsersComponent implements OnInit {
  @Input() users: User;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  close(id: string) {
    this.onClose.emit(id);
  }

  ngOnInit(): void {}
}
