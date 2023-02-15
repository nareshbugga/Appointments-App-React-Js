// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, favoriteAppointment} = props
  const {id, title, date, star} = eachAppointment

  const onAddFavorite = () => favoriteAppointment(id)
  const url = star
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="flex">
        <p className="title">{title}</p>
        <button type="button" onClick={onAddFavorite} data-testid="star">
          <img src={url} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">
        Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem
