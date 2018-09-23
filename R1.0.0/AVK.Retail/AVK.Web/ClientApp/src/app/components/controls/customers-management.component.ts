import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from "../../services/app-translation.service";
import { CustomerService } from "../../services/customer.service";
import { Utilities } from "../../services/utilities";
import { User } from '../../models/user.model';
import { Customer } from '../../models/customer.model';
import { Role } from '../../models/role.model';
import { Permission } from '../../models/permission.model';
import { UserEdit } from '../../models/user-edit.model';
import { UserInfoComponent } from "./user-info.component";


@Component({
    selector: 'customers-management',
  templateUrl: './customers-management.component.html',
    styleUrls: ['./users-management.component.css']
})
export class CustomersManagementComponent implements OnInit, AfterViewInit {
    columns: any[] = [];
  rows: Customer[] = [];
  rowsCache: Customer[] = [];
    editedUser: UserEdit;
    sourceUser: UserEdit;
    editingUserName: { name: string };
    loadingIndicator: boolean;

    allRoles: Role[] = [];


    @ViewChild('indexTemplate')
    indexTemplate: TemplateRef<any>;

    @ViewChild('userNameTemplate')
    userNameTemplate: TemplateRef<any>;

    @ViewChild('rolesTemplate')
    rolesTemplate: TemplateRef<any>;

    @ViewChild('actionsTemplate')
    actionsTemplate: TemplateRef<any>;

    @ViewChild('editorModal')
    editorModal: ModalDirective;

    @ViewChild('userEditor')
    userEditor: UserInfoComponent;

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private customerService: CustomerService) {
    }


    ngOnInit() {
      
     
        let gT = (key: string) => this.translationService.getTranslation(key);

        this.columns = [
          { prop: "index", name: '#', width: 40, cellTemplate: this.indexTemplate, canAutoResize: false },
          { prop: 'name', name: gT('customers.management.FullName'), width: 120 },
          { prop: 'gender', name: gT('customers.management.Gender'), width: 50 },
          { prop: 'phoneNumber', name: gT('customers.management.PhoneNumber'), width: 100 },
          { prop: 'address', name: gT('customers.management.Address'), width: 100 },
          { prop: 'villageId', name: gT('customers.management.City'), width: 90, cellTemplate: this.userNameTemplate },
          { prop: 'email', name: gT('customers.management.Email'), width: 140 }          
        ];
      this.loadData()
        /*if (this.canManageUsers)
            this.columns.push({ name: '', width: 130, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false });

        ;*/
    }


    ngAfterViewInit() {

        /*this.userEditor.changesSavedCallback = () => {
            this.addNewUserToList();
            this.editorModal.hide();
        };

        this.userEditor.changesCancelledCallback = () => {
            this.editedUser = null;
            this.sourceUser = null;
            this.editorModal.hide();
        };*/
    }

  /*
    addNewUserToList() {
        if (this.sourceUser) {
            Object.assign(this.sourceUser, this.editedUser);

            let sourceIndex = this.rowsCache.indexOf(this.sourceUser, 0);
            if (sourceIndex > -1)
                Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);

            sourceIndex = this.rows.indexOf(this.sourceUser, 0);
            if (sourceIndex > -1)
                Utilities.moveArrayItem(this.rows, sourceIndex, 0);

            this.editedUser = null;
            this.sourceUser = null;
        }
        else {
            let user = new User();
            Object.assign(user, this.editedUser);
            this.editedUser = null;

            let maxIndex = 0;
            for (let u of this.rowsCache) {
                if ((<any>u).index > maxIndex)
                    maxIndex = (<any>u).index;
            }

            (<any>user).index = maxIndex + 1;

            this.rowsCache.splice(0, 0, user);
            this.rows.splice(0, 0, user);
            this.rows = [...this.rows];
        }
    }
    */

    loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

      this.customerService.getCustomers().
        subscribe(results => this.onDataLoadSuccessful(results),
          error => this.onDataLoadFailed(error));
       
    }
  
    onDataLoadSuccessful(customers: Customer[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

      customers.forEach((user, index, customers) => {
            (<any>user).index = index + 1;
        });

      this.rowsCache = [...customers];
      this.rows = customers;

    }


    onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Load Error", `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
  }

  /*

    onSearchChanged(value: string) {
        this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.userName, r.fullName, r.email, r.phoneNumber, r.jobTitle, r.roles));
    }

    onEditorModalHidden() {
        this.editingUserName = null;
        this.userEditor.resetForm(true);
    }


    newUser() {
        this.editingUserName = null;
        this.sourceUser = null;
        this.editedUser = this.userEditor.newUser(this.allRoles);
        this.editorModal.show();
    }


    editUser(row: UserEdit) {
        this.editingUserName = { name: row.userName };
        this.sourceUser = row;
        this.editedUser = this.userEditor.editUser(row, this.allRoles);
        this.editorModal.show();
    }*/

/*

    deleteUser(row: UserEdit) {
        this.alertService.showDialog('Are you sure you want to delete \"' + row.userName + '\"?', DialogType.confirm, () => this.deleteUserHelper(row));
    }


    deleteUserHelper(row: UserEdit) {

        this.alertService.startLoadingMessage("Deleting...");
        this.loadingIndicator = true;

        this.accountService.deleteUser(row)
            .subscribe(results => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.rowsCache = this.rowsCache.filter(item => item !== row)
                this.rows = this.rows.filter(item => item !== row)
            },
            error => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.alertService.showStickyMessage("Delete Error", `An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                    MessageSeverity.error, error);
            });
    }



    get canAssignRoles() {
        return this.accountService.userHasPermission(Permission.assignRolesPermission);
    }

    get canViewRoles() {
        return this.accountService.userHasPermission(Permission.viewRolesPermission)
    }

    get canManageUsers() {
        return this.accountService.userHasPermission(Permission.manageUsersPermission);
    }*/
}
