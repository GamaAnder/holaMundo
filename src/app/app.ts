import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';

@Component({
  imports: [RouterOutlet,FormsModule,Menu],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('holaMundoB');
  saludar:string = "mundo";
}