import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: TaskService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.builder.group({
      title: '',
      description: '',
      status: '',
      priority: '',
      dueDate: '',
    });
  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
  }

  taskRegister() {
    if (this.taskForm.valid) {
      if (this.data) {
        this.service.editTask({ ...this.taskForm.value, id: this.data.id });
        this.toastr.success('Task Added Successfully');
        this.dialog.close(true);
        window.location.reload();
      } else {
        console.log(this.taskForm.value);
        this.service.addTask(this.taskForm.value);
        this.toastr.success('Task Updated Successfully');
        this.dialog.close(true);
        window.location.reload();
      }
    }
  }
}
