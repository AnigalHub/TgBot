export default class ConvertTime {

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

    /*перевод однословного времени в число*/
    ConvertSmallNumberFromStringToNumber(number:string) {
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
            numberTime = -1
        }
        return numberTime
    }

    /*перевод времени, состоящего из двух слов в число*/
    ConvertLargeNumberFromStringToNumber(number1:string,number2:string) {
        let secondPartOfNumber:number = this.ConvertSmallNumberFromStringToNumber(number2)
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
            numberTime = -1
        }
        return numberTime
    }

}

