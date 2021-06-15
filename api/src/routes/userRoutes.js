import {
  addNewUser,
  deleteuser,
  getuser,
  authenticateUser,
} from "../controllers/userController";

const routes = (app) => {
  app.route("/user").get(getuser).post(addNewUser);

  app.route("/user/authenticate").post(authenticateUser);

  app.route("/user/:email").post(deleteuser);
};

export default routes;
