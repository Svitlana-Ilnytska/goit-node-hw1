const fs = require('fs/promises');
const path = require('path');


const contactsPath = path.join(__dirname, 'db', 'contacts.json');


async function readContactsFile() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
     return [];
  }
}

async function writeContactsFile(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const contacts = await readContactsFile();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContactsFile();
  return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await readContactsFile();
  const contactToRemove = contacts.find(contact => contact.id === contactId);

  if (!contactToRemove) {
    return null;
  }

  const updatedContacts = contacts.filter(contact => contact.id !== contactId);
  await writeContactsFile(updatedContacts);
  return contactToRemove;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: Date.now().toString(), 
    name,
    email,
    phone,
  };

  const contacts = await readContactsFile();
  contacts.push(newContact);
  await writeContactsFile(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};