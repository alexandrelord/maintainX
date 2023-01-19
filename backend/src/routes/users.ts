import express from 'express';
import { getUsers } from '../controllers/users/employees';

const router = express.Router();

router.get('/', getUsers);

export = router;
