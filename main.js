import userData from "./data.js";

const movementContainer = document.querySelector(".movement-container");

//display movements
function displayMovements(userData){
  const moveMent = userData.movements;
  
  moveMent.forEach((move,i) => {
    const html = `
    <div class="movement-row bg-[#fff] flex justify-between w-full  p-4 rounded border-b-2 border-b-gray-200">
        <h3 class="text-gray-700 font-semibold">${i+1} Deposit</h3>
        <p class="text-gray-700 font-semibold">Date: 10/07/2024</p>
        <p class="text-gray-700 font-semibold">${move}</p>
    </div>
    `;

    movementContainer.insertAdjacentHTML("beforebegin",html)
  })
}

displayMovements(userData[0])