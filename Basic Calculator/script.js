const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

// Update display
const updateDisplay = (value) => {
  display.textContent = value;

  // Adjust font size for long values
  if (value.length > 10) {
    display.classList.add('shrink-text');
  } else {
    display.classList.remove('shrink-text');
  }
};

// Handle button clicks for numbers and operators
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const numValue = button.getAttribute('data-num');
    const operatorValue = button.getAttribute('data-operator');

    // Handle number input
    if (numValue !== null) {
      currentInput += numValue;
      updateDisplay(currentInput);
    } 
    // Handle operator input
    else if (operatorValue) {
      if (currentInput !== '' ) {
        previousInput = currentInput;
        operator = operatorValue;
        currentInput = '';
        updateDisplay( operator); // Display number and operator
      }
    }
  });
});

// Handle equals button
document.getElementById('equals').addEventListener('click', () => {
  if (previousInput !== '' && currentInput !== '' && operator !== '') {
    let result;

    switch (operator) {
      case '+':
        result = parseFloat(previousInput) + parseFloat(currentInput);
        break;
      case '-':
        result = parseFloat(previousInput) - parseFloat(currentInput);
        break;
      case '*':
        result = parseFloat(previousInput) * parseFloat(currentInput);
        break;
      case '/':
        result = parseFloat(previousInput) / parseFloat(currentInput);
        break;
    }

    updateDisplay(result); // Display result after calculation
    currentInput = result.toString();
    previousInput = '';
    operator = '';
  }
});

// Handle clear button
document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay('0');
});

// Handle cancel button (backspace)
document.getElementById('cancel').addEventListener('click', () => {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0'); // Display 0 if input is empty
  }
});
