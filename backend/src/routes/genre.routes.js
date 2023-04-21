import {Router} from 'express';
import { creategenres, getgenres, getOnegenres, updategenres, deletegenres } from '../controllers/genre.controller.js';
import apicache from 'apicache';

const router = Router();
const cache = apicache.middleware;
router.post('/', creategenres);
router.get('/', cache('2 minutes'), getgenres);
router.get('/:id', cache('2 minutes'), getOnegenres);
router.put('/:id', updategenres);
router.delete('/:id', deletegenres);

export default router;