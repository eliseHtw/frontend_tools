import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Tool } from '../shared/tool';
import { BackendService } from '../shared/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kiste',
  standalone: true,
  imports: [ CommonModule, NgFor, ReactiveFormsModule ],
  templateUrl: './kiste.component.html',
  styleUrl: './kiste.component.css'
})
export class KisteComponent implements OnInit {

  ngOnInit(): void {
    this.readAllTools();
    this.filterArray = this.tools;
    console.log('in table --> allMembers', this.tools)
  }

  bs = inject(BackendService);
  tools: Tool[] = [];
  filterArray: Tool [] = [];
  search = new FormControl('');

  readAllTools(): void {
    this.bs.getAllTools().subscribe({
      next: (response) => {
        this.tools = response;
        console.log(this.tools);
        return this.tools;
      },
      error: (err) => console.log(err),
      complete: () => console.log('getAllTools() completed')
    })
  }

  filterMembers() {
    console.log(this.search.value)
    let searchString = this.search.value ? this.search.value : '';
    console.log('in table --> searchString', searchString);

    this.filterArray = this.tools.filter( (tool)  => {
      return (
        tool.kategorie.toLowerCase().includes(searchString) ||
        tool.artikel.toLowerCase().includes(searchString) ||
        tool.details.toLowerCase().includes(searchString)
      );
    });
  }
}
