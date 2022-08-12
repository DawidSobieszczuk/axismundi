import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'am-side-panel-menu',
  templateUrl: './side-panel-menu.component.html',
  styleUrls: ['./side-panel-menu.component.scss']
})
export class SidePanelMenuComponent implements OnInit {

  private _menuId!: number;

  form!: FormGroup
  idsForDelete: number[] = [];

  get menuItemsFormArray() : FormArray {
    return this.form.get('menu-items') as FormArray;
  }

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'menu-items': this.formBuilder.array([])
    });

    this.apiService.getMenu('nav').subscribe({
      next: (v) => {
        let items = v.data.items;
        items.forEach((item: {id: any, menu_id: any, name: any, href: any}) => {
          this._menuId = item.menu_id;
          this.menuItemsFormArray.push(this.formBuilder.group({
            'id': [item.id],
            'name': [item.name, Validators.required],
            'href': [item.href, Validators.required],
          }))
        });
      }
    });
  }

  formSubmit(): void {
    this.idsForDelete.forEach(element => {
      this.apiService.deleteMenuItem(element).subscribe({
        next: (v) => {
          this.notificationService.open(v.message || 'Menu item destroyed', 'success');
        },
        error: (e) => {
          this.notificationService.open(e.error.message || 'Cannot destroy menu item', 'error');
        }
      });
    });

    this.idsForDelete = [];

    this.menuItemsFormArray.value.forEach((element: {id: any, name: any, href: any}, index: any) => {
      var body = {
        'menu_id': this._menuId,
        'name': element.name,
        'href': element.href,
      };
      console.log(body);
      if(element.id > 0) { // update
        this.apiService.setMenuItem(element.id, body).subscribe({
          next: (v) => {
            this.notificationService.open(v.message || 'Update ' + element.name, 'success')
          },
          error: (e) => {
            this.notificationService.open(e.error.message || 'Cannot update ' + element.name, 'error')
          }
        });
      } else { // create
        this.apiService.addMenuItem(body).subscribe({
          next: (v) => {
            this.menuItemsFormArray.value[index].id = v.data.id;
            this.notificationService.open(v.message || 'Add ' + element.name, 'success');
          },
          error: (e) => {
            this.notificationService.open(e.error.message || 'Cannot add ' + element.name, 'error');
          }
        });
      }
    });

  }

  addItem(): void {
    this.menuItemsFormArray.push(this.formBuilder.group({
      'id': [-1],
      'name': ['', Validators.required],
      'href': ['', Validators.required],
    }));
  }

  deleteItem(id: number, itemIndex: number): void {
    this.menuItemsFormArray.removeAt(itemIndex);
    if(id > 0)
      this.idsForDelete.push(id);
  }
}
