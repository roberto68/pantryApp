import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  TOGGLE
} from './action-types';


export const initialState = {
  selected: false,
  deleted: null,
  list: [],
  previous: []
};


export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK_SUCCESS:
      return {
        deleted: null,
        list: (state.deleted && state.deleted.key === action.payload.key) ?
              [ ...state.previous ] :
              [ action.payload, ...state.list ],
        previous: []
      };

    case DELETE_TASK_SUCCESS:
      return {
        selected: state.list.map(task => task.selected),
        deleted: action.payload,
        list: state.list.filter(task => {
          return task.key !== action.payload.key;
        }), // task isn't in the list anymore = is deleted
        previous: [ ...state.list ]
      };

    case UPDATE_TASK_SUCCESS:
      return {
        selected: state.list.map(task => task.selected),
        deleted: null,
        list: state.list.map(task => {
          return task.key === action.payload.key ? action.payload : task;
        }),
        previous: []
      };

    case SIGN_OUT_SUCCESS:
      return {
        selected: state.list.map(task => task.selected),
        deleted: null,
        list: [],
        previous: []
      };

    case TOGGLE:
      return {
        ...state,
        selected: state.list.map(task => {
          return !task.selected; // toglujem zmenu
        })
      };

    default:
      return state;
  }
}
