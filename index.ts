
import  TelegramBot from "node-telegram-bot-api"

const token:string = '2090927002:AAH3QrKEi3mj10s2Kw2_lF00VZcXq98Y-zQ'

const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

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


    /*проверка на undefined - слово, которое ищем и сам массив*/
    let keywordInMessage:number //ключевое слово в сообщении
    let day_1 = new Date(2021, 12, 22)
    let day_2 = new Date(2021, 12, 17);

    function diffDates(day_one:Date, day_two:Date) {
        return (day_one.getTime() - day_two.getTime()) / (60 * 60 * 24 * 1000);
    }
     diffDates(day_1, day_2)
    let millisecondsTime: number
    let messageFuture: string
    if(words!=undefined){
        for (let word of words){

            if (word == "через"){
                keywordInMessage = words?.indexOf(word)//индекс ключевого слова в массиве
                let time = parseInt(words[keywordInMessage+1])//время с типом число
                console.log(time)
                if(isNaN(time) == false && ConvertingTimeToMilliseconds(words[keywordInMessage+2],time) != 0){
                        messageFuture = words.slice((keywordInMessage+3),words.length).join(' ') //фраза, которую напоминаем
                       millisecondsTime = ConvertingTimeToMilliseconds(words[keywordInMessage+2],time)
                        setTimeout(sayHi,millisecondsTime,messageFuture); //функция со временем - когда напомнить + фраза - что напоминаем
                    /**/
                        console.log(messageFuture)
                        let timeFuture = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage+2],time)
                        const d = new Date (timeFuture)
                        console.log(d.toString()) // точная дата ( день недели | дата | время)
                    /**/
                }
                else{
                    bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Ввод времени указывается числом. Пример: 12 минут | 1 час ');
                }
            }
            else if(word == "в"){
                keywordInMessage = words?.indexOf(word) //индекс ключевого слова в массиве
                let time = parseInt(words[keywordInMessage+1]) //время с типом число

                messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')
                console.log(messageFuture)

                let timeDifference:number

                if(isNaN(time) == false && ConvertingTimeToMilliseconds(words[keywordInMessage+2],time) != 0){
                    if (/[А-яЁё]/.test(words[keywordInMessage+3]) == true){
                        if(words[keywordInMessage+3] == "завтра"){
                            timeDifference = Math.abs(24 - date.getHours() + time)
                        }
                        else if  (words[keywordInMessage+3] == "послезавтра"){
                            timeDifference = Math.abs(24*2 - date.getHours() + time)
                        }
                        else if  (words[keywordInMessage+3] == "послепослезавтра"){
                            timeDifference = Math.abs(24*3 - date.getHours() + time)
                        }
                        else{
                            timeDifference = 0
                            millisecondsTime = 0
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Опечатка в слове!');
                        }
                        millisecondsTime = ConvertingTimeToMilliseconds(words[keywordInMessage+2],timeDifference)
                        setTimeout(sayHi,millisecondsTime, messageFuture);// функция со временем - когда напомнить + фраза - что напоминаем
                        let timeFuture  = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage+2],timeDifference)
                        const d = new Date (timeFuture)
                        console.log(d.toString())
                    }
                    else if( /[А-яЁё]/.test(words[keywordInMessage+3]) == false && words[keywordInMessage+3].includes('.') == true || words[keywordInMessage+3].includes('-') == true || words[keywordInMessage+3] == "послезавтра"){
                        let differenceInDays = diffDates(
                            new Date (parseInt (words[keywordInMessage+3].substring(6,12)), parseInt (words[keywordInMessage+3].substring(3,6)), parseInt (words[keywordInMessage+3].substring(0,2))),
                            new Date (date.getFullYear(),date.getMonth()+1,date.getDate())
                        )
                        if (words[keywordInMessage+3][2] == words[keywordInMessage+3][5] && (words[keywordInMessage+3][2] == '.' || words[keywordInMessage+3][2] == '-') && (words[keywordInMessage+3][5] == '.' || words[keywordInMessage+3][5] == '-')){
                            let timeFuture:number
                            timeDifference = Math.abs((date.getHours() - time))
                            if (date.getHours() > time){
                                millisecondsTime =  ConvertingTimeToMilliseconds("дней",differenceInDays) - ConvertingTimeToMilliseconds(words[keywordInMessage+2], timeDifference )
                                timeFuture = Date.parse(date.toString()) + millisecondsTime
                            }
                            else{
                                millisecondsTime =  ConvertingTimeToMilliseconds("дней",differenceInDays) + ConvertingTimeToMilliseconds(words[keywordInMessage+2], timeDifference )
                                timeFuture = Date.parse(date.toString()) + millisecondsTime
                            }
                            setTimeout(sayHi,millisecondsTime,messageFuture);// функция со временем - когда напомнить + фраза - что напоминаем
                            const d = new Date (timeFuture)
                            console.log(d.toString())
                        }
                        else {
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Опечатка в дате');
                        }
                    }
                    else {
                        bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | 21.01.22 | 21-01-22');
                    }
                }
                else{
                    bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Ввод времени указывается числом. Пример: 12 минут | 1 час ');
                }

            }
        }
    }


    bot.sendMessage(chatId,'Привет');
})


