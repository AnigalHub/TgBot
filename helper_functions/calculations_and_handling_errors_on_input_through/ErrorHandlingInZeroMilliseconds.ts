function errorHandlingInZeroMilliseconds(milliseconds:number) {
    if(milliseconds == 0) {
        throw new Error('<b>Ошибка! Неккоректное время или дата - неизвестно когда напоминать.\n\n</b>' +
            '<u>Возможные ошибки:\n</u>' +
            '- неккоректно указано/отсутствие времени или даты \n' +
            '- отсутствует или некорректно указана единица времени/даты')
    }
}
export default errorHandlingInZeroMilliseconds