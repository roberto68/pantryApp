import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  TOGGLE
} from './action-types';

export function toggleSelected(index) {
  return {
    type: TOGGLE,
    payload: index
  };
}
// este bych chel nacitat z db
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

export function deleteItem(task) { //
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const title = task.title;
    // const key = task.key;
    console.log(task); // nacitat zo state kt. je toggled

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
    // history is undefined ??
    firebase.child(`register/${auth.id}`)
      .push({title, id: auth.id}, error => {
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
    // const refRec = firebase.child(`history/${auth.id}`); // history

    ref.on('child_added', snapshot => {
      console.log(snapshot.val());
      console.log("dpc");
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: recordFromSnapshot(snapshot)
      });
    }
  );

    ref.on('child_removed', snapshot => {
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: recordFromSnapshot(snapshot)
      });
      // console.log(snapshot.val());
    }
   );
  };
}


function recordFromSnapshot(snapshot) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
