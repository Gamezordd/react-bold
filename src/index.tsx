import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {SourceDataType} from './lib/index';
import reportWebVitals from './reportWebVitals';

const source: SourceDataType = [{
  thumbnailSrc: "https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
  description: "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
  title: "Venom: Let There Be Carnage",
  fontColor:'#ffffff'
}];

ReactDOM.render(
  <React.StrictMode>
    <App source={source} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();