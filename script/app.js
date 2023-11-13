import { addInputFields } from "./domFunctions.js";
import { sortAndDisplayData, loadData } from "./dataFunctions.js";

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  const addInputButton = document.getElementById("add-button");
  addInputButton.addEventListener("click", addInputFields);

  const sortButton = document.getElementById("sort-button");
  sortButton.addEventListener("click", sortAndDisplayData);

  loadData();
}
