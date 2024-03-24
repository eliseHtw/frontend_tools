import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Tool } from '../shared/tool';

@Component({
  selector: 'app-kiste',
  standalone: true,
  imports: [ NgFor, ReactiveFormsModule ],
  templateUrl: './kiste.component.html',
  styleUrl: './kiste.component.css'
})
export class KisteComponent {
  filterArray: Tool [] = [];

}
