import bcrypt from 'bcrypt';
import session from 'express-session';
import so from 'connect-mongodb-session';

const saltRounds = 10;

function HashPassword( passFromFe: string ):string {
    const hasedPass = bcrypt.hashSync( passFromFe, saltRounds );
    return hasedPass;
}

function CheckPassword( passFromFe:string, hashFromBe: string ):boolean {
    return bcrypt.compareSync( passFromFe, hashFromBe );
}

export const PasswordUtils = {
    HashPassword, CheckPassword,
};


function sessionizer(){

    const MongoDBStore = so(session);
    const store = new MongoDBStore({
        uri: process.env.MONGOURI || "", 
        collection: 'sessions',
    })

    return session({
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: true,
        unset: 'destroy',
        store: store,
        name: 'cookieStores',
    })

}

export const SessionUtils = { sessionizer };
