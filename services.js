import axios from "axios";
const apiKey = "HG7UWGF9M9KTGQP677NFVI4M3DZACMZS7B";
export const getTransactions = (address, startBlock, pageCount) => {
  return axios.get(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&page=${pageCount}&offset=50&startblock=${startBlock}&endblock=99999999&sort=asc&apikey=${apiKey}`
  );
};

export const getBalance = (address) => {
  return axios.get(
    `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
  );
};

export const getLatestBlock = (timestamp) => {
  return axios.get(`
  https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`);
};

export const convertToEth = (value) => {
  return value / 10 ** 18;
};

export const createTable = () => {
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-hover");

  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  const thHash = document.createElement("th");
  thHash.textContent = "Txn hash";
  const block = document.createElement("th");
  block.textContent = "Block";
  const from = document.createElement("th");
  from.textContent = "From";
  const to = document.createElement("th");
  to.textContent = "To";
  const value = document.createElement("th");
  value.textContent = "Value";

  const thArray = [thHash, block, from, to, value];

  thArray.forEach((element) => {
    tr.append(element);
  });
  thead.append(tr);
  table.append(thead);
  return table;
};
