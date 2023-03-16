const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessages = require('./utils/utilityFunctions')
const foodStore = require('./models/foodStore')
const Cart = require('./models/cart')

const PORT = 3000 || process.env.PORT
const app = express()


// This is needed in other to use socket.io
const server = http.createServer(app)
const io = socketio(server);

//Progress Order of the logic cases
let progressCount = 0
let progress=2
  
  

//Run when client connects
io.on('connection',(socket)=>{
    console.log(`User ${socket.id} connected....`)

    //Emit a message when a user connects.
    socket.emit('message',formatMessages('Resturant-chat',`Welcome to the resturant`))
    socket.emit('message',formatMessages('Resturant-chat',`Please input menu to see options`))

    //Listen for ResturantChat messgaes from client end
    socket.on('ResturantChat',(msg)=>{
        //   console.log(msg)
        socket.emit('chats',formatMessages(`User`,msg))

        // CONDITIONAL STATEMENT
        switch(msg){
            case "menu":
                console.log('this is menu',msg)
                socket.emit('MenuOption')
                break          
        }

        switch(progressCount){
            case 0:
                switch(msg){
                    case "1":
                        console.log('this is food item')
                        socket.emit('food menu',foodStore)
                        progressCount =1
                        break  
                }
                break
            case 1:
                switch(msg){
                    case "01":
                        switch(progress){
                            case 2:
                                console.log('Roasted Corn')
                               console.log(Cart.save(foodStore.roastedCorn))

                               break   
                        }
                        break
                    case "02":
                         switch(progress){
                            case 2:
                                console.log('Bole')
                                console.log(Cart.save(foodStore.bole))
                                break
                         }
                      break
                    case "03":
                         switch(progress){
                            case 2:
                                console.log('Garri')
                                console.log(Cart.save(foodStore.garri))
                                break
                         }
                      break  
                    case "04":
                        switch(progress){
                           case 2:
                               console.log('Ewa')
                               console.log(Cart.save(foodStore.ewa))
                               break
                        }
                     break  
                    case "05":
                        switch(progress){
                           case 2:
                               console.log('Abacha')
                               console.log(Cart.save(foodStore.garri))
                               progressCount = 0
                               break
                        }
                        progressCount= 0
                     break         
                }
               
                break       
        }
        switch(msg){
            case "99":
              if(Cart.getCart()===null){
                       console.log('This cart is empty')
                      }else{
                          console.log(Cart.getCart())
                       
                     }
                  progressCount = 0   
                 break 
        }
        
    })
    // disconnet
    socket.on('disconnect',()=>{
       console.log('disconnected...')
    })
})

app.use(express.static('public'))

app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.render("ResturantChat")
})


server.listen(PORT,()=>{
    console.log(`server is successfully connected to http://localhost:${PORT}`)
})