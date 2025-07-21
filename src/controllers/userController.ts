import { Request, Response, NextFunction } from "express";

const userService = require('../services/userService');

exports.getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.fetchAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: `User with ID ${req.params.id} not found`});
    }
    
    res.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    // fallback for unknown errors
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};