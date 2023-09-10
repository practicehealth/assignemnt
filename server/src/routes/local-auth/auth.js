"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_js_1 = require("../../models/User.js");
var util_js_1 = require("../../utils/util.js");
var authRoutes = express_1.default.Router();
// SignUp Login Logout Verify
// SignUp
authRoutes.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var signUpDets, existingUsers, err_1, passFromFe, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                signUpDets = req.body;
                if (signUpDets.userName == "" || signUpDets.password == "" || signUpDets.email == "") {
                    res.status(422).send({ ok: false, msg: "Credentials missing" });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_js_1.default.find({ userName: signUpDets.userName })];
            case 2:
                existingUsers = _a.sent();
                if (existingUsers.length != 0) {
                    res.status(409).send({ ok: false, msg: "Username already exists" });
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).send({ ok: false, msg: "Internal Server Error", err: err_1 });
                return [2 /*return*/];
            case 4:
                passFromFe = signUpDets.password;
                signUpDets.password = util_js_1.PasswordUtils.HashPassword(passFromFe);
                newUser = new User_js_1.default(signUpDets);
                return [4 /*yield*/, newUser.save()];
            case 5:
                _a.sent();
                res.status(200).send({ ok: true, msg: "Signed up successfully" });
                return [2 /*return*/];
        }
    });
}); });
// Login
authRoutes.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loginDets, existingUsers, passFromFe, passFromBe, respUserObject, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loginDets = req.body;
                // console.log(loginDets);
                if (loginDets.userName == "" || loginDets.password == "") {
                    res.status(422).send({ ok: false, msg: "Credentials missing" });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_js_1.default.find({ userName: loginDets.userName })];
            case 2:
                existingUsers = _a.sent();
                if (existingUsers.length != 1) {
                    res.status(409).send({ ok: false, msg: "Username does not exists" });
                    return [2 /*return*/];
                }
                passFromFe = loginDets.password;
                passFromBe = existingUsers[0].password;
                // console.log(passFromFe+" "+passFromBe);
                if (util_js_1.PasswordUtils.CheckPassword(passFromFe, passFromBe)) {
                    respUserObject = existingUsers[0];
                    req.session.user = {
                        userName: respUserObject.userName,
                        email: respUserObject.email,
                    };
                    res.status(200).send({ ok: true, msg: "Login Successful", data: {
                            userName: respUserObject.userName,
                            email: respUserObject.email,
                            firstName: respUserObject.firstName,
                            middleName: respUserObject.middleName,
                            lastName: respUserObject.lastName,
                            dateOfBirth: respUserObject.dateOfBirth,
                            gender: respUserObject.gender,
                            phoneNumber: respUserObject.phoneNumber,
                        } });
                    return [2 /*return*/];
                }
                else {
                    res.status(401).send({ ok: false, msg: "Login Unsuccessful. Wrong Password" });
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(500).send({ ok: false, msg: "Internal Server Error", err: err_2 });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Logout
authRoutes.delete('/logout', function (req, res) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                res.status(400).send({ ok: false, err: err, msg: 'Unable to log out' });
            }
            else {
                res.send({ ok: true, msg: "Logged out successfully" });
            }
        });
    }
    else {
        res.end();
    }
});
// Verify
authRoutes.get("/verify", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!req.session.user) {
            res.status(401).send({ ok: false, msg: "No session cookie" });
        }
        else {
            res.status(200).send({ ok: true, msg: "Valid Session", });
        }
        return [2 /*return*/];
    });
}); });
// Forgot Password
authRoutes.post("/forgotpwd", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formDets, dbResult, hashedPassword, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.userName == "" || req.body.email == "" || req.body.password == "") {
                    res.status(422).send({ ok: false, msg: "Credentials missing" });
                    return [2 /*return*/];
                }
                formDets = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_js_1.default.find({ userName: formDets.userName, email: formDets.email })];
            case 2:
                dbResult = _a.sent();
                if (dbResult.length != 1) {
                    res.status(409).send({ ok: false, msg: "Invalid Credentials" });
                    return [2 /*return*/];
                }
                hashedPassword = util_js_1.PasswordUtils.HashPassword(formDets.password);
                return [4 /*yield*/, User_js_1.default.updateOne({ userName: formDets.userName }, { "$set": { password: hashedPassword } })];
            case 3:
                _a.sent();
                res.status(200).send({ ok: true, msg: "Password Successfully Updated" });
                return [2 /*return*/];
            case 4:
                err_3 = _a.sent();
                res.status(500).send({ ok: false, msg: "Internal Server Error", err: err_3 });
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
authRoutes.delete("/delact", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, dbResult, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userName = req.query.userName;
                if (!userName || userName == "") {
                    res.status(409).send({ ok: false, msg: "Invalid Credentials" });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_js_1.default.find({ userName: userName })];
            case 2:
                dbResult = _a.sent();
                if (dbResult.length != 1) {
                    res.status(409).send({ ok: false, msg: "Invalid Credentials" });
                    return [2 /*return*/];
                }
                if (req.session) {
                    req.session.destroy(function (err) { console.log(err); return; });
                }
                return [4 /*yield*/, User_js_1.default.deleteOne({ userName: userName })];
            case 3:
                _a.sent();
                res.status(200).send({ ok: true, msg: "User deleted Successfully" });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                res.status(500).send({ ok: false, msg: "Internal Server Error", err: err_4 });
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = authRoutes;
