import express, { Router } from 'express';
const router: Router = express.Router();

// Import the controller function
import { signupuser, loginuser} from '../../controller/usercontroller';

// Define the routes
router.post('/signup', signupuser);
router.post('/login', loginuser);

// Export the router
export default router;
