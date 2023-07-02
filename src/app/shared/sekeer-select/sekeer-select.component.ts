import { Component } from '@angular/core';

@Component({
  selector: 'app-sekeer-select',
  templateUrl: './sekeer-select.component.html',
  styleUrls: ['./sekeer-select.component.scss']
})
export class SekeerSelectComponent {
  options = [
    { label: 'Opción 1', value: 'opcion1' },
    { label: 'Opción 2', value: 'opcion2' },
    { label: 'Opción 3', value: 'opcion3' },
    // Agrega más opciones aquí
  ];

  selectedOption: any;
  filteredOptions!: any[];
  searchTerm!: string;
  isOptionsOpen = false;

  filterOptions() {
    if (this.searchTerm) {
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredOptions = this.options;
    }
  }

  toggleOptions() {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.isOptionsOpen = false;
  }
}
