import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineDataService {
  
  private dataSourceSubject = new BehaviorSubject<any[]>([
    {
      ID: 1,
      machineNo: 'M001',
      machineName: 'Machine 1',
      status: 'Active',
      supplier: 'Fanuc'
    }
  ]);
  dataSource$ = this.dataSourceSubject.asObservable();
  constructor() { }

  updateDataSource(data: any[]) {
    this.dataSourceSubject.next(data);
    console.log(this.dataSourceSubject);
  }

  updateMachine(updatedMachine: any) {
    // Get current value
    const currentData = this.dataSourceSubject.getValue();

    // Find the index of the machine to be edited
    const index = currentData.findIndex(machine => machine.ID === updatedMachine.ID);

    if (index !== -1) {
      // Update the machine data at the found index
      currentData[index] = updatedMachine;
      
      // Emit the updated data
      this.dataSourceSubject.next([...currentData]);
      console.log(this.dataSourceSubject)
    } else {
      alert('Machine not found for editing');
    }
  }

  deleteMachineByID(id: number): void {
    const currentData = this.dataSourceSubject.getValue();
    const updatedData = currentData.filter(machine => machine.ID !== id);
    this.dataSourceSubject.next(updatedData);
  }
}
