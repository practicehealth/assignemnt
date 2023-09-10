import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import TimeLineModel from "../models/TimeLineModel";
import { Request, Response, NextFunction } from "express"
// const JsonTimeLine = require("../mock/timeline.json")
interface Timeline {
    eventType: String;
    references: any;
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
interface myObj {
    eventType: String;
    references: any;
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


const finalArr: Array<object> = [];
// const jsonData: Array<Timeline> = JSON.parse(JSON.stringify(JsonTimeLine));
// jsonData.forEach((object: Timeline) => {
//     var obj: myObj = {
//         "eventType": "",
//         "references": "",
//         "serviceDate": "",
//         "resourceType": "",
//         "facility": "",
//         "eventHeader": "",
//         "provider": "",
//         "year": -1,
//         "reference": -1,
//         "clinicalNotes": "",
//         "cost": ""
//     }
//     obj["eventType"] = object.eventType ? object.eventType : "";
//     obj["references"] = object.references ? object.references : [];
//     obj["serviceDate"] = object.serviceDate ? object.serviceDate : ""
//     obj["resourceType"] = object.resourceType ? object.resourceType : ""
//     obj["facility"] = object.facility ? object.facility : ""
//     obj["eventHeader"] = object.eventHeader ? object.eventHeader : ""
//     obj["provider"] = object.provider ? object.provider : ""
//     obj["year"] = object.year ? object.year : -1;
//     obj["reference"] = object.reference ? object.reference : -1;
//     obj["clinicalNotes"] = object.clinicalNotes ? object.clinicalNotes : ""
//     obj["cost"] = object.cost ? object.cost : ""
//     finalArr.push(obj);
// });


//Uncomment and hit  if you want to index data to mongodb  !!DOnt index multiple times as it will lead to data duplicacy || Data Already indexed into my account.
export const indexTimelineDataToMongo = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    // const indexedData = await TimeLineModel.create(finalArr);
    return res.status(200).json({
        success: true,
        message: "Indexed data successfuly",
        // indexedData ,
    })
});


export const getDataByResourceType = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    let { rsType } = req.query;
    if (rsType == 'Procedure') {
        rsType = 'procedure'
    }
    const response = await TimeLineModel.find({ "resourceType": rsType });
    const timeline = {
        resourceType: rsType,
        RSlength: response.length,
    }
    return res.status(200).json({
        success: true,
        timeline,
    })
});

interface Query {
    eventType: string;
    year: string;
};


export const eventTimeline = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { eventType, year } = req.query as unknown as Query;
    const eventTimelines = await TimeLineModel.aggregate([
        {
            "$match": {
                "eventType": {
                    "$ne": "nonEvent"
                }
            }
        },
        {
            $match: {
                "eventType": eventType
            }
        },
        {
            $match: {
                "year": parseInt(year)
            }
        }
    ]);
    return res.status(200).json({
        success: true,
        eventTimelines
    })
})


export const getAllEvents = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const data = await TimeLineModel.find();
    return res.status(200).json({
        success: true,
        data,
    })
})