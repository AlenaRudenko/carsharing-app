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
import { Geo } from "../../services/geo.service";
import { connect } from "react-redux";
import { RootState, Dispatch } from "../../store/store";

interface IState {
  isAuthVisible: boolean;
  localStoreCity: string;
  cities: ICity[];
  isRegVisible: boolean;
  isGeoVisible: boolean;
  isTitleChanged: boolean;
}
interface OwnProps {
  localCity: string;
}
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps & OwnProps;

export class MainContentContainer extends React.Component<Props, IState> {
  context!: React.ContextType<typeof NavContext>;
  state = {
    isAuthVisible: false,
    localStoreCity: "",
    cities: [],
    isRegVisible: false,
    isGeoVisible: true,
    isTitleChanged: false,
  };
  locald = LocalStore.getCurrentCity();
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
  handleCityId = (city: ICity) => {
    this.props.setCityId(city.id);
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
    this.setState({ localStoreCity: LocalStore.getCurrentCity() || "k" });
  }

  render() {
    let location = this.context;
    const {
      localStoreCity,
      isTitleChanged,
      isGeoVisible,
      isAuthVisible,
      isRegVisible,
      cities,
    } = this.state;
    const { user, localCity } = this.props;
    const {
      toggleAuthVisible,
      toggleIsRegVisible,
      toggleIsGeoVisible,
      handleGeoModalTitle,
      handleCityId,
      paths,
    } = this;
    return (
      <>
        {localStoreCity && (
          <Modal
            isVisible={isGeoVisible ? true : false}
            title={
              isTitleChanged ? "Выберите из списка" : `Ваш город ${localCity}?`
            }
          >
            <GeoModal
              {...{
                cities,
                localStoreCity,
                toggleIsGeoVisible,
                handleGeoModalTitle,
                handleCityId,
              }}
            />
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
              {...{
                isRegVisible,
                toggleIsRegVisible,
                toggleAuthVisible,
              }}
            />
          </Modal>
        )}

        <Navigation />
        <div className="mainpage">
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
const mapDispatch = (dispatch: Dispatch) => ({
  setCityId: (id: string) => dispatch.order.setCityId(id),
});
export const MainContent = connect(mapState, mapDispatch)(MainContentContainer);
