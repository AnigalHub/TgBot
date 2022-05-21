import MessageToSend from "../MessageToSend";
import addDateWhenItIsSpecifiedInFull from "./add_date_if_different_type/AddDateWhenItIsSpecifiedInFull";
import addDayOfTheWeek from "./add_date_if_different_type/AddDayWhenTimeAndDayOfTheWeekAreKnown";
import AddDayWhenTimeIsKnown from "./add_date_if_different_type/AddDayWhenTimeIsKnown";
import errorHandlingOfIncorrectTime from "./ErrorHandlingOfIncorrectTime"
import DayOfTheWeek from "../DayOfTheWeek";
import ConvertTime from "./../ConvertTime";
const convertTime = new ConvertTime()

//функция - Добавление даты разного типа (полная дата/день недели/словом указателем)
function addDateOfDifferentType(date:Date,arrayElementWithDate:string,numberArrayElementResponsiveForTimeType:number,timeRemind:number,dateMs:number,
                                words:Array<string>, numberKeywordInMessage:number,messageFuture:string, millisecondsTime:number) : MessageToSend {
console.log('addDateOfDifferentType')
    if(new DayOfTheWeek(arrayElementWithDate).SearchForTheDayNumberOfTheWeek() == -1){
        //проверка ввода времени
       // validationOfTimeInput(words,numberArrayElementResponsiveForTimeType)
        errorHandlingOfIncorrectTime(timeRemind,words,words[numberArrayElementResponsiveForTimeType],arrayElementWithDate)
    }

    //проверка даты и времени
    //dateAndTimeValidation(timeRemind,words,words[numberArrayElementResponsiveForTimeType],arrayElementWithDate)

    //проверка - если дата указана полная (с .,-,/ и только цифры) и после ключевого слова "В"
    if(!/[А-яЁё]/.test(arrayElementWithDate) && (arrayElementWithDate.includes('.') == true || arrayElementWithDate.includes('-') == true || arrayElementWithDate.includes('/') == true )) {
        console.log('тут1')
        //добавление даты, когда дата указана полностью
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberArrayElementResponsiveForTimeType,arrayElementWithDate,words,date,dateMs, timeRemind, messageFuture,millisecondsTime)
    }
    //проверка - если дата указана полная (с .,-,/ и только цифры) до ключевого слова "В"
    else if( (words[numberKeywordInMessage-1]) && !/[А-яЁё]/.test(words[numberKeywordInMessage-1]) && (words[numberKeywordInMessage-1].includes('.') == true || words[numberKeywordInMessage-1].includes('-') == true || words[numberKeywordInMessage-1].includes('/') == true )){
        console.log('тут2')
        //добавление даты, когда дата указана полностью
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage-1,numberArrayElementResponsiveForTimeType,words[numberKeywordInMessage-1],words,date,dateMs, timeRemind, messageFuture,millisecondsTime)
    }
    //проверка - если элемент arrayElementWithDate (элемент массива, отвечающий за дату) содержит только буквы
    else if (/[А-яЁё]/.test(arrayElementWithDate)){
        //слово до "дня недели"
        const beforeDayOfTheWeek = new DayOfTheWeek(arrayElementWithDate)
        //слово после "дня недели"
        const afterDayOfTheWeek = new DayOfTheWeek(words[numberArrayElementResponsiveForTimeType+2])

        //проверка - слово до "дня недели" - является днем недели
        if(beforeDayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
           //день недели
           let dayOfTheWeek:string

           //проверка - слово, которое находится до элемента, который отвечает за время (сек/мин/час) - является временем
           if(convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType-1],1) != 0){
               //день недели
               dayOfTheWeek = words[numberArrayElementResponsiveForTimeType-1]
           }
           //проверка - слово, которое отвечает за время (сек/мин/час) - является временем
           else if(convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) != 0){
               //день недели
               dayOfTheWeek = words[numberArrayElementResponsiveForTimeType]
           }
           //проверка - слово, которое находится после элемента, который отвечает за время (сек/мин/час) - является временем
           else {
               //день недели
               dayOfTheWeek = words[numberArrayElementResponsiveForTimeType+1]
           }
            //добавление дня, когда указано время и день недели
            return addDayOfTheWeek(numberKeywordInMessage,arrayElementWithDate, dayOfTheWeek,date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        //проверка - если в arrayElementWithDate - попала не дата, а "в" или "во" и afterDayOfTheWeek - является днем недели (находится в массиве дней недели)
        if (arrayElementWithDate == 'в' || arrayElementWithDate == 'во' &&  afterDayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
            //добавление дня, когда указано время и день недели
            return addDayOfTheWeek(numberKeywordInMessage+1,words[numberArrayElementResponsiveForTimeType+2], words[numberArrayElementResponsiveForTimeType],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else{
            //добавление дня, когда время известно
            return AddDayWhenTimeIsKnown(date,arrayElementWithDate,timeRemind,dateMs,words,numberKeywordInMessage,numberArrayElementResponsiveForTimeType,messageFuture, millisecondsTime)
        }
    }
    else {
        console.log('addDateOfDifferentType')
        throw new Error('<b>Ошибка! Некорректно указана дата. </b>\n'+'Дата указывается: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
    }
}
export default addDateOfDifferentType