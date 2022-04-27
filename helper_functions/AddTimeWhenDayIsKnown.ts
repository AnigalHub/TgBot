import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()
import MessageToSend from "../MessageToSend";

//функция добавления времени, когда известен день
function addTimeWhenDayIsKnown(date:Date, words:Array<string>, secondKeywordInMessage:number, millisecondsTime:number, messageFuture:string) : MessageToSend {
    if (words.includes('в') == true || words.includes('во') == true){
        if(words.includes('во') == true){
            words.splice(words.indexOf('во'),1,'в')
        }
        secondKeywordInMessage = words.indexOf('в') // номер ключевого слова в массиве
        let arrayElementAfterSecondKeyword1 = words[(secondKeywordInMessage)+1] // элемент массива после ключевого слова (secondKeywordInMessage) - первый
        let arrayElementAfterSecondKeyword2 = words[(secondKeywordInMessage)+2] // элемент массива после ключевого слова (secondKeywordInMessage) - второй
        let arrayElementAfterSecondKeyword3 = words[(secondKeywordInMessage)+3] // элемент массива после ключевого слова (secondKeywordInMessage) - третий
        let arrayElementAfterSecondKeyword4 = words[(secondKeywordInMessage)+4] // элемент массива после ключевого слова (secondKeywordInMessage) - четвертый

        if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0 &&
            convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 0 &&
            convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) == 0 &&
            convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword4,1) == 0){
            throw new Error('Ошибка! После указателя времени "В" ожидалось число и единица времени или просто единица времени');
        }

        if(millisecondsTime >= 86400000 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) < 86400000){
            const futureDate = new Date (Date.parse(date.toString()) + millisecondsTime)
            futureDate.setHours(0,0,0,0)
            const dateMs = Date.parse(date.toString()) //дата сообщения в миллисекундах
            const futureDateMs = Date.parse(futureDate.toString()) //будущая дата в миллисекундах

            if(/^[0-9]*$/.test(words[secondKeywordInMessage + 1])){ //только цифры
                let timeAfterSecondKeyword = parseInt(arrayElementAfterSecondKeyword1) //время с типом число
                if(timeAfterSecondKeyword == 0){
                    timeAfterSecondKeyword = 24
                }
                if (timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 3600000){
                    throw new Error('Ошибка! Время не может быть больше 24 часов');
                }
                else if (timeAfterSecondKeyword > 59 && (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 60000 || convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 1000)){
                    throw new Error('Ошибка! Время не может быть больше 59 секунд/минут');
                }
                else {
                    messageFuture = words.slice((secondKeywordInMessage+3),words.length).join(' ')//сообщение, которое напоминаем
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs,futureDateMs,timeAfterSecondKeyword,words, secondKeywordInMessage+2)
                    return new MessageToSend(millisecondsTime, messageFuture)
                }
            }
            else if (/^[А-яЁё]*$/.test(words[secondKeywordInMessage + 1])) {// только буквы

                let timeAfterSecondKeyword:number = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterSecondKeyword1, arrayElementAfterSecondKeyword2)

                if ((arrayElementAfterSecondKeyword1 != 'ноль' && arrayElementAfterSecondKeyword1 != 'нуль' ) &&
                    ((convertTime.ConvertSmallNumberFromStringToNumber(arrayElementAfterSecondKeyword1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) ==0 ) || (convertTime.ConvertSmallNumberFromStringToNumber(arrayElementAfterSecondKeyword2) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) !=0))){
                    throw new Error('Ошибка! Некорректное время: опечатка или отсутствие');
                }
                else if(timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) == 3600000 ){
                    throw new Error('Ошибка! Время не может быть больше 24 часов');
                }
                else if(timeAfterSecondKeyword > 59 && (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) == 60000 || convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) == 1000)){
                    throw new Error('Ошибка! Время не может быть больше 59 секунд/минут');
                }
                else {
                    let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(timeAfterSecondKeyword,dateMs,futureDateMs,words,secondKeywordInMessage+1,secondKeywordInMessage+2,secondKeywordInMessage+3,secondKeywordInMessage+4)

                    messageFuture = objTime.message
                    millisecondsTime = objTime.millisecondsTime
                    return new MessageToSend(millisecondsTime, messageFuture)
                }
            }
            else {
                throw new Error('Ошибка! Некорректно введено время. Неизвестные символы');
            }
        }
        else {
            throw new Error('Ошибка! Некорректно введено время и дата - неизвестно когда напоминать: опечатка или отсутствие');
        }
    }
    else {
        return new MessageToSend(millisecondsTime, messageFuture)
    }
}

export default addTimeWhenDayIsKnown


