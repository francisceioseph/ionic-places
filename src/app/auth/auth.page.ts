import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.showLoginModal();
  }

  private showLoginModal() {
    this.loadingCtrl
      .create({
        spinner: 'dots',
        message: 'Logging in...'
      })
      .then(loader => {
        loader.present();
        this.authService.login();

        setTimeout(() => {
          this.router.navigateByUrl('/places/tabs/discover');
          loader.dismiss();
        }, 2500);
      });

  }
}
