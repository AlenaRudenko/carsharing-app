import axios from "axios";
import React from "react";
import { AppButton } from "../../components/app-button/AppButton";
import { Header } from "../../components/Header";
import { AuthModal } from "../auth-modal/AuthModal";
import { Menu } from "../nav-page/Menu";
import { Navigation } from "../nav-page/Navigation";
import { ICity } from "./../../interfaces/city";
import { Api } from "./../../services/api.service";
import "./styles.scss";
import { Modal } from "../../components/modals/Modal";
import { NavContext } from "../../context/NavState";
import { GeoModal } from "../../components/geo-modal/GeoModal";
import { Start } from "../start-page/Start";
import { Order } from "../order-page/Order";
import { Route, Routes } from "react-router";

interface IState {
  isAuthVisible: boolean;
  cities: ICity[];
  isRegVisible: boolean;
  isGeoVisible: boolean;
  isTitleChanged: boolean;
}
interface IProps {}

export class MainContent extends React.Component<IProps, IState> {
  context!: React.ContextType<typeof NavContext>;
  state = {
    isAuthVisible: false,
    cities: [],
    isRegVisible: false,
    isGeoVisible: true,
    isTitleChanged: false,
  };

  toggleIsGeoVisible = () => {
    this.setState({ isGeoVisible: !this.state.isGeoVisible });
  };
  toggleAuthVisible = () => {
    this.setState({ isAuthVisible: !this.state.isAuthVisible });
    this.setState({ isRegVisible: false });
  };
  toggleIsRegVisible = () => {
    this.setState({ isRegVisible: !this.state.isRegVisible });
    console.log("dddddddddd");
  };
  handleGeoModalTitle = () => {
    this.setState({ isTitleChanged: !this.state.isTitleChanged });
  };
  paths = [
    {
      path: "/",
      element: (
        <Start
          cities={this.state.cities}
          toggleAuthVisible={this.toggleAuthVisible}
        />
      ),
    },
    { path: "/order", element: <Order /> },
  ];
  componentDidMount() {
    Api.getCities().then((response) =>
      this.setState({ cities: response.data })
    );
  }

  render() {
    let location = this.context;
    const {
      isTitleChanged,
      isGeoVisible,
      isAuthVisible,
      cities,
      isRegVisible,
    } = this.state;
    const {} = this.props;
    const {
      toggleAuthVisible,
      toggleIsRegVisible,
      toggleIsGeoVisible,
      handleGeoModalTitle,
      paths,
    } = this;
    return (
      <>
        <Modal
          isVisible={location.currentGeoLocation && isGeoVisible ? true : false}
          title={
            isTitleChanged
              ? "Выберите из списка"
              : `Ваш город ${location.currentGeoLocation}?`
          }
        >
          <GeoModal {...{ toggleIsGeoVisible, handleGeoModalTitle }} />
        </Modal>
        <Modal
          size={"large"}
          title={isRegVisible ? "Регистрация" : "Войти"}
          onClickBtnClose={toggleAuthVisible}
          isVisible={isAuthVisible}
          leftButton={isRegVisible ? "ArrowLeft" : undefined}
          onClickLeftButton={toggleIsRegVisible}
        >
          <AuthModal
            {...{ isRegVisible, toggleIsRegVisible, toggleAuthVisible }}
          />
        </Modal>
        <Navigation />
        <div className='mainpage'>
          <Menu />
          <Routes>
            {paths.map((path) => (
              <Route path={path.path} element={path.element} />
            ))}
          </Routes>
        </div>
      </>
    );
  }
}
MainContent.contextType = NavContext;
