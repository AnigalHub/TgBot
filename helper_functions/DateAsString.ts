//функция расчета даты и времени в виде строки
function DateAsString(time:number,date:Date){
    let timeFuture = Date.parse(date.toString()) + time
    const d = new Date (timeFuture)
    console.log(d.toString())// точная дата ( день недели | дата | время)
}
export {DateAsString}