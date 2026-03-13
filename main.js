const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Larry Page",
  "Sergy Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Bernaldo Arnault & family",
  "Jensen Huang",
  "Warren Buffett",
  "Rob Walton & family",
];

const listItems = [];
let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("over");

      // listItem.classList.add("right");
      // listItem.classList.add("wrong");
      // listItem.classList.add("over");


      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p> <i class="fa-solid fa-grip-lines"></i>
        </div>
        `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
    addEventlistener();
}


function dragStart() {
  //console.log("Event: ", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}


function dragEnter() {
  //console.log("Event: ", "dragenter");
  this.classList.add("over");
}

function dragleave() {
  //console.log("Event: ", "dragleave");
  this.classList.remove("over");
}


function dragOver(e) {
  //console.log("Event: ", "dragOver");
  e.preventDefault();
}

function dragDrop() {
  //console.log("Event: ", "dragDrop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  // console.log("itemOne: ", itemOne);
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventlistener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragEnter", dragEnter);
    item.addEventListener("dragLeave", dragleave);
  });
}

check.addEventListener("click", checkOrder);