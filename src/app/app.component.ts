import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer';

@Component({
  standalone: true,
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'repro-app';
  hasFooter = true;

}
