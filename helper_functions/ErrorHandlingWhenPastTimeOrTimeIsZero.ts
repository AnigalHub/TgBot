//функция - Обработка ошибок при прошлом времени или времени равным нулю
function errorHandlingWhenPastTimeOrTimeIsZero(milliseconds:number) {
    console.log('errorHandlingWhenPastTimeOrTimeIsZero')

    //проверка, когда миллисекунд отрицательные
    if(milliseconds < 0) {
        throw new Error('<b>Ошибка! Некорректно введено время или дата. </b>\n'+ 'Время с датой указано которое уже прошло - напомнить невозможно');
    }
    //проверка, когда миллисекунд 0
    if(milliseconds == 0) {
        throw new Error('<b>Ошибка! Неккоректное время или дата - неизвестно когда напоминать.\n\n</b>' +
            '<u>Возможные ошибки:\n</u>' +
            '- неккоректно указано/отсутствие времени или даты \n' +
            '- отсутствует или некорректно указана единица времени/даты')
    }
}
export default errorHandlingWhenPastTimeOrTimeIsZero