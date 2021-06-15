import mongoose from "mongoose";
import { userSchema } from "../models/userModel";

const user = mongoose.model("user", userSchema);

export const addNewUser = (req, res) => {
  let newuser = new user(req.body);
  newuser.save((err, user) => {
    console.log(user);
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const getuser = (req, res) => {
  user.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const authenticateUser = (req, res) => {
  let newuser = new user(req.body);
  user.find(
    { email: newuser.email, password: newuser.password },
    (err, user) => {
      console.log(user);
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};

export const deleteuser = (req, res) => {
  user.findOneAndRemove(
    { email: req.params.email },
    { useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "successfully deleted user!!" });
    }
  );
};
