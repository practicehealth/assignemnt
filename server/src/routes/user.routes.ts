import { Request, Response, Router } from "express";
import { Timelines } from "../model/timeline.model";
import User from "../model/user.model";
import { toHash } from "../utils/hashPassword";
import { validateRoutes } from "../middleware/validateRoutes";

const router = Router();

router.get(
  "/profile/:userName",
  validateRoutes,
  async (req: Request, res: Response) => {
    const { userName } = req.params;
    const isUserDataPresent = await Timelines.findOne({ userId: userName });
    if (!isUserDataPresent) {
      res.status(400).json({
        message: `${userName} data not present`,
      });
      return;
    }
    res.status(200).send(await Timelines.findOne({ userId: userName }));
  }
);

router.put(
  "/update/:userName",
  validateRoutes,
  async (req: Request, res: Response) => {
    try {
      const { userName } = req.params;
      const { newEmail, newPassword, newProfile } = req.body;
      const { firstName, lastName, dateOfBirth, gender, age } = newProfile;

      const updatedUser = await User.findOneAndUpdate(
        { userName },
        {
          email: newEmail,
          password: await toHash(newPassword),
          profile: {
            firstName: firstName ?? null,
            lastName: lastName ?? null,
            dateOfBirth: dateOfBirth ?? null,
            gender: gender ?? null,
            age: age ?? null,
          },
        },
        {
          new: true,
        }
      );
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      return res.status(200).json({
        message: `${userName} update successfully`,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
);

export default router;
