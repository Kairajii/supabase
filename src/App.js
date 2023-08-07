import React,{useEffect, useState} from 'react'
import './App.css'
import { supabase } from './createClient'
const App = () => {
const [users , setUsers] = useState([]);
const [user,setUser] = useState({
  name:'',
  age:''
})

const [user2,setUser2] = useState({
  id:'',
  name:'',
  age:''
})

useEffect(()=>{
  fetchUsers();
},[])

async function fetchUsers(){
  const {data} =await supabase.from('users').select('*');
  setUsers(data);
}
console.log(user)

const handleChange=(e)=>{
  setUser(prevValue=>{
    return {
      ...prevValue,
      [e.target.name]:e.target.value
    }
  })
}
const handleChange2=(e)=>{
  setUser2(prevValue=>{
    return {
      ...prevValue,
      [e.target.name]:e.target.value
    }
  })
}
async function handleSubmit(e){
  e.preventDefault();
  await supabase.from('users').insert({name:user.name,age:user.age});
}

async function handleDelete(id){
  const {data,error} = await supabase
  .from('users')
  .delete()
  .eq('id',id)

  fetchUsers()
  if(error) console.log(error)
  if(data) console.log(data)
  
}

async function updateSubmit(id){
  const {data,error} = await supabase
  .from('users')
  .update({id:user2.id,name:user2.name,age:user2.age})
  .eq('id',id)
  fetchUsers()
  if(error) console.log(error)
  if(data) console.log(data);
}

function displayUser(id){
  users.map((user)=>(
    (user.id) === id ? setUser2({id:user.id,name:user.name,age:user.age}) : null
  ))
}

  return (
    <>
    {/* form 1 */}
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Enter your name' name='name' onChange={handleChange}/>
      <input type="number" placeholder='Enter your age' name='age' onChange={handleChange}/>
      <button type='submit'>Create</button>
    </form>

    {/* form 2 */}
    <form onSubmit={()=>updateSubmit(user2.id)}>
      <input type="text" defaultValue={user2.name} name='name' onChange={handleChange2}/>
      <input type="number" defaultValue={user2.age} name='age' onChange={handleChange2}/>
      <button type='submit' >Update</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user)=>(
            <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>
            <button style={{marginLeft:'8px'}} onClick={()=>{handleDelete(user.id)}}>delete</button>
            <button onClick={()=>displayUser(user.id)}>edit</button>
          </td>
        </tr>
          ))
        }
      </tbody>
    </table>
    
    </>
  )
}

export default App