import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()

function dateAndTimeValidation(time:number,wordsElementAfterKeyword1:string,wordsElementAfterKeyword2:string):number {
    if(time == 0){
        time = 24
    }
    if(time > 24 && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) >= 3600000){
        throw new Error('Ошибка! Время не может быть больше 24');
    }
    else if(!wordsElementAfterKeyword1){
        throw new Error('Ошибка! Не указано тип времени (мин | сек | час)');
    }
    else if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
        throw new Error('Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
    }
    else if(!wordsElementAfterKeyword2){
        throw new Error('Ошибка! Не указана дата');
    }
    else {
        return -1
    }
}

export default dateAndTimeValidation