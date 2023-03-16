const chatForm = document.getElementById('chat-form')
const formInput = document.getElementById('formInput')
const chatMessages = document.querySelector('.chat-messages')

const socket = io();


//Bot Messages from server
socket.on('message',(message)=>{
    console.log(message)
    
    outputBotMessage(message);

     // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Resturant Chat messages from server
socket.on('chats',(chatMsg)=>{
    console.log(chatMsg)

    outputResturantChat(chatMsg)
    // outputResturantChat(chatMsg)

     // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Resturant Menu messages from server
socket.on('MenuOption',(menu)=>{
    console.log(menu)

    outputResturantMenu(menu)

     // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Resturant Menu messages from server
socket.on('food menu',(food)=>{
    console.log(food)

    outputFoodStore(food)

     // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    let msg = e.target.elements.formInput.value
    console.log(msg)

    msg= msg.toLowerCase().trim();

    //Emit chat message to  server
    socket.emit('ResturantChat',msg)

    // Clear chat input
    formInput.value= "";
    formInput.focus()
})


// Output message from the Chat-bot to the DOM
function outputBotMessage(message){
    const div = document.createElement('div')
    div.classList.add('chats')
    div.innerHTML=`
   
    <p>${message.username} <span>${message.time}</span></p>
    <p class="text" style="color: red;">${message.text}</p>
   `;
    document.querySelector('.chat-messages').appendChild(div)
}

//output chat message from users to DOM
function outputResturantChat(chatMsg){
    const div = document.createElement('div')
    div.classList.add('chats')
    div.innerHTML=`
    <div class="card mb-2 mt-3 ">
    <div class="card-body">
    <p>Ichie <span>${chatMsg.time}</span></p>
    <p class="text" style="color: red;">${chatMsg.text}</p>
    </div>
    </div>`;
    document.querySelector('.chat-messages').appendChild(div)
}

//output chat message from users to DOM
function outputResturantMenu(menu){
    const div = document.createElement('div')
    div.classList.add('chats')
    div.innerHTML=`
    <div class="card mb-2 mt-3 ">
    <div class="card-body">
    <ul>
    <li>
    Select 1 to Place an order</li>
    <li>Select 99 to checkout order</li>
    <li>Select 98 to see order history</li>
    <li>Select 97 to see current order</li>
    <li>Select 0 to cancel order</li>
    </ul>
    </div>
    </div>`;
    document.querySelector('.chat-messages').appendChild(div)
}

function outputFoodStore(menu){
    const div = document.createElement('div')
    div.classList.add('chats')
    div.innerHTML=`
    <div class="card mb-2 mt-3 ">
    <div class="card-body">
    ${Object.values(menu).map(key=>`<li>${Object.values(key).join(' ')}</li>`).join('')}
    </div>
    </div>`;
    document.querySelector('.chat-messages').appendChild(div)
}


// ${Object.keys(menu).map(key=>`<li>${key}.${menu[key]}</li>`).join('')}