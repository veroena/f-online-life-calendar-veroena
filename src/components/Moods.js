import React from 'react';
import {Link} from 'react-router-dom';

class Moods extends React.Component {
  render() {
    const {moods} = this.props;
    return(
      <div className="moods__container">
        <Link to="/form" className="moods__link">
          <div className="moods__button">+</div>
        </Link>
        <div className="moods">
          {moods.length === 0 ?
            <p className="no__">Start by adding your mood today!</p>
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

export default Moods;