import removeEmptyElementsFromArray from "./RemoveEmptyElementsFromArray";

//функция подготовки сообщения
export default function prepareMessage(message:string){
    let text = message.toLocaleLowerCase()
    let words = text.split(" ") //разбиение на элементы массива, "пробел"
    words = removeEmptyElementsFromArray(words) // избавление в массиве от пустых элементов
    return words;
}