import JWT from "jsonwebtoken";

export const AccessTokenGenerator = async(payload) => {
  return JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const RefreshTokenGenerator = async(payload) => {
  return JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};
