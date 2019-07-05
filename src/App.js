import React from 'react';
import './App.css';
import axios from 'axios';

window.id = 0;

const Title = () => {
  return (
    <div>
       <div>
          <h1>to-do</h1>
       </div>
    </div>
  );
}

const TodoForm = ({ addTodo }) => {
  // Input tracker
  let input;

  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button onClick={() => {
          addTodo(input.value);
          input.value = '';
        }}
      >
        +
      </button>
    </div>
  );
};

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<li onClick={() => remove(todo.id)}>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul>{todoNode}</ul>);
}



class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }

    this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos';
  }

    // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
  }
  // Add todo handler
  addTodo(val){
    if (!val) {
      alert('To do must not be blank');

    } else {
      // Assemble data
      const todo = {text: val, id: window.id++}
      // Update data
      this.state.data.push(todo);
      // Update state
      this.setState({data: this.state.data});
      
    }
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }

  render(){
    // Render JSX
    return (
      <div>
        <Title />
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp






