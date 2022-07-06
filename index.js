let content = document.getElementById("generateArray");
let icons = document.getElementsByClassName("maincontent");
let getElement = document.getElementById("getElement");
let searchElement = document.getElementById("searchElement");


const successColor = "#32E0C4";
const failureColor = "#FB3640";

let randomArray = [];
let randomSortedArray = [];
let searchType = "linear";

// generate random array
function generateArray() {
    let value;
    const resultArray = [];
    for (let i = 0; i < 10; i++) {
      value = Math.floor(Math.random() * 99);
      resultArray.push(value);
    }
    return resultArray;
  }

  function insertRandomArray() {
    // making global variable
    randomArray = generateArray();
    randomSortedArray = [...randomArray];
  
    // sort random array for binary search
    randomSortedArray.sort((a, b) => a - b);
  
    if (searchType === "linear") {
      for (let i = 0; i < 10; i++) {
        icons[i].innerHTML = randomArray[i];
      }
    } else {
      for (let i = 0; i < 10; i++) {
       icons[i].innerHTML = randomSortedArray[i];
      }
    }
  }

  // disable the buttoms
function disable() {
    content.setAttribute("disabled", true);
    searchElement.setAttribute("disabled", true);
    document.getElementById("linear").setAttribute("disabled", true);
    document.getElementById("binary").setAttribute("disabled", true);
}


function LinearSearch(){
searchType = "linear";
document.getElementById("binary").style.textDecoration = "underline black";
document.getElementById("linear").style.textDecoration = "underline white";
insertRandomArray();

}

function BinarySearch(){
searchType = "binary";
document.getElementById("linear").style.textDecoration = "underline black";
document.getElementById("binary").style.textDecoration = "underline white"
insertRandomArray();
}

function linearSearch(arr, value){
    let counter = 0;
    const timer = setInterval(() => {
      let box = icons[counter];
  
      if (counter != 0) {
        // hiding arrow
        // icons[counter - 1].style.display = "none";
      }
  
      if (counter == 10) {
        alert("Element Not Found");
        location.reload();
        clearInterval(timer);
      } else {
        // displaying arrow
        icons[counter].style.display = "block";
        var innerTimer = setTimeout(() => {
          box.style.backgroundColor = failureColor;
        }, 500);
      }
  
      if (arr[counter] === value) {
        clearInterval(innerTimer);
        // displaying arrow
        icons[counter].style.display = "block";
        box.style.backgroundColor = successColor;
        alert("Element Found At Index " + counter);
        location.reload();
        clearInterval(timer);
      }
      counter++;
    }, 1000);
}

function binarySearch(arr, x, start, end){
    if (start > end) {
        alert("Element not Found");
        location.reload();
        return false;
      }
 // Find the middle index
  let mid = Math.floor((start + end) / 2);
  let previousMid = mid;
  let box = icons[mid];
  box.style.display = "block";
  const timer = setTimeout(() => {
    box.style.backgroundColor = failureColor;
  }, 500);

  // Compare mid with given key x
  if (arr[mid] === x) {
    box.style.backgroundColor = successColor;
    clearInterval(timer);
    alert("Element Found At Index " + mid);
    location.reload();
    return true;
  }

  // If element at mid is greater than x,
  if (arr[mid] > x) {
    // search in the left half of mid
    setTimeout(() => {
      // hiding arrow
    //   icons[previousMid].style.display = "none";
      return binarySearch(arr, x, start, mid - 1);
    }, 1000);
  } else {
    // If element at mid is smaller than x,
    // search in the right half of mid
    setTimeout(() => {
      // hiding arrow
    //   icons[previousMid].style.display = "none";
      return binarySearch(arr, x, mid + 1, end);
    }, 1000);
  }
}

function search() {
    let element = getElement.value;
    if (element != "") {
      const searchValue = parseInt(element);
      if (searchType === "linear") {
        disable();
        linearSearch(randomArray, searchValue);
      }
  
      if (searchType === "binary") {
        disable();
        binarySearch(
          randomSortedArray,
          searchValue,
          0,
          randomSortedArray.length - 1
        );
      }
    }
}


   insertRandomArray();
   LinearSearch();
  content.addEventListener("click",insertRandomArray);
  searchElement.addEventListener("click",search);
  document.getElementById("linear").addEventListener("click",LinearSearch);
  document.getElementById("binary").addEventListener("click",BinarySearch);




  
