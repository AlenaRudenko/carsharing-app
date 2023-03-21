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
import { OrderContainer } from "../order-page/Order";
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
  isOpenMenu: boolean;
  isOpenProfile: boolean;
}
interface OwnProps {
  localCity: string;
}
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps & OwnProps;

export class MainContentContainer extends React.Component<Props, IState> {
  state = {
    isAuthVisible: false,
    localStoreCity: "" as string,
    cities: [],
    isRegVisible: false,
    isGeoVisible: true,
    isTitleChanged: false,
    isOpenMenu: false,
    isOpenProfile: false,
  };
  //переключение модального окна выбора города вначале
  toggleIsGeoVisible = () => {
    this.setState({ isGeoVisible: !this.state.isGeoVisible });
  };
  //вмонтирование модального окна аутентификации и при нажатии на крест закрытие
  toggleIsAuthVisible = () => {
    this.setState({ isAuthVisible: !this.state.isAuthVisible });
    this.setState({ isRegVisible: false });
  };
  //монтирование модального окна регистрации
  toggleIsRegVisible = () => {
    this.setState({ isRegVisible: !this.state.isRegVisible });
  };
  //смена заголовка модального окна выбора города
  handleGeoModalTitle = () => {
    this.setState({ isTitleChanged: !this.state.isTitleChanged });
  };
  //обработчик открытия меню
  toggleIsOpenMenu = () => {
    if (!this.state.isOpenMenu && this.state.isOpenProfile) {
      this.setState({ isOpenProfile: false });
      this.setState({ isOpenMenu: !this.state.isOpenMenu });
    } else {
      if (this.state.isOpenMenu && !this.state.isOpenProfile) {
        this.setState({ isOpenMenu: !this.state.isOpenMenu });
      } else {
        this.setState({ isOpenMenu: !this.state.isOpenMenu });
      }
    }
  };

  //обработчик открытия профиля
  toggleIsOpenProfile = () => {
    if (this.state.isOpenMenu && !this.state.isOpenProfile && this.props.user) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isOpenMenu: false,
        };
      });
      this.setState({ isOpenProfile: !this.state.isOpenProfile });
    } else {
      if (
        !this.state.isOpenMenu &&
        this.state.isOpenProfile &&
        this.props.user
      ) {
        this.setState({ isOpenProfile: !this.state.isOpenProfile });
      } else {
        if (
          !this.state.isOpenMenu &&
          !this.state.isOpenProfile &&
          this.props.user
        ) {
          this.setState({ isOpenProfile: !this.state.isOpenProfile });
        } else {
          this.setState({ isOpenProfile: false });
          this.setState({ isOpenMenu: false });
          this.toggleIsAuthVisible();
        }
      }
    }
  };
  //обработчик записи в rematch id города и смены названия города(нужен для child)
  handleCityId = (city: ICity) => {
    this.props.setCityId(city.id);
    this.setState((prevState) => ({
      ...prevState,
      localStoreCity: city.name,
    }));
  };
  //обработчик для child в dropdownmenu для синхронизации города
  handleLocalStoreCity = (city: string | undefined) => {
    this.setState((prevState) => ({
      ...prevState,
      localStoreCity: city!,
    }));
  };

  componentDidMount() {
    Api.getCities().then((response) =>
      this.setState({ cities: response.data })
    );
    this.setState({ localStoreCity: LocalStore.getCurrentCity() || " " });
  }

  render() {
    const {
      localStoreCity,
      isTitleChanged,
      isGeoVisible,
      isAuthVisible,
      isRegVisible,
      cities,
      isOpenMenu,
      isOpenProfile,
    } = this.state;
    const { user, localCity } = this.props;
    const {
      toggleIsAuthVisible,
      toggleIsRegVisible,
      toggleIsGeoVisible,
      handleGeoModalTitle,
      handleCityId,
      handleLocalStoreCity,
      toggleIsOpenMenu,
      toggleIsOpenProfile,
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
            onClickBtnClose={toggleIsAuthVisible}
            isVisible={isAuthVisible}
            leftButton={isRegVisible ? "ArrowLeft" : undefined}
            onClickLeftButton={toggleIsRegVisible}
          >
            <AuthModal
              {...{
                isRegVisible,
                toggleIsRegVisible,
                toggleIsAuthVisible,
              }}
            />
          </Modal>
        )}

        <Navigation
          isOpenProfile={isOpenProfile}
          isOpenMenu={isOpenMenu}
          toggleIsOpenMenu={toggleIsOpenMenu}
          toggleIsOpenProfile={toggleIsOpenProfile}
        />
        <div className="mainpage">
          <Menu isOpenProfile={isOpenProfile} isOpenMenu={isOpenMenu} />
          <Routes>
            <Route
              key={"/"}
              path={"/"}
              element={
                <Start
                  handleLocalStoreCity={handleLocalStoreCity}
                  testCity={localStoreCity}
                  cities={cities}
                  toggleAuthVisible={toggleIsAuthVisible}
                />
              }
            />
            <Route
              key={"/order/*"}
              path={"/order/*"}
              element={<OrderContainer />}
            />
          </Routes>
        </div>
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user,
});
const mapDispatch = (dispatch: Dispatch) => ({
  setCityId: (id: string) => dispatch.order.setCityId(id),
});
export const MainContent = connect(mapState, mapDispatch)(MainContentContainer);
