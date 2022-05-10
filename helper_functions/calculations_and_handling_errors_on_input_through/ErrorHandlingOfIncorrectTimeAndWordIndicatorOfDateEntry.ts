import DayOfTheWeek from "../../DayOfTheWeek";

function errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry(words:Array<string>,numberKeywordInMessage:number) {
    let wordsElementAfterKeyword1 = words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
    let dayOfTheWeek:number = 0

    for(let i in words){
        dayOfTheWeek = new DayOfTheWeek( words[i]).SearchForTheDayNumberOfTheWeek()
        if (dayOfTheWeek != -1 ||  !/[А-яЁё]/.test( words[i]) && ( words[i].includes('.') == true ||  words[i].includes('-') == true || words[i].includes('/') == true )
        || (words.includes('завтра') || words.includes('послезавтра') || words.includes('послепослезавтра'))){
            throw new Error('<b>Ошибка! Некорректно введено время и дата. </b>\n'+'Несовместимое время и дата. Неизвестно когда напоминать');
        }
    }
    if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) { // только цифры
        let time = parseInt(wordsElementAfterKeyword1)
        if (time == 0) {
            throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Напомнить невозможно - это прям сейчас!')
        }
    }
    if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
        if(wordsElementAfterKeyword1 == 'ноль' || wordsElementAfterKeyword1 == 'нуль'){
            throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Напомнить невозможно - это прям сейчас!');
        }
    }
}
export default errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry