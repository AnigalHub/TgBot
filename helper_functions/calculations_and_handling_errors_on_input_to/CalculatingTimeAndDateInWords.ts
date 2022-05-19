import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()
import DayOfTheWeek from "../../DayOfTheWeek";
import countingTheTimeSpecifiedByWords from "./CountingTheTimeSpecifiedByWords";
import countingNumberArrayElementResponsiveForTimeType from "./CountingNumberArrayElementResponsiveForTimeType";
import TimeAndArrayElementWithDateOrTime from "../calculations_and_handling_errors_on_input_to/TimeAndArrayElementWithDateOrTime";

//фунция - Вычисление времени и даты, введенной словами
function calculatingTimeAndDateInWords(date:Date, words:Array<string>, numberKeywordInMessage:number):TimeAndArrayElementWithDateOrTime {

    // элемент, в котором может быть указана дата (сегодня/завтра/послезавтра)
    let dateOfDifferentType = words[numberKeywordInMessage-1]
    // элемент массива после ключевого слова - первый
    let wordsElementAfterKeyword1 = words[numberKeywordInMessage+1]
    // элемент массива после ключевого слова - второй
    let wordsElementAfterKeyword2 = words[numberKeywordInMessage+2]
    // элемент массива после ключевого слова - третий
    let wordsElementAfterKeyword3 = words[numberKeywordInMessage+3]
    // элемент массива после ключевого слова - четвертый
    let wordsElementAfterKeyword4 = words[numberKeywordInMessage+4]

    //время
    let time:number = 0
    //элемент массива с датой (завтра/01.07.2023)
    let arrayElementWithDate:string = ''
    //номер элемента массива с типом времени (сек/мин/час)
    let numberArrayElementResponsiveForTimeType:number = 0

    //проверка - если элемент массива после ключевого слова содержит только цифры
    if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) {
        //время
        time = parseInt(wordsElementAfterKeyword1)
        //номер элемента массива с типом времени (сек/мин/час)
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 2

        //проверка - dateOfDifferentType - не является словом-указателем (сегодня/завтра/послезавтра/послепослезавтра)
        if(convertTime.ConvertWordIndicatorOfTimeToNumber(date,dateOfDifferentType) != -1){
            //элемент массива с датой (завтра/01.07.2023)
            arrayElementWithDate = dateOfDifferentType
        }
        else {
            //элемент массива с датой (завтра/01.07.2023)
            arrayElementWithDate = wordsElementAfterKeyword3
        }
    }
    //проверка - если элемент массива после ключевого слова содержит только буквы
    if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){
        //день недели
        const dayOfTheWeek = new DayOfTheWeek(wordsElementAfterKeyword1)
        //время
        time = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword1,wordsElementAfterKeyword2)
        //номер элемента массива с типом времени (сек/мин/час)
        numberArrayElementResponsiveForTimeType = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage,wordsElementAfterKeyword1,wordsElementAfterKeyword2)

        //проверка - если dayOfTheWeek - не день недели (нет в массиве дней недели)
        if(dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
            //время
            time = parseInt(wordsElementAfterKeyword3)
            //проверка - если время было указано не цифрой, а словами
            if(isNaN(time)){
                //время
                time = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword3,wordsElementAfterKeyword4)
            }
            //номер элемента массива с типом времени (сек/мин/час)
            numberArrayElementResponsiveForTimeType = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage+2,wordsElementAfterKeyword1,wordsElementAfterKeyword2)
            //элемент массива с датой (завтра/01.07.2023)
            arrayElementWithDate = wordsElementAfterKeyword1
        }
        //проверка - какой то из элементов массива после ключевого слова (1-ый,2-ой или 3-ий) - являются временем (сек/мин/час/мес)
        else if (convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) != 0 ||
            convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) != 0 ||
            convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) != 0){
            //элемент массива с датой (завтра/01.07.2023)
            arrayElementWithDate = words[numberArrayElementResponsiveForTimeType+1]
        }
        else {
            //элемент массива с датой (завтра/01.07.2023)
            arrayElementWithDate = dateOfDifferentType
        }
    }

    return new TimeAndArrayElementWithDateOrTime(time, arrayElementWithDate,numberArrayElementResponsiveForTimeType)
}
export default calculatingTimeAndDateInWords