import config from './config.json'
import TelegramBot from "node-telegram-bot-api"
import FutureTimeAndMessage from './FutureTimeAndMessage'
import prepareMessage from "./helper_functions/PrepareMessage";
import MessageToSend from "./MessageToSend";
import DateAsString from "./helper_functions/DateAsString";
import ConvertTime from './ConvertTime'
const convertTime = new ConvertTime()

const token:string = config.token
const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

bot.on('message', async (msg) =>{
    const chatId = msg.chat.id //id пользователя
    const timeMessage = msg.date*1000 //дата в сек отправки сообщения, которое напоминаем
    const dateMessage = new Date(timeMessage)
    console.log('дата сообщения',dateMessage.toString())//дата и время, когда отправили сообщение, которое напомнить в виде строки
    if(!msg.text){
        await bot.sendMessage( chatId,"Ошибка! Ожидается текст. Бот работает только с текстом!")
        return
    }
    if(msg.text == '/start'){
        await bot.sendMessage( chatId,'<b>Telegram-бот-Напоминальщик событий</b>.\n' +
            'Бот, который помогает не забыть о событии и напоминает в определенный день и дату пользователю о событии.\n\n' +
            'Создайте напоминание боту, отправив простое сообщение.\n\n'+
            '<b><u>Бот знает несколько команд:\n\n</u></b>'+
            '<b><code>/start</code></b> - описание бота\n\n' +
            '<code>/help</code> - правила написания сообщений боту\n\n' +
            '<code>/messageOptions</code> - варианты написания сообщений боту\n\n'
            ,{parse_mode: 'HTML'})
        return
    }
    if(msg.text == '/help'){
        await bot.sendMessage( chatId,'<b>Правила при написании сообщения:\n</b>' +
        '<b>1)Бот адаптирован только под русский язык!!!!\n</b>' +
        '<b>2)Структура сообщения:\n</b><code>Напомнить КОГДА (дата и время) СООБЩЕНИЕ (что напомнить)\n</code>' +
        '<b>3)Время указывается с помощью ключевых слов:\n</b>' +
        '<code>-- секунд|сек.|сек|секунды|секунду\n' +
        '-- минуты|мин.|мин|\n' +
        '-- часы|ч.|час\n' +
        '-- дни|день|сутки\n' +
        '-- недели|неделя\n' +
        '-- месяцы|месяц\n' +
        '-- полгода\n' +
        '-- года|год|лет\n</code>' +
        '<b>4)Дата указывается с помощью ключевых слов:\n</b>' +
        '<code>-- сегодня|завтра|послезавтра|послепослезавтра\n</code>' +
        '<i>день недели:\n</i>' +
        '<code>-- пн|пнд|понедельник\n' +
        '-- вт|втр|вторник\n' +
        '-- ср|сре|среда\n' +
        '-- чт|чтв|четверг\n' +
        '-- пт|птн|пятница\n' +
        '-- сб|суб|суббота\n' +
        '-- вс|вск|воскресенье\n</code>' +
        '<i>полная дата:\n</i>' +
        '<code>-- дд-мм-гггг (дд-мм-гг)\n' +
        '-- дд.мм.гггг (дд.мм.гг)\n' +
        '-- дд/мм/гггг (дд/мм/гг)\n</code>' +
        '<b>5)После указателя времени "ЧЕРЕЗ" всегда идет:\n</b>' +
        '<i>число и единица времени:</i><code> через 10 минут|через пять часов\n</code>' +
        '<i>единица времени:</i><code> через час|через неделю\n</code>' +
        '<b>6)После указателя времени "В" всегда идет:\n</b>' +
        '<i>число и единица времени:</i><code> в 15 минут|в два часа\n</code>' +
        '<i>единица времени:</i><code> в минуту|в час\n</code>' +
        '<i>день недели:</i><code> в вт|в пятницу\n</code>',  {parse_mode: 'HTML'}
        )
        return
    }
    if(msg.text == '/messageOptions'){
        await bot.sendMessage( chatId,'<b>Варианты написания сообщений:\n</b>' +
            '1) <code>напомнить через секунду/минуту/час/день/неделю/месяц/год\n</code>' +
            '2) <code>напомнить через «Х(число цифрой)» секунд/минут/часов/дней/недель/месяцев/лет\n</code>' +
            '3) <code>напомнить через «Х(число словами)» секунд/минут/часов/дней/недель/месяцев/лет\n</code>' +
            '4) <code>напомнить через день/неделю/месяц/полгода/год в секунду/минуту/час\n</code>' +
            '5) <code>напомнить через день/неделю/месяц/полгода/год в «Y(число цифрой)» секунд/минут/часов\n</code>' +
            '6) <code>напомнить через день/неделю/месяц/полгода/год в «Y(число словами)» секунд/минут/часов\n</code>' +
            '7) <code>напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в секунду/минуту/час\n</code>' +
            '8) <code>напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n</code>' +
            '9) <code>напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n</code>' +
            '10) <code>напомнить через «Х(число словами)» дней/недель/месяцев/лет в секунду/минуту/час\n</code>' +
            '11) <code>напомнить через «Х(число словами)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n</code>' +
            '12) <code>напомнить через «Х(число словами)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n</code>' +
            '13) <code>напомнить «Полная дата» в секунду/минуту/час\n</code>' +
            '14) <code>напомнить «Полная дата» в «Х(число цифрой)» секунд/минут/часов\n</code>' +
            '15) <code>напомнить «Полная дата» в «Х(число словами)» секунд/минут/часов\n</code>' +
            '16) <code>напомнить в секунду/минуту/час «Полная дата» \n</code>' +
            '17) <code>напомнить в «Х(число цифрой)» секунд/минут/часов «Полная дата» \n</code>' +
            '18) <code>напомнить в «Х(число словами)» секунд/минут/часов «Полная дата» \n</code>' +
            '19) <code>напомнить «завтра|послезавтра|послепослезавтра» в секунду/минуту/час\n</code>' +
            '20) <code>напомнить «сегодня|завтра|послезавтра|послепослезавтра» в «Х(число цифрой)» секунд/минут/часов\n</code>' +
            '21) <code>напомнить «сегодня|завтра|послезавтра|послепослезавтра» в «Х(число словами)» секунд/минут/часов\n</code>' +
            '22) <code>напомнить в секунду/минуту/час «сегодня|завтра|послезавтра|послепослезавтра»\n</code>' +
            '23) <code>напомнить в «Х(число цифрой)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра»\n</code>' +
            '24) <code>напомнить в «Х(число словами)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра»\n</code>' +
            '25) <code>напомнить в секунду/минуту/час в/во «день недели»\n</code>' +
            '26) <code>напомнить в «Х(число цифрой)» секунд/минут/часов в/во «день недели»\n</code>' +
            '27) <code>напомнить в «Х(число словами)» секунд/минут/часов в/во «день недели»\n</code>' +
            '28) <code>напомнить в/во «день недели» в секунду/минуту/час\n</code>' +
            '29) <code>напомнить в/во «день недели» в «Х(число цифрой)» секунд/минут/часов\n</code>' +
            '30) <code>напомнить в/во «день недели» в «Х(число словами)» секунд/минут/часов\n</code>',  {parse_mode: 'HTML'}
            )
        return
    }
    let words = prepareMessage(msg.text)
    for (let i= 0; i<words.length;i++){
        if(convertTime.ConvertTimeToMilliseconds(words[i],1) != 0 && convertTime.ConvertTimeToMilliseconds(words[i+1],1) != 0){
          return await bot.sendMessage(chatId,'Ошибка! Подряд несколько раз указана единица времени')
        }
    }
    console.log(words) //массив

    let numberKeywordInMessage:number //ключевое слово в сообщении
    let numberKeywordInMessage2:number //ключевое слово в сообщении
    let secondKeywordInMessage:number = 0 //ключевое слово в сообщении
    let millisecondsAndMessage:MessageToSend

    let futureTimeAndMessage = new FutureTimeAndMessage(chatId,words,dateMessage)
    let fullDate = words.filter(word => word.includes('-') || word.includes('.') || word.includes('/'))

    async function keywordCountIn() {
        numberKeywordInMessage = words.indexOf('в') //индекс ключевого слова в массиве
        try {
            millisecondsAndMessage =  futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputTo2( numberKeywordInMessage, timeMessage)
            console.log(millisecondsAndMessage)
            DateAsString(millisecondsAndMessage.millisecondsTime,dateMessage)
        } catch (e:any) {
            await bot.sendMessage(chatId,e.message)
        }
    }

    if (words.includes('через') == true){
        numberKeywordInMessage = words.indexOf('через') // индекс ключевого слова в массиве
        try {
            millisecondsAndMessage = futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputThrough(numberKeywordInMessage, secondKeywordInMessage, timeMessage)
            DateAsString(millisecondsAndMessage.millisecondsTime,dateMessage)
        } catch (e:any) {
           await bot.sendMessage(chatId,e.message)
        }
    }
    else if(fullDate && fullDate.length != 0 ){
        if(words.includes('во') == true){
            words.splice(words.indexOf('во'),1,'в')
        }
        numberKeywordInMessage = words.indexOf('в') //индекс ключевого слова в массиве
        numberKeywordInMessage2 = words.indexOf(fullDate[0])
        try {
            if(numberKeywordInMessage < numberKeywordInMessage2){
                millisecondsAndMessage =  futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputTo2( numberKeywordInMessage, timeMessage)
            }
            else {
                millisecondsAndMessage =  futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputDateFull( numberKeywordInMessage2, timeMessage)
            }
            console.log(millisecondsAndMessage)
            DateAsString(millisecondsAndMessage.millisecondsTime,dateMessage)
        } catch (e:any) {
            await bot.sendMessage(chatId,e.message)
        }
    }
    else if ((words.includes('сегодня') == true) || (words.includes('завтра') == true) || (words.includes('послезавтра') == true) ||  (words.includes('послепослезавтра') == true) ){
       await keywordCountIn()
    }
    else if(words.includes('в') == true || words.includes('во') == true){
        if(words.includes('во') == true){
            words.splice(words.indexOf('во'),1,'в')
        }
        await keywordCountIn()
    }
    else {
        await bot.sendMessage(chatId,'Ошибка! Не корректный ввод. Символы неизвестны!');
    }
   // bot.sendMessage(chatId,'Привет');
})


