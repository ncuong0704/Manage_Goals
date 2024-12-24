import React from 'react'
import PropTypes from 'prop-types'
import TodoTable from './components/TodoTable'

const TodoFeature = ({title}) => {
  return (
    <div className="todo">
    <h2 className="todo__heading">{title}</h2>
      <TodoTable />
  </div>
  )
}

TodoFeature.propTypes = {
  title: PropTypes.string.isRequired,
}

export default TodoFeature
