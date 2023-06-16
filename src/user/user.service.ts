import { User } from "./interfaces/user.model";
import UserModel from "./schemas/user.schema";

/**
 * Finds a user by the given username.
 * 
 * @param username - User username
 * @returns {Promise<User>} User with given username
 */
const findUserByUsername = async (username: string): Promise<User | null> => {
  return await UserModel.findOne({ username });
};

/**
 * Finds a user by the given id.
 * 
 * @param id - User id
 * @returns {Promise<User>} User with given id
 */
const findUserById = async (id: string): Promise<User | null> => {
  return await UserModel.findById(id);
};

/**
 * Creates a new user from the given parameters.
 * 
 * @param username - User username
 * @param password - User password
 * @returns {Promise<User>} created user
 */
const create = async (
  username: string,
  password: string,
  token: string
): Promise<User> => {
  return await UserModel.create({
    username,
    password,
    token
  });
};

export { create, findUserById, findUserByUsername };

