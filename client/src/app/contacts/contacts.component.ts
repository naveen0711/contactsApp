import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact'
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: String;
  last_name: String;
  phone: string;
  new_first_name: String;
  new_last_name: String;
  new_phone: string;
  new_id: string;
  constructor(private contactService: ContactService) { }
  addContact() {
    console.log('add contact');
    const newcontact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newcontact)
      .subscribe(contact => {
        this.contacts.push(contact);
        this.ngOnInit();
      });
    console.log('Contact added to db');
  }
  //delete contacts
  deleteContact(id) {
    console.log(id);
    let contacts = this.contacts;
    //let n = 1;
    this.contactService.deleteContact(id)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i = 0; i < contacts.length; i++) {
            if (contacts[i]._id === id) {
              contacts.splice(i, 1);
            }
          }
        }
        console.log(data);
        this.ngOnInit();
      });
  }
  ngOnInit() {
    this.contactService.getContacts()
      .subscribe((contacts) => {
        this.contacts = contacts
      });
  }
  //Edit movies
  EditContacts(cont: any) {
    console.log('Editing contacts');
    console.log(cont);
    this.new_first_name = cont.first_name;
    this.new_last_name = cont.last_name;
    this.new_phone = cont.phone;
    this.new_id = cont._id;
  }
  //update
  update() {
    console.log(this.new_id);
    let contobj = {
      "_id": this.new_id,
      "first_name": this.new_first_name,
      "last_name": this.new_last_name,
      "phone": this.new_phone
    }
    this.contactService.updateContacts(this.new_id, contobj)
      .subscribe(data => {
        console.log(data);
        this.ngOnInit();
      });
  }
}
