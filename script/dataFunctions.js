import { quickSort } from "./sortAlgorithms.js";
import { displayResults, displayToast } from "./domFunctions.js";

function sortAndDisplayData() {
  const userStoriesInputs = document.querySelectorAll(".user-story-input");
  const businessValuesInputs = document.querySelectorAll(
    ".business-value-input"
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
    }
  });

  businessValuesInputs.forEach((input) => {
    if (input.value === "Priority") {
      emptyBusinessValue = true;
    }
  });

  effortEstimationsInputs.forEach((input) => {
    if (input.value === "") {
      emptyEffortEstimation = true;
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
      "Please fill all priority values before sorting the data!"
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

  userStoriesInputs.forEach((input) => userStories.push(input.value));
  businessValuesInputs.forEach((input) => {
    switch (input.value.trim().toLowerCase()) {
      case "must":
        businessValues.push(1);
        break;
      case "should":
        businessValues.push(2);
        break;
      case "could":
        businessValues.push(3);
        break;
      case "wont":
        businessValues.push(4);
        break;
      default:
        businessValues.push(0);
    }
  });
  effortEstimationsInputs.forEach((input) =>
    effortEstimations.push(Number(input.value))
  );

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
