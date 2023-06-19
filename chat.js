//const username = 'you'
const BASE = "http://127.0.0.1:5000/";
const username = localStorage.getItem('username')
//Note, the variable initialResponse is a JSON object. Use initialResponse.reponse to retrieve the string.
const initialResponse = JSON.parse(localStorage.getItem('initialResponse'));
//initialize chatHistory, add the response we received after the pdf has been uploaded.
let chatHistory = [] //clear all history when open a new caht page.
chatHistory = [{"role" : "assistant", "content" : initialResponse.response}];
displayChatHistory();

function openChatPage() {
    document.getElementById("chatContainer").style.display = "block";
    document.getElementById("container").style.display = "none";
  }
  
  function closeChatPage() {
    document.getElementById("chatContainer").style.display = "none";
    document.getElementById("container").style.display = "block";
  }  
  
  function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    if (message) {
      // Store the user's current message in chat history
      chatHistory.push({ "role" : username, "content" : message });
  
      // Clear the input field
      messageInput.value = "";
  
      // Display the user's message in the chat
      displayUserMessage(message);
  
      // Send the message to the backend server
      sendRequestToServer(message);
    }
  }

  //  this function is to display the user message only
  function displayUserMessage(message) {
    const chatHistoryContainer = document.getElementById("chatHistory");
    const chatEntry = document.createElement("div");
    chatEntry.className = "chat-entry sent";
    chatEntry.innerHTML = "<span class='chat-name'>" + username + ": </span>" + message;
    chatHistoryContainer.appendChild(chatEntry);
  }


  function sendRequestToServer(message) {
    
    ori_request =  {
      
        'conversation_history' : chatHistory,
        'current_message' : { "role" : username, "content" : message }
    }
    request = JSON.stringify(ori_request) 
    // Send the request to the backend server
    fetch(BASE + 'chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: request
    })
      .then(response => response.json())
      .then(data => {
        // Process the response from the server
        if (data && data.response) {
          //store the gpt response in chat history
          
          chatHistory.push({"role": 'assistant',"content": data.response})
  
          displayChatHistory();
        }
      })
      .catch(error => {
        console.error(error);
      });

      
      
  }
  
  function displayChatHistory() {
    const chatHistoryContainer = document.getElementById("chatHistory");
    chatHistoryContainer.innerHTML = "";
  
    // Display initial response
    // if (initialResponse) {
    //   const initialResponseEntry = document.createElement("div");
    //   initialResponseEntry.className = "chat-entry received";
    //   initialResponseEntry.innerHTML = "<span class='chat-name'>Chatbot: </span>" + initialResponse.response;
    //   chatHistoryContainer.appendChild(initialResponseEntry);
    // }
  
    // Display other chat messages
    for (let i = 0; i < chatHistory.length; i++) {
      const chatEntry = document.createElement("div");
      chatEntry.className = "chat-entry received " + chatHistory[i].role;
      chatEntry.innerHTML = "<span class='chat-name'>" + chatHistory[i].role + "</span>: " + chatHistory[i].content;
      chatHistoryContainer.appendChild(chatEntry);
    }
  }
  




  
  // Event listener for Enter key
  document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  
