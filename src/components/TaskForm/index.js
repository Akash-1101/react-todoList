import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Task from '../Task';
import './index.css';

const initialTaskList = [];

const Todos = () => {
  const [taskList, setTaskList] = useState(initialTaskList);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [Description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [TodoListBackUp, setTodoListBackUp] = useState([]);

  const onchangetitle = (event) => {
    setTitle(event.target.value);
  };

  const onchangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onchangepriority = (event) => {
    console.log(event.target.value);
    setPriority(event.target.value);
  };

  const onchangeDate = (event) => {
    const date1 = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE');
    setDate(date1);
    setValueDate(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();

    // Validate title
    if (!title.trim()) {
      alert('Title cannot be empty');
      return;
    }

    // Validate date
    if (!date) {
      alert('Please select a date');
      return;
    }

    // Validate priority
    if (!priority.trim() || priority === 'Select') {
      alert('Please select a priority');
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      date,
      Description,
      priority,
      isStarred: false,
      isCompleted: false,
    };

    setTaskList([...taskList, newTask]);
    setTitle('');
    setDate('');
    setDescription('');
    setValueDate('');
    setPriority('');
    setTodoListBackUp([...taskList, newTask]);
  };

  
  const onclickMarkasCompleted = (id) => {
    setTaskList(
      taskList.map((each) => {
        if (each.id === id) {
          return { ...each, isCompleted: !each.isCompleted };
        }
        return each;
      })
    );
    setTodoListBackUp(
      taskList.map((each) => {
        if (each.id === id) {
          return { ...each, isCompleted: !each.isCompleted };
        }
        return each;
      })
    );
  };

  const filterTasksByCompletionStatus = (status) => {
    const filteredList = taskList.filter((task) => task.isCompleted === status);
    setTaskList(filteredList);
  };

  const sortTasksByPriority = () => {
    const sortedList = taskList.slice().sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    setTaskList(sortedList);
  };

  const sortTasksByDueDate = () => {
    const sortedList = taskList.slice().sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setTaskList(sortedList);
  };

  const onDelete = (id) => {
    const filteredList = taskList.filter((each) => each.id !== id);
    setTaskList(filteredList);
    setTodoListBackUp(filteredList);
  };

  const clearAllFilters = () => {
    setTaskList(TodoListBackUp);
  };

  const onUpdate = (id) => {
    const filteredList = taskList.filter((each) => each.id === id);
    const filteredList2 = taskList.filter((each) => each.id !== id);
    setTitle(filteredList[0].title);
    setDate(filteredList[0].date);
    setDescription(filteredList[0].Description);
    setTaskList(filteredList2);
  };

  useEffect(() => {
    console.log(priority);
  }, [priority]);

  return (
    <div className="bg-main-container">
      <div className="bg-container1">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
            className="todoListImg"
          />
          <form className="form" onSubmit={addTask}>
            <h1 className="main-heding">Task Manager</h1>
            <h1>Add Task</h1>
            <label htmlFor="title" className="title">
              Title
            </label>
            <br />
            <input
              id="title"
              onChange={onchangetitle}
              className="inputTitle"
              placeholder="Title"
              type="text"
              value={title}
            />
            <br />
            <label htmlFor="title" className="title">
              Description
            </label>
            <br />
            <input
              id="Description"
              onChange={onchangeDescription}
              className="inputTitle"
              placeholder="Description"
              type="textArea"
              value={Description}
            />
            <br />
            <label htmlFor="date2" className="title">
              Date
              <br />
            </label>
            <input id="date2" onChange={onchangeDate} className="inputTitle" type="date" value={valueDate} />
            <br />
            <label className="title">Priority</label>
            <br />
            <select onChange={onchangepriority} value={priority} className="priorityInput">
              <option value="Select">--Select--</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <br />
            <button className="buttonEle" type="submit">
              Add
            </button>
          </form>
        </div>
        <hr />
        <h1> Filters</h1>
        <div className="filters-container">
          <button className="button0" onClick={() => filterTasksByCompletionStatus(true)}>
            Completed Tasks
          </button>
          <button className="button0" onClick={() => filterTasksByCompletionStatus(false)}>
            Pending Tasks
          </button>
          <button className="button0" onClick={sortTasksByPriority}>
            Sort by Priority
          </button>
          <button className="button0" onClick={sortTasksByDueDate}>
            Sort by Due Date
          </button>
          <button className="button0 btn2" onClick={clearAllFilters}>
            Clear All Filters
          </button>
        </div>
        <div className="appointmens-container">
          <div className="bg-container21">
            <h1>Tasks {taskList.length}</h1>
          </div>
          <ul>
            {taskList.map((each) => (
              <Task
                
                key={each.id}
                propp={each}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onclickMarkasCompleted={onclickMarkasCompleted}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todos;
