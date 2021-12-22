import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  tenant: string;
}
@Component({
  selector: 'app-tenant-dialog',
  templateUrl: './tenant-dialog.component.html'
})
export class TenantDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
