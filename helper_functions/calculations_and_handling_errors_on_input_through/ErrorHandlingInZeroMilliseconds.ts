//функция - Обработка ошибки при 0 миллисекундах
function errorHandlingInZeroMilliseconds(milliseconds:number) {
    //проверка, когда миллисекунд 0
    if(milliseconds == 0) {
        throw new Error('<b>Ошибка! Неккоректное время или дата - неизвестно когда напоминать.\n\n</b>' +
            '<u>Возможные ошибки:\n</u>' +
            '- неккоректно указано/отсутствие времени или даты \n' +
            '- отсутствует или некорректно указана единица времени/даты')
    }
}
export default errorHandlingInZeroMilliseconds