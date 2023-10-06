import React from "react";
import "./styles.scss";
import { AuthenticationForm } from "./components/auth-modal/AuthenticationForm";
import { Menu } from "../nav-page/Menu";
import { Navigation } from "../nav-page/Navigation";
import { ICity } from "./../../interfaces/city";
import { Api } from "./../../services/api.service";
import { Modal } from "../../components/modals/Modal";
import { LocationModal } from "./components/location-modal/LocationModal";
import { Start } from "./components/start-page/Start";
import { Order } from "../order-page/Order";
import { Route, Routes } from "react-router";
import { connect } from "react-redux";
import { RootState, Dispatch } from "../../store/store";
import { LocalStore } from "../../services/localStorage.service";
import { TEvent } from "./../../interfaces/event";
export type TPath = {
  name: string;
  index: number;
};
interface IState {
  cities: ICity[];
  isGeoVisible: boolean;
  isTitleChanged: boolean;
  isOpenMenu: boolean;
  isOpenProfile: boolean;
  authIndex: number | null;
  confirmedOrderPaths: TPath[];
  startsAt: string;
  endsAt: string;
}

interface OwnProps {
  localCity: string;
  handleChangeCityName: (city: string) => void;
}

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps & OwnProps;

export class MainContentContainer extends React.Component<Props, IState> {
  state = {
    cities: [],
    isGeoVisible: false,
    isTitleChanged: false,
    isOpenMenu: false,
    isOpenProfile: false,
    authIndex: null,
    confirmedOrderPaths: [],
    startsAt: "",
    endsAt: "",
  };
  handleChangeStartPicker = (e: TEvent) => {
    this.setState((prevState) => ({ ...prevState, startsAt: e.target.value }));
    this.props.setStartsAt(e.target.value);
  };
  handleResetStartPicker = () => {
    this.setState((prevState) => ({ ...prevState, startsAt: "" }));
    this.props.setStartsAt("");
  };
  handleChangeEndPicker = (e: TEvent) => {
    this.setState((prevState) => ({ ...prevState, endsAt: e.target.value }));
    this.props.setEndsAt(e.target.value);
  };
  handleResetEndPicker = () => {
    this.setState((prevState) => ({ ...prevState, endsAt: "" }));
    this.props.setEndsAt("");
  };
  //переключение модального окна выбора города вначале
  toggleIsGeoVisible = () => {
    this.setState({ isGeoVisible: !this.state.isGeoVisible });
  };
  sayHello = () => {
    console.log("sss");
  };
  //смена заголовка модального окна выбора города
  handleGeoModalTitle = () => {
    this.setState({ isTitleChanged: !this.state.isTitleChanged });
  };
  handleAuthIndex = (value: number | null) => {
    this.setState((prevState) => ({ ...prevState, authIndex: value }));
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
          this.handleAuthIndex(111);
        }
      }
    }
  };

  //обработчик выхода из профиля
  handleUserLogOut = () => {
    this.setState({ isOpenProfile: false });
    this.handleAuthIndex(null);
  };

  //обработчик для child в dropdownmenu для синхронизации города
  handleCity = (city: string | undefined) => {
    this.props.handleChangeCityName(city!);
  };

  handleConfirmedOrderPaths = (path: TPath) => {
    let simpleArray = this.state.confirmedOrderPaths.map(
      (item: TPath) => item.name,
    );
    let newSet = new Set(simpleArray);
    if (newSet.has(path.name)) {
      return;
    } else {
      this.setState((prevState) => ({
        ...prevState,
        confirmedOrderPaths: [...this.state.confirmedOrderPaths, path],
      }));
    }

    console.log("ПОМЕНЯЛОСЬ", this.state.confirmedOrderPaths);
  };
  componentDidUpdate(prevProps: OwnProps, prevState: IState) {
    console.log(
      "RERENDER MAIN COMPONENT",
      prevState,
      this.state.confirmedOrderPaths,
    );
  }
  //получаем города и сетаем локальный город в модалку
  componentDidMount() {
    Api.getCities().then((response) => {
      this.setState({ cities: response.data });
    });
    let result = LocalStore.getCurrentCity();
    if (!result) {
      this.toggleIsGeoVisible();
    }
  }

  render() {
    const {
      isTitleChanged,
      isGeoVisible,
      cities,
      isOpenMenu,
      isOpenProfile,
      authIndex,
      confirmedOrderPaths,
      startsAt,
      endsAt,
    } = this.state;
    const { user, localCity, handleChangeCityName } = this.props;
    const {
      toggleIsGeoVisible,
      handleGeoModalTitle,
      handleCity,
      toggleIsOpenMenu,
      toggleIsOpenProfile,
      handleUserLogOut,
      handleAuthIndex,
      handleConfirmedOrderPaths,
      handleChangeStartPicker,
      handleChangeEndPicker,
      handleResetStartPicker,
      handleResetEndPicker,
    } = this;
    return (
      <>
        <Modal
          isVisible={isGeoVisible ? true : false}
          title={
            isTitleChanged ? "Выберите из списка" : `Ваш город ${localCity}?`
          }
        >
          <LocationModal
            {...{
              cities,
              localCity,
              toggleIsGeoVisible,
              handleGeoModalTitle,
              handleChangeCityName,
            }}
          />
        </Modal>

        {!user && authIndex && (
          <Modal
            size={"large"}
            title={authIndex === 111 ? "Войти" : "Регистрация"}
            onClickBtnClose={() => handleAuthIndex(null)}
            isVisible={authIndex ? true : false}
            leftButton={authIndex === 222 ? "ArrowLeft" : undefined}
            onClickLeftButton={() => handleAuthIndex(111)}
          >
            <AuthenticationForm
              {...{
                authIndex,
                handleAuthIndex,
              }}
            />
          </Modal>
        )}

        <Navigation
          isOpenMenu={isOpenMenu}
          toggleIsOpenMenu={toggleIsOpenMenu}
          toggleIsOpenProfile={toggleIsOpenProfile}
        />
        <div className="mainpage">
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
                  handleAuthIndex={handleAuthIndex}
                  handleLocalStoreCity={handleCity}
                  localCity={localCity}
                  confirmedOrderPaths={confirmedOrderPaths}
                />
              }
            />
            <Route
              key={"/order/*"}
              path={"/order/*"}
              element={
                <Order
                  handleLocalStoreCity={handleCity}
                  localCity={localCity}
                  confirmedOrderPaths={confirmedOrderPaths}
                  handleConfirmedOrderPaths={handleConfirmedOrderPaths}
                  handleChangeStartPicker={handleChangeStartPicker}
                  handleChangeEndPicker={handleChangeEndPicker}
                  handleResetStartPicker={handleResetStartPicker}
                  handleResetEndPicker={handleResetEndPicker}
                  startsAt={startsAt}
                  endsAt={endsAt}
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
  setStartsAt: (time: string) => dispatch.order.setStartsAt(time),
  setEndsAt: (time: string) => dispatch.order.setEndsAt(time),
});
export const MainContent = connect(mapState, mapDispatch)(MainContentContainer);
