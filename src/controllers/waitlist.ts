import { CourierClient } from "@trycourier/courier";
require("dotenv").config();
import type { Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import { Waitlist } from "../model/Waitlist";
import { addMemberTopList } from "../lib/MainChimpInstance";
interface Res {
    message: string;
    success: boolean;
    data?: {
        requestId: string;
    };
    errors?: ValidationError[];
}
interface Req {
    name: string;
    email: string;
    affiliateMarketer: boolean;
    contentCreator: boolean;
}

exports.joinWaitlist = async (req: Request<Req>, res: Response<Res>) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array(),
                success: false,
                message: "Invalid data",
            });
    }
    const { name, email, affiliateMarketer, contentCreator }: Req = req.body;
    const wait = await Waitlist.find({ name });
    if (wait.length > 0) {
        return res.status(400).json({ success: false, message: "user already added to waitlist" });
    }
    else {
        if (affiliateMarketer || contentCreator) {
            addMemberTopList(email, name, "").then(async (subscriberId: string) => {
                const waitlist = await Waitlist.create({
                    name,
                    email,
                    affiliateMarketer,
                    contentCreator,
                    subscriberId
                });
                waitlist.save().then(() => {
                    return res
                        .status(200)
                        .json({ success: true, message: "User Subscribed successfully" });
                });
            });
        }
        else {
            return res.status(400).json({ success: false, message: "Affiliate marketer or content creator should be true" });
        }
    }
};
