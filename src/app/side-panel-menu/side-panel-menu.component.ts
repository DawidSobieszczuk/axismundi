import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../services/data/menu.service';

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

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'menu-items': this.formBuilder.array([])
    });
   
    this.menuService.getAll().forEach((element: {id: any, menu_id: any, name: any, href: any}) => {
      this._menuId = element.menu_id;
      this.menuItemsFormArray.push(this.formBuilder.group({
        'id': [element.id],
        'name': [element.name, Validators.required],
        'href': [element.href, Validators.required],
      }))
    });
  }

  formSubmit(): void {
    this.idsForDelete.forEach(element => {
      this.menuService.delete(element);
    });

    this.idsForDelete = [];

    this.menuItemsFormArray.value.forEach((element: {id: any, name: any, href: any}, index: any) => {
      var data = {
        'menu_id': this._menuId,
        'name': element.name,
        'href': element.href,
      };

      if(element.id > 0) { // update
       this.menuService.set(element.id, data);
      } else { // create
       this.menuService.add(data)
      }
    });

    this.menuService.saveAll();
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
