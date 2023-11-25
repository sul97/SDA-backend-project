import { Router } from 'express'
import { createSingleOrder, getAllOrders } from '../controllers/orderControllers';

const orderRoutes = Router();

orderRoutes.get("/", getAllOrders);
orderRoutes.post("/", createSingleOrder);
//orderRoutes.get("/:slug", );
//orderRoutes.put("/:slug", );
//orderRoutes.delete("/:slug", );

export default orderRoutes;
