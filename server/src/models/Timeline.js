"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var timeLineModel = new mongoose_1.Schema({
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
var Timeline = (0, mongoose_1.model)('Timeline', timeLineModel);
exports.default = Timeline;
