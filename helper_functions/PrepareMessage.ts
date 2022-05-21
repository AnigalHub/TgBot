import removeEmptyElementsFromArray from "./RemoveEmptyElementsFromArray";
import removeDuplicateAdjacentElementsFromArray from "./RemoveDuplicateAdjacentElementsFromArray";
import TelegramBot from "node-telegram-bot-api";
import errorHandlingRepeatingDifferentTypeOfTime from "./ErrorHandlingRepeatingDifferentTypeOfTime";

//функция - Подготовки сообщения
export default async function prepareMessage(message:string,bot:TelegramBot,chatId:number){
    try {
        if (!(!/^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(message) && message[0] != '/')) {
            let text = message.toLocaleLowerCase()
            let words = text.split(" ")
            words = removeEmptyElementsFromArray(words)
            words = removeDuplicateAdjacentElementsFromArray(words)
            errorHandlingRepeatingDifferentTypeOfTime(words)
            return words;
        }
        await bot.sendMessage(chatId,'Ошибка! Не корректный ввод. Символы неизвестны - бот знает только русский язык!',{parse_mode: 'HTML'})

    } catch (e:any) {
        await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
    }
}