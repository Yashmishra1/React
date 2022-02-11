import { useEffect } from 'react';
import React from 'react';
import './index.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className='todo'>
      <span style={{ textDecoration: todo.isDone ? 'line-through' : '' }}>
        {todo.text}
      </span>
      <div>
        <Button variant='outline-success' onClick={() => markTodo(index)}>
          ✓
        </Button>{' '}
        <Button variant='outline-danger' onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Title</b>
        </Form.Label>
        <Form.Control
          type='text'
          className='input'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Add desc'
        />
      </Form.Group>
      <Button variant='primary mb-3' type='submit'>
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: 'This is a sampe todo',
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    console.log('this is ', newTodos);
    fetch('http://localhost:5000', {
      method: 'POST',
      mode: 'cors',
      header: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(text),
    }).then((response) =>
      response.json().then((data) => {
        console.log(data);
        setTodos(data);
      })
    );
    // setTodos(newTodos);
  };

  // const markTodo = index => {
  //   const newTodos = [...todos];
  //   newTodos[index].isDone = true;
  //   setTodos(newTodos);

  // };

  // const removeTodo = index => {
  //   const newTodos = [...todos];

  //   newTodos.splice(index, 1);
  //   setTodos(newTodos);
  // };

  // useEffect(() => { fetch('http://localhost/5000') .then(response.ok)
  //   {
  //     if(response.ok) {
  //       return response.json()
  //     }
  //     throw response;
  //   }}.then(data => { setData(data);
  //   })
  //   .catch(error => {
  //     console.error("Error fetching data: ", error);
  //     setData(error);
  // })
  // } , [] )

  return (
    <div className='app'>
      <div className='container'>
        <h1 className='text-center mb-4'>Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  // markTodo={markTodo}
                  // removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
