const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction(argv) {
  const { action, id, name, email, phone } = argv;

  switch (action) {
    case 'list':
      const contactsList = await listContacts();
      console.log('List of contacts:', contactsList);
      break;

    case 'get':
      const contactById = await getContactById(id);
      console.log('Contact by id:', contactById);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log('Added contact:', newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log('Removed contact:', removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);