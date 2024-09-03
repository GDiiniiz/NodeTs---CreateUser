// router.ts
import { Router } from "express";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/User/get-users/get-users";
import { MongoCreateUserRepository } from "../src/repositories/create-user/mongo-create-user";
import { UpdateUserController } from "./controllers/User/update-user/update-user";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user";
import { MongoDeleteUserRepository } from "../src/repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/User/delete-user/delete-user";
import { MongoGetUserIdRepository } from "../src/repositories/get-user-id/mongo-get-user-id";
import { GetUserIdController } from "./controllers/User/get-user-id/get-user-id";
import { CreateUserController } from "./controllers/User/create-user/create-user";

const router = Router();

//ROUTER USER
router.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();
  res.status(statusCode).send(body);
});

router.get("/user/:id", async (req, res) => {
  const mongoGetUserIdRepository = new MongoGetUserIdRepository();
  const getUserIdController = new GetUserIdController(mongoGetUserIdRepository);

  const { body, statusCode } = await getUserIdController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.post("/user", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});

router.patch("/user/update/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});

router.delete("/user/delete/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  );

  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });
  res.status(statusCode).send(body);
});

//ROUTER ITEM

export default router;
