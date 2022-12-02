import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProjectService } from "../services/project.service";
import { projectOne } from "./mock/project";

const projectService = new ProjectService();

describe("Testing user services", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to create an user account with the correct info", async () => {
    const result = await projectService.createProject(projectOne);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("zip_code");
    expect(result).toHaveProperty("cost");
    expect(result).toHaveProperty("done");
    expect(result).toHaveProperty("deadline");
    expect(result).toHaveProperty("username");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");

    expect(result.title).toBe(projectOne.title)
    expect(result.zip_code).toBe(projectOne.zip_code);
    expect(result.cost).toBe(projectOne.cost);
    expect(result.done).toBe(false);
    expect(result.username).toBe(projectOne.username);
  });

  it("Should not be able to create a project with the same username", async () => {
    expect(async () => {
      const result = await projectService.createProject(projectOne);
      return result;
    }).rejects.toThrow("Username unavailable");
  });
});
