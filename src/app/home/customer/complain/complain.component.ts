import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ComplainService } from 'src/app/_services/complain.service';

interface options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.scss']
})
export class ComplainComponent implements OnInit {
  salepointId: number;
  customerId:number;
  today= new Date();
  createdTime = '';
  complainForm: FormGroup;
  selected= 'BadQuality';
  description='';
  subjects: options[] = [
    // {value: 'select...', viewValue: 'Steak'},
    {value: 'BadQuality', viewValue: 'Bad Quality'},
    {value: 'LateDelivery', viewValue: 'Late Delivery'},
    {value: 'MisBehave', viewValue: 'Mis Behave'},
    {value: 'Fraud', viewValue: 'Fraud'},
    {value: 'Other', viewValue: 'Other'}
  ];

  // constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private _employeeservice: EmployeeService, private _salePointService: SalepointService) { }
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private _complainservice: ComplainService) { }

  ngOnInit(): void {
    this.salepointId = parseInt(this.route.snapshot.paramMap.get('salepointId'));
    this.customerId = parseInt(this.route.snapshot.paramMap.get('customerId'));
    this.createdTime =formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');


  this.complainForm = this.fb.group({
    createdAt: [this.createdTime],
    description: [this.description],
    subject: [this.selected],
    salePointId: [this.salepointId],
    customerId: [this.customerId],
  })
  
    
  
  }

  submitComplain(){
      this.complainForm.controls["subject"].setValue(this.selected);
    console.log(this.selected);
    console.log(this.complainForm.value);
    this._complainservice.addComplain(this.complainForm.value);
  }



}
