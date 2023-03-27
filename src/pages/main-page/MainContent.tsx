import React from "react";
import "./styles.scss";
import { AuthModal } from "./components/auth-modal/AuthModal";
import { Menu } from "../nav-page/Menu";
import { Navigation } from "../nav-page/Navigation";
import { ICity } from "./../../interfaces/city";
import { Api } from "./../../services/api.service";
import { Modal } from "../../components/modals/Modal";
import { GeoModal } from "../../components/geo-modal/GeoModal";
import { Start } from "./components/start-page/Start";
import { Order } from "../order-page/Order";
import { Route, Routes } from "react-router";
import { connect } from "react-redux";
import { RootState, Dispatch } from "../../store/store";
import { ICoords } from "../../interfaces/coords";

interface IState {
  isAuthVisible: boolean;
  cities: ICity[];
  isRegVisible: boolean;
  isGeoVisible: boolean;
  isTitleChanged: boolean;
  isOpenMenu: boolean;
  isOpenProfile: boolean;
}

interface OwnProps {
  localCity: string;
  handleChangeCityName: (city: string) => void;
  coordsLocation: ICoords;
}

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps & OwnProps;

export class MainContentContainer extends React.Component<Props, IState> {
  state = {
    isAuthVisible: false,
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

  //обработчик выхода из профиля
  handleUserLogOut = () => {
    this.setState({ isOpenProfile: false });
    this.setState({ isAuthVisible: false });
  };

  //обработчик записи в rematch id города и смены названия города(нужен для child)
  handleCityId = (city: ICity) => {
    this.props.setCityId(city.id);
    this.props.handleChangeCityName(city.name);
  };

  //обработчик для child в dropdownmenu для синхронизации города
  handleLocalStoreCity = (city: string | undefined) => {
    this.props.handleChangeCityName(city!);
  };

  //получаем города и сетаем локальный город в модалку
  componentDidMount() {
    Api.getCities().then((response) => {
      this.setState({ cities: response.data });
      console.log(response.data);
    });
  }

  render() {
    const {
      isTitleChanged,
      isGeoVisible,
      isAuthVisible,
      isRegVisible,
      cities,
      isOpenMenu,
      isOpenProfile,
    } = this.state;
    const { user, localCity, coordsLocation } = this.props;
    const {
      toggleIsAuthVisible,
      toggleIsRegVisible,
      toggleIsGeoVisible,
      handleGeoModalTitle,
      handleCityId,
      handleLocalStoreCity,
      toggleIsOpenMenu,
      toggleIsOpenProfile,
      handleUserLogOut,
    } = this;
    return (
      <>
        {!user && (
          <Modal
            isVisible={isGeoVisible ? true : false}
            title={
              isTitleChanged ? "Выберите из списка" : `Ваш город ${localCity}?`
            }
          >
            <GeoModal
              {...{
                cities,
                localCity,
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
          isOpenMenu={isOpenMenu}
          toggleIsOpenMenu={toggleIsOpenMenu}
          toggleIsOpenProfile={toggleIsOpenProfile}
        />
        <div className='mainpage'>
          <Menu
            handleUserLogOut={handleUserLogOut}
            isOpenProfile={isOpenProfile}
            isOpenMenu={isOpenMenu}
          />
          <Routes>
            <Route
              key={"/"}
              path={"/"}
              element={
                <Start
                  handleLocalStoreCity={handleLocalStoreCity}
                  localCity={localCity}
                  toggleAuthVisible={toggleIsAuthVisible}
                />
              }
            />
            <Route
              key={"/order/*"}
              path={"/order/*"}
              element={
                <Order
                  handleLocalStoreCity={handleLocalStoreCity}
                  localCity={localCity}
                  coordsLocation={coordsLocation}
                />
              }
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
