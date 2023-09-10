"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ValidateSession(req, res, next) {
    if (!req.session.user) {
        res.status(401).send({ "ok": false, "msg": "No session cookie found" });
        return false;
    }
    else {
        next();
        return true;
    }
}
exports.default = ValidateSession;
