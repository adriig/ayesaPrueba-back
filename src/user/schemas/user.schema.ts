import { Model, Schema, model } from "mongoose";
import { User } from "../interfaces/user.model";

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel: Model<User> = model("User", UserSchema);

export default UserModel;
