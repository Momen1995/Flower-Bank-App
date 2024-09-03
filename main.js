import userData from "./data.js";

const movementContainer = document.querySelector(".movement-container");
const moneyIn = document.querySelector(".money-in");
const moneyInterest = document.querySelector(".money-interest");
const moneyOut = document.querySelector(".money-out");
const totalMoney = document.querySelector(".total-balance");
const userDetailContainer = document.querySelector(".user-detail");
const depositBtn = document.querySelector("#deposit-btn");
const withdrawBtn = document.querySelector("#withdraw-btn");
const transactionAdd = document.querySelector("#transaction-add");
const transactionWithdraw = document.querySelector("#transaction-remove");

// Display movements
function displayMovements(userData) {
  // Clear previous movements
  movementContainer.innerHTML = "";

  const moveMent = userData.movements;

  moveMent.forEach((move, i) => {
    const type = move > 0 ? "deposit" : "withdraw";

    const html = `
      <div class="movement-row bg-[#fff] flex flex-row justify-between p-4 rounded text-[15px]">
          <h3 class="font-semibold balance-${type} px-2 py-1 rounded">${
      i + 1
    } ${type}</h3>
          <p class="text-gray-600 font-semibold">${new Date().getDay()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()},${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}</p>
          <p class="text-gray-600 font-semibold">${move}</p>
      </div>
    `;

    movementContainer.insertAdjacentHTML("afterbegin", html); // Use 'beforeend' to add to the container
  });
}

// Calculate balance
function balanceCalc(userData) {
  const moneyAdd = userData.movements
    .filter((move) => move > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  moneyIn.textContent = `${moneyAdd} TK`;

  const moneyInterstAcc = userData.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * userData.interestRate) / 100)
    .reduce((acc, interest) => acc + interest, 0);
  moneyInterest.textContent = `${moneyInterstAcc} TK`;

  const moneyOutFromAccount = userData.movements
    .filter((move) => move < 0)
    .reduce((acc, withdraw) => acc + withdraw, 0);
  moneyOut.textContent = `${Math.abs(moneyOutFromAccount)} TK`;
}

// Calculate total balance
function totalBalance(userData) {
  userData.balance = userData.movements.reduce((acc, value) => acc + value, 0);
  totalMoney.textContent = `${userData.balance} TK`;
}

// Display user details
function displayDetail(userData) {

  const html = `
    <div class="flex justify-between items-center">
      <h3 class="text-[12px] md:text-[18px] font-semibold text-gray-700">Name: ${userData.owner}</h3>
      <p class="text-[12px] md:text-[18px] font-semibold text-gray-700">Profession: ${userData.profession}</p>
      <img src="${userData.image}" alt="" class="w-[60px] h-[60px] rounded-full" />
    </div>
  `;
   userDetailContainer.insertAdjacentHTML("afterBegin",html)
}

displayMovements(userData[0]);
balanceCalc(userData[0]);
totalBalance(userData[0]);
displayDetail(userData[0]);

// Handle deposit button click
depositBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const depositMoney = Number(transactionAdd.value);
  if (depositMoney > 0) {
    userData[0].movements.push(depositMoney);

    displayMovements(userData[0]); 
    balanceCalc(userData[0]); 
    totalBalance(userData[0]); 
  }
  transactionAdd.value = ""; 
});

// withdraw button 
withdrawBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const withdrawMoney = Number(transactionWithdraw.value);
  if (withdrawMoney > 0) {
    userData[0].movements.push(-withdrawMoney);

    displayMovements(userData[0]); 
    balanceCalc(userData[0]); 
    totalBalance(userData[0]); 
  }
  transactionWithdraw.value = ""; 
});
