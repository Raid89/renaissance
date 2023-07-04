import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sekeer-select',
  templateUrl: './sekeer-select.component.html',
  styleUrls: ['./sekeer-select.component.scss']
})
export class SekeerSelectComponent implements OnInit, OnChanges {
  @Input() optionValue!: string;
  @Input() options!: Array<any>;
  @Output() returnOption = new EventEmitter();
  @Output() inputChange = new EventEmitter();
  
  selectedOption: any;
  filteredOptions!: any[];
  searchTerm!: string;
  isOptionsOpen = false;

  constructor(){}

  ngOnInit(): void {
    this.filterOptions()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.optionValue) {
      this.selectedOption = changes.optionValue.currentValue
      this.filterOptions()
    }
  }

  toggleOptions(open: boolean) {
    this.isOptionsOpen = open;
  }

  filterOptions() {
    if (this.searchTerm) {
      this.inputChange.emit(this.searchTerm)
      this.filteredOptions = this.options.filter(option =>
        option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredOptions = this.options;
    }

  }

  selectOption(index: number){
    this.selectedOption = this.options[index]
    this.returnOption.emit(this.selectedOption)
  }
}
