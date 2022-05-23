import TelegramBot from "node-telegram-bot-api";

//функция - Вывод сообщения по команде
async function outputMessageOnCommand(message:string, chatId:number, bot:TelegramBot):Promise<boolean>{
    console.log('outputMessageOnCommand')

    if(message == '/start'){
        await bot.sendMessage(chatId,'<b>Telegram-бот-Напоминальщик событий</b>.\n' +
            'Бот помогает не забывать о важных делах и событиях. Он напоминает о событиях или делах ' +
            'в определенный день и дату пользователю.\n\n' +
            'Создайте напоминание боту, отправив простое сообщение.\n\n'+
            '<b><u>Бот знает несколько команд:\n\n</u></b>'+
            '<b><code>/start</code></b> - описание бота\n\n' +
            '<code>/help</code> - правила написания сообщений боту\n\n' +
            '<code>/messageOptions</code> - варианты написания сообщений боту\n\n'
            ,{parse_mode: 'HTML'})
        return true
    }
    if(message == '/help'){
        await bot.sendMessage(chatId,'<b><u>Правила при написании сообщения:\n\n</u></b>' +
            '<b>1)Бот адаптирован только под русский язык!!!!\n\n</b>' +
            '<b>2)Структура сообщения:\n</b><code>Напомнить КОГДА (дата и время) СООБЩЕНИЕ (что напомнить)\n\n</code>' +
            '<b>3)Время указывается с помощью ключевых слов:\n</b>' +
            '<code>-- секунд|сек.|сек|секунды|секунду\n' +
            '-- минуты|мин.|мин|\n' +
            '-- часы|ч.|час\n' +
            '-- дни|день|сутки\n' +
            '-- недели|неделя\n' +
            '-- месяцы|месяц\n' +
            '-- полгода\n' +
            '-- года|год|лет\n\n</code>' +
            '<b>4)Дата указывается с помощью ключевых слов:\n</b>' +
            '<code>-- сегодня|завтра|послезавтра|послепослезавтра\n</code>' +
            '<i>день недели:\n</i>' +
            '<code>-- пн|пнд|понедельник\n' +
            '-- вт|втр|вторник\n' +
            '-- ср|сре|среда\n' +
            '-- чт|чтв|четверг\n' +
            '-- пт|птн|пятница\n' +
            '-- сб|суб|суббота\n' +
            '-- вс|вск|воскресенье\n\n</code>' +
            'полная дата:\n' +
            '<i>числами:\n</i> <code>-- дд-мм-гггг (дд-мм-гг)\n' +
            '-- дд.мм.гггг (дд.мм.гг)\n' +
            '-- дд/мм/гггг (дд/мм/гг)\n</code>' +
            '<i>числами и словом:\n</i> <code>день(число) месяц(слово) год(число)\n\n</code>' +
            '<i>месяц в дате:\n</i>' +
            '<code>-- янв|январь\n' +
            '-- фев|февр|февраль\n' +
            '-- мар|март\n' +
            '-- апр|апрель\n' +
            '-- май\n' +
            '-- июн|июнь\n' +
            '-- июл|июль\n' +
            '-- авг|август\n' +
            '-- сен|сент|сентябрь\n' +
            '-- окт|октб|октябрь\n' +
            '-- ноя|нояб|ноябрь\n' +
            '-- дек|декабрь\n\n</code>' +
            '<b>5)После указателя времени "ЧЕРЕЗ" всегда идет:\n</b>' +
            '<i>число и единица времени:</i><code> через 10 минут|через пять часов\n</code>' +
            '<i>единица времени:</i><code> через час|через неделю\n</code>' +
            'Напоминание приходит через указанный промежуток времени: \n' +
            '<code>через час <s>завтра|послезавтра|послепослезавтра</s> = через час\n</code>' +
            '<i>Сообщение со словом ЧЕРЕЗ не требует даты!!!!!\n\n</i>' +
            '<b>6)После указателя времени "В" всегда идет:\n</b>' +
            '<i>число и единица времени:</i><code> в 15 минут|в два часа\n</code>' +
            '<i>единица времени:</i><code> в минуту|в час\n</code>' +
            '<i>день недели:</i><code> в вт|в пятницу\n\n</code>',  {parse_mode: 'HTML'}
        )
        return true
    }
    if(message == '/messageOptions'){
        await bot.sendMessage(chatId,'<b><u>Варианты написания сообщений:\n</u></b>' +
            '1) <code>напомнить через секунду/минуту/час/день/неделю/месяц/год\n\n</code>' +
            '2) <code>напомнить через «Х(число цифрой)» секунд/минут/часов/дней/недель/месяцев/лет\n\n</code>' +
            '3) <code>напомнить через «Х(число словами)» секунд/минут/часов/дней/недель/месяцев/лет\n\n</code>' +
            '4) <code>напомнить через день/неделю/месяц/полгода/год в секунду/минуту/час\n\n</code>' +
            '5) <code>напомнить через день/неделю/месяц/полгода/год в «Y(число цифрой)» секунд/минут/часов\n\n</code>' +
            '6) <code>напомнить через день/неделю/месяц/полгода/год в «Y(число словами)» секунд/минут/часов\n\n</code>' +
            '7) <code>напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в секунду/минуту/час\n\n</code>' +
            '8) <code>напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n\n</code>' +
            '9) <code>напомнить через «Х(число цифрой)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n\n</code>' +
            '10) <code>напомнить через «Х(число словами)» дней/недель/месяцев/лет в секунду/минуту/час\n\n</code>' +
            '11) <code>напомнить через «Х(число словами)» дней/недель/месяцев/лет в «Y(число цифрой)» секунд/минут/часов\n\n</code>' +
            '12) <code>напомнить через «Х(число словами)» дней/недель/месяцев/лет в «Y(число словами)» секунд/минут/часов\n\n</code>' +
            '13) <code>напомнить «Полная дата» в секунду/минуту/час\n\n</code>' +
            '14) <code>напомнить «Полная дата» в «Х(число цифрой)» секунд/минут/часов\n\n</code>' +
            '15) <code>напомнить «Полная дата» в «Х(число словами)» секунд/минут/часов\n\n</code>' +
            '16) <code>напомнить в секунду/минуту/час «Полная дата»\n\n</code>' +
            '17) <code>напомнить в «Х(число цифрой)» секунд/минут/часов «Полная дата»\n\n</code>' +
            '18) <code>напомнить в «Х(число словами)» секунд/минут/часов «Полная дата»\n\n</code>' +
            '19) <code>напомнить «завтра|послезавтра|послепослезавтра» в секунду/минуту/час\n\n</code>' +
            '20) <code>напомнить «сегодня|завтра|послезавтра|послепослезавтра» в «Х(число цифрой)» секунд/минут/часов\n\n</code>' +
            '21) <code>напомнить «сегодня|завтра|послезавтра|послепослезавтра» в «Х(число словами)» секунд/минут/часов\n\n</code>' +
            '22) <code>напомнить в секунду/минуту/час «сегодня|завтра|послезавтра|послепослезавтра»\n\n</code>' +
            '23) <code>напомнить в «Х(число цифрой)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра»\n\n</code>' +
            '24) <code>напомнить в «Х(число словами)» секунд/минут/часов «сегодня|завтра|послезавтра|послепослезавтра»\n\n</code>' +
            '25) <code>напомнить в секунду/минуту/час в/во «день недели»\n\n</code>' +
            '26) <code>напомнить в «Х(число цифрой)» секунд/минут/часов в/во «день недели»\n\n</code>' +
            '27) <code>напомнить в «Х(число словами)» секунд/минут/часов в/во «день недели»\n\n</code>' +
            '28) <code>напомнить в/во «день недели» в секунду/минуту/час\n\n</code>' +
            '29) <code>напомнить в/во «день недели» в «Х(число цифрой)» секунд/минут/часов\n\n</code>' +
            '30) <code>напомнить в/во «день недели» в «Х(число словами)» секунд/минут/часов\n\n</code>'+
            '31)<code>напомнить в секунд/минут/часов «число месяц год (число слово число)»\n\n</code>' +
            '32)<code>напомнить в «Х(число цифрой)» секунд/минут/часов «число месяц год (число слово число)»\n\n</code>' +
            '33)<code>напомнить в «Х(число словами)» секунд/минут/часов «число месяц год (число слово число)»\n\n</code>'+
            '34)<code>«число месяц год (число слово число)» в секунд/минут/часов\n\n</code>' +
            '35)<code>«число месяц год (число слово число)» в «Х(число цифрой)» секунд/минут/часов\n\n</code>' +
            '36)<code>«число месяц год (число слово число)» в «Х(число словами)» секунд/минут/часов\n\n </code>',{parse_mode: 'HTML'}
        )
        return true
    }
    return false
}
export default outputMessageOnCommand