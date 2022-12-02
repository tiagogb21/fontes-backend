import { DeepPartial, FindManyOptions } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Project } from '../entities/project.entity';

const projectRepository = AppDataSource.getRepository(Project);

export class ProjectService {
  createProject(input: DeepPartial<Project>) {
    const newProject = projectRepository.create(input)
    return projectRepository.save(newProject);
  };

  async findProjectById(projectId: string) {
    return await projectRepository.findOneBy({ id: projectId });
  };

  async findProjectByUsername(query: string) {
    return await projectRepository.findOneBy({ username: query });
  };

  async findAllProjectByUsername(username: string) {
    return await projectRepository.findBy({ username });
  };

  async updateProject(projectId: string, input: DeepPartial<Project>) {
    return projectRepository.update(projectId, input);
  }

  async deleteProject(projectId: string) {
    return projectRepository.delete(projectId);
  }
}
