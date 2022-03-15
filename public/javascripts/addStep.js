const step = document.querySelector("#step");

step.addEventListener("click", function (event) {
  console.log("Prevented Default for button click add step");
  event.preventDefault();
});


let numberOfSteps = 0;


function addStep() {
  numberOfSteps = numberOfSteps + 1;
  const steps = document.querySelector(".steps");
  const element = document.createElement("div");
  element.className = "form-group mt-3 step";
  element.innerHTML = `
  <label for="step${numberOfSteps}">Step ${numberOfSteps}</label>
  <textarea class="form-control" type="text" for="step${numberOfSteps}" id="step${numberOfSteps}"></textarea>
`;

  steps.appendChild(element);
  console.log("Appended step child in steps");
}

step.addEventListener("click", addStep);
addStep();