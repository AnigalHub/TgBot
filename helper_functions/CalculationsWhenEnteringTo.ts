import calculatingTimeAndDateInWords
    from "./calculations_and_handling_errors_on_input_to/CalculatingTimeAndDateInWords";
import addDateOfDifferentType from "./AddDateOfDifferentType";

//функция - Расчеты при вводе "В"
function calculationsWhenEnteringTo(words:Array<string>, dateMessage:Date,
                                    numberKeywordInMessage:number,timeMessage:number,
                                    messageFuture: string, millisecondsTime: number) {
    console.log('массив: ',words)
    //время
    let time:number
    //номер элемента массива с типом времени (сек/мин/час)
    let numberArrayElementResponsiveForTimeType:number
    //элемент массива с датой (завтра/01.07.2023)
    let arrayElementWithDate:string
    //объект, содержащий время и дату, введенные словами
    let obj = calculatingTimeAndDateInWords(dateMessage,words,numberKeywordInMessage)
    //время
    time = obj.time
    //элемент массива с датой (завтра/01.07.2023)
    arrayElementWithDate = obj.arrayElementWithDate
    //номер элемента массива с типом времени (сек/мин/час)
    numberArrayElementResponsiveForTimeType = obj.numberArrayElementResponsiveForTimeType

    //добавление даты разного типа (полная дата/день недели/словом указателем)
    return addDateOfDifferentType(dateMessage, arrayElementWithDate,numberArrayElementResponsiveForTimeType,time,timeMessage, words, numberKeywordInMessage,messageFuture, millisecondsTime)

}
export default calculationsWhenEnteringTo