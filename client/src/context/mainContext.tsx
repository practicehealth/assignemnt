import { createContext, useContext } from 'react';

// Define the shape of your context's value
interface UserData {
    email: String,
    password: String,
}
interface SignupData {
    username: String;
    email: String;
    password: String;
    gender: String;
    dob: String
}

interface MainContext {
    loginUser: (userData: UserData) => Promise<boolean|undefined>;
    signUpUser: (userData: SignupData) => Promise<boolean>;
    logout  : ()=> Promise<boolean|undefined>
    getResourceTypeData: (resourceType: String) => Promise<Object[] | undefined>;
    loggedIn: Boolean;
    getDataOfEvents: (eventType: string, year: string) => Promise<Array<any> | undefined>;
    event: string,
    year: string;
    setEvent: Function;
    setYear: Function;
    forgotPassword: (email: string) => Promise<boolean | undefined>;
    resetPassword: (userObj: Object,token:string) => Promise<Object | undefined>;
    verifyMe : (token:string)=> Promise<Boolean|undefined>
}

// Create a new context instance
const mainContext = createContext<MainContext | undefined>(undefined);

// Create a custom hook to access the context
export function useMyContext() {
    const context = useContext(mainContext);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
};

export default mainContext;
