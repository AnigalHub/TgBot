//функция - Сборка будущего сообщения
function messageAssembly(words:Array<string>,arrayElementWithTime:string,arrayElementWithDayOfTheWeek:string):string {
    let messageFuture:string
    //проверка на ввод дня недели и времени
    //если время, а потом день недели
    if (words.indexOf(arrayElementWithTime) < words.indexOf(arrayElementWithDayOfTheWeek)){
        messageFuture = words.slice((words.indexOf(arrayElementWithDayOfTheWeek)+1),words.length).join(' ')//сообщение, которое напоминаем
    }
    //если день недели, а потом время
    else {
        messageFuture = words.slice((words.indexOf(arrayElementWithTime) +1),words.length).join(' ')//сообщение, которое напоминаем
    }
    return messageFuture
}
export default messageAssembly