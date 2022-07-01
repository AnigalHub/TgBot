import MessageToSend from "../../MessageToSend";
import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()
import calculationOfTheYear from "./add_date_when_it_is_specified_in_full/CalculationOfTheYear"
import errorHandlingOfIncorrectFullDateEntry from "./add_date_when_it_is_specified_in_full/ErrorHandlingOfIncorrectFullDateEntry"
import errorHandlingOfIncorrectTime from "../ErrorHandlingOfIncorrectTime"

//функция - Добавление даты, когда дата указана полностью
function addDateWhenItIsSpecifiedInFull(numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number,
                                        keyword:string, words:Array<string>,date:Date,timeMessageMs:number, time:number,messageFuture:string, millisecondsTime:number): MessageToSend {

    //день
    let dayMessage = parseInt(keyword.substring(0, 2))
    //месяц
    let monthMessage = parseInt(keyword.substring(3, 6)) - 1
    //год
    let yearMessage = calculationOfTheYear(keyword,date)

    //обработка ошибок неверного ввода полной даты
    errorHandlingOfIncorrectFullDateEntry(keyword,dayMessage,monthMessage,yearMessage,date)
    //обработка ошибок неверного ввода времени
    errorHandlingOfIncorrectTime(time,words,words[numberArrayElementResponsiveForTimeType],keyword)

    //будущая дата - объект Data
    let futureDate = new Date(yearMessage, monthMessage, dayMessage)
    //будущая дата в миллисекундах
    const futureDateMs = Date.parse(futureDate.toString())

    //проверка - когда words[numberArrayElementResponsiveForTimeType] - является типом времени (сек/мин/час)
    if (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        //проверка - если время указано одним словом (один, пятнадцать)
        if (convertTime.ConvertSmallNumberFromStringToNumber(words[numberArrayElementResponsiveForTimeType]) != 0){
            //сборка будущего сообщения
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')
            //подсчет миллисекунд
            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType+1)
        }
        // проверка - если время указано не одним словом
        else {
            //сборка будущего сообщения
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType),words.length).join(' ')//сообщение, которое напоминаем
            //подсчет миллисекунд
            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType-1)
        }
    }
    //проверка - когда words[numberArrayElementResponsiveForTimeType] - не является типом времени (сек/мин/час)
    else {
        //проверка - когда время указано раньше даты
        if(numberArrayElementResponsiveForTimeType < words.indexOf(keyword)){
            //сборка будущего сообщения
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')
        }
        //проверка - когда дата указана раньше времени
        else {
            //сборка будущего сообщения
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+1),words.length).join(' ')
        }
        //подсчет миллисекунд
        millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType)
    }
    return new MessageToSend(millisecondsTime, messageFuture)
}

export default addDateWhenItIsSpecifiedInFull
