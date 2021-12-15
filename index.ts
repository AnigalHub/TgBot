
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
    /*функция перевода времени в милисекунды*/
    function ConvertingTimeToMilliseconds(word:string,timePhrase:number):number{
        let ms:number
        if(word == "секунд" || word == "секунды" || word == "секунду"){
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
            bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
            ms = 0
        }
        return ms
    }
    /*дата в данную минуту*/
    let date = new Date();
    console.log(date.toString()) // день недели | дата | время
    console.log(Date.parse(date.toString())) //в милисекундах
    console.log()

    /*проверка на undefined - слово, которое ищем и сам массив*/
    let keywordInMessage:number //ключевое слово в сообщении

    if(words!=undefined){
        for (let word of words){
            if (word == "через"){
                keywordInMessage = words?.indexOf(word)//индекс ключевого слова в массиве
                let time = parseInt(words[keywordInMessage+1])//время с типом число
                console.log(time)
                if(isNaN(time) == false && ConvertingTimeToMilliseconds(words[keywordInMessage+2],time) != 0){
                        let messageFuture = words.slice((keywordInMessage+3),words.length).join(' ')
                        console.log(messageFuture)
                        let timeFuture = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage+2],time)
                        const d = new Date (timeFuture)
                        console.log(d.toString())
                        setTimeout(sayHi,ConvertingTimeToMilliseconds(words[keywordInMessage+2],time),messageFuture);
                }
                else{
                    bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Ввод времени указывается числом. Пример: 12 минут | 1 час ');
                }
            }
            else if(word == "в"){
                let keywordThrough = words?.indexOf(word) //поиск в массиве (индекс)
                console.log(keywordThrough) //индекс слова в массиве
                console.log(words[keywordThrough+1]) //время
                let time = parseInt(words[keywordThrough+1])
                console.log(time) //время
                console.log(words[keywordThrough+2])

                 console.log(ConvertingTimeToMilliseconds(words[keywordThrough+2],time))
                    console.log(time)
                    console.log(date.getHours())

                    if(time > date.getHours()){
                        let c = time - date.getHours()
                        console.log(c)
                        console.log(ConvertingTimeToMilliseconds(words[keywordThrough+2],c))
                        let s = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordThrough+2],c)
                        console.log(s)
                        const d = new Date (s)
                        console.log(d.toString())
                    }
                    else{
                        let c = Date.parse(date.toString()) - ConvertingTimeToMilliseconds(words[keywordThrough+2],time)
                        console.log(c)
                        const d = new Date (c)
                        console.log(d.toString())

                    }

                    let messageFuture = words.slice((keywordThrough+3),words.length).join(' ')
                    console.log(messageFuture)

            }
        }
    }


    bot.sendMessage(chatId,'Привет');
})


