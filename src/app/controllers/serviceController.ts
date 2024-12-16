import { Router } from 'express';
import { auth, authAdmin } from '../middlewares/authMiddleware.ts';
import { CreateService } from '../useCases/services/CreateService.ts';
import { GetAllServices } from '../useCases/services/GetAllServices.ts';
import { GetServiceById } from '../useCases/services/GetServiceById.ts';
import { RemoveService } from '../useCases/services/RemoveService.ts';
import { UpdateService } from '../useCases/services/UpdateService.ts';

export const servicesRouter = Router();

servicesRouter.get('/services', auth, GetAllServices);

servicesRouter.post('/services', authAdmin, CreateService);

servicesRouter.get('/services/:id', authAdmin, GetServiceById);

servicesRouter.put('/services/:id', authAdmin, UpdateService);

servicesRouter.delete('/services/:id', authAdmin, RemoveService);
