import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { tasksActions } from 'src/core/tasks';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';


export class Tasks extends Component {
  static propTypes = {
    createTask: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
  };
  constructor(props, context){
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, selected) {
    e.preventDefault();
    deleteItem(selected);
  }

  render() {
    const {
      createTask,
      tasks
    } = this.props;

    const selected = (tasks) => {
      tasks.filter((task) => {
      return task.selected === true ? task : null; //je to dobre ??
      });
    }

    return (
      <div className="g-row">
        <div className="g-col">
          <TaskForm createTask={createTask} />
        </div>
        <div className="g-col">
          <TaskList tasks={tasks} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit(selected)}>pick selected from store</button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({tasks: state.tasks.list}), Object.assign({}, tasksActions))(Tasks);
