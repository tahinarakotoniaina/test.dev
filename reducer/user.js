import axios from 'axios';
import moment from 'moment';

export const requestRegister = (email,password,tel) => {
    console.log(email);
    return (dispatch) => {
        return  axios.post('/admin/register?timestamp='+(new Date().getTime()), {
            email: email,
            password: password ,
            telephone : tel
        })
        .then(function (response) {
            console.log(response);
            dispatch(receiveRegister(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

let receiveRegister = (json) => {
    console.log(json);
    let etat = json.etat ? json.etat : false ;
    let error = json.error || null; 
    return {
      type: RECEIVE_REGISTER_INFO,
      etat: etat,
      error: error
    }
}

export const requestUsers = () => {
    return (dispatch) => {
        return  axios.get('/admin/users?timestap='+(new Date().getTime()))
        .then(function (response) {
            console.log("getUsers");
            console.log(response);
            dispatch(receiveUsers(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const fait = () => {
    return (dispatch) => {
        return  dispatch({
            type : RECEIVE_REGISTER_INFO_DONE
        });
    }
}


export const getUser = () => {
    return (dispatch) => {
        return  axios.get('/api/user')
        .then(function (response) {
            console.log("getUser");
            console.log(response);
            dispatch(receiveUser(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}


export const putUser = (user) => {
    return (dispatch) => {

        var tabPromise = [] ;

        if(user.image!=null){
            var data = new FormData();
            data.append("image",user.image);
            delete(user.image);
            tabPromise.push(axios.post('/api/user/image',data));
        }
        
        tabPromise.push(axios.put('/api/user',user));
         
        Promise.all(tabPromise)
        .then(function (response) {
            console.log("putUser");
            console.log(response);
            dispatch(updateUser(response[tabPromise.length-1].data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}



let receiveUser = (json) => {
    let etat = json.etat ? json.etat : false ;
    let user = json.user || null; 
    var au = moment(json.user.au);
    if(au.isValid()){
        user.au = au;
    }else{
        user.au = moment();
    }
    var du = moment(json.user.du);
    if(du.isValid()){
        user.du = du;
    }else{
        user.du = moment();
    }
    return {
      type: RECEIVE_USER,
      etat: etat,
      user: user,
      updated : false
    }
}


let updateUser = (json) => {
    let etat = json.etat ? json.etat : false ;
    let user = json.user || null; 
    var au = moment(json.user.au);
    if(au.isValid()){
        user.au = au;
    }else{
        user.au = moment();
    }
    var du = moment(json.user.du);
    if(du.isValid()){
        user.du = du;
    }else{
        user.du = moment();
    }
    return {
      type: UPDATE_USER,
      etat: etat,
      user: user ,
      updated : (etat==true) ? true : false
    }
}


let receiveUsers = (json) => {
    let etat = json.etat ? json.etat : false ;
    let users = json.users || null; 
    return {
      type: RECEIVE_USERS,
      etat: etat,
      users: users 
    }
}

export const RECEIVE_REGISTER_INFO = 'RECEIVE_REGISTER_INFO';
export const RECEIVE_REGISTER_INFO_DONE = 'RECEIVE_REGISTER_INFO_DONE';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const UPDATE_USER = 'UPDATE_USER';