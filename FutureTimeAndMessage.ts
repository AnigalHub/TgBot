import MessageToSend from "./MessageToSend";
import addTimeWhenDayIsKnown from "./helper_functions/AddTimeWhenDayIsKnown";
import ConvertTime from "./ConvertTime";
const convertTime = new ConvertTime()
import addDateOfDifferentType from "./helper_functions/AddDateOfDifferentType"
import errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry from "./helper_functions/calculations_and_handling_errors_on_input_through/ErrorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry";
import deleteFromArray from "./helper_functions/calculations_and_handling_errors_on_input_through/DeleteFromArray";
import errorHandlingWhenPastTimeOrTimeIsZero from "./helper_functions/ErrorHandlingWhenPastTimeOrTimeIsZero";
import calculatingTimeAndDateInWords from "./helper_functions/calculations_and_handling_errors_on_input_to/CalculatingTimeAndDateInWords";
import Month from "./Month";
import calculationsWhenEnteringTo from "./helper_functions/CalculationsWhenEnteringTo";



export default class FutureTimeAndMessage{
    //id пользователя
    private readonly chatId:number
    //массив слов - сообщение, которое написали
    private readonly words:Array<string>
    //дата отправки сообщения - объект Date
    private readonly dateMessage:Date
    //миллисекунды
    private millisecondsTime: number
    //сообщение, которое напоминаем
    private messageFuture: string = ''

    constructor(chatId:number,words:Array<string>, dateMessage:Date) {
        this.chatId = chatId
        this.words = words
        this.dateMessage = dateMessage
        this.millisecondsTime = 0
        this.messageFuture = ''
    }
    CalculationsAndErrorHandlingWhenEnteringMonthInWords(numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        console.log(this.words)

        // элемент массива до ключевого слова
        let dayMessage = this.words[numberKeywordInMessage-1]
        // элемент массива с ключевым словом
        let wordsElementAfterKeyword = this.words[numberKeywordInMessage]
        // элемент массива после ключевого слова - первый
        let yearMessage = this.words[numberKeywordInMessage+1]

        let monthObj = new Month(wordsElementAfterKeyword)
        let month = '0'.concat((monthObj.SearchForTheNumberOfTheMonth()+1).toString())

        let dateMessage =  dayMessage.concat('.',month,'.',yearMessage)
        console.log('дата',dateMessage)

        this.words.splice(this.words.indexOf(dayMessage), 3, dateMessage);
        console.log(this.words)
        numberKeywordInMessage = this.words.indexOf('в')
        return calculationsWhenEnteringTo(this.words, this.dateMessage, numberKeywordInMessage,timeMessage, this.messageFuture, this.millisecondsTime)

    }

    //метод - Вычисление и Обработка ошибок при вводе "Через"
    CalculationsAndHandlingErrorsOnInputThrough(numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        // элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1]
        // элемент массива после ключевого слова - второй
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2]
        //индексы ключевых слов - массив
        let keywordIndexes = Array.from(this.words.entries()).filter(i => i[1] == this.words[numberKeywordInMessage]).map(i => i[0])
        //время
        let time:number

        //проверка - если массив индексов ключевых слов больше 1 - т е ключевых слов больше 1 в сообщении
        if(keywordIndexes.length > 1){
            throw new Error('<b>Ошибка! Несколько раз указан указатель времени "ЧЕРЕЗ"</b>');
        }
        //проверка - если "сегодня" было написано раньше слова "через"
        if (this.words.indexOf('сегодня') > this.words.indexOf('через')){
            //удаление из массива
            deleteFromArray(this.words,'сегодня')
        }
        //обработка ошибок неправильного времени и даты, введенной словами
        errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry(this.words,numberKeywordInMessage)

        //проверка - если элемент массива после ключевого слова содержит только цифры
        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)){
            //время
            time = parseInt(wordsElementAfterKeyword1)
            //сборка будущего сообщения
            this.messageFuture = this.words.slice((numberKeywordInMessage+3),this.words.length).join(' ')
            //подсчет миллисекунд
            this.millisecondsTime = convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,time)
            //обработка ошибки при 0 миллисекундах
            errorHandlingWhenPastTimeOrTimeIsZero(this.millisecondsTime)

            //добавление времени, когда известен день
            return addTimeWhenDayIsKnown(this.dateMessage, this.words, this.millisecondsTime, this.messageFuture)
        }
        //проверка - если элемент массива после ключевого слова содержит только буквы
        if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){
            //время
            time = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword1, wordsElementAfterKeyword2)
            //проверка - если первый элемент массива после ключевого слова является типом времени (сек/мин/час)
            if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) != 0){
                //время
                time = convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1)
            }
            //объект, содержащий сообщение и миллисекунды
            let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, this.words,numberKeywordInMessage+1,numberKeywordInMessage+2,numberKeywordInMessage+3,numberKeywordInMessage+4)
            //сборка будущего сообщения
            this.messageFuture = objTime.message
            //подсчет миллисекунд
            this.millisecondsTime = objTime.millisecondsTime
            //обработка ошибки при 0 миллисекундах
            errorHandlingWhenPastTimeOrTimeIsZero(this.millisecondsTime)

            //добавление времени, когда известен день
            return addTimeWhenDayIsKnown(this.dateMessage, this.words,this.millisecondsTime,this.messageFuture)
        }
        else {
            console.log('FutureTimeAndMessage')
            throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
        }
    }

    //метод - Вычисление и Обработка ошибок при вводе "В"
    CalculationsAndHandlingErrorsOnInputTo(numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        //элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1]

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1) || /^[А-яЁё]*$/.test(wordsElementAfterKeyword1)) {
          return calculationsWhenEnteringTo(this.words,this.dateMessage,numberKeywordInMessage,timeMessage,this.messageFuture, this.millisecondsTime)
        }
        else{
            console.log('FutureTimeAndMessage')
            throw new Error('<b>Ошибка! В дате или времени содержатся неизвестные символы. </b>\n'+'Возможно время или дата указаны слитно')
        }
    }
}
