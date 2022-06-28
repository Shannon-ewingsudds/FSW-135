import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import axios from 'axios'


export default function Issue(props){
  const userAxios = axios.create();

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

const { title, description, imgUrl, _id,   } = props
const [upthumb, setUpThumb] = useState(null);



  function upThumb(id){
    userAxios.put(`/api/issue/${id}`)
    .then(res => {
      setUpThumb(res.data)
    })
    .catch(err => console.log(err.response.data.errMsg))
  }
    
  function getUpThumb(id){
    userAxios.get(`/api/issue/${id}`)
    .then(res => {
      setUpThumb(res.data)
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

  const getUpthumbHandler = async () => {

    const id = _id.trim();
    getUpThumb(id)

    console.log(!upthumb);
  }

  const upthumbHandler = async () => {

    const id = _id.trim();
    upThumb(id)

    console.log(!upthumb);
  }

  useEffect(() => {
    getUpthumbHandler()
   }, []);

  return (
    <div className="issue">
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <img src={imgUrl} alt={imgUrl} width={300}/>
      { upthumb ? 
      <button style={{backgroundColor: "blue", borderColor: "transparent", fontSize:"30px"}} 
              onClick={upthumbHandler}>&#128077;
      </button>
      :
      <button style={{backgroundColor: "transparent", borderColor: "transparent", fontSize:"30px"}} 
              onClick={upthumbHandler}>&#128077;
      </button>
      }
    </div>
  )
}