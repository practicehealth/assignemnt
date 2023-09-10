import express from "express";
import { eventTimeline, getAllEvents, getDataByResourceType, indexTimelineDataToMongo } from "../controllers/timeine-controller";
import { isAuthenticatedUser } from "../middlewares/loginMiddleware";
const router = express.Router();


router.route("/indexdata").post(indexTimelineDataToMongo);
router.route("/getDataByResourceType").get(getDataByResourceType);
router.route("/getEventTimeline").get(eventTimeline);
router.route("/getAllEvents").get(getAllEvents);


export default router;