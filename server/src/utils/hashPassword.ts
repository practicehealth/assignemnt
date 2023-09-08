import bcrypt from "bcrypt";

const SALT_LEVEL: number = 10;
const toHash = async (suppliedPassword: string): Promise<string> => {
  const bufHash = await bcrypt.hash(suppliedPassword, SALT_LEVEL);
  return bufHash;
};

export { toHash };