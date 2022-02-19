export default class Time {

    /*перевод времени в милисекунды*/
    ConvertTimeToMilliseconds(word:string,timePhrase:number):number{
        let ms:number
        if(word == "секунд" || word == "секунды" || word == "секунду"){
            ms = timePhrase*1000
        }
        else if(word == "минут" || word == "минуты" || word == "минуту"){
            ms = timePhrase*60*1000
        }
        else if(word == "полчаса"){
            ms = timePhrase*30*1000
        }
        else if(word == "час" || word == "часа" || word == "часов"){
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
            ms = timePhrase*6*2592000000
        }
        else if(word == "год" || word == "года" || word == "лет"){
            ms = timePhrase*31536000000
        }
        else {
            ms = 0
        }
        return ms
    }

    /*перевод слова-указателя времени в число*/
    ConvertWordIndicatorOfTimeToNumber(wordIndicatorMessage:string){
        let date = new Date();
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

    /*перевод однословного времени в число*/
    ConvertSmallNumberFromStringToNumber(number:string):number {
        let numberTime:number
        if(number == "одну" || number == "один"){
            numberTime = 1
        }
        else if(number == "два" || number == "две" ){
            numberTime = 2
        }
        else if(number == "три"){
            numberTime = 3
        }
        else if(number == "четыре"){
            numberTime = 4
        }
        else if(number == "пять"){
            numberTime = 5
        }
        else if(number == "шесть"){
            numberTime = 6
        }
        else if(number == "семь"){
            numberTime = 7
        }
        else if(number == "восемь"){
            numberTime = 8
        }
        else if(number == "девять"){
            numberTime = 9
        }
        else if(number == "десять"){
            numberTime = 10
        }
        else if(number == "одинадцать"){
            numberTime = 11
        }
        else if(number == "двенадцать"){
            numberTime = 12
        }
        else if(number == "тринадцать"){
            numberTime = 13
        }
        else if(number == "четырнадцать"){
            numberTime = 14
        }
        else if(number == "пятнадцать"){
            numberTime = 15
        }
        else if(number == "шестнадцать"){
            numberTime = 16
        }
        else if(number == "семнадцать"){
            numberTime = 17
        }
        else if(number == "восемнадцать"){
            numberTime = 18
        }
        else if(number == "девятнадцать"){
            numberTime = 19
        }
        else if(number == "девятнадцать"){
            numberTime = 19
        }
        else if(number == "двадцать"){
            numberTime = 20
        }
        else if(number == "тридцать"){
            numberTime = 30
        }
        else if(number == "сорок"){
            numberTime = 40
        }
        else if(number == "пятьдесят"){
            numberTime = 50
        }
        else if(number == "шестьдесят"){
            numberTime = 60
        }
        else if(number == "семьдесят"){
            numberTime = 70
        }
        else if(number == "восемьдесят"){
            numberTime = 80
        }
        else if(number == "девяносто"){
            numberTime = 90
        }
        else if(number == "сто"){
            numberTime = 100
        }
        else{
            numberTime = 0
        }
        return numberTime
    }

    /*перевод времени, состоящего из двух слов в число*/
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

    /*подсчет времени в виде строки в миллисекундах и сборка сообщения*/
    CountTimeAsStringInMillisecondsAndAssembleMessage(time:number,date:Date,futureDate:Date,array:Array<string>,arrayElement_1:number,arrayElement_2:number,arrayElement_3:number,arrayElement_4:number,){
        let futureMs:number = 0
        let millisecondsTime: number = 0
        let message:string

        if (time%10 === 0 && this.ConvertTimeToMilliseconds(array[arrayElement_1],1) != 60000){
            console.log('тут')
            time = this.ConvertSmallNumberFromStringToNumber(array[arrayElement_1])
            futureMs = futureDate.getTime() + this.ConvertTimeToMilliseconds(array[arrayElement_2],time)
            message = array.slice((arrayElement_3),array.length).join(' ')//сообщение, которое напоминаем
        }
        else if(time > 20 && time%10 !== 0){
            console.log('2')
            futureMs = futureDate.getTime() + this.ConvertTimeToMilliseconds(array[arrayElement_3],time)
            message = array.slice((arrayElement_4),array.length).join(' ')//сообщение, которое напоминаем
        }
        else{
            console.log('3')
            time = 1
            futureMs = futureDate.getTime() + this.ConvertTimeToMilliseconds(array[arrayElement_1],time)
            message = array.slice((arrayElement_2),array.length).join(' ')//сообщение, которое напоминаем
        }
        const futureDateAndTime = new Date(futureMs)
        millisecondsTime =  futureDateAndTime.getTime() - date.getTime()
        return {millisecondsTime, message}
    }

    /*подсчет разницы в миллисекундах между будущей и текущей датами*/
    CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(){

    }
}

