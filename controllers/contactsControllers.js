import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({
      where: { owner: req.user.id },
    });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ where: { id, owner: req.user.id } });
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ where: { id, owner: req.user.id } });
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    await contact.destroy();
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, owner: req.user.id });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ where: { id, owner: req.user.id } });
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    await contact.update(req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined) {
      throw HttpError(400, "Missing field favorite");
    }
    const contact = await Contact.findOne({ where: { id, owner: req.user.id } });
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    await contact.update({ favorite });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
