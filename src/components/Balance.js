export const Balance = (balance) => {
  const container = document.createElement("div");

  const balanceAmount = document.createElement("p");
  balanceAmount.style.marginBottom = "0";
  balanceAmount.textContent = balance + " ETH";

  container.append(balanceAmount);

  return container;
};
