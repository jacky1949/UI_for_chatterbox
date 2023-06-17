let selectedFile = null;
let chatHistory = [];
const BASE = "http://127.0.0.1:5000/";

const username = 'you'

//store these variables gobally so other html pages can use it.
localStorage.setItem('username',username)


document.getElementById("uploadForm").addEventListener("submit", function(event) {  
  event.preventDefault(); // Prevent the default form submission

  if (selectedFile) {
    uploadFile(selectedFile);
  }
});

function handleDragOver(event) {
  event.preventDefault();
  document.getElementById("uploadArea").classList.add("dragging");
}

function handleDragLeave(event) {
  event.preventDefault();
  document.getElementById("uploadArea").classList.remove("dragging");
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  selectedFile = file;

  if (file) {
    document.getElementById("fileLabel").textContent = "Selected File: " + file.name;
    document.getElementById("fileLabel").style.display = "block";
    document.getElementById("startButton").style.display = "inline-block";
    document.getElementById("uploadButton").style.display = "inline-block";
  } else {
    document.getElementById("fileLabel").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("uploadButton").style.display = "none";
  }
}

function handleFileDrop(event) {
  event.preventDefault();
  handleFileSelect(event);
}



function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  fetch(BASE + 'upload/pdf', {
    method: "POST",
    body: formData,
  })
  
  .then(response => {
    console.log("Response received:");
    return response.json();
  })
  .then(data => {
    if (data.hasOwnProperty("response")) {
      localStorage.setItem('initialResponse', JSON.stringify(data)); //so other pages can use this variable
      console.log("PDF file uploaded successfully!");
      window.alert("Upload successful!");
      //window.location.href = "chat.html";
    } else {
      console.error("Failed to upload PDF file.");
    }
  })
  .catch(error => {
    console.error(error);
  });
}

document.getElementById("startButton").addEventListener("click", function() {
  window.location.href = "chat.html";
});
