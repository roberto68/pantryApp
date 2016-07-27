import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { tasksActions } from 'src/core/tasks/index';
// import { deleteItem, createTask, toggleSelected } from 'src/core/tasks/actions';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';


export class Tasks extends Component {
  static propTypes = {
    createTask: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired
  };
  // constructor(props, context){
  //   super(props, context);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  handleSubmit(e, selected) {
    e.preventDefault();
    deleteItem(selected);
  }

  render() {
    console.log(tasks);
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
          <TaskList tasks={tasks} toggleSelected={toggleSelected} />
        </div>
        <div>
          <button type="submit" onClick={(e) => this.handleSubmit(e, selected)}>pick items from store</button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({tasks: state.tasks.list}), Object.assign({}, {deleteItem, createTask, toggleSelected }))(Tasks);
export default connect(state => ({tasks: state.tasks.list}), Object.assign({}, {tasksActions}))(Tasks);
