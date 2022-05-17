import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()
import MessageToSend from "../MessageToSend";
import errorHandlingOfIncorrectTimeEntry from "./ErrorHandlingOfIncorrectTimeEntry"
import errorHandlingOfIncorrectTimeEntryUsingWords from "./ErrorHandlingOfIncorrectTimeEntryUsingWords";


//функция добавления времени, когда известен день
function addTimeWhenDayIsKnown(date:Date, words:Array<string>, millisecondsTime:number, messageFuture:string) : MessageToSend {
    if (words.includes('в') == true || words.includes('во') == true){
        if(words.includes('во') == true){
            words.splice(words.indexOf('во'),1,'в')
        }
        let secondKeywordInMessage:number = words.indexOf('в') // номер ключевого слова в массиве
        let arrayElementAfterSecondKeyword1 = words[(secondKeywordInMessage)+1] // элемент массива после ключевого слова (secondKeywordInMessage) - первый
        let arrayElementAfterSecondKeyword2 = words[(secondKeywordInMessage)+2] // элемент массива после ключевого слова (secondKeywordInMessage) - второй
        let arrayElementAfterSecondKeyword3 = words[(secondKeywordInMessage)+3] // элемент массива после ключевого слова (secondKeywordInMessage) - третий
        let arrayElementAfterSecondKeyword4 = words[(secondKeywordInMessage)+4] // элемент массива после ключевого слова (secondKeywordInMessage) - четвертый

        if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword4,1) == 0){
            throw new Error('<b>Ошибка! После указателя времени "В" ожидалось число и единица времени или просто единица времени. </b>\n'+'Возможно что-то отсутствует или опечатка');
        }
        if(millisecondsTime >= 86400000 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) < 86400000){
            const futureDate = new Date (Date.parse(date.toString()) + millisecondsTime)
            futureDate.setHours(0,0,0,0)
            const dateMs = Date.parse(date.toString())
            const futureDateMs = Date.parse(futureDate.toString())
            let timeAfterSecondKeyword:number
            if(/^[0-9]*$/.test(words[secondKeywordInMessage + 1])){ //только цифры
                timeAfterSecondKeyword = parseInt(arrayElementAfterSecondKeyword1)
                if(timeAfterSecondKeyword == 0){
                    timeAfterSecondKeyword = 24
                }
                errorHandlingOfIncorrectTimeEntry(timeAfterSecondKeyword,arrayElementAfterSecondKeyword2)
                messageFuture = words.slice((secondKeywordInMessage+3),words.length).join(' ')//сообщение, которое напоминаем
                millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs,futureDateMs,timeAfterSecondKeyword,words, secondKeywordInMessage+2)
            }
            else {
               timeAfterSecondKeyword = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterSecondKeyword1, arrayElementAfterSecondKeyword2)
                errorHandlingOfIncorrectTimeEntryUsingWords(arrayElementAfterSecondKeyword1, arrayElementAfterSecondKeyword2)
                errorHandlingOfIncorrectTimeEntry(timeAfterSecondKeyword,arrayElementAfterSecondKeyword3)
                let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(timeAfterSecondKeyword,dateMs,futureDateMs,words,secondKeywordInMessage+1,secondKeywordInMessage+2,secondKeywordInMessage+3,secondKeywordInMessage+4)
                messageFuture = objTime.message
                millisecondsTime = objTime.millisecondsTime
            }
            return new MessageToSend(millisecondsTime, messageFuture)
        }
        else {
            throw new Error('<b>Ошибка! Некорректно введено время и дата - неизвестно когда напоминать\n\n</b>' +
                '<u>Возможные ошибки:</u>\n' +
                '- опечатка/отсутствие времени или даты\n' +
                '- тавтология: время = дата\n' +
                '- время является: дней/недель/лет - т е тоже дата, а не время (сек/мин/час)\n' +
                '- дата является: сек/мин/полчаса/час - т е тоже время, а не день (день/неделя/месяд)');
        }
    }
    else {
        return new MessageToSend(millisecondsTime, messageFuture)
    }
}

export default addTimeWhenDayIsKnown


