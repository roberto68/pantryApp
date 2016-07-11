import React, { Component, PropTypes } from 'react';
import { TaskItem } from './task-item';

export class TaskList extends Component {
  static propTypes = {
    selectItem: PropTypes.func.isRequired,
    filter: PropTypes.string,
    tasks: PropTypes.array.isRequired,
    updateTask: PropTypes.func.isRequired
  };

  this.radioOnChange = this.radioOnChange.bind(this);
  radioOnChange(e) {
    this.setState({check: e.target.value});
    console.log(this.state.check);
    // this.props.updateTask(this.props.task, {selected: checked}); pojde do reducera
  }

  renderTaskItems() {
    const {
      selectItem,
      filter,
      tasks,
      updateTask
    } = this.props;

    return tasks
      .filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return task;
      })
      .map((task, index) => {
        return (
          <div>
            <TaskItem
              selectItem={selectItem}
              key={index}
              task={task}
              updateTask={updateTask}
            />
            <input
              type="radio"
              key={index}
              checked={this.state.check}
              className={classNames('task-item__button', {'hide': editing})}
              onChange={this.radioOnChange}>
            </input>
        </div>
        ); // propagate index to task-item ??
      });
  }

  render() {
    return (
      <div className="task-list">
        {this.renderTaskItems()}
      </div>
    );
  }
}
