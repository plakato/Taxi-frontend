import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  phoneForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]]
    });
  }

  sendCode() {
    if (this.phoneForm.valid) {
      let phone = this.phoneForm.get('phone').value;
      if (phone[0] !== '+') {
        phone = '+420' + phone;
      }
      // Open dialog.
      this.authService.forgotPassword(phone).subscribe();
    }
  }
}
