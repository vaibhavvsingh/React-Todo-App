import { useEffect, useState } from 'react';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import './App.css';
import Todo from './todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');
  // console.log('🔫' , input);

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id,todo: doc.data().todo})));
    });
  },[])

  const addTodo = (event) => {
    event.preventDefault(); // will stop from REFRESH
    console.log('Im Working');

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput(''); // clear up the input after clickoing the add button
  }

  return (
    <div className="App">
      <h1>🔥Todo App with REACT and Firebase</h1>
      <form action="">
        <FormControl>
          <InputLabel> ✅ Write a Todo</InputLabel>
          <Input value={input} onChange={changeEvent => setInput(changeEvent.target.value)} />
        </FormControl>
        {/* <input value={input} onChange={changeEvent => setInput(changeEvent.target.value)} /> */}
        {/* <button type="submit" onClick={addTodo}>Add Todo</button> */}
        <Button disabled={!input} variant= "contained" color="primary" type="submit" onClick={addTodo}>Add Todo</Button>
      </form>

      <ul>
        {todos.map(todo =>(
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
