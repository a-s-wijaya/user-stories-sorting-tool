import { displayResults } from "./domFunctions.js";
document.addEventListener("DOMContentLoaded", () => {
  const productBacklog = JSON.parse(localStorage.getItem("productBacklog"));
  const backlogIndex = parseInt(window.location.hash.substring(1), 10);
  const backlog = productBacklog[backlogIndex];
  const projectName = document.getElementById("project-name");

  projectName.innerHTML = backlog.projectName;

  displayResults(
    backlog.sortedByBusinessValue,
    backlog.sortedByEffortEstimation
  );
});
