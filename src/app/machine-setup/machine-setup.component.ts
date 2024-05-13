import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MachineDataService } from '../services/machine-data.service';
import { DrawerServiceService } from '../services/drawer-service.service';


@Component({
  selector: 'app-machine-setup',
  templateUrl: './machine-setup.component.html',
  styleUrls: ['./machine-setup.component.scss']
})
export class MachineSetupComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = [
    'machineNo',
    'machineName',
    'status',
    'supplier',
    'action'
  ];

  @ViewChild('drawer') drawer: any;

  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private machineDataService: MachineDataService, private drawerService: DrawerServiceService) { }

  ngOnInit(): void {
    this.machineDataService.dataSource$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '70%',
        disableClose: true,

        // data: {
        //   animal: 'panda',
        // },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          //this.getAllProducts();
        }
      });
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, { width: '70%', data: row })
    .afterClosed()
    .subscribe(val=>{
      if(val == 'update'){
        //this.getAllProducts();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteMachine(ID:number){
    console.log(ID);
    this.machineDataService.deleteMachineByID(ID);
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  ngAfterViewInit() {
    this.drawerService.toggleDrawer$.subscribe(() => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    });
  }

}
