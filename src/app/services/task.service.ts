import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskCartData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data") || '[]') : []
  taskCart = new BehaviorSubject<any>(this.taskCartData);


  addTask(task: any) {
    let taskData = localStorage.getItem("data");
    if (taskData) {
      let data = JSON.parse(taskData)
      data.push({ ...task, id: data.length + 1 })
      localStorage.setItem("data", JSON.stringify(data));
      this.taskCart.next(data);
    } else {
      let data = [];
      data.push({ ...task, id: 1 })
      localStorage.setItem("data", JSON.stringify(data));
      this.taskCart.next(data);
    }
  }

  deleteTask(id: any) {
    let taskData = localStorage.getItem("data");
    if (taskData) {
      let data = JSON.parse(taskData);
      let array = data.filter((elem: any) => {
        return elem.id != id
      });

      localStorage.setItem("data", JSON.stringify(array));
      this.taskCart.next(array)
    }
  }

  editTask(task: any) {
    let taskData = localStorage.getItem("data");
    if (taskData) {
      let data = JSON.parse(taskData);
      let array = data.map((elem: any) => {
        if (elem.id == task.id) {
          return task
        } else {
          return elem
        }
      })

      localStorage.setItem("data", JSON.stringify(array));
      this.taskCart.next(array)
    }
  }

}
