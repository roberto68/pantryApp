import React, { Component, PropTypes } from 'react';
import { tasksActions } from 'src/core/tasks';

export class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired
  };

  renderTask() {
    const { toggleSelected, tasks } = this.props;
    const radioOnChange = (index) => { // really ugly and not working anyway :D
      this.props.toggleSelected(index);
      console.log(index);
    }

    return tasks.map((task, index) => {
        console.log(index, task.key)
        return (
          <input
            type="radio"
            value={task.title}
            key={index}
            className={classNames('task-item__button', {'hide': editing})}
            onClick={this.radioOnChange.bind(this, index)}>
          </input>
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
