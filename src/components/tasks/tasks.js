import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { tasksActions } from 'src/core/tasks/index';
// import { deleteItem } from 'src/core/tasks/actions';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';

export class Tasks extends Component {
  static propTypes = {
    createTask: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired
  };

  // handleSubmit(e, selected) {
  //   e.preventDefault();
  //   deleteItem(selected);
  // }

  render() {
    const {
      createTask,
      deleteItem,
      toggleSelected,
      tasks
    } = this.props;
    console.log(tasks);

    const selected = tasks => {
      tasks.filter( task => {
        return task.selected === true ? task : null; // only filter selected
      });
    };
    // upravit stylovanie nemozem zobrazit ani toggle todos !!!!!
    return (
      <div>
        <div className="g-row">
          <TaskForm createTask={createTask} />
        </div>
        <div className="g-row">
          <TaskList tasks={tasks} toggleSelected={toggleSelected} />
        </div>
        <div className="g-row">
          <button type="submit" onClick={deleteItem(selected)}>pick items from store</button>
        </div>
      </div>
    );
  }
}
// export default connect(state => ({tasks: state.tasks.list}), Object.assign({}, {tasksActions}))(Tasks);
export default connect(state => ({tasks: state.tasks.list}), Object.assign({}, tasksActions))(Tasks);
