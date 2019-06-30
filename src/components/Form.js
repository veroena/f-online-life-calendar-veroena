import React from 'react';
import {Link} from 'react-router-dom';

class Form extends React.Component {
  render() {
    const { isEmpty, date, repeatedDate, mood, message, getMessage, getDate, getMood, saveDailyMood } = this.props;
    return(
      <form action="" className="form__moods">
        <fieldset className={`form__fieldset fieldset__date ${isEmpty && date === '' ? 'red' : null}`}>
          <label htmlFor="date" className="label__date">Date</label>
          <input type="date" className="input__date" id="date" onChange={getDate} value={date}/>
          {isEmpty && date === '' ? <p className="error__date">Please, introduce a valid date</p> : null}
          {repeatedDate ? <p className="error__date">You already set a mood for this date</p> : null}
        </fieldset>
        <fieldset className={`form__fieldset fieldset__mood ${isEmpty && mood === '' ? 'red' : null}`}>
          <label htmlFor="mood" className="label__mood">Mood</label>
          <input type="radio" className="input__mood" id="mood" value=":)" onChange={getMood} checked={mood === ':)'}/> :)
          <input type="radio" className="input__mood" id="mood" value=":(" onChange={getMood} checked={mood === ':('}/> :(
          {isEmpty && mood === '' ? <p className="error__mood">Please, select an option</p> : null}            
        </fieldset>
        <fieldset className="form__fieldset fieldset__message">
          <label htmlFor="message" className="label__message">Message</label>
          {mood !== ':(' ?
            <input type="message" className="input__message" id="message" onChange={getMessage} value={message} placeholder="Why was it a good day?"/>
          :
            <p className="message__sad">We don't need to remember this ;)</p>
          }
        </fieldset>
        <Link onClick={saveDailyMood} to="/" className="button__save" >Save</Link>
        <Link to="/" className="button__cancel">Cancel</Link>
      </form>
    );
  }
}

export default Form;