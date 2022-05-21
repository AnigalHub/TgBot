import TelegramBot from "node-telegram-bot-api";
import removeEmptyElementsFromArray from "./prepare_message/RemoveEmptyElementsFromArray";
import removeDuplicateAdjacentElementsFromArray from "./prepare_message/RemoveDuplicateAdjacentElementsFromArray";
import errorHandlingRepeatingDifferentTypeOfTime from "./prepare_message/ErrorHandlingRepeatingDifferentTypeOfTime";
import checkingMessageForForeignLetters from "./prepare_message/CheckingMessageForForeignLetters"

//функция - Подготовки сообщения
export default async function prepareMessage(message:string,bot:TelegramBot,chatId:number){
    try {
        //проверка сообщения на иностранные буквы
        checkingMessageForForeignLetters(message)
        //изменение регситра - на маленькие
        let text = message.toLocaleLowerCase()
        //разбиение после слов по пробелу
        let words = text.split(" ")
        //удаление пустых элементов из массива - удаление лишних пробелов из строки сообщения
        words = removeEmptyElementsFromArray(words)
        //удаление повторяющихся соседних элементов из массива (Например: напомнить ЗАВТРА ЗАВТРА в 6 часов)
        words = removeDuplicateAdjacentElementsFromArray(words)
        //обработка повтора разного типа времени
        errorHandlingRepeatingDifferentTypeOfTime(words)

        return words;
    } catch (e:any) {
        await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
    }
}