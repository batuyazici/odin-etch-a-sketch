const gridContainer = document.querySelector(".grid-container");
const inputButton = document.querySelector("#input-button");
const resetButton = document.querySelector("#reset-button");
const rgbButton = document.querySelector("#rgb-button");
let colorMode = "black";
let gridItems;
function createGrid(input = null) {
  let gridNumber;
  if (input) {
    gridNumber = input;
  } else {
    gridNumber = 16;
  }
  gridContainer.replaceChildren();
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${gridNumber}, 2fr);
grid-template-rows: repeat(${gridNumber}, 2fr);`
  );
  for (let i = 0; i < gridNumber * gridNumber; i++) {
    let item = document.createElement("div");
    item.classList.add("grid-item");
    gridContainer.appendChild(item);
  }
  gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.setAttribute("style", `background-color:${chooseColor(colorMode)}`);
    });
  });
  changeColorMode("black");
}

function chooseColor(mode = null) {
  let color = "#";
  if ((mode === "RGB")) {
    const letters = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } else if ((mode === "effect")) {
  } else if ((mode === "black")) {
    color += "000000";
  }
  return color;
}

function changeColorMode(newMode) {
    colorMode = newMode;
}

inputButton.addEventListener("click", () => {
  let input = +prompt("Please enter the number of square per size:");
  createGrid(input);
});

resetButton.addEventListener("click", () => {
  gridContainer.replaceChildren();
  createGrid();
  changeColorMode("black");
});
rgbButton.addEventListener("click", () => {
    changeColorMode("RGB");
});

createGrid();



