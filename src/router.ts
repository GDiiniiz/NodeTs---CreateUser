// router.ts
import { Router } from "express";
import { CreateItemController } from "./controllers/Item/create-item/create-item";
import { GetItemUserController } from "./controllers/Item/get-item-user/get-item-user";
import { CreateUserController } from "./controllers/User/create-user/create-user";
import { DeleteUserController } from "./controllers/User/delete-user/delete-user";
import { GetUserIdController } from "./controllers/User/get-user-id/get-user-id";
import { GetUsersController } from "./controllers/User/get-users/get-users";
import { UpdateUserController } from "./controllers/User/update-user/update-user";
import { MongoCreateItemRepository } from "./repositories/Item/create-item/mongo-create-item";
import { MongoGetItemUser } from "./repositories/Item/get-item-user/mongo-get-item-user";
import { MongoCreateUserRepository } from "./repositories/User/create-user/mongo-create-user";
import { MongoDeleteUserRepository } from "./repositories/User/delete-user/mongo-delete-user";
import { MongoUserRepository } from "./repositories/User/find-by-id/mongo-find-by-id";
import { MongoGetUserIdRepository } from "./repositories/User/get-user-id/mongo-get-user-id";
import { MongoGetUsersRepository } from "./repositories/User/get-users/mongo-get-users";
import { MongoUpdateUserRepository } from "./repositories/User/update-user/mongo-update-user";

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
router.post("/item/create/:userId", async (req, res) => {
  const mongoCreateItemRepository = new MongoCreateItemRepository()
  const mongoUserRepository = new MongoUserRepository();

  const createItemController = new CreateItemController(
    mongoCreateItemRepository,
    mongoUserRepository
  );
  const {body, statusCode} = await createItemController.handle({
    params: req.params,
    body: req.body
  })
  res.status(statusCode).send(body)
})

router.get("/items/user/:userId", async (req, res) => {
  const mongoGetItemUser = new MongoGetItemUser();

  const getItemUserController = new GetItemUserController(mongoGetItemUser)

  const {body, statusCode} = await getItemUserController.handle({
    params: req.params
  })
  res.status(statusCode).send(body)
})


export default router;
