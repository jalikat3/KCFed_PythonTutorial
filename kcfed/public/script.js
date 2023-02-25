let pyodide = null;

importScripts('https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js');

const tutorialSteps = [
  {
    "step": 2,
    "instruction": "Now, modify the code above to print your name instead.",
    "expectedCode": "print('Your Name')"
  },
  {
    "step": 3,
    "instruction": "Great job! Now try adding another line of code that sets a variable equal to your age and prints it out.",
    "expectedCode": "age = 25\nprint(age)"
  }
];

window.onload = async function() {
  await loadPyodide({indexURL : 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/'});
  pyodide.globals.print = function(output) {
    consoleElement.innerHTML += output + "\n";
  };
};


function checkUserInput() {
  const userInput = document.getElementById("input").value.trim();
  const currentStep = tutorialSteps.find(step => step.expectedCode === userInput);
  if (currentStep) {
    document.getElementById("instruction").textContent = currentStep.instruction;
    document.getElementById("example_code").textContent = currentStep.expectedCode;
    return true;
  }
  return false;
}

async function runCode() {
  await loadPyodideIfNeeded();
  await eraseConsole();
  var code = document.getElementById("input").value.trim();
  console.log(code);
  var changing = document.getElementById("change");
  if (checkUserInput()) {
    changing.innerHTML = "Great job! Now try the next step.";
    changing.classList.add("animate");
  } else {
    try {
      pyodide.runPython(code);
    } catch (err) {
      consoleElement.innerHTML += err.toString() + "\n";
    }
  }
}

function eraseConsole() {
  consoleElement.innerHTML = "";
  pyodide.runPython("");
  console.log("it worked");
}

document.getElementById("instruction").textContent = tutorialSteps[0].instruction;
document.getElementById("example_code").textContent = tutorialSteps[0].expectedCode;
