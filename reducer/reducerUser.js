import { RECEIVE_REGISTER_INFO , RECEIVE_USERS , RECEIVE_REGISTER_INFO_DONE , UPDATE_USER , RECEIVE_USER } from '../actions/user';


export const user = (state = { etat: false, error : null , created : false }, action) => {
    
    switch (action.type) {
        case RECEIVE_REGISTER_INFO:
            console.log(action);
            return { ...state,
                etat: action.etat,
                error: action.error ,
                created : (action.etat == true) ? true : false
            };
            break;
        case RECEIVE_REGISTER_INFO_DONE:
            console.log(action);
            return { ...state,
                created : false
            };
            break;
        case RECEIVE_USER:
            console.log(action);
            return { ...state,
                etat : action.etat,
                user : action.user ,
                updated : action.updated
            };
            break;
        case UPDATE_USER:
            console.log(action);
            return { ...state,
                etat : action.etat,
                user : action.user ,
                updated : action.updated
            };
            break;
        default:
            return state;
    }

    return state;
}


export const users = (state = { etat: false, users : [] , created : false }, action) => {
    
    switch (action.type) {
        case "RECEIVE_USERS":
            console.log(action);
            return { ...state,
                etat: action.etat,
                users: action.users ,
                created : false
            };
            break;
        default:
            return state;
    }

    return state;
}