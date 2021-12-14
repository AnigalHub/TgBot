
import  TelegramBot from "node-telegram-bot-api"

const token:string = '2090927002:AAGLOKpbLKvMqoveWeGzdRqI3ttDK0-Qcms'

const bot = new TelegramBot(token,{polling:true})

bot

bot.on('message',(msg) =>{
    const chatId = msg.chat.id //id
    let words = msg.text?.split(" ") //разбиение на элементы массива, "пробел"
    console.log(words) //массив
    /*функция на вывод сообщения, которое напоминаем*/
    function sayHi(textMessage:string):void {
        bot.sendMessage(chatId,textMessage)
    }
    /*функция с временем для повтора один раз*/
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
    /*функция с временем для повтора один раз*/
    function selectTime2(word:string,timePhrase:number):number{
        let ms:number
        if(word == "секунд" || word == "секунд" || word == "секунду"){
            ms = timePhrase*1000
        }
        else if(word == "минут" || word == "минуты" || word == "минуту"){
            ms = timePhrase*60*1000
        }
        else if(word == "час" || word == "часа" || word == "часов"){
            ms = timePhrase*3600000
        }
        else if(word == "день" || word == "дня" || word == "дней"){
            ms = timePhrase*86400000
        }
        else if(word == "неделю" || word == "недели" || word == "недель"){
            ms = timePhrase*604800000
        }
        else if(word == "месяц" || word == "месяца" || word == "месяцев"){
            ms = timePhrase*2592000000.0000005
        }
        else if(word == "год" || word == "года" || word == "лет"){
            ms = timePhrase*31536000000.428898
        }
        else {
            bot.sendMessage(chatId,'Ошибка! Время не указано');
            ms = 0
        }
        return ms
    }
    let date = new Date();
    console.log(date.toString())
    console.log(Date.parse(date.toString()))
    /*проверка на undefined - слово, которое ищем и сам массив*/
    if(words!=undefined){
        for (let word of words){
            if (word == "через"){
                let keywordThrough = words?.indexOf(word) //поиск в массиве (индекс)
                console.log(keywordThrough) //индекс слова в массиве
                console.log(words[keywordThrough+1]) //время
                let time = parseInt(words[keywordThrough+1])
                console.log(time) //время
                console.log(words[keywordThrough+2])
                let messageFuture = words.slice((keywordThrough+3),words.length).join(' ')
                console.log(messageFuture)
                setTimeout(sayHi,selectTime2(words[keywordThrough+2],time),messageFuture);
            }
            else if(word == "в"){
                let keywordThrough = words?.indexOf(word) //поиск в массиве (индекс)
                console.log(keywordThrough) //индекс слова в массиве
                console.log(words[keywordThrough+1]) //время
                let time = parseInt(words[keywordThrough+1])
                console.log(time) //время
                console.log(words[keywordThrough+2])

                 console.log(selectTime2(words[keywordThrough+2],time))
                    console.log(time)
                    console.log(date.getHours())

                    if(time > date.getHours()){
                        let c = time - date.getHours()
                        console.log(c)
                        console.log(selectTime2(words[keywordThrough+2],c))
                        let s = Date.parse(date.toString()) + selectTime2(words[keywordThrough+2],c)
                        console.log(s)
                        const d = new Date (s)
                        console.log(d.toString())

                        const ds = new Date (Date.parse(date.toString()))
                        console.log(ds.toString())
                    }
                    else{
                        let c = Date.parse(date.toString()) - selectTime2(words[keywordThrough+2],time)
                        console.log(c)
                        const d = new Date (c)
                        console.log(d.toString())

                    }

                    let messageFuture = words.slice((keywordThrough+3),words.length).join(' ')
                    console.log(messageFuture)

            }
        }
    }

   /*if( keywordThrough != undefined && words!=undefined){
        console.log(keywordThrough) //индекс слова в массиве
        console.log(words[keywordThrough+1]) //время
        let time = parseInt(words[keywordThrough+1])
        console.log(time) //время
        console.log(words[keywordThrough+2])
        let messageFuture = words.slice((keywordThrough+3),words.length).join(' ')
        console.log(messageFuture)
        selectTime(words[keywordThrough+2],messageFuture,time)
   }
   else if(keywordIn != undefined && words!=undefined){
        console.log(keywordIn) //индекс слова в массиве
        console.log(words[keywordIn+1]) //время
        let time = parseInt(words[keywordIn+1])
        console.log(time) //время
        console.log(words[keywordIn+2])
        let messageFuture = words.slice((keywordIn+3),words.length).join(' ')
        console.log(messageFuture)
        selectTime(words[keywordIn+2],messageFuture,time)
    }
*/
    bot.sendMessage(chatId,'Привет');
})


