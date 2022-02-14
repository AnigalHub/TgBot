export  default class DayOfTheWeek {
    private dayOfTheWeek: string;

    constructor(dayOfTheWeekInMessage:string) {
        this.dayOfTheWeek = dayOfTheWeekInMessage
    }
    /*поиск индекса (номера) дня недели*/
    SearchForTheDayNumberOfTheWeek ():number{
        let indexArray: number
        let array: Array<string>
        if (this.dayOfTheWeek == 'вс' || this.dayOfTheWeek == 'пн' || this.dayOfTheWeek == 'вт' || this.dayOfTheWeek == 'ср' || this.dayOfTheWeek == 'чт' || this.dayOfTheWeek == 'пт' || this.dayOfTheWeek == 'сб'){
            array = ['вс','пн','вт','ср','чт','пт','сб']
        }
        else if (this.dayOfTheWeek == 'воскресенье' || this.dayOfTheWeek == 'понедельник' || this.dayOfTheWeek == 'вторник' || this.dayOfTheWeek == 'среда' || this.dayOfTheWeek == 'четверг' || this.dayOfTheWeek == 'пятница' || this.dayOfTheWeek == 'суббота'){
            array = ['воскресенье','понедельник','вторник','среда','четверг','пятница','cуббота']
        }
        else if (this.dayOfTheWeek == 'воскресенье' || this.dayOfTheWeek == 'понедельник' || this.dayOfTheWeek == 'вторник' || this.dayOfTheWeek == 'среду' || this.dayOfTheWeek == 'четверг' || this.dayOfTheWeek == 'пятницу' || this.dayOfTheWeek == 'субботу'){
            array = ['воскресенье','понедельник','вторник','среду','четверг','пятницу','cубботу']
        }
        else {
            array = []
        }
        indexArray = array.indexOf(this.dayOfTheWeek)
        return indexArray
    }

    /*разница между днями недели (когда указано время в сообщении)*/
    DiffDaysOfTheWeek() {
        let date = new Date();
        let numberOfTheWeekDayMessage:number = this.SearchForTheDayNumberOfTheWeek()
        let differenceDaysOfTheWeek:number

        if(date.getDay() > numberOfTheWeekDayMessage){
            differenceDaysOfTheWeek = 7 - date.getDay() + numberOfTheWeekDayMessage
        }
        else if (date.getDay() < numberOfTheWeekDayMessage){
            differenceDaysOfTheWeek = numberOfTheWeekDayMessage - date.getDay()
        }
        else {
            differenceDaysOfTheWeek = 7
        }
        return differenceDaysOfTheWeek
    }
}
