import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { updatePasswordRequest, userDeleteRequest, userRequest, userUpdateRequest } from 'src/app/interfaces/user';
import { RolesService } from 'src/app/services/roles.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss'],
})
export class UserCrudComponent implements OnInit, OnDestroy {

  getUsersData: any;
  getRolesData: any;
  password: string = "*****";
  updatePasswordForm: FormGroup;
  updateUserForm: FormGroup;
  createUserForm: FormGroup;
  selectedUserName!: string;
  loading = false;
  updatingUser = false;
  deletingUser = false;
  updateSuccess = false;
  updateError = false;
  deleteSuccess = false;
  deleteError = false;
  userName = '';
  status: number = 0;
  userPassword = '';
  filteredUsersData: any;
  searchInput = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private userService: UserService,
    private serviceLogin: LoginService,
    private rolesService: RolesService,
  ) {
    this.updatePasswordForm = new FormGroup({
      user: new FormControl(''),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,16}$/), Validators.maxLength(16), Validators.minLength(4)]),
      confirmNewPassword: new FormControl('', [Validators.required]),
      searchInput: new FormControl('')
    });
    this.createUserForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,16}$/), Validators.maxLength(16), Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
    });
    this.updateUserForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();

    this.dtOptions = {
      pagingType: 'full_number',
      pageLength: 4,
      lengthMenu: [5, 10, 25],
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getUsers() {
    const data = {
      type: 7,
    };
    this.userService.getUsers(data).subscribe(response => {
      this.getUsersData = response.body;
      this.filteredUsersData = this.getUsersData;
      this.dtTrigger.next(response);
      console.log(response);
    });
  }

  getRoles() {
    const data = {
      type: 13
    }
    this.rolesService.getRole(data).subscribe(response => {
      this.getRolesData = response.body.filter((role: {
        status: number; premissions: string | any[]; 
    }) => 
      role.premissions && role.premissions.length > 0 && role.status === 1)
     
    })
  }

  setSelectedUserName(user: string) {
    this.userName = user;
  }

  setSelectedUserNameStatus(user: string, status: number) {
    this.userName = user;
    this.status = status == 1 ? 0 : 1;
  }

  passwordMatch(): boolean {
    const password = this.createUserForm.value.password;
    const confirmPassword = this.createUserForm.value.confirmPassword;
    return password === confirmPassword;
  }

  isFormValid(): boolean {
    return this.createUserForm.valid && this.passwordMatch();
  }

  updateFormValid(): boolean {
    return this.updatePasswordForm.valid && this.newPasswordMatch();
  }

  newPasswordMatch(): boolean {
    const password = this.updatePasswordForm.value.newPassword;
    const confirmPassword = this.updatePasswordForm.value.confirmNewPassword;
    return password === confirmPassword;
  }

  createUsers() {
    const data: userRequest = {
      type: 3,
      params: {
        first_name: this.createUserForm.value.first_name,
        last_name: this.createUserForm.value.last_name,
        role_id: parseInt(this.createUserForm.value.role_id),
        password: this.createUserForm.value.password
      }
    }

    this.userService.createUser(data).subscribe((res) => {
      if (res.statusCode === 200) {
        console.log(res);
        this.createUserForm.reset();
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        console.error(res);
        this.createUserForm.reset();
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    })
  }

  updateUsers() {
    const data: userUpdateRequest = {
      type: 5,
      params: {
        user: this.userName,
        first_name: this.updateUserForm.value.first_name,
        last_name: this.updateUserForm.value.last_name,
        role_id: parseInt(this.updateUserForm.value.role_id),
      }
    }

    this.userService.updateUser(data).subscribe((res) => {
      if (res.statusCode === 200) {
        console.log(res);
        this.createUserForm.reset();
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        console.error(res);
        this.createUserForm.reset();
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    })
  }

  updatePassword() {
    this.updatingUser = true;
    this.loading = true;

    const data: updatePasswordRequest = {
      type: 8,
      params: {
        user: this.userName,
        password: this.updatePasswordForm.value.newPassword
      }
    };

    this.userService.updatePassword(data).subscribe(response => {
      console.log(response);
      this.updatingUser = false;
      this.loading = false;
      if (response.statusCode === 200) {
        this.updateSuccess = true;;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 3000);
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        this.updateError = true;
        setTimeout(() => {
          this.updateError = false;
        }, 3000);
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  }


  // Ajustar consulta
  changeUserStatus() {
    const data: userDeleteRequest = {
      type: 6,
      params: {
        user: this.userName,
        status: this.status
      }
    };

    this.userService.deleteUser(data).subscribe(response => {
      if (response.statusCode === 200) {
        console.log(response);
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        console.error(response);
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  }


  logout() {
    this.serviceLogin.logout()

  }

  resetForm(formulario: FormGroup) {
    formulario.reset();
  }

}


