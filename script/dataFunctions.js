import { quickSort } from "./sortAlgorithms.js";
import { displayResults, displayToast } from "./domFunctions.js";

function sortAndDisplayData() {
  const userStoriesInputs = document.querySelectorAll(".user-story-input");
  const businessValuesInputs = document.querySelectorAll(
    ".business-value-input:checked"
  );
  const effortEstimationsInputs = document.querySelectorAll(
    ".effort-estimation-input"
  );

  const userStories = [];
  const businessValues = [];
  const effortEstimations = [];

  let emptyStory = false;
  let emptyBusinessValue = false;
  let emptyEffortEstimation = false;

  userStoriesInputs.forEach((input) => {
    if (input.value === "") {
      emptyStory = true;
    } else {
      userStories.push(input.value);
    }
  });

  if (businessValuesInputs.length === 0) {
    emptyBusinessValue = true;
  } else {
    businessValuesInputs.forEach((input) => {
      const selectedRadio = document.querySelector(
        `input[name="${input.name}"]:checked`
      );
      switch (selectedRadio ? selectedRadio.value.trim().toLowerCase() : "") {
        case "must have this":
          businessValues.push(1);
          break;
        case "should have this if possible":
          businessValues.push(2);
          break;
        case "could have this if this doesn't affect other":
          businessValues.push(3);
          break;
        case "won't have this time but would like in the future":
          businessValues.push(4);
          break;
        default:
          businessValues.push(0);
      }
    });
  }

  effortEstimationsInputs.forEach((input) => {
    if (input.value === "") {
      emptyEffortEstimation = true;
    } else {
      effortEstimations.push(Number(input.value));
    }
  });

  if (emptyStory) {
    displayToast(
      "Error",
      "Please fill all user stories before sorting the data!"
    );
    return;
  }

  if (emptyBusinessValue) {
    displayToast(
      "Error",
      "Please select priority for at least one user story before sorting the data!"
    );
    return;
  }

  if (emptyEffortEstimation) {
    displayToast(
      "Error",
      "Please fill all effort estimations before sorting the data!"
    );
    return;
  }

  const data = userStories.map((story, index) => ({
    story,
    value: businessValues[index],
    effort: effortEstimations[index],
  }));

  const quicksortedByBusinessValue = quickSort([...data], (a, b) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    if (a.value === b.value) {
      if (a.effort < b.effort) return -1;
      if (a.effort > b.effort) return 1;
    }
    return 0;
  });

  const quicksortedByEffortEstimation = quickSort([...data], (a, b) => {
    if (a.effort < b.effort) return -1;
    if (a.effort > b.effort) return 1;
    if (a.effort === b.effort) {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
    }
    return 0;
  });

  displayResults(quicksortedByBusinessValue, quicksortedByEffortEstimation);
}

export { sortAndDisplayData };
