import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeGeralComponent } from './components/geral/home-geral/home-geral.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NavBarComponent, RouterOutlet, HomeGeralComponent],
templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Laudo_Setor_TI';
}
