import {
  getTransactions,
  convertToEth,
  createTable,
  getLatestBlock,
} from "../services";
import { TransactionList } from "./components/TransactionList";
import { getBalance } from "../services";
import { Balance } from "./components/Balance";

const app = document.querySelector("#app");

//Transaction variables
const formTransactions = document.querySelector("#transactions");
const numberInput = document.querySelector("#inputBlock");
const textInput = document.querySelector("#inputAddress");
const transactionsContainer = document.querySelector("#transactionsContainer");
const displayTransactionForm = document.querySelector("#transactionNav");

//Balance variables
const formBalances = document.querySelector("#balances");
const addressInput = document.querySelector("#addressInput");
const tableBalance = document.querySelector("#balanceContainer");
const displayBalanceForm = document.querySelector("#balanceNav");
const balanceRow = document.querySelector("#balanceRow");
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");
const paginator = document.querySelector("#pagination");

const time = Date.now() / 1000;
const timestamp = Math.round(time);

let pageCount = 1;

const checkDisabled = () => {
  if (pageCount === 1) {
    previousButton.disabled = true;
  } else {
    previousButton.disabled = false;
  }
};

tableBalance.classList.add("hidden");

displayBalanceForm.addEventListener("click", () => {
  formBalances.classList.remove("hidden");
  formTransactions.classList.add("hidden");
  transactionsContainer.classList.add("hidden");
});
displayTransactionForm.addEventListener("click", () => {
  formBalances.classList.add("hidden");
  formTransactions.classList.remove("hidden");
  transactionsContainer.classList.remove("hidden");
  tableBalance.classList.add("hidden");
});
getLatestBlock(timestamp).then((response) => {
  console.log(response);
  numberInput.setAttribute("max", response.data.result);
});

checkDisabled();

previousButton.addEventListener("click", (e) => {
  e.preventDefault();
  pageCount--;
  renderTransactions(pageCount);
});

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  pageCount++;
  renderTransactions(pageCount);
});

//Get and render transactions

const renderTransactions = (pageCount) => {
  const startBlock = numberInput.value;
  const address = textInput.value;
  const tableTransactions = createTable();
  transactionsContainer.innerHTML = "";

  getTransactions(address, startBlock, pageCount).then((response) => {
    console.log(response.data);
    if (response.data.message === "No transactions found") {
      let resMessage = document.createElement("p");
      resMessage.textContent = "No transactions found.";
      resMessage.style.fontSize = "20px";
      transactionsContainer.append(resMessage);
      nextButton.disabled = true;
    } else if (response.data.message === "OK") {
      tableTransactions.append(TransactionList(response.data.result));
    }
  });
  transactionsContainer.append(tableTransactions);
  checkDisabled();
};

//Dislay transactions
formTransactions.addEventListener("submit", (e) => {
  e.preventDefault();

  pageCount = 1;
  nextButton.disabled = false;
  renderTransactions(pageCount);
  paginator.classList.remove("hidden");
  paginator.style.display = "flex";
  paginator.style.justifyContent = "center";
});

//Display balance
formBalances.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = addressInput.value;
  balanceRow.innerHTML = "";
  tableBalance.classList.remove("hidden");

  getBalance(address).then((response) => {
    console.log(response.data);
    balanceRow.append(Balance(convertToEth(response.data.result)));
  });
});

app.append(formTransactions, transactionsContainer, tableBalance);

export { app };
