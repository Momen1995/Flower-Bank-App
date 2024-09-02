import userData from "./data.js";

const movementContainer = document.querySelector(".movement-container");

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