import userData from "./data.js";

const movementContainer = document.querySelector(".movement-container");
const moneyIn = document.querySelector(".money-in");
const moneyInterest = document.querySelector(".money-interest");
const moneyOut = document.querySelector(".money-out")

//display movements
function displayMovements(userData){
  const moveMent = userData.movements;
  
  moveMent.forEach((move,i) => {
    const type = move > 0 ? "deposit" : "withdraw";

    const html = `
    <div class="movement-row bg-[#fff] flex justify-between w-full p-4 rounded text-[15px]">
        <h3 class="font-semibold balance-${type} px-2 py-1 rounded">${i+1}  ${type}</h3>
        <p class="text-gray-600 font-semibold">Date: 10/07/2024</p>
        <p class="text-gray-600 font-semibold">${move}</p>
    </div>
    `;

    movementContainer.insertAdjacentHTML("beforebegin",html)
  })
}

displayMovements(userData[0])

//balance calculate
function balanceCalc(userData){
  const moneyAdd = userData.movements.filter(move => move > 0).reduce((acc,deposit) => acc + deposit,0);
  moneyIn.textContent = `${moneyAdd} TK`;

  const moneyInterstAcc = userData.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * userData.interestRate) / 100).reduce((acc,interest) => acc + interest,0);
  moneyInterest.textContent = `${moneyInterstAcc} TK`

  const moneyOutFromAccount = userData.movements
    .filter((move) => move < 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  moneyOut.textContent = `${Math.abs(moneyOutFromAccount)}`;
}
balanceCalc(userData[0])