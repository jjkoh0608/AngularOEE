import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tile } from './Tile.interface';
import { MachineSetupComponent } from '../machine-setup/machine-setup.component';
import { MachineDataService } from '../services/machine-data.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  machineForm!: FormGroup;
  actionBtn: string = 'Save';

  machineComponent!: MachineSetupComponent;
  ID: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    //private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private machineDataService: MachineDataService
  ) {}

  ngOnInit(): void {
    this.machineForm = this.formBuilder.group({
      ID: [''],
      machineNo: ['', Validators.required],
      machineName: ['', Validators.required],
      status: ['', Validators.required],
      supplier: ['', Validators.required],
    });


    if (this.editData) {
      this.actionBtn = 'Update';
      this.machineForm.controls['machineNo'].setValue(this.editData.machineNo);
      this.machineForm.controls['machineName'].setValue(
        this.editData.machineName
      );
      this.machineForm.controls['status'].setValue(this.editData.status);
      this.machineForm.controls['supplier'].setValue(this.editData.supplier);
    }
  }

  addMachine() {
    if (!this.editData) {
      if (this.machineForm.valid) {
        this.machineDataService.dataSource$.subscribe((data) => {
          this.ID = data.length + 1;
        });
        this.machineDataService.dataSource$.pipe(take(1)).subscribe((data) => {
          const value = this.machineForm.patchValue({ ID: this.ID });
          const updatedData = [...data, this.machineForm.value];
          this.machineDataService.updateDataSource(updatedData);
        });
      }
    } else {
      this.updateMachine();
    }
  }

  updateMachine() {
    this.machineForm.patchValue({ ID: this.editData.ID });
    this.machineDataService.updateMachine(this.machineForm.value);
  }

  
}
