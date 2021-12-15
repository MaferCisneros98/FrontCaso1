import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service'
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { usuarioService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  nombreUsuario: FormControl = new FormControl('')
  email: FormControl = new FormControl('')

  nuevoUsuario: NuevoUsuario;
  password: string;
  rol: string[];
  errMsj: string;
  isLogged = false;

  constructor(private serv:usuarioService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  users: NuevoUsuario[] = [];
  ngOnInit() {
    this.getUsers();
   }

  getUsers(){
    this.serv.lista().subscribe( response => {
      console.log(response)
      return this.users =response})
  }

  onRegister(): void {
    //this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    console.log(this.nuevoUsuario);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/users']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  


}