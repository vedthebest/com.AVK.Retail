import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';


import { CustomerEndpoint } from './customer-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';
import { Role } from '../models/role.model';
import { Permission, PermissionNames, PermissionValues } from '../models/permission.model';
import { UserEdit } from '../models/user-edit.model';



export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };



@Injectable()
export class CustomerService {

  public static readonly roleAddedOperation: RolesChangedOperation = "add";
  public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
  public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

  private _rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(private router: Router, private http: HttpClient, private authService: AuthService,
    private customerEndpoint: CustomerEndpoint) {

  }

  getCustomer(userId?: string) {
    return this.customerEndpoint.getCustomerEndpoint<Customer>(userId);
  }


  getCustomers(page?: number, pageSize?: number) {

    return this.customerEndpoint.getCustomersEndpoint<Customer[]>(page, pageSize);
  }

  /*getUsersAndRoles(page?: number, pageSize?: number) {

    return forkJoin(
      this.accountEndpoint.getUsersEndpoint<User[]>(page, pageSize),
      this.accountEndpoint.getRolesEndpoint<Role[]>());
  }


  updateUser(user: UserEdit) {
    if (user.id) {
      return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
    }
    else {
      return this.accountEndpoint.getUserByUserNameEndpoint<User>(user.userName).pipe<User>(
        mergeMap(foundUser => {
          user.id = foundUser.id;
          return this.accountEndpoint.getUpdateUserEndpoint(user, user.id)
        }));
    }
  }


  newUser(user: UserEdit) {
    return this.accountEndpoint.getNewUserEndpoint<User>(user);
  }


  getUserPreferences() {
    return this.accountEndpoint.getUserPreferencesEndpoint<string>();
  }

  updateUserPreferences(configuration: string) {
    return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
  }


  deleteUser(userOrUserId: string | UserEdit): Observable<User> {

    if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
      return this.accountEndpoint.getDeleteUserEndpoint<User>(<string>userOrUserId).pipe<User>(
        tap(data => this.onRolesUserCountChanged(data.roles)));
    }
    else {

      if (userOrUserId.id) {
        return this.deleteUser(userOrUserId.id);
      }
      else {
        return this.accountEndpoint.getUserByUserNameEndpoint<User>(userOrUserId.userName).pipe<User>(
          mergeMap(user => this.deleteUser(user.id)));
      }
    }
  }


  unblockUser(userId: string) {
    return this.accountEndpoint.getUnblockUserEndpoint(userId);
  }


  userHasPermission(permissionValue: PermissionValues): boolean {
    return this.permissions.some(p => p == permissionValue);
  }


  refreshLoggedInUser() {
    return this.authService.refreshLogin();
  }
*/

  get permissions(): PermissionValues[] {
    return this.authService.userPermissions;
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
