
let pyodide = null;
const tutorialSteps = require('./tutorial-steps.json');

window.languagePluginUrl('https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js');

document.getElementById('input').addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before tab + tab + after tab
    this.value = this.value.substring(0, start)+"\t"+this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});

async function loadTutorialSteps() {
  const response = await fetch('./tutorial-steps.json',{
    method: "get",
    headers:{"Content-Type":"application/json",},
  });
  const data = await response.json();
  console.log('This is data:');
  data.forEach(obj => console.log(JSON.stringify(obj)));
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
  // run pyodide for the python code
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
  let example=document.getElementById("example").innerHTML;
  let instruction=document.getElementById("instruction");
  let title=document.getElementById("title")
  console.log("Checking for "+example);
  const userInput = document.getElementById("input").value.trim();
  const userInputNoSpace = userInput.replace(/\r?\n/g, "\n").replace(/\r?\t/g, "\t");
  const tutorialSteps = await loadTutorialSteps();
  console.log(tutorialSteps);
  let step=0
  console.log("current step: "+ step)
  console.log("this is the user's input: "+userInput)
  for (let i=0; i<=tutorialSteps.length; i++){
    console.log(i);
    console.log(tutorialSteps[i].expectedCode);
    if (tutorialSteps[i].expectedCode==example){
        console.log("Found: "+example);
        console.log(userInputNoSpace);
        if (userInputNoSpace == example) {
          instruction.classList.add("animate");
          document.getElementById("example").classList.add("animate");
          title.classList.add("animate");
          console.log("YOU WERE RIGHT")
          document.getElementById("example").innerHTML=tutorialSteps[i+1].expectedCode; 
          instruction.innerHTML=tutorialSteps[i+1].instruction; 
          title.innerHTML=tutorialSteps[i+1].title; 
          document.getElementById("success_message").innerHTML=tutorialSteps[i].success_message; 
          setTimeout(() => { document.getElementById("success_message").innerHTML="";
          instruction.classList.remove("animate");
          document.getElementById("example").classList.remove("animate");
          title.classList.remove("animate");}, 5000) 
          return true;
          
        }
        else{

        document.getElementById("error_message").innerHTML=tutorialSteps[i].error_message; 
        setTimeout(() => { document.getElementById("error_message").innerHTML=""; }, 5000) 
        return false; } } } 
        return false; }

async function runCode() {
  const tutorialSteps = await loadTutorialSteps();
  await loadPyodideIfNeeded();
  await eraseConsole();
  var code = document.getElementById("input").value.trim();
  var consoleElement=document.getElementById("console");
  
  console.log("Code"+code);
  try {
    pyodide.runPython(code);
} catch (err) {
    consoleElement.innerHTML += err.toString() + "\n";
}
  var changing = document.getElementById("instruction");
  var example=document.getElementById("example")
  var title=document.getElementById("title")
  if (checkUserInput()) {
    
    return true;
  } else {
    return false;;
  }
}

function eraseConsole() {
  let consoleElement=document.getElementById("console");
  consoleElement.innerHTML="";
  document.getElementById('input').value = "";
  console.log("it worked");
}

