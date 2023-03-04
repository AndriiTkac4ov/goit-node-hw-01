const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts');

listContacts();

console.log(process.argv);