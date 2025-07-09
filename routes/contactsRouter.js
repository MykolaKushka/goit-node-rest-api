import express from "express";
import {
  getAllContacts,
  getContactByIdCtrl,
  deleteContact,
  createContact,
  updateContactById,
} from "../controllers/contactsControllers.js";

import {
  addContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getContactByIdCtrl);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(addContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContactById);

export default contactsRouter;
