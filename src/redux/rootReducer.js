import { combineReducers } from 'redux';
import auth from "../redux/auth/reducer";
import info from "../redux/info/reducer";
import menu from "../redux/menu/reducer";

const reducers = combineReducers({
    auth,
    info,
    menu
})

export default reducers;