import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../userService/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  signupForm: FormGroup;
  
  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      
      this.userService.addUser(this.signupForm.value).subscribe(response=>{
        console.log(response);
        
       
        
      })
    } else {
      console.log('Form is invalid')
    }
    this.markAllAsTouched();
  }

  private markAllAsTouched(): void {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      if (control) {
        control.markAsUntouched();
      }
    });
  }

}
