// export mongoose user from here 
import { Schema, model } from "mongoose";
import { IUser } from "../../types.ts";


const userModel = new Schema<IUser> ({
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


const User = model('User', userModel);
export default User;
