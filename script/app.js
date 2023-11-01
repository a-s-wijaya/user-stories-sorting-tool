import { addInputFields } from "./domFunctions.js";
import { sortAndDisplayData } from "./dataFunctions.js";

const addInputButton = document.getElementById("add-button");
addInputButton.addEventListener("click", addInputFields);

const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", sortAndDisplayData);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  window.location.reload();
});
