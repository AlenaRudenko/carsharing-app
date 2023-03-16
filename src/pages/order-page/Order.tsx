import React from "react";
import "./styles.scss";
import { Header } from "../../components/Header";
import { OrderNavigation } from "../../components/order-navigation/OrderNavigation";
import { AppIcon } from "../../components/app-icon/AppIcon";
import { COLORS } from "./../../constants/colors";

import { OrderLocation } from "./order-location/OrderLocation";
import { OrderModel } from "./order-model/OrderModel";
import { OrderAdditionally } from "./order-additionally/OrderAdditionally";
import { OrderFull } from "./order-full/OrderFull";
import { Route, Routes } from "react-router";
import { OrderReview } from "./order-review-component/OrderReview";

export class Order extends React.Component {
  state = {
    currentStep: "",
  };

  navArray = ["Местоположение", "Модель", "Дополнительно", "Итого"];

  paths = ["order-location", "order-model", "order-additionally", "order-full"];

  render() {
    return (
      <div className='order__container'>
        <Header padding='20px 0px 50px 0px' size='35px' />
        <div className='order__navigation'>
          {this.navArray.map((item, index) =>
            index < this.navArray.length - 1 ? (
              <>
                <OrderNavigation
                  path={this.paths[index]}
                  navigationItem={item}
                />
                <AppIcon icon='ArrowRight' color={COLORS.GREY} size={14} />
              </>
            ) : (
              <OrderNavigation path={this.paths[index]} navigationItem={item} />
            )
          )}
        </div>
        <div className='order__content'>
          <div className='order__routes'>
            <Routes>
              <Route path='order-location' element={<OrderLocation />} />
              <Route path='order-model' element={<OrderModel />} />
              <Route
                path='order-additionally'
                element={<OrderAdditionally />}
              />
              <Route path='order-full' element={<OrderFull />} />
            </Routes>
          </div>
          <OrderReview navPoint=''></OrderReview>
        </div>
      </div>
    );
  }
}
