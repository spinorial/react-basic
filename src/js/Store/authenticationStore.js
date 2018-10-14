const noCredentialsState = {

data: {
    auth_token: null,
    user_id: null,
    user_login: null,
    user_roles: null
  },
  msg: 'Not Authenticated',
  status: false,
user: {
  username: null,
  password: null,

},
base64:null
}

const testingCredentialsState = {

data: {
    auth_token: null,
    user_id: '1',
    user_login: 'joe',
    user_roles: ["Administrator"]
  },
  msg: 'Authenticated',
  status: true,
user: {
  username: 'joe',
  password: 'pass123',

},
base64:null
}

//Should at in into this default username surname and email for lead author autopopulation
//Lead author autopopulate if no id is set for the article (i.e.) it is a new post. 
//Only allow administrtive users to then edit it.

const authenticationReducer = (state = testingCredentialsState, action) =>{

  if(action.type=='UPDATE_CREDENTIALS'){

    console.log('[Authentication] ', action.payload)
    
    const newCredentials = {

      data: {
        auth_token: action.payload.data.auth_token,
        user_id: action.payload.data.user_id,
        user_login: action.payload.data.user_login,
        user_roles: action.payload.data.user_roles
      },
      msg: action.payload.msg,
      status: action.payload.status,
      user: {
        ...state.user
      }
      

    }

    return newCredentials


  }

  if(action.type=='UPDATE_PASSWORD'){
  
    const newCredentials = {

      ...state,
      user:{
        ...state.user,
        password: action.payload

      }


    }

    return newCredentials;

  }

    if(action.type=='UPDATE_USERNAME'){
  
    const newCredentials = {

      ...state,
      user:{
        ...state.user,
        username: action.payload,
        

      }
    }

       return newCredentials;


    }

    if(action.type=='LOGOUT'){
      return noCredentialsState;
    }

      return state;

  }

 




export default authenticationReducer