import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";

export const listContacts = async (owner) => {
  return await Contact.findAll({ where: { owner } });
};

export const getContactById = async (id, owner) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) throw HttpError(404, "Not found");
  return contact;
};

export const removeContact = async (id, owner) => {
  const contact = await getContactById(id, owner);
  await contact.destroy();
  return contact;
};

export const addContact = async (body, owner) => {
  return await Contact.create({ ...body, owner });
};

export const updateContactById = async (id, body, owner) => {
  const contact = await getContactById(id, owner);
  await contact.update(body);
  return contact;
};

export const updateFavorite = async (id, favorite, owner) => {
  const contact = await getContactById(id, owner);
  await contact.update({ favorite });
  return contact;
};
