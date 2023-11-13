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
        businessValue = "Must";
        break;
      case 2:
        businessValue = "Should";
        break;
      case 3:
        businessValue = "Could";
        break;
      case 4:
        businessValue = "Wont";
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
      return "primary";
    case 2:
      return "success";
    case 3:
      return "warning";
    case 4:
      return "danger";
    default:
      return "secondary";
  }
}

function addInputFields() {
  const dynamicInputsContainer = document.getElementById("dynamic-inputs");
  dynamicInputsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
      e.target.parentElement.parentElement.remove();
    }
  });

  const rowDiv = document.createElement("div");
  rowDiv.setAttribute("class", "row");

  const colDiv1 = document.createElement("div");
  colDiv1.setAttribute("class", "col-4 mb-2");

  const userStoryInput = document.createElement("input");
  userStoryInput.setAttribute("type", "text");
  userStoryInput.setAttribute("class", "user-story-input form-control");
  userStoryInput.setAttribute("placeholder", "User Story");

  colDiv1.appendChild(userStoryInput);

  const colDiv2 = document.createElement("div");
  colDiv2.setAttribute("class", "col-3 mb-2");

  const businessValueInput = document.createElement("select");
  businessValueInput.setAttribute("class", "form-select business-value-input");
  businessValueInput.setAttribute("aria-label", "Default select example");

  const option1 = document.createElement("option");
  option1.setAttribute("selected", "");
  option1.innerHTML = "Priority";

  const option2 = document.createElement("option");
  option2.setAttribute("value", "MUST");
  option2.innerHTML = "Must Have";

  const option3 = document.createElement("option");
  option3.setAttribute("value", "SHOULD");
  option3.innerHTML = "Should Have";

  const option4 = document.createElement("option");
  option4.setAttribute("value", "COULD");
  option4.innerHTML = "Could Have";

  const option5 = document.createElement("option");
  option5.setAttribute("value", "WONT");
  option5.innerHTML = "Won't Have";

  businessValueInput.appendChild(option1);
  businessValueInput.appendChild(option2);
  businessValueInput.appendChild(option3);
  businessValueInput.appendChild(option4);
  businessValueInput.appendChild(option5);

  colDiv2.appendChild(businessValueInput);

  const colDiv3 = document.createElement("div");
  colDiv3.setAttribute("class", "col-4 mb-2");

  const effortEstimationInput = document.createElement("input");
  effortEstimationInput.setAttribute("type", "number");
  effortEstimationInput.setAttribute(
    "class",
    "effort-estimation-input form-control"
  );
  effortEstimationInput.setAttribute(
    "placeholder",
    "Effort Estimation / Story Point"
  );

  colDiv3.appendChild(effortEstimationInput);

  const colDiv4 = document.createElement("div");
  colDiv4.setAttribute("class", "col-1 mb-2");

  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "btn btn-outline-danger remove-button");

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fa-solid fa-trash");
  removeButton.appendChild(removeIcon);

  colDiv4.appendChild(removeButton);

  rowDiv.appendChild(colDiv1);
  rowDiv.appendChild(colDiv2);
  rowDiv.appendChild(colDiv3);
  rowDiv.appendChild(colDiv4);

  dynamicInputsContainer.appendChild(rowDiv);
}

export { displayResults, addInputFields, displayToast };
