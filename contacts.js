const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('db/contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        }
        
        console.log(data);
    })
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}