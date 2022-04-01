/*функция расчета будущей даты и времени*/
function DateAsString(time:number,date:Date){
    let timeFuture = Date.parse(date.toString()) + time
    const d = new Date (timeFuture)
    console.log(d.toString())// точная дата ( день недели | дата | время)
}
export {DateAsString}