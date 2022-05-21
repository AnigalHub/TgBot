import MessageToSend from "../../MessageToSend";
import ConvertTime from '../../ConvertTime'
const convertTime = new ConvertTime()
import errorHandlingOfIncorrectDateOrTimeEntry from "../ErrorHandlingOfIncorrectDateOrTimeEntry"
import checkingForPastTense from "../CheckingForPastTense";

//функция - Добавление дня, когда время известно
function addDayWhenTimeIsKnown(date:Date, dayRemind:string, timeRemind:number, dateMs:number, words:Array<string>,
                               numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number,
                               messageFuture:string, millisecondsTime:number) : MessageToSend {
    //номер откуда начинаем собирать будущее сообщение
    let startMessageFuture:number = numberArrayElementResponsiveForTimeType + 2

    //проверка - если dayRemind - не является словом-указателем (сегодня/завтра/послезавтра/послепослезавтра)
    if(convertTime.ConvertWordIndicatorOfTimeToNumber(date,dayRemind) == -1){
        //день в который напоминаем
        dayRemind = words[numberKeywordInMessage-1]
        //номер откуда начинаем собирать будущее сообщение
        startMessageFuture = numberArrayElementResponsiveForTimeType + 1
    }
    //будущий день
    let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(date,dayRemind)
    //обработка ошибок неправильного ввода даты или времени
    errorHandlingOfIncorrectDateOrTimeEntry(date, dayRemind,timeRemind,futureDay)
    //будущая дата - объект Data
    let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
    //будущая дата в миллисекундах
    const futureDateMs = Date.parse(futureDate.toString())

    //подсчет миллисекунд
    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs, futureDateMs, timeRemind, words, numberArrayElementResponsiveForTimeType)
    //проверка времени на прошлое
    checkingForPastTense(millisecondsTime)
    //сборка будущего сообщения
    messageFuture = words.slice((startMessageFuture), words.length).join(' ')

    return new MessageToSend(millisecondsTime, messageFuture)
}
export default addDayWhenTimeIsKnown