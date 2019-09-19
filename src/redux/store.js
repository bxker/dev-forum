import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers
import userReducer from './reducers/userReducer';
import postsReducer from './reducers/postsReducer';

const rootReducer = combineReducers({
    userReducer: userReducer,
    postsReducer: postsReducer
})

export default createStore(rootReducer, applyMiddleware(promise));
