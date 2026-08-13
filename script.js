let numbers = [];

const numberInput = document.getElementById("numberInput");
const insertBttn = document.getElementById("insertBttn");
const clearEntryBttn = document.getElementById("clearEntryBttn");
const outputList = document.getElementById("outputList");
const clearAllBttn = document.getElementById("clearAllBttn");
const totalBttn = document.getElementById("totalBttn");
const identHLbttn = document.getElementById("identHLbttn");
const sortSelect = document.getElementById("sortSelect");

function render() {
    outputList.innerHTML = "";

    if (numbers.length === 0) {
        outputList.innerHTML = '<p>No numbers added yet.</p>';
        return;
    }

    numbers.forEach((num, index) => {
        const row = document.createElement("div");

        const numSpan = document.createElement("span");
        numSpan.textContent = num;

        const paritySpan = document.createElement("span");
        const isEven = num % 2 === 0;
        paritySpan.textContent = ' ' + (isEven ? 'EVEN' : 'ODD') + '';

        const removeBttn = document.createElement("button");
        removeBttn.textContent = "Remove";
        removeBttn.addEventListener('click', () => removeNumber(index));

        const editBttn = document.createElement("button");
        editBttn.textContent = "Edit";
        editBttn.addEventListener('click', () => editNumber(index));

        row.appendChild(numSpan);
        row.appendChild(paritySpan);
        row.appendChild(removeBttn);
        row.appendChild(editBttn);

        outputList.appendChild(row);
    });
}

function isPositiveInteger(value) {

    const num = Number(value);
    return value.trim() !== "" && !isNaN(num) && num > 0;
}

insertBttn.addEventListener("click", () => {
    const value = numberInput.value;

    if (!isPositiveInteger(value)) {
        alert("Please enter a positive number.");
        return;
    }

    numbers.push(Number(value));
    numberInput.value = "";
    render();
});

clearEntryBttn.addEventListener("click", () => {
    numberInput.value = "";
});

function removeNumber(index) {
    numbers.splice(index, 1);
    render();
}

function editNumber(index) {

    const newValue = prompt("Enter a new positive number:", numbers[index]);
    if (newValue === null) return;

    if (!isPositiveInteger(newValue)) {
        alert("Please enter a positive number.");
        return;
    }

    numbers[index] = Number(newValue);
    render();
}

clearAllBttn.addEventListener("click", () => {
    numbers = [];
    render();
});

totalBttn.addEventListener("click", () => {
    if (numbers.length === 0) {
        alert("No numbers to total.");
        return;
    }

    const total = numbers.reduce((acc, num) => acc + num, 0);
    alert("Total: " + total);
});

identHLbttn.addEventListener("click", () =>{
    if (numbers.length === 0) {
        alert("No numbers to identify.");
        return;
    }

    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);
    alert("Highest: " + highest + ", Lowest: " + lowest);
});

sortSelect.addEventListener("change", () => {

    const mode = sortSelect.value;
    if (mode === "asc") {
        numbers.sort((a, b) => a - b);
    } else if (mode === "desc") {
        numbers.sort((a, b) => b - a);
    }
    render();
});

render();