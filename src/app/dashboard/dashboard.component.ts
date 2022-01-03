import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue: FormGroup;
  resModelObj: RestaurantData = new RestaurantData;
  showAdd:boolean;
  showUpdate:boolean;
  allRestaurant

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    });

    this.getRestaurant();
  }

  clickAddRes(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addRestaurant() {
    this.resModelObj.name = this.formValue.value.name;
    this.resModelObj.email = this.formValue.value.email;
    this.resModelObj.mobile = this.formValue.value.mobile;
    this.resModelObj.address = this.formValue.value.address;
    this.resModelObj.service = this.formValue.value.service;

    this.api.postRestaurant(this.resModelObj).subscribe((res) => {
      console.log(res);
      alert('Reataurant Added Successfully');
      this.formValue.reset();
      this.getRestaurant();
    },
      error => { alert('Something is wrong') }
    )
  }

  getRestaurant() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurant = res;
    })
  }

  deleteRes(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert('Restaurant Record Deleted Successfully');
      this.getRestaurant();
    })
  }

  onEditRes(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.resModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }

  updateRestaurant() {
    this.resModelObj.name = this.formValue.value.name;
    this.resModelObj.email = this.formValue.value.email;
    this.resModelObj.mobile = this.formValue.value.mobile;
    this.resModelObj.address = this.formValue.value.address;
    this.resModelObj.service = this.formValue.value.service;

    this.api.updateRestaurant(this.resModelObj, this.resModelObj.id).subscribe(res => {
      this.getRestaurant();
      this.formValue.reset();
      alert('Updated Successfullu');
    })
  }
}
