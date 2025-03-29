import { Money } from "./money.model";
import { generateMoneyData } from "../../lib/generateData.ts";

const operationNames = [
  "Линейный персонал",
  "Подразделение разовых работ ФОТ",
  "Бензин(наличные)",
  "Закупка инвентаря",
  "Закупка спецодежды/СИЗ",
  "Ремонт оборудования",
  "Обслуживание автомобиля",
  "Форс-мажоры",
  "Рекламные бюджеты(Блоггеры)",
  "Рекламные бюджеты(Контекст)",
];

export const moneyApi = {
  async getAllOperations(): Promise<Money[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(generateMoneyData(operationNames));
        reject()
      }, 1500);
    });
  },
};
