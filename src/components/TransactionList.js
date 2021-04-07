import { Transaction } from "./Transaction";

export const TransactionList = (array) => {
  const container = document.createElement("tbody");

  array.forEach((element) => {
    container.append(Transaction(element));
  });

  return container;
};
