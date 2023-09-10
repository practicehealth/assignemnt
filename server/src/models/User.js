"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export mongoose user from here 
var mongoose_1 = require("mongoose");
var userModel = new mongoose_1.Schema({
    "userName": {
        "type": "String",
        "default": null
    },
    "email": {
        "type": "String",
        "default": null
    },
    "password": {
        "type": "String",
        "default": null,
    },
    "firstName": {
        "type": "String",
        "default": null,
    },
    "middleName": {
        "type": "String",
        "default": null,
    },
    "lastName": {
        "type": "String",
        "default": null,
    },
    "dateOfBirth": {
        "type": "Date",
        "default": null,
    },
    "gender": {
        "type": "String",
        "default": null,
    },
    "phoneNumber": {
        "type": "String",
        "default": null,
    },
});
var User = (0, mongoose_1.model)('User', userModel);
exports.default = User;
