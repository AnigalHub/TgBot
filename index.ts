
import  TelegramBot from "node-telegram-bot-api"

const token:string = '2090927002:AAGLOKpbLKvMqoveWeGzdRqI3ttDK0-Qcms'

const bot = new TelegramBot(token,{polling:true})

bot

bot.on('message',(msg) =>{
    const chatId = msg.chat.id //id

    let words = msg.text?.split(" ") //разбиение на элементы массива, "пробел"
    console.log(words) //массив

    let a = words?.indexOf('через') //поиск в массиве (индекс)

    /*функция на вывод сообщения, которое напоминаем*/
    function sayHi(textMessage:string):void {
        bot.sendMessage(chatId,textMessage)
    }
    function selectTime(word:string,phrase:string, timePhrase:number):void {
        if(word == "секунд" || word == "секунд" || word == "секунду"){
            setTimeout(sayHi, timePhrase*1000,phrase); console.log(timePhrase*1000)
        }
        else if(word == "минут" || word == "минуты" || word == "минуту"){
            setTimeout(sayHi, timePhrase*60*1000,phrase);   console.log(timePhrase*60*1000)
        }
        else if(word == "час" || word == "часа" || word == "часов"){
            setTimeout(sayHi, timePhrase*36000000,phrase); console.log(timePhrase*36000000)
        }
        else if(word == "день" || word == "дня" || word == "дней"){
            setTimeout(sayHi, timePhrase*86400000,phrase); console.log(timePhrase*86400000)
        }
        else if(word == "неделю" || word == "недели" || word == "недель"){
            setTimeout(sayHi, timePhrase*604800000,phrase); console.log(timePhrase*604800000)
        }
        else if(word == "месяц" || word == "месяца" || word == "месяцев"){
            setTimeout(sayHi, timePhrase*2592000000.0000005,phrase); console.log(timePhrase*2592000000.0000005)
        }
        else if(word == "год" || word == "года" || word == "лет"){
            setTimeout(sayHi, timePhrase*31536000000.428898,phrase); console.log(timePhrase*31536000000.428898)
        }
        else {
            bot.sendMessage(chatId,'Ошибка! Время не указано');
        }
    }
    /*проверка на undefined - слово, которое ищем и сам массив*/
    if(a != undefined && words!=undefined){
        console.log(a) //индекс слова в массиве
        console.log(words[a+1]) //время
        let time = parseInt(words[a+1])
        console.log(time) //время
        console.log(words[a+2])

        let messageFuture = words.slice((a+3),words.length).join(' ')
        console.log(messageFuture)

        selectTime(words[a+2],messageFuture,time)
    }



    bot.sendMessage(chatId,'Привет');
})


