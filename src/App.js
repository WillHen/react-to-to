import React from 'react';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

window.id = 0;

const Title = () => {
  return (
    <div>
      <div>
        <h1>to-do</h1>
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo, setDate }) => {
  // Input tracker
  let input;

  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          addTodo(input.value);
          input.value = '';
        }}
      >
      </button>
    </div>
  );
};

const Todo = ({ todo, remove, setDate }) => {
  // Each Todo
  return (
    <div>
      <li onClick={() => remove(todo.id)}>{todo.text}</li>
      <DatePickerToDo todo={todo}  setDate={setDate}/>
     </div>
      )
};

const DatePickerToDo = ({ todo, setDate }) => {
  return (
    console.log(todo),
    <DatePicker selected={todo.date} onChange={(date) => {setDate(todo, date)}} />
  );
};

const TodoList = ({ todos, remove, setDate }) => {
  // Map through the todos
  const todoNode = todos.map(todo => {
    return <Todo todo={todo} key={todo.id} remove={remove} setDate={setDate}/>;
  });
  return <ul>{todoNode}</ul>;
};

class TodoApp extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    };

  }


  // Add todo handler
  addTodo(val, time) {
    if (!val) {
      alert('To do must not be blank');
    } else {
      // Assemble data
      const todo = { text: val, id: window.id++, date: new Date() };
      // Update data
      this.state.data.push(todo);
      // Update state
      this.setState({ data: this.state.data });
    }
  }

  setToDoDate(todo, val) {
    todo.date = val;
    this.setState({data: this.state.data})
  }
  // Handle remove
  handleRemove(id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter(todo => {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({ data: remainder });
  }

  render() {
    // Render JSX
    return (
      <div>
        <Title />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
          setDate={this.setToDoDate.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp;
