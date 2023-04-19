import './Today.css';
import { useState, useEffect } from 'react';

export const Today = (props) => {
  const x = props.data;
  const newArray = x.slice(1);
  const value = props.value;
  const DayName = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const handleDate = (data) => {
    var dateObject = new Date(data);
    var today = new Date();
    var index = dateObject.getDay();
    var todayIndex = today.getDay();
    if (index === todayIndex) {
      return 'Today';
    }

    return DayName[index];
  };
  useEffect(() => {
    console.log('dewwe', newArray);
  }, []);

  return (
    <div className="totalContainer">
      <div className="weatherContainer">
        <div className="todayContainer">
          <div>
            <img
              src={require(`../images/${x[0].weather[0].icon}.svg`)}
              className="imageContainer"
              alt="weather"
            />
          </div>
          <div className="detailsContainer">
            <div>{handleDate(x[0].dt_txt)}</div>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '25pt',
                marginBottom: '20px',
              }}
            >
              {value.toLowerCase().charAt(0).toUpperCase() +
                value.slice(1).toLowerCase()}
            </div>
            <div
              style={{
                color: '#365a7a',
              }}
            >
              Temperature:{parseInt(x[0].main.temp - 273)}°C
            </div>
            <div
              style={{
                color: '#365a7a',
              }}
            >
              {x[0].weather[0].description}
            </div>
          </div>
        </div>
      </div>
      <div className="subContainer">
        {newArray &&
          newArray.map((val, index) => {
            return (
              <div className="weatherContainer1">
                <div className="detailsContainer1">
                  <div>{handleDate(val.dt_txt)}</div>
                  <div>
                    <img
                      src={require(`../images/${val.weather[0].icon}.svg`)}
                      className="imageContainer1"
                      alt="weather"
                    />
                  </div>

                  <div
                    style={{
                      color: '#365a7a',
                    }}
                  >
                    {parseInt(val.main.temp - 273)}°C
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
