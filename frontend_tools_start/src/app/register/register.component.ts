import { Component, TemplateRef, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ NgbDatepickerModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  usernameFC = new FormControl('', [Validators.required]);
  passwordFC = new FormControl('', [Validators.required, Validators.minLength(12)]);
  emailFC = new FormControl('', [Validators.required, Validators.email]);
  roleFC = new FormControl('', [Validators.required]);

  bs = inject(BackendService);
  router = inject(Router);
  private modalService = inject(NgbModal);
  closeResult = '';

  formValid() {
    return this.usernameFC.valid || this.passwordFC.valid || this.emailFC.valid || this.roleFC.valid;
  }

  register(content: TemplateRef<any>): void {
    if(!this.formValid()) {
      let user = {
        id: 0,
        username: this.usernameFC.value!,
        password: this.passwordFC.value!,
        email: this.emailFC.value!,
        role: this.roleFC.value!
      };

      this.bs.registerUser(user).subscribe({
        next: (response) => console.log('response', response),
        error: (err) => console.log(err),
        complete: () => console.log('user created')
      });

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.router.navigate(['/login']);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );

      console.log('new user', user);
    } else {
      console.warn('form still invalid!')
    }
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
