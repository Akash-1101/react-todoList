import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import TodosItem from '../TodosItem'
import './index.css'

const initialAppointmentList = []

class Todos extends Component {
  state = {
    appointmentList: initialAppointmentList,
    title: '',
    date: '',
    Description:"",
    isstarredd: false,
  }

  onchangetitle = event => {
    this.setState({title: event.target.value})
  }

  onchangeDescription = event => {
    this.setState({Description: event.target.value})
  }

  onchangeDate = event => {
    const date1 = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({
      date: date1,
    })
  }

  addAppointment = event => {
    event.preventDefault()
    const {appointmentList, title, date,Description} = this.state
    const newItem = {
      id: uuidv4(),
      title,
      date,
      Description,
      isStarred: false,
    }

    this.setState({
      appointmentList: [...appointmentList, newItem],
      title: '',
      date: null,
      Description:"",
    })
  }

  onclickstar = id => {
    const {appointmentList} = this.state
    this.setState({
      appointmentList: appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    })
  }

  onclickstarred = () => {
    const {appointmentList, isstarredd} = this.state
    const filteredList = appointmentList.filter(each => each.isStarred === true)

    if (isstarredd) {
      this.setState({appointmentList, isstarredd: false})
    } else {
      this.setState({appointmentList: filteredList, isstarredd: true})
    }
  }

  onDelete=(id)=>{
    const {appointmentList} = this.state
    const filteredList = appointmentList.filter(each => each.id !== id)
    this.setState({appointmentList:filteredList})
  }

  onUpdate=(id)=>{
    const {appointmentList} = this.state
    const filteredList = appointmentList.filter(each => each.id === id)
    const filteredList2 = appointmentList.filter(each => each.id !== id)
    this.setState({ title:filteredList[0].title,
      date:filteredList[0].date,
      Description:filteredList[0].Description,appointmentList:filteredList2})
      
  }

  render() {
    const {appointmentList, title, date,Description} = this.state
    return (
      <div className="bg-main-container">
        <div className="bg-container1">
          <div className="form-container">
            <form onSubmit={this.addAppointment}>
              <h1 className='main-heding'>Todo List</h1>
              <h1>Add Task</h1>
              <label htmlFor="title" className="title">
                Title
              </label>
              <br />
              <input
                id="title"
                onChange={this.onchangetitle}
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
                onChange={this.onchangeDescription}
                className="inputTitle"
                placeholder="Description"
                type="text"
                value={Description}
              />
              <br />
              <label htmlFor="date2" className="title">
                Date
                <br />
              </label>
              <input
                id="date2"
                onChange={this.onchangeDate}
                className="inputTitle"
                type="date"
                value={date}
              />
              <br />
              <button className="buttonEle" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <hr />
          <div className="appointmens-container">
            <div className="bg-container21">
              <h1>Tasks {appointmentList.length}</h1>
              <button
                onClick={this.onclickstarred}
                type="button"
                className="buttenEl2"
              >
                Starred
              </button>
            </div>
            <ul>
              {appointmentList.map(each => (
                <TodosItem
                  func={this.onclickstar}
                  key={each.id}
                  propp={each}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Todos
