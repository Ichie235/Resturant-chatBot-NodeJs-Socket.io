const chatForm = document.getElementById("chat-form");
const formInput = document.getElementById("formInput");
const chatMessages = document.querySelector(".chat-messages");


const socket = io();

//Bot Messages from server
socket.on("message", (message) => {
  //console.log(message);

  outputBotMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Chat messages from server
socket.on("chats", (chatMsg) => {
  //console.log(chatMsg);

  outputResturantChat(chatMsg);
  
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Menu messages from server
socket.on("MenuOption", (menu) => {
  //console.log(menu);

  outputResturantMenu(menu);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Menu messages from server
socket.on("food menu", (food) => {
  
  outputFoodStore(food);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Current Order Menu from server
socket.on("CurrentOrder", (order) => {
  outputFoodOrder(order);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let msg = e.target.elements.formInput.value;
  
  msg = msg.toLowerCase().trim();

  //Emit chat message to  server
  socket.emit("ResturantChat", msg);

  // Clear chat input
  formInput.value = "";
  formInput.focus();
});

// Output message from the Chat-bot to the DOM
function outputBotMessage(message) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <p style="text-align: left;>${message.username} <span>${message.time}</span></p>
    <p class="text" style="color:red;text-align:left;">${message.text}</p>
   `;
  document.querySelector(".chat-messages").appendChild(div);
}

//output chat message from users to DOM
function outputResturantChat(chatMsg) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card mb-2 mt-3 ">
    <div class="card-body" style="text-align: right;>
    <p>Ichie <span>${chatMsg.time}</span></p>
    <p class="text" style="color: red;">${chatMsg.text}</p>
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}

//output Select Menu message from Server  to DOM
function outputResturantMenu(menu) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card mb-2 mt-3 w-75" style="text-align: left;">
    <div class="card-body">
    <ul style="list-style-type:none;">
    <li>
    Select 1 to Place an order</li>
    <li>Select 99 to checkout order</li>
    <li>Select 98 to see order history</li>
    <li>Select 97 to see current order</li>
    <li>Select 0 to cancel order</li>
    </ul>
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputFoodStore(menu) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card mb-2 mt-3" style="text-align: left;">
    <div class="card-body">
    <p class="m-2">Please select food item by <b>S/N</b> to record</p>
      <div class="d-flex flex-row align-items-baseline">
      <div class="table-responsive">
      <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th scope="col">S/N</th>
      </tr>
    </thead>
      <tbody>
        ${Object.entries(menu).map(key=>`<tr><td>${Object.values(key).map(p=>p.id).join("")}</td></tr>`).join('')}
        </tbody>
        </table>
        </div>
    
    <div class="table-responsive">
    <table class="table table-sm table-striped">
    <thead>
    <tr>
      <th scope="col">Food Items</th>
    </tr>
  </thead>
    <tbody>
      ${Object.entries(menu).map(key=>`<tr><td>${Object.values(key).map(p=>p.title).join("")}</td></tr>`).join('')}
      </tbody>
      </table>
      </div>

      <div class="table-responsive">
      <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th scope="col">Price(Naira)</th>
      </tr>
    </thead>
      <tbody>
        ${Object.entries(menu).map(key=>`<tr><td>${Object.values(key).map(p=>p.price).join("")}</td></tr>`).join('')}
        </tbody>
        </table>
        </div>

        <div class="table-responsive">
        <table class="table table-sm table-striped">
        <thead>
        <tr>
          <th scope="col">Quantity Available</th>
        </tr>
      </thead>
        <tbody>
          ${Object.entries(menu).map(key=>`<tr><td>${Object.values(key).map(p=>p.quantity).join("")}</td></tr>`).join('')}
          </tbody>
          </table>
          </div>
        </div>
    
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputFoodOrder(order) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card mb-2 mt-3 w-75" style="text-align: left;">
    <div class="card-body">
    <p class="m-2">Your current order :</p>
    <div class="d-flex flex-row align-items-baseline">
    <div class="table-responsive">
    <table class="table table-sm table-striped">
    <thead>
    <tr>
      <th scope="col">Ordered Items</th>
    </tr>
  </thead>
    <tbody>
   ${order.products
     .map(
       (key) => `
         <tr>
           <td>${key.title}</td>
          </tr> `
     )
     .join("")}
     </tbody>
     </table>
     </div>
     <div class="table-responsive">
     <table class="table table-sm table-striped">
     <thead>
     <tr>
       <th scope="col">Quantity Ordered</th>
     </tr>
   </thead>
     <tbody>
     ${order.products
       .map(
         (key) => `<tr>
   <td>${key.qty}</td>
   </tr>`
       )
       .join("")}
   </tbody>
   </table>
   </div>
  </div>
   <div><b>TOTAL PRICE IS</b>=> ${order.totalPrice} </div>
  
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// ${Object.keys(menu).map(key=>`<li>${key}.${menu[key]}</li>`).join('')}
