const socket = io();

// Socket management
socket.on("messages", (data) => {
  addMessages(data);
});


function createMessage(author, content) {
  const message = document.createElement("div");
  message.className = "card";

  message.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">${author}</h4>
            <p class="card-text">${content}</p>
        </div>
    </div>`;

  return message;
}

function addMessages(messages){
    const list = document.querySelector("#messages")
    list.innerHTML = ""
    for (const message of messages) {
        let messageDiv = createMessage(message.author, message.content);
        list.appendChild(messageDiv);
    }

}

const form = document.querySelector("#form-messages").addEventListener("submit", e => e.preventDefault())
const boton = document.querySelector("#send-message")

boton.addEventListener("click", e => {
    e.preventDefault()
    const author = document.querySelector("#message-author").value;
    const content = document.querySelector("#message-content").value;

    console.log("Enviando un mensaje");
    socket.emit("messages", JSON.stringify({author, content}))
    console.log("Mensaje enviad");
})