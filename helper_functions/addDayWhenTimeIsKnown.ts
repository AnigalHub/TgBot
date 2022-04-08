//функция добавления времени, когда известен день
import MessageToSend from "../MessageToSend";
import DateAsString from "./DateAsString";

export function addDayWhenTimeIsKnown(date:Date, dayRemind:string, timeRemind:number, dateMs:number, words:Array<string>, keywordInMessage:number, messageFuture:string, millisecondsTime:number) : MessageToSend {
    let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(dayRemind)
    if((timeRemind < date.getHours()) && dayRemind == 'сегодня'){
        throw new Error('Ошибка! Время указано которое уже прошло - напомнить невозможно');
    }
    else if(convertTime.ConvertTimeToMilliseconds(dayRemind,1) >= 3600000){
        throw new Error( 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
    }
    else if(futureDay  == -1){
        throw new Error('Ошибка! Некорректно введена дата. Время указано, а дата нет.');
    }
    else {
        let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
        const futureDateMs = Date.parse(futureDate.toString()) //будущая дата в миллисекундах

        millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs, futureDateMs, timeRemind, words, keywordInMessage + 2)
        messageFuture = words.slice((keywordInMessage + 4), words.length).join(' ')//сообщение, которое напоминаем
        DateAsString(millisecondsTime, date)
        return new MessageToSend(millisecondsTime, messageFuture)
    }
}
