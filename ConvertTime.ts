export default class Time {

    //перевод времени в милисекунды
    ConvertTimeToMilliseconds(word:string,timePhrase:number):number{
        let ms:number
        if(word == "сек." || word == "сек" || word == "секунд" || word == "секунды" || word == "секунду"){
            ms = timePhrase*1000
        }
        else if(word == "мин." || word == "мин" || word == "минут" || word == "минуты" || word == "минуту"){
            ms = timePhrase*60000
        }
        else if(word == "полчаса"){
            ms = timePhrase*1800000
        }
        else if(word == "ч." || word == "ч" || word == "час" || word == "часа" || word == "часов"){
            ms = timePhrase*3600000
        }
        else if(word == "день" || word == "дня" || word == "дней" || word == "сутки" || word == "суток"){
            ms = timePhrase*86400000
        }
        else if(word == "неделю" || word == "недели" || word == "недель"){
            ms = timePhrase*604800000
        }
        else if(word == "месяц" || word == "месяца" || word == "месяцев"){
            ms = timePhrase*2592000000
        }
        else if(word == "полгода"){
            ms = timePhrase*15768000000
        }
        else if(word == "год" || word == "года" || word == "лет"){
            ms = timePhrase*31536000000
        }
        else {
            ms = 0
        }
        return ms
    }

    //перевод слова-указателя времени в число
    ConvertWordIndicatorOfTimeToNumber(date:Date,wordIndicatorMessage:string){
        let day:number
        if(wordIndicatorMessage== "сегодня"){
            day = date.getDate()
        }
        else if(wordIndicatorMessage == "завтра"){
            day = date.getDate()+1
        }
        else if  (wordIndicatorMessage == "послезавтра"){
            day = date.getDate()+2
        }
        else if  (wordIndicatorMessage == "послепослезавтра"){
            day = date.getDate()+3
        }
        else{
            day = -1
        }
        return day
    }

    //перевод однословного числа в число типа number
    ConvertSmallNumberFromStringToNumber(number:string):number {
        let numberTime:number
        if(number == "одну" || number == "один" || number == "первый" || number == "первого"){
            numberTime = 1
        }
        else if(number == "два" || number == "две" || number == "второй" || number == "второго"){
            numberTime = 2
        }
        else if(number == "три" || number == "третий" || number == "третьего"){
            numberTime = 3
        }
        else if(number == "четыре" || number == "четвертый" || number == "четвертого"){
            numberTime = 4
        }
        else if(number == "пять" || number == "пятый" || number == "пятого"){
            numberTime = 5
        }
        else if(number == "шесть" || number == "шестой" || number == "шестого"){
            numberTime = 6
        }
        else if(number == "семь" || number == "седьмой" || number == "седьмого"){
            numberTime = 7
        }
        else if(number == "восемь" || number == "восьмой" || number == "восьмого"){
            numberTime = 8
        }
        else if(number == "девять" || number == "девятый" || number == "девятого"){
            numberTime = 9
        }
        else if(number == "десять" || number == "десятый" || number == "десятого"){
            numberTime = 10
        }
        else if(number == "одинадцать" || number == "одинадцатый" || number == "одинадцатого"){
            numberTime = 11
        }
        else if(number == "двенадцать" || number == "двенадцатый" || number == "двенадцатого"){
            numberTime = 12
        }
        else if(number == "тринадцать" || number == "тринадцатый" || number == "тринадцатого"){
            numberTime = 13
        }
        else if(number == "четырнадцать" || number == "четырнадцатый" || number == "четырнадцатого"){
            numberTime = 14
        }
        else if(number == "пятнадцать" || number == "пятнадцатый" || number == "пятнадцатого"){
            numberTime = 15
        }
        else if(number == "шестнадцать" || number == "шестнадцатый" || number == "шестнадцатого"){
            numberTime = 16
        }
        else if(number == "семнадцать" || number == "семнадцатый" || number == "семнадцатого"){
            numberTime = 17
        }
        else if(number == "восемнадцать" || number == "восемнадцатый" || number == "восенадцатого"){
            numberTime = 18
        }
        else if(number == "девятнадцать" || number == "девятнадцатый" || number == "девятнадцатого"){
            numberTime = 19
        }
        else if(number == "двадцать" || number == "двадцатый" || number == "двадцатого"){
            numberTime = 20
        }
        else if(number == "тридцать" || number == "тридцатый" || number == "тридцатого"){
            numberTime = 30
        }
        else if(number == "сорок" || number == "сороковой"){
            numberTime = 40
        }
        else if(number == "пятьдесят" || number == "пятьдесятый"){
            numberTime = 50
        }
        else if(number == "шестьдесят" || number == "пятьдесятый"){
            numberTime = 60
        }
        else if(number == "семьдесят" || number == "семьдесятый"){
            numberTime = 70
        }
        else if(number == "восемьдесят" || number == "восемьдесятый"){
            numberTime = 80
        }
        else if(number == "девяносто" || number == "девяностый"){
            numberTime = 90
        }
        else if(number == "сто" || number == "сотый"){
            numberTime = 100
        }
        else{
            numberTime = 0
        }
        return numberTime
    }

    //перевод числа, состоящего из двух слов в число типа number
    ConvertLargeNumberFromStringToNumber(number1:string,number2:string):number {
        let  secondPartOfNumber = this.ConvertSmallNumberFromStringToNumber(number2)
        let numberTime:number
        if(number1 == "двадцать"){
            numberTime = 20 + secondPartOfNumber
        }
        else if(number1 == "тридцать"){
            numberTime = 30 + secondPartOfNumber
        }
        else if(number1 == "сорок"){
            numberTime = 40 + secondPartOfNumber
        }
        else if(number1 == "пятьдесят"){
            numberTime = 50 + secondPartOfNumber
        }
        else if(number1 == "шестьдесят"){
            numberTime = 60 + secondPartOfNumber
        }
        else if(number1 == "семьдесят"){
            numberTime = 70 + secondPartOfNumber
        }
        else if(number1 == "восемьдесят"){
            numberTime = 80 + secondPartOfNumber
        }
        else if(number1 == "девяносто"){
            numberTime = 90 + secondPartOfNumber
        }
        else if(number1 == "сто"){
            numberTime = 100 + secondPartOfNumber
        }
        else{
            numberTime = 0
        }
        return numberTime
    }

    //подсчет времени в виде строки в миллисекундах и сборка сообщения
    CountTimeAsStringInMillisecondsAndAssembleMessage(time:number,dateMs:number,futureDate:number,array:Array<string>,arrayElement_1:number,arrayElement_2:number,arrayElement_3:number,arrayElement_4:number){
        let futureMs:number = 0
        let millisecondsTime: number = 0
        let message:string
        let seconds:number = this.ConvertTimeToMilliseconds(array[arrayElement_1],1)
        if (time%10 == 0 && seconds != 1000 && seconds != 60000 && seconds != 1800000
            && seconds != 3600000 && seconds != 86400000 && seconds != 604800000
            && seconds != 2592000000 && seconds != 15768000000 && seconds != 31536000000){
            time = this.ConvertSmallNumberFromStringToNumber(array[arrayElement_1])
            futureMs = futureDate + this.ConvertTimeToMilliseconds(array[arrayElement_2],time)
            message = array.slice((arrayElement_3),array.length).join(' ')//сообщение, которое напоминаем
        }
        else if(time != 1 && time%10 != 0){
            if(time > 20){
                futureMs = futureDate + this.ConvertTimeToMilliseconds(array[arrayElement_3],time)
                message = array.slice((arrayElement_4),array.length).join(' ')//сообщение, которое напоминаем
            }
            else {
                futureMs = futureDate + this.ConvertTimeToMilliseconds(array[arrayElement_2],time)
                message = array.slice((arrayElement_3),array.length).join(' ')//сообщение, которое напоминаем
            }
        }
        else{
            time = 1
            futureMs = futureDate + this.ConvertTimeToMilliseconds(array[arrayElement_1],time)
            message = array.slice((arrayElement_2),array.length).join(' ')//сообщение, которое напоминаем
        }
        millisecondsTime =  futureMs - dateMs
        return {millisecondsTime, message}
    }

    //подсчет разницы в миллисекундах между будущей и текущей датами
    CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs:number,futureDateMs:number,time:number,array:Array<string>,arrayElement:number){
        const futureMs = futureDateMs + this.ConvertTimeToMilliseconds(array[arrayElement],time)
        let diffMilliseconds = futureMs - dateMs
        return diffMilliseconds
    }
}

