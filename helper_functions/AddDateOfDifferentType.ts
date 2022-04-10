import MessageToSend from "../MessageToSend";
import addDateWhenItIsSpecifiedInFull from "./AddDateWhenItIsSpecifiedInFull";
import addDayOfTheWeek from "./AddDayWhenTimeAndDayOfTheWeekAreKnown";
import addDay from "./AddDayWhenTimeIsKnown";

function addDateOfDifferentType(date:Date,arrayElementWithDate:string,numberArrayElementResponsiveForTimeType:number,timeRemind:number,dateMs:number,
                                words:Array<string>, numberKeywordInMessage:number,messageFuture:string, millisecondsTime:number) : MessageToSend {

    console.log('дата',arrayElementWithDate)
    console.log('время',words[numberArrayElementResponsiveForTimeType])

    let wordsElementAfterKeyword2 = words[numberKeywordInMessage+2] // элемент массива после ключевого слова - третий
    let wordsElementAfterKeyword4 = words[numberKeywordInMessage+4] // элемент массива после ключевого слова - четвертый

    if(!/[А-яЁё]/.test(arrayElementWithDate) && (arrayElementWithDate.includes('.') == true || arrayElementWithDate.includes('-') == true || arrayElementWithDate.includes('/') == true )) {
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberArrayElementResponsiveForTimeType,arrayElementWithDate,words,date,dateMs, timeRemind, messageFuture,millisecondsTime)
    }
    else if (/[А-яЁё]/.test(arrayElementWithDate)){ // только буквы
        if((arrayElementWithDate) == "в" || (arrayElementWithDate) == "во"){
            return addDayOfTheWeek(numberKeywordInMessage,wordsElementAfterKeyword4,wordsElementAfterKeyword2,date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else{
            return addDay(date,arrayElementWithDate,timeRemind,dateMs,words,numberKeywordInMessage,messageFuture, millisecondsTime)
        }
    }
    else {
        throw new Error('Ошибка! Некорректно указана дата. Присутствуют цифры. Пример написания даты: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
    }
}
export default addDateOfDifferentType