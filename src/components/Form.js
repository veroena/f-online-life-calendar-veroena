import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { isEmpty, date, repeatedDate, mood, message, getMessage, getDate, getMood, saveDailyMood } = this.props;
    return(
      <div className="form__container">
        <form action="" className="form__moods">
          <fieldset className={`form__fieldset fieldset__date ${isEmpty && date === '' ? 'red' : null}`}>
            <label htmlFor="date" className="labels label__date">Date</label>
            <input type="date" className={`input__date ${(repeatedDate) || (isEmpty && date === '') ? 'border-red' : null}`} id="date" onChange={getDate} value={date}/>
            {isEmpty && date === '' ? <p className="error__date">Please, introduce a valid date</p> : null}
            {repeatedDate ? <p className="error__date">You already set a mood for this date</p> : null}
          </fieldset>
          <fieldset className={`form__fieldset fieldset__mood ${isEmpty && mood === '' ? 'red' : null}`}>
            <label htmlFor="mood" className="labels label__mood">Mood</label>
            <div className={`mood__radio--container ${isEmpty && mood === "" ? 'border-red' : null}`}>
              <input type="radio" className="input__mood input__mood--happy" id="mood" value=":)" onChange={getMood} checked={mood === ':)'}/> :)
              <input type="radio" className="input__mood input__mood--sad" id="mood" value=":(" onChange={getMood} checked={mood === ':('}/> :(
            </div>
            {isEmpty && mood === '' ? <p className="error__mood">Please, select an option</p> : null}            
          </fieldset>
          <fieldset className="form__fieldset fieldset__message">
            <label htmlFor="message" className="labels label__message">Message</label>
            {mood !== ':(' ?
              <input type="text" className="input__message" id="message" onChange={getMessage} value={message} placeholder="Why was it a good day?"/>
            :
              <p className="message__sad">It's better to remember the good moments ;)</p>
            }
          </fieldset>
          <Link onClick={saveDailyMood} to="/" className="button__link button__save" >Save</Link>
          <Link to="/" className="button__link button__cancel">Cancel</Link>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
  date: PropTypes.string, 
  repeatedDate: PropTypes.bool.isRequired,
  mood: PropTypes.string,
  message: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  getDate: PropTypes.func.isRequired,
  getMood: PropTypes.func.isRequired,
  saveDailyMood: PropTypes.func.isRequired
}

export default Form;