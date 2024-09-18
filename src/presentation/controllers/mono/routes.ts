import { Router } from "express"
import { MonoCasesController } from "./controller";

export class MonoRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new MonoCasesController();

        // Primero las rutas específicas
        router.get("/last-week", controller.getMonoCasesFromLastWeek);
        
        // Luego las rutas dinámicas
        router.get("/:id", controller.getMonoCaseById);
        router.put("/:id", controller.updateMonoCase);
        router.delete("/:id", controller.deleteMonoCase);

        // Finalmente, las rutas generales
        router.get("/", controller.getMonoCase);
        router.post("/", controller.createMonoCase);


        return router;
    }
}