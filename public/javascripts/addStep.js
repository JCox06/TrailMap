//@ts-check
//Steps - Div that contains all steps
//Step - button responsible for adding div
const step = document.querySelector("#step");
const steps = document.querySelector(".steps");

preventDefaults();
let numberOfSteps = 0;

prePlaceSteps();

step.addEventListener("click", addStep); //To add more steps

function removeStep(event) {

  if (!(event.target.classList.contains("remove"))) {
    console.log("Event Bubbling click skipped");
    return;
  } 

  let stepToRemove = event.target.id;
  stepToRemove = stepToRemove.slice(5);

  let reorder = false;

  for (let i = 1; i <= numberOfSteps; i++) {
  
    if (i == stepToRemove) {
      //Remove
    const ID = `#step${i}`;
    const elementToRemove = document.querySelector(ID);
    elementToRemove.remove();
    numberOfSteps = numberOfSteps - 1;
    reorder = true;
  }

    if (reorder) {
      const elementToChange = document.querySelector(`#step${i + 1}`);
      
    
      elementToChange.id = `step${i}`;
      elementToChange.firstElementChild.textContent = `Step ${i}`;
      elementToChange.firstElementChild.setAttribute("for", `stepDescription${i}`);
      elementToChange.firstElementChild.nextElementSibling.id = `stepDescription${i}`;
      elementToChange.firstElementChild.nextElementSibling.setAttribute("name", `trail[step][${i - 1}]`);
      elementToChange.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.id = `rstep${i}`;
    }
  }
}


function addStep(event, content) {
  if (content == undefined) {
    content = "";
  }
  numberOfSteps = numberOfSteps + 1;
  const element = document.createElement("div");
  element.className = "form-group mt-3 step";
  element.id = `step${numberOfSteps}`;
  element.innerHTML = `
  <label for="stepDescription${numberOfSteps}">Step ${numberOfSteps}</label>
  <textarea class="form-control" type="text" id="stepDescription${numberOfSteps}" name="trail[step][${numberOfSteps - 1}]" required>${content}</textarea>
  <div class="valid-feedback">
      Looks good!
    </div>
`;
  
  if (numberOfSteps !== 1) {
    element.innerHTML = `${element.innerHTML} <button class="btn btn-danger mb-4 mt-1 remove" id="rstep${numberOfSteps}">Remove Step</button>`;
  }

  steps.appendChild(element);
}

async function prePlaceSteps() {
  let url = window.location.pathname;

  if (url.match("new")) {
    addStep();
    return;
  }

  url = url.replace("/trails/", "");
  url = url.replace("/edit", "");
  const res = await fetch(`/trails/${url}/steps`);
  const data = await res.json();

  for (let  i = 0; i < data.length; i++) {
    addStep(null, data[i].text);
  }
}

function preventDefaults() {
  
  function preventDefault(event) {
    event.preventDefault();
  }
  //Removing Default Actions
steps.addEventListener("click", preventDefault);
steps.addEventListener("click", removeStep);
step.addEventListener("click", preventDefault);

}


