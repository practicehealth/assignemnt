import RedisStore from "connect-redis";
import session from "express-session";
import { Redis } from "ioredis";

const redisClient = new Redis(`${process.env.REDIS_URI}`);

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: `${process.env.REDIS_SESSION_SECRET}`,
  saveUninitialized: false,
  name: "user-session",
  resave: false,
  cookie: {
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "prod" ? false : true,
  },
});
