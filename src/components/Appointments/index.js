// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const List = []
class Appointments extends Component {
  state = {appointmentList: List, title: '', date: '', status: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      star: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  favoriteAppointment = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, star: !eachAppointment.star}
        }
        return eachAppointment
      }),
    }))
  }

  addFavoriteItems = () => {
    const {status} = this.state
    this.setState({status: !status})
  }

  render() {
    const {appointmentList, title, date, status} = this.state
    const result = status
      ? appointmentList.filter(eachAppointment => eachAppointment.star === true)
      : appointmentList

    return (
      <div className="bg-container">
        <div className="sub-container">
          <div className="flex">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  placeholder="Title"
                  id="title"
                  className="input-box"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  id="date"
                  placeholder="dd/mm/yyy"
                  type="date"
                  className="input-box"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <br />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-card">
            <h1 className="card-heading">Appointments</h1>
            {status ? (
              <button
                type="button"
                className="button-starred"
                onClick={this.addFavoriteItems}
              >
                Starred
              </button>
            ) : (
              <button
                type="button"
                className="starred-button"
                onClick={this.addFavoriteItems}
              >
                Starred
              </button>
            )}
          </div>
          <ul>
            {result.map(eachAppointment => (
              <AppointmentItem
                eachAppointment={eachAppointment}
                key={eachAppointment.id}
                favoriteAppointment={this.favoriteAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
