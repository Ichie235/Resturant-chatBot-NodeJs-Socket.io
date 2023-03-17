const moment = require('moment')

function formatMessages(username,text){
      return {
        username : username,
        text : text,
        time: moment().format('h:mm a'),
      }
};

  // default:
            //      socket.emit('message',formatMessages('Resturant-chat',`Your input ${msg} is invalid.
            //                 <br>Please select <b>1</b> to see food options`))            

module.exports =formatMessages



