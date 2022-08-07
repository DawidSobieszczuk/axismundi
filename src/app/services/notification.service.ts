import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  successDutation: number = 1000;
  errorDutation: number = 3000;
  private _queue: Array<{message: string, type:'success'|'error'}> = [];
  private _isReady: boolean = true;

  constructor(private snackBar : MatSnackBar) {}

  private _openSnackBar(message: string, type:'error'|'success'): void {
    this._isReady = false;
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: message,
        type: type 
      },
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: type == 'error' ? this.errorDutation : this.successDutation,
      panelClass: type
    }).afterDismissed().subscribe({
      next: () => {
        if(this._queue.length < 1) this._isReady = true;
        else this._openNext();
      }
    })
  }

  private _openNext() {
    let value = this._queue.reverse().pop();
    this._queue.reverse();

    if(value)
      this._openSnackBar(value.message, value.type);
  }

  /**
   * Add notification to queue, and display when ready.
   * @param massage message to display
   * @param type 'succes'|'error'
   */
  open(message: string, type:'error'|'success'): void {
    this._queue.push({message: message, type: type});
    if(this._isReady)
      this._openNext();  
  }
}
