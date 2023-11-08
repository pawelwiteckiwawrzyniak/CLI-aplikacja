const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contact = parsedData.find((contact) => contact.id == contactId);
      console.log(contact);
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const updatedContacts = parsedData.filter(
        (contact) => contact.id !== contactId
      );

      if (parsedData.length == updatedContacts.length) {
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

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contact = {
        name: name,
        email: email,
        phone: phone,
      };

      if (parsedData.find((element) => element.phone == contact.phone)) {
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
