function errorHandlingInZeroMilliseconds(milliseconds:number) {
    if(milliseconds == 0) {
        throw new Error('Ошибка! Неккоректное время или дата - неизвестно когда напоминать.\n' +
            'Возможные ошибки:\n' +
            '- неккоректно указано/отсутствие времени или даты \n' +
            '- отсутствует или некорректно указана единица времени/даты')
    }
}
export default errorHandlingInZeroMilliseconds