import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moods: [],
      date: "",
      mood: "",
      message: ""
    }
    this.getDate = this.getDate.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getMood = this.getMood.bind(this);
    this.getDailyObject = this.getDailyObject.bind(this);
  }

  getDate(event) {
    const currentDate = event.currentTarget.value;
    this.setState({date: currentDate});
  }

  getMood(event) {
    const currentMood = event.currentTarget.value;
    this.setState({mood: currentMood});
  }

  getMessage(event) {
    const currentMessage = event.currentTarget.value;
    this.setState({message: currentMessage});
  }

  getDailyObject(event) {
    event.preventDefault();
    const {date, mood, message} = this.state;
    const dailyObject = {date, mood, message};
    this.setState(prevState => ({moods : [...prevState.moods, dailyObject]}));
  }

  // componentDidMount() {
    
  // }

  render() {
    const { date, message, moods, mood } = this.state;
    return (
      <div className="App">
        <form action="" className="form__moods">
          <fieldset className="form__fieldset fieldset__date">
            <label htmlFor="date" className="label__date">Fecha</label>
            <input type="date" className="input__date" id="date" onChange={this.getDate} value={date}/>
          </fieldset>
          <fieldset className="form__fieldset fieldset__state">
            <label htmlFor="state" className="label__state">Estado</label>
            <input type="checkbox" className="input__state" id="state" value=":)" onChange={this.getMood}/> :)
            <input type="checkbox" className="input__state" id="state" value=":(" onChange={this.getMood}/> :(
          </fieldset>
          <fieldset className="form__fieldset fieldset__message">
            {mood !== ':(' ?
              <div className="container__message">
                <label htmlFor="message" className="label__message">Mensaje</label>
                <input type="message" className="input__message" id="message" onChange={this.getMessage} value={message} placeholder="¿Por qué ha sido un buen día?"/>
              </div>
            :
              null
              // <div className="container__message">
              //   <label htmlFor="message" className="label__message">Mensaje</label>
              //   <input type="text" className="input__message" id="message" placeholder="De esto no hace falta acordarse"/>
              // </div>
            }
          </fieldset>
          <button className="button__save" onClick={this.getDailyObject}>Guardar</button>
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
