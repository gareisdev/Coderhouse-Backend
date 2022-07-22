const socket = io();

// Socket management
socket.on("messages", (data) => {
  addMessages(data);
});


function createMessage(author, content, date) {
  const message = document.createElement("div");
  message.className = "card";

  message.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">${author}</h4>
            <p class="card-text">${content}</p>
            <p class="card-text">${date}</p>
        </div>
    </div>`;

  return message;
}

function addMessages(messages){
    const list = document.querySelector("#messages")
    list.innerHTML = ""
    for (const message of messages) {
        let messageDiv = createMessage(message.author, message.content, message.date);
        list.appendChild(messageDiv);
    }

}

const form = document.querySelector("#form-messages").addEventListener("submit", e => e.preventDefault())
const boton = document.querySelector("#send-message")

boton.addEventListener("click", e => {
    e.preventDefault()
    const author = document.querySelector("#message-author").value;
    const content = document.querySelector("#message-content").value;
    const date = new Date().toLocaleString()

    socket.emit("messages", JSON.stringify({author, content, date}))

    document.querySelector("#form-messages").reset()
  })