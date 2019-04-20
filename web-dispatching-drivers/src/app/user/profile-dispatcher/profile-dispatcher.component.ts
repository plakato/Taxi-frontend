import { Component, OnInit } from '@angular/core';
import { User } from '../user.module';
import { UserService } from '../shared/user.service';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';


@Component({
  selector: 'app-profile-dispatcher',
  templateUrl: './profile-dispatcher.component.html',
  styleUrls: ['./profile-dispatcher.component.scss']
})
export class ProfileDispatcherComponent implements OnInit {
  user: User;
  passwordForm: FormGroup;
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar ) { }

  ngOnInit() {
    // Get user's info
    const userStored = JSON.parse(localStorage.getItem('currentUser'));
    const userID = userStored.id;
    this.userService.getUser(userID).subscribe(
      user => { this.user = user; }
    );
    // Initialize form for password change.
    this.passwordForm = this.fb.group({
      password: [''],
      passwordConfirm: ['']
    });
  }

  changePassword() {
    if (!this.passwordForm.valid) {
      this.snackbar.open('Zadejte prosím validní heslo.', 'OK', {duration: 2000});
      return;
    }
    this.authService.updatePassword(this.user.id, this.passwordForm.controls.password.value).subscribe(
      data => { this.snackbar.open('Vaše nové heslo bylo úspešně zaznamenáno :)', '', {duration: 2000});
                this.passwordForm.reset(); }
    );
  }

  /** Clears input so a different image can be loaded. */
  clearInput(elem: HTMLInputElement) {
    elem.value = null;
  }

  onImageLoad(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImage = reader.result;
        // Send image to server.
        this.userService.updateImage(this.user.id, newImage).subscribe(
          data => this.user = data,
          err => this.snackbar.open('Obrázok sa nepodarilo nahrať :(', '', {duration: 2000})
        );
      };
    }
  }
}
