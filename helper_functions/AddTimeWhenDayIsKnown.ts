import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()
import MessageToSend from "../MessageToSend";
import errorHandlingOfIncorrectTimeEntry from "./ErrorHandlingOfIncorrectTimeEntry"
import errorHandlingOfIncorrectTimeEntryUsingWords from "./ErrorHandlingOfIncorrectTimeEntryUsingWords";
import checkingForPastTense from "./add_date_if_different_type/add_day_when_time_is_known/CheckingForPastTense";


//функция - Добавление времени, когда известен день
function addTimeWhenDayIsKnown(date:Date, words:Array<string>, millisecondsTime:number, messageFuture:string) : MessageToSend {
    //проверка - в массиве содержится ключевое слово "в" или "во"
    if (words.includes('в') == true || words.includes('во') == true){
        //проверка - в массиве содержится ключевое слово "во"
        if(words.includes('во') == true){
            //замена ключевого слова "во" на ключевое слово "в"
            words.splice(words.indexOf('во'),1,'в')
        }
        //номер ключевого слова в массиве
        let secondKeywordInMessage:number = words.indexOf('в')
        //элемент массива после ключевого слова (secondKeywordInMessage) - первый
        let arrayElementAfterSecondKeyword1 = words[(secondKeywordInMessage)+1]
        //элемент массива после ключевого слова (secondKeywordInMessage) - второй
        let arrayElementAfterSecondKeyword2 = words[(secondKeywordInMessage)+2]
        //элемент массива после ключевого слова (secondKeywordInMessage) - третий
        let arrayElementAfterSecondKeyword3 = words[(secondKeywordInMessage)+3]
        //элемент массива после ключевого слова (secondKeywordInMessage) - четвертый
        let arrayElementAfterSecondKeyword4 = words[(secondKeywordInMessage)+4]

        //проверка - 1-ый, 2-ой, 3-ий, 4-ый элементы массива - один из содержит тип времени (сек/мин/час)
        if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword4,1) == 0){
            console.log('addTimeWhenDayIsKnown')
            throw new Error('<b>Ошибка! После указателя времени "В" ожидалось число и единица времени или просто единица времени. </b>\n'+'Возможно что-то отсутствует или опечатка');
        }
        //проверка - если указано время в виде - сек/мин/час (т е не день/мес/неделя и тд)
        if(millisecondsTime >= 86400000 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) < 86400000){

            //будущая дата - объект Data
            const futureDate = new Date (Date.parse(date.toString()) + millisecondsTime)
            //время в будущей дате - зануляем
            futureDate.setHours(0,0,0,0)
            //дата сообщения в миллисекундах
            const dateMs = Date.parse(date.toString())
            //будущая дата в миллисекундах
            const futureDateMs = Date.parse(futureDate.toString())
            //время - после второго ключевого слова ("В")
            let timeAfterSecondKeyword:number

            //проверка - если (words[secondKeywordInMessage + 1])
            // элемент массива после второго ключевого слова содержит только цифры
            if(/^[0-9]*$/.test(words[secondKeywordInMessage + 1])){
                //время - после второго ключевого слова ("В")
                timeAfterSecondKeyword = parseInt(arrayElementAfterSecondKeyword1)
                //проверка - если время равно 0
                if(timeAfterSecondKeyword == 0){
                    //время - после второго ключевого слова ("В")
                    timeAfterSecondKeyword = 24
                }
                //обработка неправильного ввода времени
                errorHandlingOfIncorrectTimeEntry(timeAfterSecondKeyword,arrayElementAfterSecondKeyword2)
                //сборка будущего сообщения
                messageFuture = words.slice((secondKeywordInMessage+3),words.length).join(' ')
                //подсчет миллисекунд
                millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs,futureDateMs,timeAfterSecondKeyword,words, secondKeywordInMessage+2)
                checkingForPastTense(millisecondsTime)
            }
            else {
                //время - после второго ключевого слова ("В")
                timeAfterSecondKeyword = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterSecondKeyword1, arrayElementAfterSecondKeyword2)
                //обработка неправильного ввода времени словами
                errorHandlingOfIncorrectTimeEntryUsingWords(arrayElementAfterSecondKeyword1, arrayElementAfterSecondKeyword2)
                //обработка неправильного ввода времени
                errorHandlingOfIncorrectTimeEntry(timeAfterSecondKeyword,arrayElementAfterSecondKeyword3)
                //объект, содержащий сообщение и миллисекунды
                let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(timeAfterSecondKeyword,dateMs,futureDateMs,words,secondKeywordInMessage+1,secondKeywordInMessage+2,secondKeywordInMessage+3,secondKeywordInMessage+4)
                //сборка будущего сообщения
                messageFuture = objTime.message
                //подсчет миллисекунд
                millisecondsTime = objTime.millisecondsTime
                checkingForPastTense(millisecondsTime)
            }
            return new MessageToSend(millisecondsTime, messageFuture)
        }
        else {
            console.log('addTimeWhenDayIsKnown')
            throw new Error('<b>Ошибка! Некорректно введено время и дата - неизвестно когда напоминать\n\n</b>' +
                '<u>Возможные ошибки:</u>\n' +
                '- опечатка/отсутствие времени или даты\n' +
                '- тавтология: время = дата\n' +
                '- время является: дней/недель/лет - т е тоже дата, а не время (сек/мин/час)\n' +
                '- дата является: сек/мин/полчаса/час - т е тоже время, а не день (день/неделя/месяд)');
        }
    }
    else {
        return new MessageToSend(millisecondsTime, messageFuture)
    }
}

export default addTimeWhenDayIsKnown


