function messageAssembly(words:Array<string>,arrayElementWithTime:string,arrayElementWithDayOfTheWeek:string):string {
    let messageFuture:string
    if (words.indexOf(arrayElementWithTime) < words.indexOf(arrayElementWithDayOfTheWeek)){
        messageFuture = words.slice((words.indexOf(arrayElementWithDayOfTheWeek)+1),words.length).join(' ')//сообщение, которое напоминаем
    }
    else {
        messageFuture = words.slice((words.indexOf(arrayElementWithTime) +1),words.length).join(' ')//сообщение, которое напоминаем
    }
    return messageFuture
}
export default messageAssembly