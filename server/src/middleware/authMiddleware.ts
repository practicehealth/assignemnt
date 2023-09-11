import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: any; // Adjust the type according to your user data structure
  }
}
function isTokenPresentInHeader(req: Request): string {
  const header = req.headers.authorization;
  if (!header) throw new Error('no token provided.');
  return header;
}

function getToken(header: string): string {
  const bearer = header.split(' ');
  if (bearer.length < 2) throw new Error('invalid token');
  const token = bearer[1];
  return token;
}

// Middleware to authenticate users using JWT
export const authenticateUser = (req: Request, res: Response, next: any): void => {
  try {
    // Check if a token is included in the Request headers
    const header = isTokenPresentInHeader(req);
    const token = getToken(header);

    // Verify the token using your JWT secret key
    jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret', (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) throw new Error(error.message);
      if (!decoded?.id) throw new Error('userId not found in jwt');

      // Attach the decoded user data to the Request for further use
      req.user = decoded;
      next();
    });
  } catch (error:any) {
    console.error('Authentication error:', error);
    res.status(403).json({
      code: '000UN',
      message: error.message,
    });
  }
};
