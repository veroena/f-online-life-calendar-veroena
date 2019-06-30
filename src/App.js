import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moods: JSON.parse(localStorage.getItem('moods')) || [],
      date: "",
      mood: "",
      message: "",
      isEmpty: false,
      repeatedDate: false
    }
    this.getDate = this.getDate.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getMood = this.getMood.bind(this);
    this.saveDailyMood = this.saveDailyMood.bind(this);
    this.checkDate = this.checkDate.bind(this);
  }

  getDate(event) {
    const currentDate = event.currentTarget.value;
    this.setState({date: currentDate, repeatedDate: false});
  }

  getMood(event) {
    const currentMood = event.currentTarget.value;
    this.setState({mood: currentMood});
  }

  getMessage(event) {
    const currentMessage = event.currentTarget.value;
    this.setState({message: currentMessage});
  }

  saveDailyMood(event) {
    event.preventDefault();
    const {date, mood, message} = this.state;
    const dailyObject = {date, mood, message};
    if(date !== '' && mood !== '' && this.checkDate() === true) {
      this.setState(prevState => {
        const newMoods = [...prevState.moods, dailyObject]
        localStorage.setItem('moods', JSON.stringify(newMoods));
        return ({moods : newMoods, date: '', mood: '', message: '', isEmpty: false}); 
      });
    } else if (date === '' && mood === ''){
      this.setState({isEmpty: true});
    }
  }

  checkDate() {
    const {moods, date} = this.state;
    if (moods.length !== 0) {
      const sameDate = moods.find(item => item.date === date);
      if (sameDate === undefined) {
        return true;
      } else {
        this.setState({repeatedDate: true, date: '', mood: '', message: ''});
        return false;
      }
    } else {
      return true;
    }
  }

  // saveData(obj) {
  //   localStorage.setItem('moods', JSON.stringify(obj))
  // }

  // componentDidMount() {
    
  // }

  render() {
    const { date, message, moods, mood, isEmpty, repeatedDate } = this.state;
    return (
      <div className="App">
        <form action="" className="form__moods">
          <fieldset className={`form__fieldset fieldset__date ${isEmpty && date === '' ? 'red' : null}`}>
            <label htmlFor="date" className="label__date">Fecha</label>
            <input type="date" className="input__date" id="date" onChange={this.getDate} value={date}/>
            {isEmpty && date === '' ? <p className="error__date">Por favor, introduce una fecha válida</p> : null}
            {repeatedDate ? <p className="error__date">Ya introdujiste una entrada con esta fecha</p> : null}
          </fieldset>
          <fieldset className={`form__fieldset fieldset__mood ${isEmpty && mood === '' ? 'red' : null}`}>
            <label htmlFor="mood" className="label__mood">Estado</label>
            <input type="radio" className="input__mood" id="mood" value=":)" onChange={this.getMood} checked={mood === ':)'}/> :)
            <input type="radio" className="input__mood" id="mood" value=":(" onChange={this.getMood} checked={mood === ':('}/> :(
            {isEmpty && mood === '' ? <p className="error__mood">Por favor, selecciona una opción</p> : null}            
          </fieldset>
          <fieldset className="form__fieldset fieldset__message">
            <label htmlFor="message" className="label__message">Mensaje</label>
            {mood !== ':(' ?
              <input type="message" className="input__message" id="message" onChange={this.getMessage} value={message} placeholder="¿Por qué ha sido un buen día?"/>
            :
              <p className="message__sad">De esto no hace falta acordarnos ;)</p>
            }
          </fieldset>
          <button className="button__save" onClick={this.saveDailyMood}>Guardar</button>
          <button className="button__cancel">Cancelar</button>
        </form>
        <div className="moods">
            {moods.length === 0 ?
              null
            :
              <ul className="moods__list">
                {moods.map((item, index) =>
                  <li className="moods__item" key={index}>
                    {item.mood === ':)' ?
                      <p className="moods__item--happy">:)</p>
                    :
                      <p className="moods__item--sad">:(</p>
                    }
                  </li>
                )}
              </ul>
            }
        </div>
  
      </div>
    );
  }
}

export default App;
