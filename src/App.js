import React from 'react';
import Form from './components/Form';
import Moods from './components/Moods';
import {Route, Switch} from 'react-router-dom';

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
    const {date, mood, message} = this.state;
    const dailyObject = {date, mood, message};
    if(date !== '' && mood !== '' && this.checkDate() === true) {
      this.setState(prevState => {
        const newMoods = [...prevState.moods, dailyObject]
        localStorage.setItem('moods', JSON.stringify(newMoods));
        return ({moods : newMoods, date: '', mood: '', message: '', isEmpty: false}); 
      });
    } else if (date === '' || mood === ''){
      event.preventDefault();
      this.setState({isEmpty: true});
    } else if (date === '' && mood === ''){
      event.preventDefault();
      this.setState({isEmpty: true});
    } else if(this.checkDate() === false) {
      event.preventDefault();
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

  render() {
    const { date, message, moods, mood, isEmpty, repeatedDate } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route path="/form" render={() => (
            <Form
              isEmpty={isEmpty}
              date={date}
              repeatedDate={repeatedDate}
              mood={mood}
              message={message}
              getMessage={this.getMessage}
              getDate={this.getDate}
              getMood={this.getMood}
              saveDailyMood={this.saveDailyMood}
            />
          )}/>
          <Route path="/" render={() => (
            <Moods moods={moods} />)}
          />
        </Switch>
      </div>
    );
  }
}

export default App;


