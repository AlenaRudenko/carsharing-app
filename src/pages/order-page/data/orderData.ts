export interface IService {
  id: string;
  title: string;
  descrintion: string;
  tariffs: ITariffOptions[];
}
interface ITariffOptions {
  price: number;
  tariff: string;
}

export const servicesOrder = [
  {
    id: "childChair",
    title: "Детское кресло",
    descrintion: "Кресло подходит для перевозки детей весом от 9 до 36 кг",
    tariffs: [
      {
        price: 50,
        tariff: "min",
      },
      {
        price: 200,
        tariff: "day",
      },
    ],
  },
  {
    id: "carEnsurance",
    title: "Страхование жизни и здоровья",
    descrintion:
      "Действует в случае травм, инвалидности или смерти застрахованного. Застрахованными считаются все пассажиры (если их количество не превышает вместимость транспорта)",
    tariffs: [
      {
        price: 0.5,
        tariff: "min",
      },
      {
        price: 999,
        tariff: "day",
      },
    ],
  },
  {
    id: "lifeEnsurance",
    title: "КАСКО",
    descrintion:
      "КАСКО помогает сократить размер выплаты, если водитель виновен в аварии. Если авария произошла по вине пользователя или виновное лицо не установлено, то пользователь возмещает реальный ущерб, но не более 30 000 ₽",
    tariffs: [
      {
        price: 2,
        tariff: "min",
      },
      {
        price: 1500,
        tariff: "day",
      },
    ],
  },
];
