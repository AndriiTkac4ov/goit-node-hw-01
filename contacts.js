const fs = require('fs').promises;
const path = require('path');
const colors = require('colors/safe');

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const listContacts = JSON.parse(data);
  
    // console.table(listContacts);

    return listContacts;
  } catch (error) {
    console.log(colors.brightRed(error.name));
    console.log(colors.brightRed(error.message));
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactById = JSON.parse(data).find(contact => contact.id === String(contactId));
    if (!contactById) {
      console.log(colors.brightMagenta('Sorry, but this contact does not exist.'));
      return;
    }

    // console.log(colors.brightYellow(contactById));

    return contactById;
  } catch (error) {
    console.log(colors.brightRed(error.name));
    console.log(colors.brightRed(error.message));
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactById = JSON.parse(data).find(contact => contact.id === String(contactId));
    if (!contactById) {
        console.log(colors.brightMagenta('Sorry, but this contact does not exist.'));
        return;
    };
    
    const newContactsList = JSON.parse(data).filter(contact => contact.id !== String(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), 'utf8');

    console.log(colors.brightGreen('The contact was removed successful.'));
    return;
  } catch (error) {
    console.log(colors.brightRed(error.name));
    console.log(colors.brightRed(error.message));
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const listContacts = JSON.parse(data);

    const newContact = {
      id: String(listContacts.length + 1),
      name,
      email,
      phone,
    };

    const contactByName = JSON.parse(data).find(contact => contact.name === name);
    const contactByEmail = JSON.parse(data).find(contact => contact.email === email);
    const contactByPhone = JSON.parse(data).find(contact => contact.phone === phone);

    if (contactByName && contactByEmail && contactByPhone) {
        console.log(colors.brightMagenta('Attention, this contact has already existed.'));
        return;
    };
    
    listContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(listContacts), 'utf8');

    console.log(colors.brightGreen('The new contact was added successful.'));
    return;
  } catch (error) {
    console.log(colors.brightRed(error.name));
    console.log(colors.brightRed(error.message));
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}