function errorHandlingInZeroMilliseconds(milliseconds:number) {
    if(milliseconds == 0) {
        throw new Error('Ошибка! Отсутствует или некорректно указана единица времени')
    }
}
export default errorHandlingInZeroMilliseconds