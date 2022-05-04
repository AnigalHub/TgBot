function errorHandlingInZeroMilliseconds(milliseconds:number) {
    if(milliseconds == 0) {
        throw new Error('Ошибка! Неккоректное время или дата - неизвестно когда напоминать.\n' +
            'Возможные ошибки:\n' +
            '- дата указана несколько раз и разная\n' +
            '- отсутствует или некорректно указана единица времени')
    }
}
export default errorHandlingInZeroMilliseconds