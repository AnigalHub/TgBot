import ConvertTime from "../ConvertTime";
const convertTime = new ConvertTime()

//функция - Обработка ошибок неправильного ввода даты или времени
function errorHandlingOfIncorrectDateOrTimeEntry(date:Date, dayRemind:string,timeRemind:number,futureDay:number) {
    //проверка если указана единица измерения времени - не сек, мин, полчаса, час --- а день, нееделя, месяц, полгода, год
    if(convertTime.ConvertTimeToMilliseconds(dayRemind,1) >= 3600000){
        throw new Error('<b>Ошибка! Некорректно введено время и дата. </b>\n'+ 'Неизвестно когда напоминать');
    }
    //проверка если дата не сегодня, завтра, послезавтра, послепослезавтра - а что-то иное
    if(futureDay == -1){
        throw new Error('<b>Ошибка! Некорректно введена дата. </b>\n'+ 'Возможно слитное написание');
    }
}
export default errorHandlingOfIncorrectDateOrTimeEntry