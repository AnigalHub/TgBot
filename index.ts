import config from './config.json'
import TelegramBot from "node-telegram-bot-api"
import prepareMessage from "./helper_functions/PrepareMessage";
import DateAsString from "./helper_functions/DateAsString";
import outputMessageOnCommand from "./helper_functions/OutputMessageOnCommand";
import getMessageWithTime from "./helper_functions/GetMessageWithTime";

const token:string = config.token
const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

// База
import pool from "./db"

// переместить в consts.js
const STATUSES = {
    Created: 'Не отправлен',
    Sent: 'Отправлен'
}
const INSERT_MESSAGE = 'INSERT INTO tg_bot (telegram_user_id, message, message_date,future_message_date,status) VALUES ($1, $2, $3, $4, $5)'
const SELECT_MESSAGES = 'SELECT * FROM tg_bot WHERE status = \'Не отправлен\' AND now() >= future_message_date ORDER BY future_message_date'


bot.on('message', async (msg) =>{
    //id пользователя
    const chatId = msg.chat.id

    try{
        //дата отправки сообщения в сек
        const timeMessage = msg.date*1000
        //дата отправки сообщения - объект Date
        const dateMessage = new Date(timeMessage)
        //дата и время, когда отправили сообщение, которое напомнить в виде строки
        console.log('дата сообщения',dateMessage.toString())

        //проверка на пустоту ввода
        if(!msg.text){
            console.log('index.js')
            await bot.sendMessage( chatId,"Ошибка! Ожидается текст. Бот работает только с текстом!")
            return
        }
        //console.log(msg.text)

        //вывод сообщения по команде
        if(await outputMessageOnCommand(msg.text, chatId, bot)){
            return
        }
        //массив слов - сообщение, которое написали
        let words = await prepareMessage(msg.text, bot, chatId)
        if(words == undefined){
            return
        }
        //массив
        //console.log(words)

        //получение сообщения и Времени в миллисекундах
        let messageWithTime =  await getMessageWithTime(chatId, bot, words, timeMessage, dateMessage)
        //console.log('messageWithTime', {messageWithTime})

        let futureDate;
        if (messageWithTime != undefined){
            //расчет даты и времени в виде строки
            futureDate = DateAsString(messageWithTime.millisecondsTime,dateMessage)

            //console.log('дата сообщения',dateMessage.toString())
            //console.log('будущая дата сообщения', futureDate.toString())

            //Добавить в базу
           await pool.query(INSERT_MESSAGE, [chatId,messageWithTime.messageFuture,dateMessage,futureDate, STATUSES.Created])
        }
    } catch (e:any) {
        console.log({e})
    }
})

setInterval(async () => {
    try{
        const res = await pool.query(SELECT_MESSAGES)
        for(let row of res.rows){
            //console.log('row', row);
            await bot.sendMessage(row.telegram_user_id,row.message);
            await pool.query('UPDATE tg_bot SET status = $1 where id = $2', [STATUSES.Sent, row.id]);
        }
    } catch (e) {
        console.log("ERROR WHILE SENDING DATA:", e)
    }

}, 30000);