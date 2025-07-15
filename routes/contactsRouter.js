import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContactById,
  updateFavorite,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(contactAddSchema), createContact);

contactsRouter.put("/:id", validateBody(contactUpdateSchema), updateContactById);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  updateFavorite
);

export default contactsRouter;
