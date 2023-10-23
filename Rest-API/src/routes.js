import {Router} from "express";
import {libro, persona} from "./controller.js";

export const router = Router()

router.get('/personas', persona.getAll);
router.post('/persona', persona.add);
router.delete('/persona', persona.delete);
router.put('/persona', persona.update);
router.get('/libros', libro.getAll);
router.get('/libro', libro.getOne);
router.post('/libroInsert', libro.insertOne);
router.delete('/libroDelete', libro.deleteOne);
router.put('/libroUpdate', libro.updateOne);