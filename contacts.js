import path from "path";
import * as fs from "fs/promises";
const contactsPath = path.resolve("db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
};

// provides the entire contact by id
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const dataArray = JSON.parse(data);
    dataArray.find((contact) => {
      if (contact.id === contactId) {
        console.log(contact);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// remove contact
const removeContact = async (contactId) => {
  try {
    let newArray = [];
    const data = await fs.readFile(contactsPath, "utf8");
    const dataArray = JSON.parse(data);
    dataArray.map((contact) => {
      if (contact.id !== contactId) {
        newArray = [...newArray, contact];
      }
      return newArray;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newArray), "utf8");
    const newData = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(newData));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const arrayData = JSON.parse(data);
    const newId = Number(arrayData[arrayData.length - 1].id);
    const newContact = {
      id: String(newId + 1),
      name,
      email,
      phone,
    };
    const newArray = [...arrayData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newArray), "utf8");
    const newData = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(newData));
  } catch (error) {
    console.log(error);
  }
};

export { listContacts, getContactById, removeContact, addContact };
