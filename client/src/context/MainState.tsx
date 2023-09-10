import MainContext from "./mainContext";
import { toast } from "react-toastify";
import { ReactNode, useState } from "react"
import axios from "axios";
interface Login {
    email: String,
    password: String,
}
interface Signup {
    username: String;
    email: String;
    password: String;
    gender: String;
    dob: String
}
const MainStateProvider = ({ children }: { children: ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    const [event, setEvent] = useState<string>('coverage');
    const [year, setYear] = useState<string>('2023');
    const config = {
        headers: { "Content-Type": "application/json" }
    };

    const loginUser = async (userData: Login): Promise<boolean | undefined> => {
        try {
            const response = await axios.post("http://localhost:4000/auth/login", userData, { withCredentials: false });
            setLoggedIn(true);
            toast.success("Logged in successfully !", {
                position: "top-center",
                autoClose: 1500,
            });
            localStorage.setItem('auth_token', JSON.stringify(response.data.token));
            return true;
        } catch (error: any) {
            setLoggedIn(false);
            toast.error(`${error.response.data.message}`, {
                position: "top-center",
                autoClose: 1500,
            })
            return false;
        }
    }
    const signUpUser = async (userData: Signup): Promise<boolean> => {
        try {
            const response = await axios.post("http://localhost:4000/auth/signup", userData, config);
            setLoggedIn(true);
            toast.success("Logged in successfully !", {
                position: "top-center",
                autoClose: 1500,
            });
            localStorage.setItem('auth_token', JSON.stringify(response.data.token));
            return true
        } catch (error) {
            return false;
        }
    }
    const forgotPassword = async (email: string): Promise<boolean | undefined> => {
        try {
            const data = await axios.post(`http://localhost:4000/auth/forgotPassword`, { email });
            toast.success(data.data.message + 'Please check your email', {
                position: 'top-center',
                theme: 'dark',
                autoClose: 1500,
            });
            return true;
        } catch (error: any) {
            toast.error(error.response.data.message, {
                position: 'top-center',
                theme: 'dark',
                autoClose: 1500,
            });
        }
    }

    const resetPassword = async (userObj: Object, token: string): Promise<Object | undefined> => {
        try {
            const response = await axios.post(`http://localhost:4000/auth/resetpassword/${token}`, userObj, config);
            if (response.data.success) {
                toast.success('Password changed successfuy', {
                    theme: 'dark',
                    position: 'top-center',
                    autoClose: 1500,
                });
            }
            return response;
        } catch (error) {
            if (error) {
                toast.error('Something went wrong in changing password', {
                    autoClose: 1500,
                    position: 'top-center',
                    theme: 'dark'
                })
            }
        }

    }

    const logout = async (): Promise<boolean | undefined> => {
        try {
            await axios.get(`http://localhost:4000/auth/logout`);
            toast.success('Logged out successfuy', {
                theme: 'dark',
                position: 'top-center',
                autoClose: 1500,
            });
            localStorage.removeItem('auth_token');
            setLoggedIn(false);
            return true;
        } catch (error: any) {
            toast.error(`${error.data.message}`, {
                position: "top-center",
                autoClose: 1500,
            })
            return false;
        }
    }

    const verifyMe = async (token: string = 'InvalidTOKENIDH*(@H*SAJSKA'): Promise<Boolean | undefined> => {
        try {
            await axios.get(`http://localhost:4000/auth/verify/${token}`);
            setLoggedIn(true);
            return true;
        } catch (error) {
            toast.error('Please login to continue', {
                theme: 'colored',
                position: 'top-center',
                autoClose: 1500,
            })
            setLoggedIn(false);
            return false
        }
    }

    const getResourceTypeData = async (resourceType: String): Promise<Object[] | undefined> => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/getDataByResourceType?rsType=${resourceType}`);
            return response.data.timeline;
        } catch (error) {
            toast.warn('Something went wrong', {
                autoClose: 1500,
                position: 'top-center',
                theme: 'colored'
            })
        }
    }

    const getDataOfEvents = async (eventType: string = 'coverage', year: string = '2023'): Promise<Array<any> | undefined> => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/getEventTimeline?eventType=${eventType}&year=${year}`);
            return response.data.eventTimelines;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MainContext.Provider value={{ loginUser, loggedIn, signUpUser, getResourceTypeData, getDataOfEvents, event, setEvent, year, setYear, forgotPassword, resetPassword, logout, verifyMe }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainStateProvider;