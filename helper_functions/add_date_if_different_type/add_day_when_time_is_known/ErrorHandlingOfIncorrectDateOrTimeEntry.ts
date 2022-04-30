import ConvertTime from "../../../ConvertTime";
const convertTime = new ConvertTime()

function errorHandlingOfIncorrectDateOrTimeEntry(date:Date, dayRemind:string,timeRemind:number,futureDay:number) {
    if((timeRemind <= date.getHours()) && dayRemind == 'сегодня'){
        throw new Error('Ошибка! Время указано которое уже прошло - напомнить невозможно');
    }
    if(convertTime.ConvertTimeToMilliseconds(dayRemind,1) >= 3600000){
        throw new Error( 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
    }
    if(futureDay  == -1){
        throw new Error('Ошибка! Некорректно введена дата. Возможно слитное написание');
    }
}