import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import auth from "../middlewares/auth.js";
import {
  contactAddSchema,
  updateFavoriteSchema
} from "../schemas/contactsSchemas.js";

const router = express.Router();

router.use(auth);

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", validateBody(contactAddSchema), createContact);
router.delete("/:id", deleteContact);
router.put("/:id", validateBody(contactAddSchema), updateContact);
router.patch("/:id/favorite", validateBody(updateFavoriteSchema), updateStatusContact);

export default router;
