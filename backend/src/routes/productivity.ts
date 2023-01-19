import express from 'express';
import { getInactiveUsers } from '../controllers/productivity/productivity';

const router = express.Router();

router.get('/', getInactiveUsers);

export = router;
