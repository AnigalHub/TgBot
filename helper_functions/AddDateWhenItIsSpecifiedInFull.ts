import MessageToSend from "../MessageToSend";
import DateAsString from "./DateAsString";
import ConvertTime from "../ConvertTime";
const convertTime = new ConvertTime()

function addDateWhenItIsSpecifiedInFull(numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number, keyword:string, words:Array<string>,date:Date,timeMessageMs:number, time:number,messageFuture:string, millisecondsTime:number): MessageToSend {

    console.log('это',keyword)
    if  (keyword[2] != keyword[5] && (keyword.includes('.') == false || keyword.includes('/')== false
        || keyword.includes('-')== false) || (keyword.length > 10) || (keyword.length == 7) || (keyword.length == 9)) {
        throw new Error( 'Ошибка! Некорректно введена дата. Опечатка в дате!');
    }
    else {
        let yearMessage
        let monthMessage = parseInt(keyword.substring(3, 6)) - 1

        let dayMessage = parseInt(keyword.substring(0, 2))
        if (keyword.length == 10) {
            yearMessage = parseInt(keyword.substring(6, 12))
        }
        else if ((keyword.length == 8) && (String(date.getFullYear()).slice(2, 4) <= keyword.substring(6, 8))) {
            yearMessage = parseInt(String(date.getFullYear()).slice(0, 2) + keyword.substring(6, 8))
        }
        else {
            yearMessage = parseInt(String(parseInt(String(date.getFullYear()).slice(0, 2)) + 1) + keyword.substring(6, 8))
        }

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

            messageFuture = words.slice((numberKeywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем
            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType)
            DateAsString(millisecondsTime,date)

            return new MessageToSend(millisecondsTime, messageFuture)
        }
    }

}

export default addDateWhenItIsSpecifiedInFull
