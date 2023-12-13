import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem,
  CdkDragHandle,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  displayedColumns: string[] = [
    'check',
    'id',
    'title',
    'description',
    'status',
    'priority',
    'dueDate',
    'action',
  ];
  dataSource: any;
  dragDisabled = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table', { static: true }) table!: MatTable<any>;

  constructor(
    private dialog: MatDialog,
    private service: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskFormComponent);
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
    });
  }

  getTaskList() {
    this.service.taskCart.subscribe((res: any) => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTask(id: number) {
    this.service.deleteTask(id);
    this.toastr.success('Task Deleted !');
  }

  openTaskForm(data: any) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      console.log('check_truefalseed', res);
      window.location.reload();
    });
  }

  setAll(completed: boolean, data: any) {
    if (completed) {
      this.service.editTask({ ...data, status: 'Completed' });
      this.toastr.success('Task Completed !');
    } else {
      console.log(completed);
      this.service.editTask({ ...data, status: 'Pending' });
    }
  }

  // drop(event: CdkDragDrop<any>) {
  //   const previousIndex = this.dataSource.data.findIndex(
  //     (row: any) => row === event.item.data
  //   );
  //   moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);
  //   this.table.renderRows();
  // }

  drop(event: CdkDragDrop<any>) {
    // Return the drag container to disabled.
    this.dragDisabled = true;

    const previousIndex = this.dataSource.data.findIndex(
      (d: any) => d === event.item.data
    );

    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
