import bcrypt from "bcrypt";

// Hash a plain text password
export const hashPassword = async (plainPassword) => {
  const saltRounds = 10; // You can increase for stronger hashing
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

// Compare a plain text password with a hashed password 

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
