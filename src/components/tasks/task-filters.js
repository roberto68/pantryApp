import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';


export function ItemFilters({filter}) {
  return (
    <ul className="task-filters">
      <li><Link className={classNames({active: !filter})} to="/tasks">All items</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/tasks', query: {filter: 'active'}}}>my items</Link></li>
    </ul>
  );
}

ItemFilters.propTypes = {
  filter: PropTypes.string
};
