import MessageToSend from "../MessageToSend";
import addDateWhenItIsSpecifiedInFull from "./date_different_type/AddDateWhenItIsSpecifiedInFull";
import addDayOfTheWeek from "./date_different_type/AddDayWhenTimeAndDayOfTheWeekAreKnown";
import addDay from "./date_different_type/AddDayWhenTimeIsKnown";

function addDateOfDifferentType(date:Date,arrayElementWithDate:string,numberArrayElementResponsiveForTimeType:number,timeRemind:number,dateMs:number,
                                words:Array<string>, numberKeywordInMessage:number,messageFuture:string, millisecondsTime:number) : MessageToSend {

    console.log('дата',arrayElementWithDate)
    console.log('время',words[numberArrayElementResponsiveForTimeType])

    if(!/[А-яЁё]/.test(arrayElementWithDate) && (arrayElementWithDate.includes('.') == true || arrayElementWithDate.includes('-') == true || arrayElementWithDate.includes('/') == true )) {
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberArrayElementResponsiveForTimeType,arrayElementWithDate,words,date,dateMs, timeRemind, messageFuture,millisecondsTime)
    }
    else if (/[А-яЁё]/.test(arrayElementWithDate)){ // только буквы
        if((arrayElementWithDate) == "в" || (arrayElementWithDate) == "во"){
            return addDayOfTheWeek(numberKeywordInMessage,words[numberArrayElementResponsiveForTimeType+2],words[numberArrayElementResponsiveForTimeType],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else{
            console.log(date,arrayElementWithDate,timeRemind,dateMs,words,numberKeywordInMessage,messageFuture, millisecondsTime)
            console.log('тууууууууут')
            return addDay(date,arrayElementWithDate,timeRemind,dateMs,words,numberKeywordInMessage,numberArrayElementResponsiveForTimeType,messageFuture, millisecondsTime)
        }
    }
    else {
        throw new Error('Ошибка! Некорректно указана дата. Присутствуют цифры. Пример написания даты: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
    }
}
export default addDateOfDifferentType