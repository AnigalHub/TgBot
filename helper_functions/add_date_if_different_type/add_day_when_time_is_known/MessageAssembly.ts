//функция - Сборка будущего сообщения
function messageAssembly(words:Array<string>,arrayElementWithTime:string,arrayElementWithDayOfTheWeek:string):string {
    //будущее сообщение
    let messageFuture:string

    //проверка на ввод дня недели и времени
    //если время, а потом день недели
    if (words.indexOf(arrayElementWithTime) < words.indexOf(arrayElementWithDayOfTheWeek)){
        //будущее сообщение
        messageFuture = words.slice((words.indexOf(arrayElementWithDayOfTheWeek)+1),words.length).join(' ')//сообщение, которое напоминаем
    }
    //если день недели, а потом время
    else {
        //будущее сообщение
        messageFuture = words.slice((words.indexOf(arrayElementWithTime) +1),words.length).join(' ')//сообщение, которое напоминаем
    }
    return messageFuture
}
export default messageAssembly