import jwt from "jsonwebtoken";

export const createToken = async (email: string) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(email, process.env.SECRET as string, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
};
