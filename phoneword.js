const buttonLetters = new Map([
  ["1", ["A", "B", "C"]],
  ["2", ["D", "E", "F"]],
  ["3", ["G", "H", "I"]],
  ["4", ["J", "K", "L"]],
  ["5", ["M", "N", "O"]],
  ["6", ["P", "Q", "R"]],
  ["7", ["S", "T", "U"]],
  ["8", ["V", "W", "X"]],
  ["9", ["Y", "Z"]]
])

var currentCharacterIndex = 0
var characterBeingTyped = false
var lastButtonPressId = ""
var timeoutHandler
var letterCnt = 0

function buttonPress(buttonId) {

  // New button pressed
  if(buttonId != lastButtonPressId) {
    characterBeingTyped = false
    lastButtonPressId = buttonId
    clearTimeout(timeoutHandler)
    letterCnt = 0
  }

  var screenEl = document.getElementById("screen")
  var letters = buttonLetters.get(buttonId)
  var mod = letterCnt % letters.length

  if(characterBeingTyped == false) {
    screenEl.innerHTML += letters[mod]
  }
  else {
    var currentText = document.getElementById("screen").innerHTML
    screenEl.innerHTML = currentText.slice(0, -1) + letters[mod]
  }

  letterCnt += 1

  // Hanlde character being typed
  characterBeingTyped = true
  timeoutHandler = setTimeout(function() {
    characterBeingTyped = false
    letterCnt = 0
    console.log("timeout")
  }, 1000)
}