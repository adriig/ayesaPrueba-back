import { hash, compare } from "bcryptjs";

/**
 * @param password - Password to be encrypted
 * @returns {Promise<string>} encrypted password
 */
const encrypt = async (password: string) => {
  return await hash(password, 10);
};

/**
 * @param password - Password to be verified
 * @param hash - Encrypted password
 * @returns {Promise<boolean>} true if password matches hash and false otherwise
 */
const verify = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export { encrypt, verify };
