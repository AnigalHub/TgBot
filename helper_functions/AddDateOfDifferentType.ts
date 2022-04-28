import MessageToSend from "../MessageToSend";
import addDateWhenItIsSpecifiedInFull from "./date_different_type/AddDateWhenItIsSpecifiedInFull";
import addDayOfTheWeek from "./date_different_type/AddDayWhenTimeAndDayOfTheWeekAreKnown";
import AddDayWhenTimeIsKnown from "./date_different_type/AddDayWhenTimeIsKnown";
import dateAndTimeValidation from  "../helper_functions/DateAndTimeValidation"

function addDateOfDifferentType(date:Date,arrayElementWithDate:string,numberArrayElementResponsiveForTimeType:number,timeRemind:number,dateMs:number,
                                words:Array<string>, numberKeywordInMessage:number,messageFuture:string, millisecondsTime:number) : MessageToSend {

    if(!/[А-яЁё]/.test(arrayElementWithDate) && (arrayElementWithDate.includes('.') == true || arrayElementWithDate.includes('-') == true || arrayElementWithDate.includes('/') == true )) {
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberArrayElementResponsiveForTimeType,arrayElementWithDate,words,date,dateMs, timeRemind, messageFuture,millisecondsTime)
    }
    else if (/[А-яЁё]/.test(arrayElementWithDate) || /^[0-9]*$/.test(arrayElementWithDate)){ // только буквы
        if((words[numberArrayElementResponsiveForTimeType+1]) == "в" || (words[numberArrayElementResponsiveForTimeType+1]) == "во"){
            dateAndTimeValidation(timeRemind,words[numberKeywordInMessage+2],words[numberKeywordInMessage])
            return addDayOfTheWeek(numberKeywordInMessage,words[numberArrayElementResponsiveForTimeType+2],words[numberArrayElementResponsiveForTimeType],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else if((words[numberArrayElementResponsiveForTimeType]) == "в" || (words[numberArrayElementResponsiveForTimeType]) == "во"){
            timeRemind = parseInt(words[numberArrayElementResponsiveForTimeType+1])
            dateAndTimeValidation(timeRemind,words[numberKeywordInMessage+4],words[numberKeywordInMessage+2])
            return addDayOfTheWeek(numberKeywordInMessage+2,words[numberArrayElementResponsiveForTimeType-1],words[numberArrayElementResponsiveForTimeType+2],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else{
            return AddDayWhenTimeIsKnown(date,arrayElementWithDate,timeRemind,dateMs,words,numberKeywordInMessage,numberArrayElementResponsiveForTimeType,messageFuture, millisecondsTime)
        }
    }
    else {
        throw new Error('Ошибка! Некорректно указана дата. Присутствуют цифры. Пример написания даты: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
    }
}
export default addDateOfDifferentType