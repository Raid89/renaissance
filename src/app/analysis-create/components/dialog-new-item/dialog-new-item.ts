import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-new-item.html',
    styleUrls: ['./dialog-new-item.scss']
  })
  export class DialogNewItem {
    name!: string;
    type!: 'column' | 'row';

  constructor(
    public dialogRef: MatDialogRef<DialogNewItem>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  guardar() {
    this.dialogRef.close({
        name: this.name,
        type: this.type
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
  }