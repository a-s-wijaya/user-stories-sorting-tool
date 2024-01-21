function displayResults(
  quicksortedByBusinessValue,
  quicksortedByEffortEstimation
) {
  const resultBusinessValueElement = document.getElementById(
    "result-business-value"
  );
  const resultEffortEstimationElement = document.getElementById(
    "result-effort-estimation"
  );

  resultBusinessValueElement.innerHTML = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">Sorted by Priority</h5>
          <ol class="list-group list-group-numbered">
            ${generateListItems(quicksortedByBusinessValue)}
          </ol>
        </div>
      </div>`;

  resultEffortEstimationElement.innerHTML = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">Sorted by Effort Estimation</h5>
          <ol class="list-group list-group-numbered">
            ${generateListItems(quicksortedByEffortEstimation)}
          </ol>
        </div>
      </div>`;
}

function displayToast(type, message) {
  const toaster = document.getElementById("liveToast");
  const toastText = document.getElementById("toast-text");
  toastText.innerHTML = message;
  const toastType = document.getElementById("toast-type");
  toastType.innerHTML = type;

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toaster);
  toastBootstrap.show();
}

function generateListItems(sortedData) {
  let listItems = "";

  sortedData.forEach((item) => {
    let businessValue = "";
    switch (item.value) {
      case 1:
        businessValue = "High Priority";
        break;
      case 2:
        businessValue = "Medium Priority";
        break;
      case 3:
        businessValue = "Low Priority";
        break;
      case 4:
        businessValue = "Future Priority";
        break;
      default:
        businessValue = "Unknown";
    }

    listItems += `<li class="list-group-item d-flex justify-content-between align-items-start bg-${getColorClass(
      item.value
    )} text-white">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${item.story}</div>
        ${businessValue}
      </div>
      <span class="badge bg-white bg-opacity-50 rounded-pill">${
        item.effort
      }</span>
    </li>`;
  });

  return listItems;
}

function getColorClass(value) {
  switch (value) {
    case 1:
      return "danger";
    case 2:
      return "warning";
    case 3:
      return "success";
    case 4:
      return "primary";
    default:
      return "secondary";
  }
}

function addInputFields() {
  const dynamicInputsContainer = document.getElementById("dynamic-inputs");

  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "bg-white p-3 rounded shadow-sm mb-3");

  // User Story Input
  const userStoryInputGroup = document.createElement("div");
  userStoryInputGroup.setAttribute("class", "input-group mb-3");

  const userStoryLabel = document.createElement("span");
  userStoryLabel.setAttribute("class", "input-group-text");
  userStoryLabel.innerHTML = "User Story";

  const userStoryInput = document.createElement("input");
  userStoryInput.setAttribute("type", "text");
  userStoryInput.setAttribute("class", "user-story-input form-control");
  userStoryInput.setAttribute(
    "placeholder",
    "<As a user, I want to be able to login to the website.>"
  );
  userStoryInput.setAttribute("aria-label", "Sizing example input");
  userStoryInput.setAttribute("aria-describedby", "inputGroup-sizing-default");

  userStoryInputGroup.appendChild(userStoryLabel);
  userStoryInputGroup.appendChild(userStoryInput);

  // Business Value Input
  const businessValueGroup = document.createElement("div");
  businessValueGroup.setAttribute("class", "mb-3");

  const businessValueLabel = document.createElement("p");
  businessValueLabel.innerHTML =
    "What's your take on the importance and relevance of this user story?";
  businessValueGroup.appendChild(businessValueLabel);

  const radioLabels = [
    "Must have this",
    "Should have this if possible",
    "Could have this if this doesn't affect other",
    "Won't have this time but would like in the future",
  ];

  for (let i = 0; i < radioLabels.length; i++) {
    const radioDiv = document.createElement("div");
    radioDiv.setAttribute("class", "form-check");

    const radioInput = document.createElement("input");
    radioInput.setAttribute("class", "form-check-input business-value-input");
    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute(
      "name",
      `business-value-${dynamicInputsContainer.children.length + 1}`
    );
    radioInput.setAttribute(
      "id",
      `business-value-${dynamicInputsContainer.children.length + 1}-${i + 1}`
    );
    radioInput.setAttribute("value", radioLabels[i].toUpperCase());

    const radioLabel = document.createElement("label");
    radioLabel.setAttribute("class", "form-check-label");
    radioLabel.setAttribute(
      "for",
      `business-value-${dynamicInputsContainer.children.length + 1}-${i + 1}`
    );
    radioLabel.innerHTML = radioLabels[i];

    radioDiv.appendChild(radioInput);
    radioDiv.appendChild(radioLabel);

    businessValueGroup.appendChild(radioDiv);
  }

  // Effort Estimation Input
  const effortEstimationInputGroup = document.createElement("div");
  effortEstimationInputGroup.setAttribute("class", "input-group mb-3");

  const effortEstimationLabel = document.createElement("span");
  effortEstimationLabel.setAttribute("class", "input-group-text");
  effortEstimationLabel.innerHTML = "Story Point";

  const effortEstimationInput = document.createElement("input");
  effortEstimationInput.setAttribute("type", "number");
  effortEstimationInput.setAttribute(
    "class",
    "form-control effort-estimation-input"
  );
  effortEstimationInput.setAttribute(
    "placeholder",
    "Effort Estimation / Story Point"
  );
  effortEstimationInput.setAttribute(
    "aria-label",
    "Effort Estimation / Story Point"
  );
  effortEstimationInput.setAttribute("aria-describedby", "effort-estimation");

  effortEstimationInputGroup.appendChild(effortEstimationLabel);
  effortEstimationInputGroup.appendChild(effortEstimationInput);

  // Appending to Container
  containerDiv.appendChild(userStoryInputGroup);
  containerDiv.appendChild(businessValueGroup);
  containerDiv.appendChild(effortEstimationInputGroup);

  // Appending to Dynamic Inputs Container
  dynamicInputsContainer.appendChild(containerDiv);
}

export { displayResults, addInputFields, displayToast };
