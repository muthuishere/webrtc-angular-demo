import {createReducer, on} from '@ngrx/store';
import {connect,disConnect} from './config.actions';

export const initialState={
  connected:false,
};


function onConnect(state,action){
  return {
    ...state,
    connected:true,
  };
}
function onDisConnect(state,action){
  return {
    ...state,
    connected:false,
    connection:null,
  };
}



const _configReducer = createReducer(initialState,
  on(connect,onConnect),
  on(disConnect,onDisConnect),
);


export function configReducer(state,action){
  return _configReducer(state,action);
}
