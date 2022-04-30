import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()

function errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry(words:Array<string>,numberKeywordInMessage:number) {
    let wordsElementBeforeKeyword = words[numberKeywordInMessage-1] // элемент массива после ключевого слова - первый
    let wordsElementAfterKeyword1 = words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
    let wordsElementAfterKeyword2 = words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
    let wordsElementAfterKeyword3 = words[numberKeywordInMessage+3] // элемент массива после ключевого слова - третий
    let wordsElementAfterKeyword4 = words[numberKeywordInMessage+4] // элемент массива после ключевого слова - четвертый

    if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) { // только цифры
        let time = parseInt(wordsElementAfterKeyword1) // время с типом число

        if ((wordsElementBeforeKeyword == 'завтра' || wordsElementBeforeKeyword == 'послезавтра' || wordsElementBeforeKeyword == 'послепослезавтра') ||
            (wordsElementAfterKeyword3 == 'завтра' || wordsElementAfterKeyword3 == 'послезавтра' || wordsElementAfterKeyword3 == 'послепослезавтра'
                && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2, 1) != 0)) {
            throw new Error('Ошибка! Несовместимое время и дата. Неизвестно когда напоминать');
        }
        if (time == 0) { // если время указано цифрой 0
            throw new Error('Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!')
        }
    }
    else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
        if((wordsElementBeforeKeyword == 'завтра' || wordsElementBeforeKeyword == 'послезавтра' || wordsElementBeforeKeyword == 'послепослезавтра')
            || (wordsElementAfterKeyword2 == 'завтра' || wordsElementAfterKeyword2 == 'послезавтра' || wordsElementAfterKeyword2 == 'послепослезавтра' && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) != 0)
            || (wordsElementAfterKeyword3 == 'завтра' || wordsElementAfterKeyword3 == 'послезавтра' || wordsElementAfterKeyword3 == 'послепослезавтра' && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) != 0)
            || (wordsElementAfterKeyword4 == 'завтра' || wordsElementAfterKeyword4 == 'послезавтра' || wordsElementAfterKeyword4 == 'послепослезавтра' && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) != 0)
        ){
            throw new Error('Ошибка! Несовместимое время и дата. Неизвестно когда напоминать');
        }
        if(wordsElementAfterKeyword1 == 'ноль' || wordsElementAfterKeyword1 == 'нуль'){ // если время указано ноль/нуль
            throw new Error('Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
        }
    }
}
export default errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry