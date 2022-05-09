import ConvertTime from "../../../ConvertTime";
const convertTime = new ConvertTime()

//функция - Обработка ошибок неправильного ввода даты или времени
function errorHandlingOfIncorrectDateOrTimeEntry(date:Date, dayRemind:string,timeRemind:number,futureDay:number) {
    if((timeRemind <= date.getHours()) && dayRemind == 'сегодня'){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+ 'Время указано которое уже прошло - напомнить невозможно</b>');
    }
    if(convertTime.ConvertTimeToMilliseconds(dayRemind,1) >= 3600000){
        throw new Error('<b>Ошибка! Некорректно введено время и дата. </b>\n'+ 'Неизвестно когда напоминать</b>');
    }
    if(futureDay == -1){
        throw new Error('<b>Ошибка! Некорректно введена дата. </b>\n'+ 'Возможно слитное написание');
    }
}
export default errorHandlingOfIncorrectDateOrTimeEntry