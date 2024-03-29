import "./styles.scss";
import { Header } from "../../components/header/Header";
import { OrderNavigation } from "./components/order-navigation/OrderNavigation";
import { AppIcon } from "../../components/app-icon/AppIcon";
import { COLORS } from "./../../constants/colors";
import React from "react";
import { RootState } from "./../../store/store";
import { OrderLocation } from "./order-location/OrderLocation";
import { OrderModel } from "./order-model/OrderModel";
import { OrderParams } from "./order-additionally/OrderParams";
import { OrderFull } from "./order-full/OrderFull";
import { Path, Route, Routes, To, useLocation } from "react-router";
import { OrderReview } from "./order-review-component/OrderReview";
import { AuthService } from "./../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment } from "react";
import { ICar } from "../../interfaces/car";
import { IVariant } from "../../interfaces/variant";
import { ITariff } from "../../interfaces/tariffs";
import { TEvent } from "../../interfaces/event";
import { TPath } from "../../pages/main-page/MainContent";
import { Api } from "../../services/api.service";

interface IState {
  paddingHeader: string;
}

interface OwnProps {
  localCity: string;
  handleCity?: (city: string | undefined) => void;
  confirmedOrderPaths: TPath[];
  handleConfirmedOrderPaths: (path: TPath) => void;
}

interface RouterProps {
  navigate: NavigateFunction;
  location: Location;
}
interface Location extends Path {
  state: any;
}
interface NavigateFunction {
  (to: To, options?: NavigateOptions): void;
  (delta: number): void;
}

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
}

type RelativeRoutingType = "route" | "path";
type Props = OwnProps & RouterProps;

const fullPathNames = [
  "/order/order-location",
  "/order/order-model",
  "/order/order-additionally",
  "/order/order-full",
];
const navArray = [
  { name: "Местоположение", index: 1, path: "order-location" },
  { name: "Модель", index: 2, path: "order-model" },
  { name: "Дополнительно", index: 3, path: "order-additionally" },
  { name: "Итого", index: 4, path: "order-full" },
];
class Order extends React.Component<Props, IState> {
  state = {
    paddingHeader: "20px 0px 50px 0px",
  };

  isAuthToken = AuthService.getAccessToken();

  //возврат к главной странице если токена нет
  componentDidUpdate(prevProps: Props, prevState: IState) {
    if (!this.isAuthToken) {
      this.props.navigate("/");
    }
    console.log("ORDER RERENDER  prevProps", prevProps);
  }

  //сет всех данных в стейт
  componentDidMount() {
    if (!this.isAuthToken) {
      this.props.navigate("/");
    }

    document.documentElement.clientWidth < 992
      ? this.setState((prevState) => ({
          ...prevState,
          paddingHeader: "10px 0px 15px 0px",
        }))
      : this.setState((prevState) => ({
          ...prevState,
          paddingHeader: "20px 0px 50px 0px",
        }));
  }

  //переход по кнопке на следующий уровень заказа
  handleNavigation = () => {
    this.props.navigate(
      fullPathNames[fullPathNames.indexOf(this.props.location.pathname) + 1],
    );
  };

  render() {
    const { paddingHeader } = this.state;
    const { handleNavigation } = this;
    const {
      localCity,
      handleCity,
      confirmedOrderPaths,
      handleConfirmedOrderPaths,
      location,
    } = this.props;
    return (
      <div className="order-container">
        <Header
          key="2"
          handleLocalStoreCity={handleCity}
          localCity={localCity}
          padding={paddingHeader}
          size="35px"
        />
        <div className="order-container__navigation">
          {navArray.map((item) => (
            <Fragment key={item.index}>
              <OrderNavigation
                confirmedOrderPaths={confirmedOrderPaths}
                navigationItem={item}
              />
              {item.index < navArray.length && (
                <AppIcon icon="ArrowRight" color={COLORS.GREY} size={14} />
              )}
            </Fragment>
          ))}
        </div>
        <div
          className={`order-container__content order-container__content${
            location.pathname === "/order/order-full" ? "--fullPage" : ""
          }`}
        >
          <div
            className={`order-container__routes order-container__routes${
              location.pathname === "/order/order-full"
                ? "--fullPage"
                : location.pathname === "/order/order-additionally"
                ? "--scroll"
                : ""
            }`}
          >
            <Routes>
              <Route path="order-location" element={<OrderLocation />} />
              <Route path="order-model" element={<OrderModel />} />
              <Route path="order-additionally" element={<OrderParams />} />
              <Route path="order-full" element={<OrderFull />} />
            </Routes>
          </div>
          <OrderReview
            {...{ handleNavigation, handleConfirmedOrderPaths }}
          ></OrderReview>
        </div>
      </div>
    );
  }
}

export const WithRouter = (props: OwnProps) => {
  let location = useLocation();
  let navigate: NavigateFunction = useNavigate();

  return <Order {...props} location={location} navigate={navigate} />;
};
