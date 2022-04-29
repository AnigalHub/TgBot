import MessageToSend from "../../MessageToSend";
import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()
import CalculationOfTheYear from "./add_date_when_it_is_specified_in_full/CalculationOfTheYear"

function addDateWhenItIsSpecifiedInFull(numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number, keyword:string, words:Array<string>,date:Date,timeMessageMs:number, time:number,messageFuture:string, millisecondsTime:number): MessageToSend {
    if  (keyword[2] != keyword[5] && (keyword.includes('.') == false || keyword.includes('/')== false
        || keyword.includes('-')== false) || (keyword.length > 10) || (keyword.length == 7) || (keyword.length == 9)) {
        throw new Error( 'Ошибка! Некорректно введена дата. Опечатка в дате!');
    }
    else {

        let monthMessage = parseInt(keyword.substring(3, 6)) - 1

        let dayMessage = parseInt(keyword.substring(0, 2))
        let yearMessage = CalculationOfTheYear(keyword,date)

        if (dayMessage > 31){
            throw new Error( 'Ошибка! Некорректно введен день в дате. День не может быть больше 31. Максимальное число в месяце 30 или 31.');
        }
        else if (dayMessage == 0){
            throw new Error( 'Ошибка! Некорректно введен день в дате. День не может быть меньше 01. Такого дня не существует.');
        }
        else if(monthMessage > 11){
            throw new Error( 'Ошибка! Некорректно введен месяц в дате. Месяц не может быть больше 12. В году всего 12 месяцев');
        }
        else if(monthMessage < 0){
            throw new Error( 'Ошибка! Некорректно введен месяц в дате. Месяц не может быть меньше 01. Год начинается с 01 месяца = январь.');
        }
        else if(yearMessage < date.getFullYear()){
            throw new Error( 'Ошибка! Некорректно введен год в дате. Год меньше текущего. Напомнить в тот год, который уже прошел - невозможно!');
        }
        else if((convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 1800000)){
            throw new Error( 'Ошибка! Некорректно введено время. Вместо времени указана неккоректно дата или непонятное время');
        }
        else {
            let futureDate = new Date(yearMessage, monthMessage, dayMessage)
            const futureDateMs = Date.parse(futureDate.toString()) //будущая дата в миллисекундах

            if ( convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
                if (convertTime.ConvertSmallNumberFromStringToNumber(words[numberArrayElementResponsiveForTimeType]) != 0){
                    messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')//сообщение, которое напоминаем
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType+1)
                }
                else {
                    messageFuture = words.slice((numberArrayElementResponsiveForTimeType),words.length).join(' ')//сообщение, которое напоминаем
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType-1)
                }
           }
            else {
                if(numberArrayElementResponsiveForTimeType < words.indexOf(keyword)){
                    messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')//сообщение, которое напоминаем
                }
                else {
                    messageFuture = words.slice((numberArrayElementResponsiveForTimeType+1),words.length).join(' ')//сообщение, которое напоминаем
                }
                millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType)
            }
            return new MessageToSend(millisecondsTime, messageFuture)
        }
    }
}

export default addDateWhenItIsSpecifiedInFull
