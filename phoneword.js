const buttonLetters = new Map([
  ["1", []],
  ["2", ["A", "B", "C"]],
  ["3", ["D", "E", "F"]],
  ["4", ["G", "H", "I"]],
  ["5", ["J", "K", "L"]],
  ["6", ["M", "N", "O"]],
  ["7", ["P", "Q", "R", "S"]],
  ["8", ["T", "U", "V"]],
  ["9", ["W", "X", "Y", "Z"]]
])

var currentCharacterIndex = 0
var characterBeingTyped = false
var lastButtonPressId = ""
var timeoutHandler
var letterCnt = 0
var currentQuestion;

function chooseAndSetQuestion() {
  while(1) {
    var bufQuestion = chooseRandomQuestion()
    if(bufQuestion != currentQuestion)
    {
      currentQuestion = bufQuestion
      setQuestion()
      document.getElementById("screen_answer").innerHTML = ""
      return
    }
  }
}

chooseAndSetQuestion()

document.getElementById("screen_answer").addEventListener("keypress", function(evt) {
  if (evt.which === 13) {
    evt.preventDefault();
    sendAnswer()
}
})

function winScreen() {
  document.getElementById("screen_question").innerHTML = 
  "Bravo ! \
  </br><a href='#' onclick='chooseAndSetQuestion()' style='color:white;'> \
  Cliquer ici pour un nouveau mot</a>"
  // setTimeout(function() {
  //   chooseAndSetQuestion()
  // }, 3000)
}

function sendAnswer() {
  answ_el = document.getElementById("screen_answer")
  quest_el = document.getElementById("screen_question")
  if(answ_el.innerHTML.toUpperCase() == currentQuestion["word"].toUpperCase()) {
    winScreen()
  }
}

function setQuestion() {
  document.getElementById("screen_question").innerHTML = 
  currentQuestion["question"] + "</br>" + 
  computeHint(currentQuestion["word"]) + "</br>"
}

function computeHint(word) {
  hint = ""
  for(var letterIndex = 0; letterIndex < word.length; letterIndex++) {
    var letter = word[letterIndex].toUpperCase()
    for(var [button, letters] of buttonLetters) {
      if (letters.includes(letter)) {
        hint += button
      }
    }
  }
  return hint
}

function chooseRandomQuestion() {
  var index =  Math.floor((Math.random() * availableQuestions.length));
  return availableQuestions[index]
}

function clearAnswer() {
  document.getElementById("screen_answer").innerHTML = ""
}

function delLastLetter() {
  element = document.getElementById("screen_answer")
  len = element.innerHTML.length

  if(len > 0) {
    element.innerHTML = element.innerHTML.substring(0, len - 1);
  }
}

function buttonPress(buttonId) {

  // New button pressed
  if(buttonId != lastButtonPressId) {
    characterBeingTyped = false
    lastButtonPressId = buttonId
    clearTimeout(timeoutHandler)
    letterCnt = 0
  }

  var screenEl = document.getElementById("screen_answer")
  var letters = buttonLetters.get(buttonId)
  var mod = letterCnt % letters.length

  if(characterBeingTyped == false) {
    screenEl.innerHTML += letters[mod]
  }
  else {
    var currentText = document.getElementById("screen_answer").innerHTML
    screenEl.innerHTML = currentText.slice(0, -1) + letters[mod]
  }

  letterCnt += 1
  // Handle character being typed
  characterBeingTyped = true
  clearTimeout(timeoutHandler)
  timeoutHandler = setTimeout(function() {
    characterBeingTyped = false
    letterCnt = 0
    console.log("timeout")
  }, 1000)
}