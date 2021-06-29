export const gitActions = (state,action)=>{
    const type = action.type;
    if(type==='login_in_process'){
        let newState = {...state}
        newState.isLoggedIn = false
        return newState
    }
    else if(type==='login_successful'){
        let newState = {...state}
        newState.isLoggedIn = true
        return newState
    }
    else if(type==='login_failed' || type==='logout'){
        let newState = {...state}
        newState.isLoggedIn = false
        localStorage.clear()
        return newState
    }else{
        console.log('no action matched');
        return state
    }
}

export const gitState ={
    isLoggedIn: localStorage.getItem('access_token')?.length>0,
    onSuccess_msg:'Successfully Logged in to Github',
    config:{
        client_id:"52314875eb6bae966fbf"
        //client_secret: accessed from environment variable
    }
}