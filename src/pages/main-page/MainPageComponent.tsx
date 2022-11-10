import React from "react";
import { Header } from "../../components/Header";
import "./styles.css";

export class MainPageComponent extends React.Component {
  render() {
    return (
      <div className='mainpage'>
        <div className='mainpage--container'>
          <Header />
          <div className='mainpage--content'>
            <span>Каршеринг</span>
            <span>Need for Drive</span>
            <span>Поминутная аренда авто</span>
            <button>Забронировать</button>
          </div>

          <div className='mainpage--footer'>
            <span>© 2022 «Need for Drive»</span>
            <span>8 (495) 234-22-44</span>
          </div>
        </div>
        <div className='slider'>
          <span>hello</span>
        </div>
      </div>
    );
  }
}
