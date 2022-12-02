import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import auth from "../middlewares/auth";
import { checkJwt } from "../middlewares/checkJwt";

const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.use(checkJwt);

projectRoutes.post("/project", checkJwt, projectController.create);
projectRoutes.get("/projects", projectController.getProjectsByUsername);
projectRoutes.get("/project/:id", projectController.getProjectById);
projectRoutes.patch("/projects/:id/done", projectController.updateProjectToCompletedTrue);
projectRoutes.put("/projects/:id", projectController.updateProject);
projectRoutes.delete("/project/:id", projectController.deleteProject);

export default projectRoutes;
