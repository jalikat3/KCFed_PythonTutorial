/* let pyodide = null;

window.languagePluginUrl ('https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js');

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
  pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/' });
  // Pyodide is now ready to use...
  console.log(pyodide.runPython(`
    import sys
    sys.version
  `));
  let consoleElement=document.getElementById("console");
  pyodide.globals.print = function(output) {
    consoleElement.innerHTML += output + "\n";
  };
};

async function loadPyodideIfNeeded() {
  if (pyodide === null) {
      pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/' });
      let consoleElement=document.getElementById("console");

      pyodide.globals.print = function(output) {
          consoleElement.innerHTML += output + "\n";
      };
  }
}

function checkUserInput() {
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
  let consoleElement=document.getElementById("console");
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
  let consoleElement=document.getElementById("console");
  consoleElement.innerHTML = "";
  pyodide.runPython("");
  console.log("it worked");
}

document.getElementById("instruction").textContent = tutorialSteps[0].instruction;
document.getElementById("example_code").textContent = tutorialSteps[0].expectedCode;
 */

let pyodide = null;
window.languagePluginUrl ('https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js');

async function loadTutorialSteps() {
  const response = await fetch('tutorial-steps.json');
  const data = await response.json();
  console.log(data)
  return data;
}

async function init() {
  const tutorialSteps = await loadTutorialSteps();
  if(tutorialSteps){
    console.log("Steps loaded")
  }
}


window.onload = async function() {
  pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/' });
  // Pyodide is now ready to use...
  console.log(pyodide.runPython(`
    import sys
    sys.version
  `));
  let consoleElement=document.getElementById("console");
  pyodide.globals.print = function(output) {
    consoleElement.innerHTML += output + "\n";
  };
  await init();
};

async function loadPyodideIfNeeded() {
  
  if (pyodide === null) {
      pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/' });
      let consoleElement=document.getElementById("console");

      pyodide.globals.print = function(output) {
          consoleElement.innerHTML += output + "\n";
      };
  }
}

async function checkUserInput() {
  console.log(document.getElementById("example").innerText.value);
  const userInput = document.getElementById("input").value.trim();
  const tutorialSteps = await loadTutorialSteps();
  console.log(tutorialSteps)
  console.log("User input: "+userInput)
  const currentStep = tutorialSteps.find(
    step => step.expectedCode === document.getElementById("example").innerText);
  console.log("current step: "+ currentStep)
  console.log("checking for: "+currentStep.expectedCode)
  if (currentStep) {
    document.getElementById("instruction").textContent = currentStep.instruction;
    document.getElementById("example").textContent = currentStep.expectedCode;
    return true;
  } else {
    let currentStepNumber=1;
    const currentExpectedCode = tutorialSteps.find(step => step.step === currentStepNumber)?.expectedCode;
    console.log("expected code: "+currentExpectedCode);
    if (userInput === currentExpectedCode) {
      currentStepNumber++;
      const nextStep = tutorialSteps.find(step => step.step === currentStepNumber);
      console.log("next step expected code : "+ nextStep.step);
      if (nextStep) {
        document.getElementById("change").value = nextStep.instruction;
        document.getElementById("example").value = nextStep.expectedCode;
        console.log(nextStep.expectedCode);
        //document.getElementById("change").innerHTML = "Great job! Now try the next step.";
        document.getElementById("change").classList.add("animate");
        document.getElementById("example").classList.add("animate");
        return true;
      } else {
        document.getElementById("instruction").textContent = "Congratulations, you have completed the tutorial!";
        document.getElementById("example").textContent = "";
        document.getElementById("change").innerHTML = "Reset";
        document.getElementById("change").classList.remove("animate");
        return true;
      }
    } else {
      return false;
    }
  }
}




async function runCode() {
  const tutorialSteps = await loadTutorialSteps();
  await loadPyodideIfNeeded();
  await eraseConsole();
  var code = document.getElementById("input").value.trim();
  var consoleElement=document.getElementById("console");
  
  console.log(code);
  try {
    pyodide.runPython(code).then(output => {
      consoleElement.innerHTML += output + "\n";
    });
  } catch (err) {
    consoleElement.innerHTML += err.toString() + "\n";
  }
  var changing = document.getElementById("instruction");
  if (checkUserInput()) {
    changing.innerHTML = "Great job! Now try the next step.";
    changing.classList.add("animate");
  } else {
    try {
      pyodide.runPython(code).then(output => {
        consoleElement.innerHTML += output + "\n";
      });
    } catch (err) {
      consoleElement.innerHTML += err.toString() + "\n";
    }
  }
}

function eraseConsole() {
  let consoleElement=document.getElementById("console");
  consoleElement.innerHTML = "";
  pyodide.runPython("");
  console.log("it worked");
}
