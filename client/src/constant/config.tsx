export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:"Loading.....",
        message:"Data is Being Loader, Please wait"
    },
    success:{
        title:"success",
        message:"Data successfully Loaded"
    },
    responseFailure:{
        title:"Error",
        message:"An Error occured while fetching response from the server . plese try again"
    },
    requestFailure:{
        title:"Error",
        message:"An Error occures while parsing the data"
    },
    networkError:{
        title:"Error",
        message:"Unable to connect the network please check the internet connectivity"
    }
}

///make API service call as a Object
// sample request
// Need service call:{url:"/",methos:"POST/GET/PUT/DELETE/",params:"true/false",query:"true/false"}

export const service_URLS={
    userSignup:{url: '/signup',method:"POST"},
    userLogin:{url:'/login',method:"post"},
    uploadFile:{url:'file/upload',method:"post"},
    

}