import React, { useContext, useState, useEffect } from 'react'
import TodoForm from './TodoForm.js'
import TodoList from './TodoList.js'
import Todo from './Todo.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { 
    user: {username}, addTodo, todos, getUserTodos} = useContext(UserContext)

  const [getTodos, setTodos] = useState(todos);
    useEffect(() => {
     getUserTodos()
    },[getTodos]);
  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Todo</h3>
      <TodoForm addTodo={addTodo}/>
      <h3>Your Todos</h3>
      <TodoList todos={todos}/>
    </div>
  )
}