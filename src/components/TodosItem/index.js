// Write your code here
import { useState } from 'react';
import './index.css'

const TodosItem = props => {
  const {propp, func,onDelete,onUpdate} = props
  const {id, title, date, isStarred,Description} = propp
  const handleDelete = () => {
    onDelete(id);
  };
  const onclickstarr = () => {
    func(id)
  }
  const onclickupdate=()=>{
    onUpdate(id)
  }
  const [isCompleted,handleToggleComplete]=useState(false)

  const onclickMarkasCompleted=()=>{
    handleToggleComplete(prev=>!prev)
  }
  let a
  if (isStarred) {
    a =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  } else {
    a = 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  }
  return (
    <li>
      <div>
      {isCompleted ? <img className='pending-img' src="https://tse1.mm.bing.net/th?id=OIP.D7jjGJs5sBtL-vB14HWaRgHaHa&pid=Api&P=0&h=180"/> : <img className='pending-img' src="https://tse1.mm.bing.net/th?id=OIP.p6WWIxUJDuKki6JLu3EhpAHaHa&pid=Api&P=0&h=180"/> }
        <p className="ap-title">{title}</p>
        <p className="ap-title">{Description}</p>
      </div>
      <div className="ap-container">
        <button
          onClick={onclickstarr}
          data-testid="star"
          type="button"
          className="star-btn"
        >
          <img alt="star" src={a} />
        </button>
        <button
          onClick={onclickupdate}
          type="button"
          className="update-btn"
        >
          Update
        </button>
        <button
          onClick={onclickMarkasCompleted}
          type="button"
          className="complete-btn"
        >
          {isCompleted ? ' Undo' : 'Mark as Complete'}
        </button>
        <button
          onClick={handleDelete}
    
          type="button"
          className="delete-btn"
        >
          Delete
        </button>

      </div>
      <p className="date-para">{date}</p>
    </li>
  )
}
export default TodosItem
