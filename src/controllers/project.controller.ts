import { Request, Response } from "express";
import HttpStatus from 'http-status-codes';

import { ProjectService } from "../services/project.service";
import { formatedDate, getZipCodeInfo } from "../utils/data/functions/functions";

const projectService = new ProjectService()

export class ProjectController {
  async create(req: Request, res: Response) {
    const { title, zip_code, cost, deadline, username } = req.body;

    const projectsByUsername = await projectService.findProjectByUsername(username);

    if(projectsByUsername) {
      const { title: projectTitle } = projectsByUsername;

      if(title === projectTitle) {
        return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'A user project with this title already exist!' });
      }
    }

    const newProject = await projectService.createProject({
      title,
      zip_code,
      cost,
      done: false,
      deadline: formatedDate(deadline),
      username,
    });

    return res.status(HttpStatus.OK).json(newProject);
  }

  async getProjectsByUsername(req: Request, res: Response) {
    const { username } = req.headers;

    const projectsByUserName = await projectService.findProjectByUsername(username as string)

    if(!projectsByUserName) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'No project was found!' });
    }

    return res.status(HttpStatus.OK).json(projectsByUserName);
  }

  async getProjectById(req: Request, res: Response) {
    const { id } = req.params;

    const projectsById = await projectService.findProjectById(id)

    if(!projectsById) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'No project was found!' });
    }

    const { zip_code, ...projectInfo } = projectsById;

    return res.status(HttpStatus.OK).json({
      ...projectInfo,
      localização: await getZipCodeInfo(zip_code)
    });
  }

  async updateProject(req: Request, res: Response) {
    const { id } = req.params;

    const { title, zip_code, cost, deadline } = req.body;

    const update = await projectService.updateProject(
      id,
      {
        title,
        zip_code,
        cost,
        deadline: formatedDate(deadline),
      }
    )

    if(!update) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No project has been updated.' });

    return res.status(HttpStatus.OK).json({ message: 'Successfully updated project.' });
  }

  async updateProjectToCompletedTrue(req: Request, res: Response) {
    const { username } = req.headers;
    const { id } = req.params;

    const projectsByUsername = await projectService.findAllProjectByUsername(username as string);

    const findProjectById = projectsByUsername?.find((project: { id: string }) => project.id === id)

    if(!projectsByUsername || !findProjectById) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'No project was found!' });
    }

    const { done, ...projectInfo } = findProjectById;

    return res.status(HttpStatus.OK).json({
      ...projectInfo,
      done: true,
    });
  }

  async deleteProject(req: Request, res: Response) {
    const { id } = req.params;

    const targetDelete = await projectService.deleteProject(id)

    const { affected } = targetDelete;

    if(!affected) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No project has been deleted.' });

    return res.status(HttpStatus.OK).json({ message: 'Successfully deleted project.' });
  }
}
