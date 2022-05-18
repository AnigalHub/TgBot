//Время, элемент массива с датой и номер элемента массива с типом времени
export default class TimeAndArrayElementWithDateOrTime {
    //время
    public time:number;
    //элемент массива с датой (завтра/01.07.2023)
    public arrayElementWithDate:string;
    //номер элемента массива с типом времени (сек/мин/час)
    public numberArrayElementResponsiveForTimeType:number

    constructor(time: number, arrayElementWithDate: string, numberArrayElementResponsiveForTimeType:number) {
        this.time = time
        this.arrayElementWithDate = arrayElementWithDate
        this.numberArrayElementResponsiveForTimeType = numberArrayElementResponsiveForTimeType
    }
}
