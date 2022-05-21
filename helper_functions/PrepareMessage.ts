import removeEmptyElementsFromArray from "./RemoveEmptyElementsFromArray";
import removeDuplicateAdjacentElementsFromArray from "./RemoveDuplicateAdjacentElementsFromArray";
import TelegramBot from "node-telegram-bot-api";
import errorHandlingRepeatingDifferentTypeOfTime from "./ErrorHandlingRepeatingDifferentTypeOfTime";
import checkingMessageForForeignLetters from "./CheckingMessageForForeignLetters"

//функция - Подготовки сообщения
export default async function prepareMessage(message:string,bot:TelegramBot,chatId:number){
    try {
        checkingMessageForForeignLetters(message)
        let text = message.toLocaleLowerCase()
        let words = text.split(" ")
        words = removeEmptyElementsFromArray(words)
        words = removeDuplicateAdjacentElementsFromArray(words)
        errorHandlingRepeatingDifferentTypeOfTime(words)
        return words;
    } catch (e:any) {
        await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
    }
}