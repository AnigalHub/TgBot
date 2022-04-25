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
        await bot.sendMessage( chatId,'')
        return
    }
    if(msg.text == '/help'){
        await bot.sendMessage( chatId,'Варианты написания:\n' +
            'Через\n' +
            'через секунду/минуту/полчаса/час/день/сутки/неделю/месяц/полгода/год\n' +
            'через «Х(число цифрой)» секунд/минут/часов/дней/недель/месяцев/лет\n' +
            'через «Х(число словами)» секунд/минут/часов/дней/недель/месяцев/лет\n' +
            'через день/неделю/месяц/полгода/год в секунду/минуту/час\n' +
            'через день/неделю/месяц/полгода/год в «Y(число цифрой)» секунд/минут/часов\n' +
            'через день/неделю/месяц/полгода/год в «Y(число словами)» секунд/минут/часов\n' +
            'через «Х(число цифрой)» дней/недель/месяцев/лет в секунду/минуту/час\n' +
            'через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n' +
            'через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n' +
            'через «Х(число словами)» дней/недель/месяцев/лет в в секунду/минуту/час\n' +
            'через «Х(число словами)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n' +
            'через «Х(число словами)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n' +
            'Полная дата формата: дд-мм-гггг (дд-мм-гг) | дд.мм.гггг (дд.мм.гг) | дд/мм/гггг (дд/мм/гг)\n' +
            '«Полная дата» в секунду/минуту/час\n' +
            '«Полная дата» в «Х(число цифрой)» секунд/минут/часов\n' +
            '«Полная дата» в «Х(число словами)» секунд/минут/часов\n' +
            'В + Полная дата\n' +
            'в секунду/минуту/час «Полная дата» \n' +
            'в «Х(число цифрой)» секунд/минут/часов «Полная дата» \n' +
            'в «Х(число словами)» секунд/минут/часов «Полная дата» \n' +
            'Сегодня | Завтра | Послезавтра | Послепослезавтра\n' +
            '«завтра|послезавтра|послепослезавтра» в секунду/минуту/час\n' +
            '«сегодня|завтра|послезавтра|послепослезавтра» в «Х(число цифрой)» секунд/минут/часов\n' +
            '«сегодня|завтра|послезавтра|послепослезавтра» в «Х(число словами)» секунд/минут/часов\n' +
            'В\n' +
            'в секунду/минуту/час «сегодня|завтра|послезавтра|послепослезавтра» \n' +
            'в «Х(число цифрой)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра» \n' +
            'в «Х(число словами)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра» \n' +
            'в секунду/минуту/час в/во «день недели (вторник|вт)» \n' +
            'в «Х(число цифрой)» секунд/минут/часов в/во «день недели (вторник|вт)» \n' +
            'в «Х(число словами)» секунд/минут/часов в/во «день недели (вторник|вт)» \n' +
            'в/во «день недели (вторник|вт)» в секунду/минуту/час\n' +
            'в/во «день недели (вторник|вт)» в «Х(число цифрой)» секунд/минут/часов\n' +
            'в/во «день недели (вторник|вт)» в «Х(число словами)» секунд/минут/часов\n'
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


