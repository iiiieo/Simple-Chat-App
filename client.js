const socket = io('http://localhost:3000')
const msgForm = document.getElementById('send-container')
const msgInput = document.getElementById('msg-input')
const msgContainer = document.getElementById('msg-container')

socket.on('chat-msg', data => {
    console.log('received-message:: ${data.message} (${data.name})')
    appendMessage(data.name + ": "+data.message, 'chat-msg')
})

socket.on('user-connected', name => {
    console.log('user-connected::' + name)
    appendMessage(name+' connected', 'user-connected')
})

socket.on('user-disconnected', name => {
    console.log('user-connected::' + name)
    appendMessage(name + ' disconnected', 'user-disconnected')
})

const name = prompt('What is your name?');
console.log(name)
socket.emit('new-user', name);

msgForm.addEventListener('submit', e => {
    e.preventDefault()
    const msg = msgInput.value
    socket.emit('chat-msg', msg)
    console.log('sent-message::', msg)
    appendMessage("You: "+msg, 'own-chat-msg')
    msgInput.value = ''
})

function appendMessage(message, paragraphClass) {
    const msgParagraph = document.createElement('p')
    msgParagraph.classList.add(paragraphClass)
    msgParagraph.innerText = message
    msgContainer.append(msgParagraph)
}