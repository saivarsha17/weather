import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Today } from './Today.js';
function App() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const handleDate = (data) => {
    var dateObject = new Date(data);
    var today = new Date();
    var index = dateObject.getDay();
    var todayIndex = today.getDay();
    return index - todayIndex;
  };
  const handleAPI = () => {
    setData([]);
    setModal(false);
    console.log('get weather details');
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=6557810176c36fac5f0db536711a6c52`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('code', result.cod);
        if (result.cod === '200') {
          var count = 0;

          for (let i = 0; i < result.list.length; i++) {
            console.log(result.list[i].dt_txt);
            const x = handleDate(result.list[i].dt_txt);
            if (x === count) {
              setData((prev) => [...prev, result.list[i]]);
              count = count + 1;
            }
            if (count === 6) {
              break;
            }
          }
        } else {
          // alert('Enter Correct City Name');
          setShowPopup(true);
          setTimeout(togglePopup, 2000);
        }
      })
      .catch((error) => console.log('error', error));
  };
  useEffect(() => {
    if (data.length > 0) {
      setModal(true);
      console.log('length of daata', data);
    }
  }, [data]);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="mainContainer">
      <div className="cityContainer">
        <input
          placeholder="Enter a City Name..."
          className="enterTextContainer"
          onChange={(e) => {
            setValue(e.target.value);
            setModal(false);
          }}
        />
        <div className="enterContainer" onClick={() => handleAPI()}>
          Enter
        </div>
      </div>
      <div>{modal && <Today data={data} value={value} />}</div>
      {showPopup && (
        <div
          onClick={() => {
            togglePopup();
          }}
          className="popup"
        >
          Enter Correct City Name
        </div>
      )}
    </div>
  );
}

export default App;
