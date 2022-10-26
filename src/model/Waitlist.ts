import { Schema, model } from "mongoose";
interface WaitlistSchema {
    name: string;
    email: string;
    affiliateMarketer: boolean;
    contentCreator: boolean;
    date: unknown;
}
const waitlistSchema = new Schema<WaitlistSchema>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    affiliateMarketer: {
        type: Boolean,
        required: true,
    },
    contentCreator: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
export const Waitlist = model('Waitlist', waitlistSchema);