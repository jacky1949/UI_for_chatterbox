let chatHistory = [];
const username = "you";

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
      // Store the message in chat history
      chatHistory.push({ type: "sent", name: username, message: message });
  
      // Clear the input field
      messageInput.value = "";
  
      // Display the message in the chat
      displayChatHistory();
    }
  }
  
  function displayChatHistory() {
    const chatHistoryContainer = document.getElementById("chatHistory");
    chatHistoryContainer.innerHTML = "";
  
    for (let i = 0; i < chatHistory.length; i++) {
      const chatEntry = document.createElement("div");
      chatEntry.className = "chat-entry " + chatHistory[i].type;
      chatEntry.innerHTML = "<span class='chat-name'>" + chatHistory[i].name + "</span>: " + chatHistory[i].message;
      chatHistoryContainer.appendChild(chatEntry);
    }
  }
  
  // Event listener for Enter key
  document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  
