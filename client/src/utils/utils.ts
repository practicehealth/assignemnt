export function getUser(){
    const userString = localStorage.getItem("user");
    if ( userString == null ) {
        return null;
    } else {
        return JSON.parse(userString);
    }
}