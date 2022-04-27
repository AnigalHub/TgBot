import removeEmptyElementsFromArray from "./RemoveEmptyElementsFromArray";
import removeDuplicateAdjacentElementsFromArray from "./RemoveDuplicateAdjacentElementsFromArray";

//функция подготовки сообщения
export default function prepareMessage(message:string){
    let text = message.toLocaleLowerCase()
    let words = text.split(" ") //разбиение на элементы массива, "пробел"
    words = removeEmptyElementsFromArray(words) // избавление в массиве от пустых элементов
    words = removeDuplicateAdjacentElementsFromArray (words) // избавление в массиве от пустых элементов
    return words;
}