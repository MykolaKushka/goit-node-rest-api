import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateFavorite,
} from "../services/contactsServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await listContacts(owner);
  res.json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await getContactById(id, owner);
  res.json(contact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await removeContact(id, owner);
  res.json(contact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const { id: owner } = req.user;
  const newContact = await addContact(req.body, owner);
  res.status(201).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const updatedContact = await updateContactById(id, req.body, owner);
  res.json(updatedContact);
});

export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const { favorite } = req.body;
  const updatedContact = await updateFavorite(id, favorite, owner);
  res.json(updatedContact);
});
