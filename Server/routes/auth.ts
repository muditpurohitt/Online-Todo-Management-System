import jwt from "jsonwebtoken";
import express from 'express';
import {authenticateJwt, SECRET}  from "../middleware/";
import { User } from "../db";
const router = express.Router();
import {Response, Request, NextFunction} from 'express';
import { z } from "zod";

let inputProps = z.object({
  username: z.string().min(1).max(10),
  password: z.string().min(6).max(10)
})

type credInputType = z.infer<typeof inputProps>;

  router.post('/signup', async (req: Request, res: Response) => {

    const parseInput = inputProps.safeParse(req.body);
    if(!parseInput.success){
        res.status(411).json({
          msg: parseInput.error
        })
        return;
    }
    const username = parseInput.data.username;
    const password = parseInput.data.password;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req: Request, res: Response) => {
      const id = req.headers["UserId"];
      const user = await User.findOne({ _id: id });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  //module.exports = router
  export default router;
