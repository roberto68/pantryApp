import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { tasksActions } from 'src/core/tasks';
import { ItemFilters } from './task-filters';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';


export class Tasks extends Component {
  static propTypes = {
    createTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    registerListeners: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    undeleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.registerListeners();
  }

  render() {
    const {
      createTask,
      deleteTask,
      location,
      tasks,
      updateTask
    } = this.props;

    const { filter } = location.query;

    return (
      <div className="g-row">
        <div className="g-col">
          <TaskForm createTask={createTask} />
        </div>
        <div className="g-col">
          <ItemFilters filter={filter} />
          <TaskList
            deleteTask={deleteTask}
            filter={filter}
            tasks={tasks}
            updateTask={updateTask}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  tasks: state.tasks.list
}), Object.assign({}, tasksActions))(Tasks);
