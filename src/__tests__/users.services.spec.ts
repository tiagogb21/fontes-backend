import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { UserService } from "../services/user.service";
import { userOne, userTwo } from "./mock/user";

const userService = new UserService();

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
    const result = await userService.createUser(userOne);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("username");
    expect(result).toHaveProperty("password");

    expect(result.name).toBe(userOne.name)
    expect(result.username).toBe(userOne.username);
    expect(result.password).not.toBe(userOne.password);
  });

  it("Should not be able to create an user with the same username", async () => {
    expect(async () => {
      const result = await userService.createUser(userOne);
      return result;
    }).rejects.toThrow("Username unavailable");
  });
});
