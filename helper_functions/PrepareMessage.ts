import removeEmptyElementsFromArray from "./RemoveEmptyElementsFromArray";
import removeDuplicateAdjacentElementsFromArray from "./RemoveDuplicateAdjacentElementsFromArray";

//функция подготовки сообщения - избавление в массиве от пустых элементов
export default function prepareMessage(message:string){
    let text = message.toLocaleLowerCase()
    let words = text.split(" ")
    words = removeEmptyElementsFromArray(words)
    words = removeDuplicateAdjacentElementsFromArray (words)
    return words;
}