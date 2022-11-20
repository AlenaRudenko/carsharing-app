import React from "react";
import { Header } from "../../components/Header";
import { Menu } from "../nav-page/Menu";
import { CarContent } from "./CarContent";
import "./styles.scss";

export class MainContent extends React.Component {
  state = {
    isClicked: false,
  };
  ClickHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
    console.log(this.state.isClicked);
  };

  render() {
    return (
      <div className='mainpage'>
        <Menu />
        <div className='mainpage--container'>
          <Header />
          <div className='mainpage--content'>
            <span>Каршеринг</span>
            <span>Need for Drive</span>
            <span>Поминутная аренда авто</span>
            <button onClick={this.ClickHandler}>Забронировать</button>
          </div>

          <div className='mainpage--footer'>
            <span>© 2022 «Need for Drive»</span>
            <span>8 (495) 234-22-44</span>
          </div>
        </div>
        <CarContent />
      </div>
    );
  }
}
