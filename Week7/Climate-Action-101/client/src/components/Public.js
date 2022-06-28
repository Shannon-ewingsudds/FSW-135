import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import TodoList from './TodoList'
import Navbar from './Navbar'

export default function Public(){

  const { getAllTodos, allTodos } = useContext(UserContext)
  const [getTodos, setTodos] = useState(allTodos);
  
   useEffect(() => {
    getAllTodos()
   },[]);
  

  return (
    <div className="public">
        <Navbar />
        <TodoList todos={allTodos}/> 
    </div>
  )
}