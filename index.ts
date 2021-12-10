
import  TelegramBot from "node-telegram-bot-api"

const token:string = '2090927002:AAGLOKpbLKvMqoveWeGzdRqI3ttDK0-Qcms'

const bot = new TelegramBot(token,{polling:true})

bot

bot.on('message',(msg) =>{
    const chatId = msg.chat.id //id

    let words = msg.text?.split(" ") //разбиение на элементы массива, "пробел"
    console.log(words) //массив
    let i:number
    //if (words != undefined){
       // for(i = 0, i < words?.length, i++){}
   //  }
    let a = words?.indexOf('через') //поиск в массиве (индекс)
    let b = words?.indexOf('напомни') //поиск в массиве (индекс)


    function sayHi(textMessage:string):void {
        bot.sendMessage(chatId,textMessage)
    }
    if(a != undefined && words!=undefined){
        console.log(a+1) //индекс слова в массиве
        console.log(words[a+1]) //время
        let min = parseInt(words[a+1])
        console.log(min) //время
        console.log(min*1000*60)
        let newArray = words.slice((a+3),words.length)
        console.log(newArray)
        let messageFuture = newArray.join(' ')
        console.log(messageFuture)
        setTimeout(sayHi, min*1000*60,messageFuture);
    }



    bot.sendMessage(chatId,'Привет');
})


