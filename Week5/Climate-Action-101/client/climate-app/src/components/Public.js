import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import IssueList from '../components/IssueList'
import Navbar from '../components/Navbar'

export default function Public(){

  const { getAllTodos, allTodos } = useContext(UserContext)
  const [getTodos, setTodos] = useState(allTodos);
  
   useEffect(() => {
    getAllTodos()
   },[]);
  

  return (
    <div className="public">
        <Navbar />
        <TodoList todos={getAllTodos}/> 
    </div>
  )
}