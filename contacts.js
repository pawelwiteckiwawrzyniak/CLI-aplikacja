import fs from "fs/promises";
import process from "process";
import path from "path";

const contactsPath = path.join(process.cwd(), "/db/contacts.json");

export function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}

export function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contact = parsedData.find((contact) => contact.id === contactId);
      console.log(contact);
    })
    .catch((error) => console.log(error.message));
}

export function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const updatedContacts = parsedData.filter(
        (contact) => contact.id !== contactId
      );

      if (parsedData.length === updatedContacts.length) {
        return console.log(
          `None of your contact's id matches with: ${contactId}. Consider adding it to your list.`
        );
      }
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
      console.log(
        `Contact with id: ${contactId} has been succesfully removed!`
      );
    })
    .catch((error) => console.log(error.message));
}

export function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contact = {
        name: name,
        email: email,
        phone: phone,
      };

      if (parsedData.find((element) => element.phone === contact.phone)) {
        return console.log(
          `Contact you're trying to add is already on your list!`
        );
      }
      parsedData.push(contact);
      fs.writeFile(contactsPath, JSON.stringify(parsedData));
      console.log(`Contact succesfully added to your list!`);
    })
    .catch((error) => console.log(error.message));
}
