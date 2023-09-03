import { Schema, model } from "mongoose";


const timeLineModel = new Schema({
    "id": {
      "type": "Number",
      "default": null
    },
    "year": {
      "type": "Number",
      "default": null
    },
    "eventType": {
      "type": "String",
      "default": null
    },
    "references": {
      "type": "Array",
      "default": null
    },
    "reference": {
      "type": "Number",
      "default": null
    },
    "serviceDate": {
      "type": "Date",
      "default": null
    },
    "resourceType": {
      "type": "String",
      "default": null
    },
    "eventHeader": {
      "type": "String",
      "default": null
    },
    "provider": {
      "type": "String",
      "default": null
    },
    "facility": {
      "type": "String",
      "default": null
    },
    "cost": {
      "type": "String",
      "default": null
    },
    "clinicalNotes": {
      "type": "String",
      "default": null
    }
  });


const Timeline = model('Timeline', timeLineModel);
export default Timeline;
