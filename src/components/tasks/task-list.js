import React, { Component, PropTypes } from 'react';
// import { toggleSelected } from 'src/core/tasks/actions';

export class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    toggleSelected: PropTypes.func.isRequired
  };

  renderTask() {
    const { toggleSelected, tasks } = this.props;

    return tasks.map((task, index) => {
        console.log(index, task.key)
        return (
          <li>
            <input
              type="radio"
              value={task.title}
              key={index}
              onClick={ toggleSelected(index)}>
            </input>
          </li>
        );
    });
  }

  render() {
    return (
        <div className="task-list">
          <ul>{this.renderTask()}</ul>
        </div>
    );
  }
}
