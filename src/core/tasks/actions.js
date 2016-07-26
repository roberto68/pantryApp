import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  TOGGLE
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
// doplnit do db kto(auth.id) co pridal, zobral
export function deleteItem(task) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    // ceknut priradovanie: ako je v orgininali index(client)-key(server)
    firebase.child(`tasks/${auth.id}/${task.key}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteItem :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_TASK_ERROR,
            payload: error
          });
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
