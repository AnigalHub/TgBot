//функция - Проверка сообщения на иностранные буквы
export default function checkingMessageForForeignLetters(message:string){
    //добавить [,],-
    if ((!/^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(message) && message[0] != '/')) {
        throw Error('Ошибка! Не корректный ввод. Символы неизвестны - бот знает только русский язык!')
    }
}