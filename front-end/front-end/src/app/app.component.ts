import { Component } from '@angular/core';
import { AuthService } from './authentication/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Capstone';

  constructor(private authService: AuthService){ }

  ngOnInit(): void {
    this.authService.autoLoginWhenReload();
  }
}
