import { Contact } from "../database.js";

export const listContacts = async () => {
  return await Contact.findAll();
};

export const getContactById = async (contactId) => {
  return await Contact.findByPk(contactId);
};

export const addContact = async ({ name, email, phone }) => {
  return await Contact.create({ name, email, phone });
};

export const removeContact = async (contactId) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContact = async (contactId, data) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (contactId, data) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};
