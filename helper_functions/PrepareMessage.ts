import removeEmptyElementsFromArray from "./RemoveEmptyElementsFromArray";
import removeDuplicateAdjacentElementsFromArray from "./RemoveDuplicateAdjacentElementsFromArray";
import DateAsString from "./DateAsString";
import TelegramBot from "node-telegram-bot-api";
import errorHandlingRepeatingDifferentTypeOfTime from "./ErrorHandlingRepeatingDifferentTypeOfTime";

//функция - Подготовки сообщения
export default async function prepareMessage(message:string,bot:TelegramBot,chatId:number){

    try {
        //изменение регистра букв сообщение - везде на маленькие
        let text = message.toLocaleLowerCase()
        //разбиение сообщение на слова в массив
        let words = text.split(" ")

        //Удаление пустых элементов из массива
        words = removeEmptyElementsFromArray(words)

        //Удаление повторяющихся соседних элементов из массива
        words = removeDuplicateAdjacentElementsFromArray (words)
        //Обработка повтора разного типа времени
        errorHandlingRepeatingDifferentTypeOfTime(words)

        return words;
    } catch (e:any) {
        await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
    }
}