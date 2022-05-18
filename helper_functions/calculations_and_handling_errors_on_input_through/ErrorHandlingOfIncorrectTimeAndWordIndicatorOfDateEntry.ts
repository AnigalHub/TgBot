import DayOfTheWeek from "../../DayOfTheWeek";

//функция - Обработка ошибок неправильного времени и даты, введенной словами
function errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry(words:Array<string>,numberKeywordInMessage:number) {
    console.log('errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry')
    // элемент массива после ключевого слова - первый
    let wordsElementAfterKeyword1 = words[numberKeywordInMessage+1]
    //номер дня недели (в массиве, 0 - вс)
    let dayOfTheWeek:number = 0

    //цикл по массиву - сообщению, которое ввел пользователь
    for(let i in words){
        //номер дня недели (в массиве)
        dayOfTheWeek = new DayOfTheWeek( words[i]).SearchForTheDayNumberOfTheWeek()

        //проверка - на существование дня недели, на ввод даты цифрами и содержащей - точку, тире или /,
        //существование в массиве слов-указателей: завтра/послезавтра/послепослезавтра
        if (dayOfTheWeek != -1 ||  !/[А-яЁё]/.test( words[i]) && ( words[i].includes('.') == true ||
            words[i].includes('-') == true || words[i].includes('/') == true )
        || (words.includes('завтра') || words.includes('послезавтра') || words.includes('послепослезавтра'))){
            throw new Error('<b>Ошибка! Некорректно введено время и дата. </b>\n'+'Несовместимое время и дата. Неизвестно когда напоминать');
        }
    }
    //проверка - если элемент массива после ключевого слова содержит только цифры
    if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) {
        //время
        let time = parseInt(wordsElementAfterKeyword1)
        //проверка - если время равно 0
        if (time == 0) {
            throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Напомнить невозможно - это прям сейчас!')
        }
    }
    //проверка - если элемент массива после ключевого слова содержит только буквы
    if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){
        //проверка - если время равно ноль/нуль
        if(wordsElementAfterKeyword1 == 'ноль' || wordsElementAfterKeyword1 == 'нуль'){
            throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Напомнить невозможно - это прям сейчас!');
        }
    }
}
export default errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry