interface IMenu {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
}

const menuItems: IMenu[] = [
  {
    id: 1,
    title: "ПАРКОВКА",
    description: "Оставляйте машину на платных городских парковках",
    fullDescription:
      "Остановки на муниципальных парковках и разрешенных местах, без нарушений ПДД, а также в аэропортах оплачиваются Need for Drive",
  },
  {
    id: 2,
    title: "БЕНЗИН",
    description: "Полный бак на любой заправке города за наш счёт",
    fullDescription:
      " Если необходимо заправить авто, оставьте соответствующий запрос в приложении и дождитесь дальнейшей инструкции. Потраченные средства компенсируются компанией с помощью бонусов.",
  },
  {
    id: 3,
    title: "СТРАХОВКА ",
    description: "Полная страховка автомобиля",
    fullDescription:
      "Дополнительно можно включить страховку ответственности и рисков при использовании сервиса, также жизни и здоровья за дополнительную плату. Стоимость соответствующих услуг зависит от выбранного тарифа. При выборе КАСКО ежеминутно взимается 1-2 рубля, страхования от несчатных случаев – 0,5 рублей.",
  },
  {
    id: 4,
    title: "ОБСЛУЖИВАНИЕ",
    description: "Автомобиль проходит еженедельное ТО за наш счет",
    fullDescription:
      "Забудьте про оплату налогов, смену сезонной резины и мойку авто. Все заботы берем на себя",
  },
];

export default menuItems;
