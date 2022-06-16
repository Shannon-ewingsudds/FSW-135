import React from 'react'
import TodoForm from './TodoForm.js'



export default function Profile(){
  return (
    <div className="profile">
      <h1>Welcome @Username!</h1>
      <h3>Add A Todo</h3>
      <TodoForm />
      <h3>Your Todos</h3>
    </div>
  )
}