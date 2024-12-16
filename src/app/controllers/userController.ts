import { Router } from 'express';
import { auth, authAdmin } from '../middlewares/authMiddleware.ts';
import { CreateUser } from '../useCases/users/CreateUser.ts';
import { GetAllUsers } from '../useCases/users/GetAllUsers.ts';
import { GetUserById } from '../useCases/users/GetUserById.ts';
import { RemoveUser } from '../useCases/users/RemoveUser.ts';
import { UpdateUser } from '../useCases/users/UpdateUser.ts';

export const usersRouter = Router();

usersRouter.get('/users', authAdmin, GetAllUsers);

usersRouter.post('/users', CreateUser);

usersRouter.get('/users/:id', auth, GetUserById);

usersRouter.put('/users/:id', auth, UpdateUser);

usersRouter.delete('/users/:id', auth, RemoveUser);
