import { Schema, model } from "mongoose";
// create waitlist schema
const waitlistSchema = new Schema({
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