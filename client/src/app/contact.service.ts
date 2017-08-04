import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Contact } from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  // retrieving ContactService
  getContacts() {
    return this.http.get('http://localhost:3000/api/contact')
      .map((res) => res.json());
  }
  // add contact
  addContact(newContact) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/api/contact', newContact)
      .map(res => res.json());
  }

  // delete contact
  deleteContact(id) {
    return this.http.delete('http://localhost:3000/api/contact/' + id)
      .map(res => res.json());
  }

  //update Contacts

  updateContacts(id, contobj) {
    return this.http.put('http://localhost:3000/api/contact/' + id, contobj)
      .map(res => res.json());
  }
}
