import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  TOGGLE,
  ADD_TO_HISTORY
} from './action-types';

export function toggleSeleted(index) {
  return {
    type: TOGGLE,
    payload: index
  };
}

export function createTask(title) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`tasks/${auth.id}`)
      .push({completed: false, title}, error => {
        if (error) {
          console.error('ERROR @ createTask :', error); // eslint-disable-line no-console
          dispatch({
            type: CREATE_TASK_ERROR,
            payload: error
          });
        }
      });
  };
}

export function deleteItem(task) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`tasks/${auth.id}/${task.key}`) // removing item
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteItem :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_TASK_ERROR,
            payload: error
          });
        }
      });
      // add person to auth
    firebase.child(`history/${auth.id}/${task.key}`) // adding to history who take what item
      .push({title: task.title, id: auth.id}, error => {
        if (error) {
          console.error('ERROR @ deleteItem :', error); // eslint-disable-line no-console
          // dispatch({
          //   type: ADD_TO_HISTORY,
          //   payload: error
          // });
        }
      });
  };
}

export function registerListeners() {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.child(`tasks/${auth.id}`);

    ref.on('child_added', snapshot => dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
  };
}


function recordFromSnapshot(snapshot) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
