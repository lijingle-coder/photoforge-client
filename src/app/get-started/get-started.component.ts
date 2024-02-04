import { AfterViewInit, Component } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
})
export class GetStartedComponent implements AfterViewInit {
  constructor(
    private notification: NotificationService,
    private data: DataService
  ) {}
  ngAfterViewInit(): void {
    this.data.showNav.next(true);
  }
}
