"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionUtils = exports.PasswordUtils = void 0;
var bcrypt_1 = require("bcrypt");
var express_session_1 = require("express-session");
var connect_mongodb_session_1 = require("connect-mongodb-session");
var saltRounds = 10;
function HashPassword(passFromFe) {
    var hasedPass = bcrypt_1.default.hashSync(passFromFe, saltRounds);
    return hasedPass;
}
function CheckPassword(passFromFe, hashFromBe) {
    return bcrypt_1.default.compareSync(passFromFe, hashFromBe);
}
exports.PasswordUtils = {
    HashPassword: HashPassword,
    CheckPassword: CheckPassword,
};
function sessionizer() {
    var MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
    var store = new MongoDBStore({
        uri: process.env.MONGOURI || "",
        collection: 'sessions',
    });
    return (0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: true,
        unset: 'destroy',
        store: store,
        name: 'cookieStores',
    });
}
exports.SessionUtils = { sessionizer: sessionizer };
