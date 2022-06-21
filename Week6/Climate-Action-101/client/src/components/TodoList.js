import React from 'react'
import todo from '../../../models/todo';
import Todo from '../components/Todo'

export default function TodoList(props){
  const { todos } = props
  const reverseMap = todos.map(issue => <Todo {...todo} key={todo._id}/>).reverse();
  return (
    <div className="todo-list">
      { reverseMap }
    </div>
  )
}