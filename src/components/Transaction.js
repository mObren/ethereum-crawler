import { convertToEth } from "../../services";

const addStyleClass = (element) => {
  element.classList.add("table-row");
};
export const Transaction = (transaction) => {
  const container = document.createElement("tr");

  //Hash
  const hash = document.createElement("td");
  addStyleClass(hash);
  hash.textContent = transaction.hash;

  //From
  const from = document.createElement("td");
  addStyleClass(from);
  from.textContent = transaction.from;

  //To
  const to = document.createElement("td");
  addStyleClass(to);
  to.textContent = transaction.to;

  //Block
  const block = document.createElement("td");
  addStyleClass(block);
  block.textContent = transaction.blockNumber;
  block.style.maxWidth = "30px";

  //Value
  const valueNum = document.createElement("td");
  addStyleClass(valueNum);
  valueNum.textContent = convertToEth(transaction.value).toFixed(4) + " ETH";
  valueNum.style.maxWidth = "30px";

  container.append(hash, block, from, to, valueNum);

  return container;
};
