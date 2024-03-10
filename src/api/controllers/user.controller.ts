import { Request, Response } from 'express';
import {createUser} from "../../db/dal/user.dal";

export const postUser = async (req: Request, res: Response) => {
    const payload = req.body;

    const user = await createUser(payload);

    res.status(201).json(user);
}