import React from "react";
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
import { LocalStore } from "../../services/localStorage.service";
import { connect } from "react-redux";
import { RootState } from "../../store/store";

interface IState {
  isAuthVisible: boolean;
  cities: ICity[];
  isRegVisible: boolean;
  isGeoVisible: boolean;
  isTitleChanged: boolean;
}
type StateProps = ReturnType<typeof mapState>;

export class MainContentContainer extends React.Component<StateProps, IState> {
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
    { path: "/order/*", element: <Order /> },
  ];
  componentDidMount() {
    Api.getCities().then((response) =>
      this.setState({ cities: response.data })
    );
  }

  render() {
    let location = this.context;
    const { isTitleChanged, isGeoVisible, isAuthVisible, isRegVisible } =
      this.state;
    const { user } = this.props;
    const {
      toggleAuthVisible,
      toggleIsRegVisible,
      toggleIsGeoVisible,
      handleGeoModalTitle,
      paths,
    } = this;
    return (
      <>
        {!LocalStore.getCurrentCity() && (
          <Modal
            isVisible={
              location.currentGeoLocation && isGeoVisible ? true : false
            }
            title={
              isTitleChanged
                ? "Выберите из списка"
                : `Ваш город ${location.currentGeoLocation}?`
            }
          >
            <GeoModal {...{ toggleIsGeoVisible, handleGeoModalTitle }} />
          </Modal>
        )}
        {!user && isAuthVisible && (
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
        )}

        <Navigation />
        <div className='mainpage'>
          <Menu />
          <Routes>
            {paths.map((path) => (
              <Route key={path.path} path={path.path} element={path.element} />
            ))}
          </Routes>
        </div>
      </>
    );
  }
}
MainContentContainer.contextType = NavContext;
const mapState = (state: RootState) => ({
  user: state.user,
});
export const MainContent = connect(mapState)(MainContentContainer);
