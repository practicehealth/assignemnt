import mongoose, { Schema, Types } from "mongoose";

interface Timeline {
    eventType: String;
    references: Types.Array<number> | String | Number;
    serviceDate: String;
    resourceType: String;
    facility?: String;
    eventHeader?: String;
    provider?: String;
    year?: Number;
    reference?: Number;
    clinicalNotes?: String;
    cost?: String;
};


const timeLineSchema = new Schema<Timeline>({
    eventHeader: {
        type: String,
        default: ""
    },
    references: {
        default: ""
    },
    serviceDate: {
        type: String,
        default: ""
    },
    resourceType: {
        type: String,
        default: ""
    },
    facility: {
        type: String,
        default: ""
    },
    eventType: {
        type: String,
        default: ""
    },
    provider: {
        type: String,
        default: ""
    },
    year: {
        type: Number
    },
    reference: {
        type: Number
    },
    clinicalNotes: {
        type: String,
        default: ""
    },
    cost: {
        type: String,
        default: ""
    }
});

export default mongoose.model("Timelines", timeLineSchema, 'Timelines');