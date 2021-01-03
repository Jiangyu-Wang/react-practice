import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import './style.css';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input 
            id="insertArea" 
            className='input' 
            value={this.state.inputValue} 
            onChange={this.handleInputChange} 
            ref={(input) => {this.input = input}} 
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>{ this.getTodoItem() }</ul>
      </Fragment>
    )
  }

  componentDidMount() {
    axios.get('/api/todolist')
      .then((res)=>{
        this.setState(() => ({
            list: [...res.data]            
        }));
      })
      .catch(()=>{alert('error')})
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem 
          key={item}
          content={item} 
          index={index} 
          deleItem={this.handleItemDelete} 
        />
      )
    });
  }

  handleInputChange(e) {
    const value = this.input.value;
    this.setState(() => ({
      inputValue: value
    }));
  }

  handleBtnClick() {
    this.setState((prevState) => ({
      inputValue: '',
      list: [...prevState.list, prevState.inputValue]
    }));
  }

  handleItemDelete(index) {
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list }
    });
  }

}

export default TodoList;
