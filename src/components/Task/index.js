
import './index.css'

const Task = props => {
  const {propp,onDelete,onUpdate,onclickMarkasCompleted} = props
  const {id, title, date, isStarred,Description,priority,isCompleted} = propp
  const handleDelete = () => {
    onDelete(id);
  };
  
  const onclickupdate=()=>{
    onUpdate(id)
  }
  
  

  const onclickMarkascompleted=()=>{
    onclickMarkasCompleted(id)
  }
  
  return (
    <li>
      <div>
        <p><span className='spanEl'>Priority:</span> {priority}</p>
        <div className='status-container'>
          <span className='spanEl'>Status: </span>
          {isCompleted ? <img className='pending-img' src="https://tse1.mm.bing.net/th?id=OIP.D7jjGJs5sBtL-vB14HWaRgHaHa&pid=Api&P=0&h=180"/> : <img className='pending-img' src="https://tse1.mm.bing.net/th?id=OIP.p6WWIxUJDuKki6JLu3EhpAHaHa&pid=Api&P=0&h=180"/> }
        </div>
        <p className="ap-title"> <span className='spanEl'>Title:</span> {title}</p>
        <p className="ap-title"> <span className='spanEl'>Description: </span>{Description}</p>
      </div>
      <div className="ap-container">
        <button
          onClick={onclickupdate}
          type="button"
          className="update-btn"
        >
          Edit
        </button>
        <button
          onClick={onclickMarkascompleted}
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
      <p className="date-para"> <span className='spanEl'>Due Date: </span>{date}</p>
    </li>
  )
}
export default Task
