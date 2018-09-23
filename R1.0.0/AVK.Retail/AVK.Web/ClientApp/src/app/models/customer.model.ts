
export class Customer {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, fullName?: string, email?: string, address?: string, phoneNumber?: string, gender?: string,villageId?:string, orders?: string[]) {

    this.id = id;
    this.fullName = name;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.orders = orders;
    this.gender = gender;
    this.villageId = villageId;
  }


  public id: string;
  public fullName: string;
  public gender: string;
  public email: string;
  public address: string;
  public phoneNumber: string;
  public orders: string[];
  public villageId: string;
}
