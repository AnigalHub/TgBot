import config from './config.json'
import TelegramBot from "node-telegram-bot-api"
import FutureTimeAndMessage from './FutureTimeAndMessage'
import prepareMessage from "./helper_functions/PrepareMessage";
import MessageToSend from "./MessageToSend";

const token:string = config.token
const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

bot.on('message', async (msg) =>{
    const chatId = msg.chat.id //id пользователя
    const timeMessage = msg.date*1000 //дата в сек отправки сообщения, которое напоминаем
    const dateMessage = new Date(timeMessage)
    console.log('дата сообщения',dateMessage.toString())//дата и время, когда отправили сообщение, которое напомнить в виде строки
    if(!msg.text){
        await bot.sendMessage( chatId,"нет сообщения")
        return
    }
    if(msg.text == '/start'){
        await bot.sendMessage( chatId,'<b>Telegram-бот-Напоминальщик событий</b>.\n' +
            'Бот, который помогает не забыть о событии и напоминает в определенный день и дату пользователю о событии.\n' +
            'Создайте напоминание боту, отправив простое сообщение. \n' +
            'Правила при написании сообщения:\n' +
            '1)Структура сообщения:<pre>Напомнить КОГДА (дата и время) СООБЩЕНИЕ (что напомнить)\n</pre>' +
            '2)Время указывается с помощью ключевых слов:\n' +
            '<pre>-- секунд|сек.|сек|секунды|секунду\n' +
            '-- минут|мин.|мин|минуты|минуту\n' +
            '-- часы|ч.|час|часа|часов\n' +
            '-- день|дня|дней|дня|дней|сутки|суток\n' +
            '-- неделя|неделю|недели|недель\n' +
            '-- месяц|месяца|месяцев\n' +
            '-- полгода\n' +
            '-- год|года|лет\n</pre>' +
            '3)Дата указывается с помощью ключевых слов:\n' +
            '<pre>-- сегодня|завтра|послезавтра|послепослезавтра</pre>' +
            'день недели:\n' +
            '<pre>-- пн|пнд|понедельник\n' +
            '-- вт|втр|вторник\n' +
            '-- ср|сре|среда\n' +
            '-- чт|чтв|четверг\n' +
            '-- пт|птн|пятница\n' +
            '-- сб|суб|суббота\n' +
            '-- вс|вск|воскресенье\n</pre>'
            ,{parse_mode: 'HTML'})
        return
    }
    if(msg.text == '/help'){
        await bot.sendMessage( chatId,'<b>Варианты написания сообщений:\n</b>' +
            '<pre>напомнить через секунду/минуту/полчаса/час/день/сутки/неделю/месяц/полгода/год\n</pre>' +
            '<pre>2)напомнить через «Х(число цифрой)» секунд/минут/часов/дней/недель/месяцев/лет\n</pre>' +
            '<pre>3)напомнить через «Х(число словами)» секунд/минут/часов/дней/недель/месяцев/лет\n</pre>' +
            '<pre>4)напомнить через день/неделю/месяц/полгода/год в секунду/минуту/час\n</pre>' +
            '<pre>5)напомнить через день/неделю/месяц/полгода/год в «Y(число цифрой)» секунд/минут/часов\n</pre>' +
            '<pre>6)напомнить через день/неделю/месяц/полгода/год в «Y(число словами)» секунд/минут/часов\n</pre>' +
            '<pre>7)напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в секунду/минуту/час\n</pre>' +
            '<pre>8)напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n</pre>' +
            '<pre>9)напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n</pre>' +
            '<pre>10)напомнить через «Х(число словами)» дней/недель/месяцев/лет в в секунду/минуту/час\n</pre>' +
            '<pre>11)напомнить через «Х(число словами)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n</pre>' +
            '<pre>12)напомнить через «Х(число словами)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n</pre>' +
            '<pre>13)напомнить «Полная дата» в секунду/минуту/час\n</pre>' +
            '<pre>14)напомнить «Полная дата» в «Х(число цифрой)» секунд/минут/часов\n</pre>' +
            '<pre>15)напомнить «Полная дата» в «Х(число словами)» секунд/минут/часов\n</pre>' +
            '<pre>16)напомнить в секунду/минуту/час «Полная дата» \n</pre>' +
            '<pre>17)напомнить в «Х(число цифрой)» секунд/минут/часов «Полная дата» \n</pre>' +
            '<pre>18)напомнить в «Х(число словами)» секунд/минут/часов «Полная дата» \n</pre>' +
            '<pre>19)напомнить «завтра|послезавтра|послепослезавтра» в секунду/минуту/час\n</pre>' +
            '<pre>20)напомнить «сегодня|завтра|послезавтра|послепослезавтра» в «Х(число цифрой)» секунд/минут/часов\n</pre>' +
            '<pre>21)напомнить «сегодня|завтра|послезавтра|послепослезавтра» в «Х(число словами)» секунд/минут/часов\n</pre>' +
            '<pre>22)напомнить в секунду/минуту/час «сегодня|завтра|послезавтра|послепослезавтра»\n</pre>' +
            '<pre>23)напомнить в «Х(число цифрой)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра»\n</pre>' +
            '<pre>24)напомнить в «Х(число словами)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра»\n</pre>' +
            '<pre>25)напомнить в секунду/минуту/час в/во «день недели (вторник|вт)»\n</pre>' +
            '<pre>26)напомнить в «Х(число цифрой)» секунд/минут/часов в/во «день недели (вторник|вт)»\n</pre>' +
            '<pre>27)напомнить в «Х(число словами)» секунд/минут/часов в/во «день недели (вторник|вт)»\n</pre>' +
            '<pre>28)напомнить в/во «день недели (вторник|вт)» в секунду/минуту/час\n</pre>' +
            '<pre>29)напомнить в/во «день недели (вторник|вт)» в «Х(число цифрой)» секунд/минут/часов\n</pre>' +
            '<pre>30)напомнить в/во «день недели (вторник|вт)» в «Х(число словами)» секунд/минут/часов\n</pre>',  {parse_mode: 'HTML'}
            )
        return
    }
    let words = prepareMessage(msg.text)
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
        } catch (e:any) {
            await bot.sendMessage(chatId,e.message)
        }
    }

    if (words.includes('через') == true){
        numberKeywordInMessage = words.indexOf('через') // индекс ключевого слова в массиве
        try {
            millisecondsAndMessage = futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputThrough(numberKeywordInMessage, secondKeywordInMessage, timeMessage)
            console.log(millisecondsAndMessage)
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


