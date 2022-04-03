"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("./config.json"));
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var ConvertTime_1 = __importDefault(require("./ConvertTime"));
var DayOfTheWeek_1 = __importDefault(require("./DayOfTheWeek"));
var DateAsString_1 = require("./helper_functions/DateAsString");
var AddTimeWhenDayIsKnown_1 = __importDefault(require("./helper_functions/AddTimeWhenDayIsKnown"));
var token = config_json_1.default.token;
var bot = new node_telegram_bot_api_1.default(token, { polling: true, baseApiUrl: "https://api.telegram.org" });
var convertTime = new ConvertTime_1.default();
//функция удаления пустых элементов из массива
function RemoveEmptyElementsFromArray(array) {
    var output = array;
    if ((array === null || array === void 0 ? void 0 : array.includes(' ')) == true) {
        output = array === null || array === void 0 ? void 0 : array.filter(function (el) {
            return (el != "");
        });
    }
    return output;
}
//дата в данную минуту
var date = new Date();
console.log(date.toString()); //день недели | дата | время
bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, timeMessage, text, words, keywordInMessage, secondKeywordInMessage, millisecondsTime, messageFuture, arrayElementAfterKeyword1, arrayElementAfterKeyword2, arrayElementAfterKeyword3, arrayElementAfterKeyword4, time, time, objTime, arrayElementAfterKeyword1, arrayElementAfterKeyword2, arrayElementAfterKeyword3, arrayElementAfterKeyword4, arrayElementAfterKeyword5, arrayElementAfterKeyword6, time, dayOfTheWeek, differenceInDays, futureDay, futureDate, futureMs, futureDateAndTime, futureDay, futureDate, yearMessage, monthMessage, dayMessage, futureDate, dayOfTheWeek, differenceInDays, futureDay, futureDate, time, objTime, time, futureMs, futureDateAndTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = msg.chat.id //id пользователя
                ;
                timeMessage = msg.date //дата в сек отправки сообщения, которое напоминаем
                ;
                console.log('дата сообщения', new Date(timeMessage * 1000).toString()); //дата и время, когда отправили сообщение, которое напомнить в виде строки
                text = msg.text // сообщение пользователя
                ;
                if (!!text) return [3 /*break*/, 2];
                return [4 /*yield*/, bot.sendMessage(chatId, "нет сообщения")];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                text = text.toLocaleLowerCase(); // изменение регистра букв - на маленькие
                words = text.split(" ") //разбиение на элементы массива, "пробел"
                ;
                words = RemoveEmptyElementsFromArray(words); // избавление в массиве от пустых элементов
                console.log(words); //массив
                secondKeywordInMessage = 0 //ключевое слово в сообщении
                ;
                millisecondsTime = 0 //миллисекунды - через сколько надо прислать сообщение
                ;
                if (!(words.includes('через') == true)) return [3 /*break*/, 19];
                keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf('через'); // индекс ключевого слова в массиве
                arrayElementAfterKeyword1 = words[keywordInMessage + 1] // элемент массива после ключевого слова - первый
                ;
                arrayElementAfterKeyword2 = words[keywordInMessage + 2] // элемент массива после ключевого слова - второй
                ;
                arrayElementAfterKeyword3 = words[keywordInMessage + 3] // элемент массива после ключевого слова - третий
                ;
                arrayElementAfterKeyword4 = words[keywordInMessage + 4] // элемент массива после ключевого слова - четвертый
                ;
                if (!/^[0-9]*$/.test(arrayElementAfterKeyword1)) return [3 /*break*/, 9];
                time = parseInt(arrayElementAfterKeyword1) // время с типом число
                ;
                messageFuture = words.slice((keywordInMessage + 3), words.length).join(' '); // сообщение, которое напоминаем
                millisecondsTime = convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, time); //миллисекунды - через сколько надо прислать сообщение
                if (!(time == 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!')];
            case 3:
                _a.sent();
                return [3 /*break*/, 8];
            case 4:
                if (!(millisecondsTime == 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Отсутствует или некорректно указана единица времени')];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, (0, AddTimeWhenDayIsKnown_1.default)(bot, chatId, date, words, secondKeywordInMessage, millisecondsTime, messageFuture)]; // функция добавления времени когда день известен
            case 7:
                _a.sent(); // функция добавления времени когда день известен
                _a.label = 8;
            case 8: return [3 /*break*/, 18];
            case 9:
                if (!/^[А-яЁё]*$/.test(arrayElementAfterKeyword1)) return [3 /*break*/, 16];
                if (!(arrayElementAfterKeyword1 == 'ноль' || arrayElementAfterKeyword1 == 'нуль')) return [3 /*break*/, 11];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!')];
            case 10:
                _a.sent();
                return [3 /*break*/, 15];
            case 11:
                if (!(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword1, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4, 1) == 0)) return [3 /*break*/, 13];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Не указана единица времени')];
            case 12:
                _a.sent();
                return [3 /*break*/, 15];
            case 13:
                time = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword1, arrayElementAfterKeyword2);
                objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, words, keywordInMessage + 1, keywordInMessage + 2, keywordInMessage + 3, keywordInMessage + 4);
                messageFuture = objTime.message;
                millisecondsTime = objTime.millisecondsTime;
                return [4 /*yield*/, (0, AddTimeWhenDayIsKnown_1.default)(bot, chatId, date, words, secondKeywordInMessage, millisecondsTime, messageFuture)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15: return [3 /*break*/, 18];
            case 16: return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ')];
            case 17:
                _a.sent();
                _a.label = 18;
            case 18: return [3 /*break*/, 53];
            case 19:
                if (!(words.includes('в') == true || words.includes('во') == true)) return [3 /*break*/, 50];
                if (words.includes('во') == true) {
                    words.splice(words === null || words === void 0 ? void 0 : words.indexOf('во'), 1, 'в');
                }
                keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf('в'); //индекс ключевого слова в массиве
                arrayElementAfterKeyword1 = words[keywordInMessage + 1] // элемент массива после ключевого слова - первый
                ;
                arrayElementAfterKeyword2 = words[keywordInMessage + 2] // элемент массива после ключевого слова - второй
                ;
                arrayElementAfterKeyword3 = words[keywordInMessage + 3] // элемент массива после ключевого слова - третий
                ;
                arrayElementAfterKeyword4 = words[keywordInMessage + 4] // элемент массива после ключевого слова - четвертый
                ;
                arrayElementAfterKeyword5 = words[keywordInMessage + 5] // элемент массива после ключевого слова - пятый
                ;
                arrayElementAfterKeyword6 = words[keywordInMessage + 6] // элемент массива после ключевого слова - шестой
                ;
                if (!/^[0-9]*$/.test(arrayElementAfterKeyword1)) return [3 /*break*/, 41];
                time = parseInt(arrayElementAfterKeyword1) //время с типом число
                ;
                if (time == 0) {
                    time = 24;
                }
                if (!(time > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, 1) >= 3600000)) return [3 /*break*/, 21];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24')];
            case 20:
                _a.sent();
                return [3 /*break*/, 40];
            case 21:
                if (!(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, time) == 0)) return [3 /*break*/, 23];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов')];
            case 22:
                _a.sent();
                return [3 /*break*/, 40];
            case 23:
                if (!!arrayElementAfterKeyword3) return [3 /*break*/, 25];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Не указана дата')];
            case 24:
                _a.sent();
                return [3 /*break*/, 40];
            case 25:
                if (!/[А-яЁё]/.test(arrayElementAfterKeyword3)) return [3 /*break*/, 34];
                if (!((arrayElementAfterKeyword3) == "в" || (arrayElementAfterKeyword3) == "во")) return [3 /*break*/, 26];
                dayOfTheWeek = new DayOfTheWeek_1.default(arrayElementAfterKeyword4);
                if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1) {
                    differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek();
                    futureDay = date.getDate() + differenceInDays;
                    futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                    futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, time);
                    futureDateAndTime = new Date(futureMs);
                    millisecondsTime = futureDateAndTime.getTime() - date.getTime();
                    messageFuture = words.slice((keywordInMessage + 5), words.length).join(' '); //сообщение, которое напоминаем
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                }
                return [3 /*break*/, 33];
            case 26:
                futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(arrayElementAfterKeyword3);
                if (!((time < date.getHours()) && arrayElementAfterKeyword3 == 'сегодня')) return [3 /*break*/, 28];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Время указано которое уже прошло - напомнить невозможно')];
            case 27:
                _a.sent();
                return [3 /*break*/, 33];
            case 28:
                if (!(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3, 1) >= 3600000)) return [3 /*break*/, 30];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать')];
            case 29:
                _a.sent();
                return [3 /*break*/, 33];
            case 30:
                if (!(futureDay == -1)) return [3 /*break*/, 32];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Время указано, а дата нет.')];
            case 31:
                _a.sent();
                return [3 /*break*/, 33];
            case 32:
                futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage, futureDate.getHours(), time, words, keywordInMessage + 2);
                messageFuture = words.slice((keywordInMessage + 4), words.length).join(' '); //сообщение, которое напоминаем
                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                _a.label = 33;
            case 33: return [3 /*break*/, 40];
            case 34:
                if (!(!/[А-яЁё]/.test(arrayElementAfterKeyword3) && (arrayElementAfterKeyword3.includes('.') == true ||
                    arrayElementAfterKeyword3.includes('-') == true || arrayElementAfterKeyword3.includes('/') == true))) return [3 /*break*/, 38];
                if (!(words[keywordInMessage + 3][2] != words[keywordInMessage + 3][5] &&
                    (words[keywordInMessage + 3][2] != '.' || words[keywordInMessage + 3][2] != '-' || words[keywordInMessage + 3][2] != '/') &&
                    (words[keywordInMessage + 3][5] != '.' || words[keywordInMessage + 3][5] != '-' || words[keywordInMessage + 3][5] != '/') ||
                    (words[keywordInMessage + 3].length > 10) ||
                    (words[keywordInMessage + 3].length == 7) ||
                    (words[keywordInMessage + 3].length == 9))) return [3 /*break*/, 36];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Опечатка в дате!')];
            case 35:
                _a.sent();
                return [3 /*break*/, 37];
            case 36:
                yearMessage = void 0;
                if (words[keywordInMessage + 3].length == 10) {
                    yearMessage = parseInt(words[keywordInMessage + 3].substring(6, 12));
                }
                else if ((words[keywordInMessage + 3].length == 8) && (String(date.getFullYear()).slice(2, 4) <= words[keywordInMessage + 3].substring(6, 8))) {
                    yearMessage = parseInt(String(date.getFullYear()).slice(0, 2) + words[keywordInMessage + 3].substring(6, 8));
                }
                else {
                    yearMessage = parseInt(String(parseInt(String(date.getFullYear()).slice(0, 2)) + 1) + words[keywordInMessage + 3].substring(6, 8));
                }
                monthMessage = parseInt(words[keywordInMessage + 3].substring(3, 6)) - 1;
                dayMessage = parseInt(words[keywordInMessage + 3].substring(0, 2));
                futureDate = new Date(yearMessage, monthMessage, dayMessage);
                messageFuture = words.slice((keywordInMessage + 4), words.length).join(' '); //сообщение, которое напоминаем
                millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage, futureDate.getHours(), time, words, keywordInMessage + 2);
                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                _a.label = 37;
            case 37: return [3 /*break*/, 40];
            case 38: return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | пт | субботу | 21.05.22 | 21-05-22 | 21/05/22 ')];
            case 39:
                _a.sent();
                _a.label = 40;
            case 40: return [3 /*break*/, 49];
            case 41:
                if (!/^[А-яЁё]*$/.test(arrayElementAfterKeyword1)) return [3 /*break*/, 49];
                dayOfTheWeek = new DayOfTheWeek_1.default(arrayElementAfterKeyword1);
                if (!(dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1)) return [3 /*break*/, 49];
                differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek();
                futureDay = date.getDate() + differenceInDays;
                futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                if (!(arrayElementAfterKeyword2 == "в")) return [3 /*break*/, 48];
                if (!/^[А-яЁё]*$/.test(arrayElementAfterKeyword3)) return [3 /*break*/, 42];
                if (convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword5, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword6, 1) == 0) {
                    bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                }
                else if (millisecondsTime < -1 || millisecondsTime == 0) {
                    bot.sendMessage(chatId, 'Ошибка! Некорректно указано время');
                }
                else {
                    time = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword3, arrayElementAfterKeyword4);
                    if (arrayElementAfterKeyword3 == 'ноль' || arrayElementAfterKeyword3 == 'нуль') {
                        time = 24;
                    }
                    objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, date.getHours(), futureDate.getHours(), words, keywordInMessage + 3, keywordInMessage + 4, keywordInMessage + 5, keywordInMessage + 6);
                    messageFuture = objTime.message;
                    millisecondsTime = objTime.millisecondsTime;
                }
                return [3 /*break*/, 47];
            case 42:
                time = parseInt(arrayElementAfterKeyword3) //время с типом число
                ;
                if (!isNaN(time)) return [3 /*break*/, 44];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку')];
            case 43:
                _a.sent();
                return [3 /*break*/, 47];
            case 44:
                if (!(time > 24)) return [3 /*break*/, 46];
                return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24')];
            case 45:
                _a.sent();
                return [3 /*break*/, 47];
            case 46:
                futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4, time);
                futureDateAndTime = new Date(futureMs);
                millisecondsTime = futureDateAndTime.getTime() - date.getTime();
                messageFuture = words.slice((keywordInMessage + 5), words.length).join(' '); //сообщение, которое напоминаем
                _a.label = 47;
            case 47: return [3 /*break*/, 48];
            case 48:
                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                _a.label = 49;
            case 49: return [3 /*break*/, 53];
            case 50:
                if (!((words.includes('сегодня') == true) || (words.includes('завтра') == true)
                    || (words.includes('послезавтра') == true) || (words.includes('послепослезавтра') == true))) return [3 /*break*/, 51];
                return [3 /*break*/, 53];
            case 51: return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Не корректный ввод. Символы неизвестны!')];
            case 52:
                _a.sent();
                _a.label = 53;
            case 53: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map