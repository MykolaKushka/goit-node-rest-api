import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import auth from "../middlewares/auth.js";
import validateBody from "../middlewares/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(auth);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(contactAddSchema), createContact);

contactsRouter.put("/:id", validateBody(contactUpdateSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
