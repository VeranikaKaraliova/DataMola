(function() {
    const messages = [
        {
            id: '1',
            text: 'Привет!',
            createdAt: new Date('2020-10-11T23:01:10'),
            author: 'Иванов Иван',
            isPersonal: true,
            to: 'Петров Петр'
        },
        {
            id: '2',
            text: 'Как дела?',
            createdAt: new Date('2020-10-11T23:01:52'),
            author: 'Петров Петр',
            isPersonal: false
        },
        {
            id: '3',
            text: 'Я думаю приготовить что-нибудь особенное сегодня вечером. Что посоветуете?',
            createdAt: new Date('2020-10-12T23:02:15'),
            author: 'Happy user',
            isPersonal: false
        },
        {
            id: '4',
            text: 'Нужно подумать...',
            createdAt: new Date('2020-10-12T23:03:14'),
            author: 'Anastasia',
            isPersonal: false
        },
        {
            id: '5',
            text: 'ты любишь  мясо?',
            createdAt: new Date('2020-10-12T23:04:37'),
            author: 'Иван Иванович',
            isPersonal: true,
            to: 'Happy User'
        },
        {
            id: '6',
            text: 'Я скорее вегетарианец. Я предпочитаю фрукты и овощи.В особенности мне нравятся блюда из тыквы или цукини. Ещё я люблю фруктовые салаты.',
            createdAt: new Date('2020-10-12T23:06:01'),
            author: 'Happy User',
            isPersonal: true,
            to: 'Иван Иванович'
        },
        {
            id: '7',
            text: 'Как насчет сезонных салатов? Например, летом мне нравится есть салаты из свежих помидоров и огурцов с луком и различными приправами.',
            createdAt: new Date('2020-10-12T23:06:15'),
            author: 'Mary',
            isPersonal: false
        },
        {
            id: '8',
            text: 'Вкусно получается суп из цукини и салат из свежих овощей с итальянским соусом',
            createdAt: new Date('2020-10-12T23:07:41'),
            author: 'Sasha',
            isPersonal: false
        },
        {
            id: '9',
            text: 'Что лучше приготовить на десерт?',
            createdAt: new Date('2020-10-12T23:10:11'),
            author: 'Vika',
            isPersonal: false
        },
        {
            id: '10',
            text: 'Я бы хотела попробовать торт с корицей и ирландским кремом.',
            createdAt: new Date('2020-10-12T23:00:00'),
            author: 'Anastasia',
            isPersonal: false
        },
        {
            id: '11',
            text: 'Звучит вкусно.',
            createdAt: new Date('2020-10-12T23:12:12'),
            author: 'Happy User',
            isPersonal: false
        },
        {
            id: '12',
            text: 'А у меня сегодня на ужин паста с жареным лососем.',
            createdAt: new Date('2020-10-12T23:13:11'),
            author: 'Sasha',
            isPersonal: false
        },
        {
            id: '13',
            text: 'Ты сама готовила?',
            createdAt: new Date('2020-10-12T23:14:16'),
            author: 'Happy user',
            isPersonal: true,
            to: 'Sasha'
        },
        {
            id: '14',
            text: 'Да, сама.',
            createdAt: new Date('2020-10-12T23:15:18'),
            author: 'Sasha',
            isPersonal: true,
            to: 'Happy user',
        },
        {
            id: '15',
            text: 'Круто!',
            createdAt: new Date('2020-10-12T23:14:21'),
            author: 'Mary',
            isPersonal: false,
        },
        {
            id: '16',
            text: 'Вау!',
            createdAt: new Date('2020-10-12T23:14:02'),
            author: 'Vika',
            isPersonal: false,
        },
        {
            id: '17',
            text: 'Great!',
            createdAt: new Date('2020-10-12T23:16:03'),
            author: 'Иван Иванович',
            isPersonal: false,
        },
        {
            id: '18',
            text: 'Да, лосось полезен для здоровья.',
            createdAt: new Date('2020-10-12T23:17:05'),
            author: 'Sasha',
            isPersonal: false,
        },
        {
            id: '19',
            text: 'Всем хорошего вечера!',
            createdAt: new Date('2020-10-12T23:18:23'),
            author: 'Sasha',
            isPersonal: false,
        },
        {
            id: '20',
            text: 'Пока!',
            createdAt: new Date('2020-10-12T23:18:11'),
            author: 'Happy User',
            isPersonal: false,
        }
    ];
//Функция с сортировкой по дате, пагинацией и возможностью фильтрации сообщений по тексту, дате или автору    
    function getMessages(skip=0, top=10, filterConfig) {
        //глубокое копирование массива
        const clone = Object.assign([], messages);
        clone.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        if (skip === 0 && top === 10){
            var cloneSlice = clone.slice(0, 10);
        }; if (skip === 10 && top === 10) { 
            var cloneSlice = clone.slice(10, 21);
        };
        //фильтр сообщений не чувствительный к регистру
        let results = cloneSlice.filter(name => new RegExp(filterConfig, "i").test(name.text) || 
        new RegExp(filterConfig, "i").test(name.author) || 
        new RegExp(filterConfig, "i").test(name.createdAt));
        return results;
    };

    //Проверка работы функции getMessages()
    console.log('Первые 10 сообщений', getMessages(0,10));
    console.log('Следующие 10 сообщений',getMessages(10,10));
    console.log('Первые 10 сообщений с автором или текстом \'Иван\'', getMessages(0,10, 'иван'));
    console.log('Следующие 10 сообщений с автором или текстом \'Sasha\'', getMessages(10,10, 'sasha'));
    console.log('Следующие 10 сообщений с автором или текстом \'ещё\'', getMessages(10,10, 'ещё'));
    console.log('Первые 10 сообщений от \'2020-10-11\'', getMessages(0,10, '2020-10-11'));

    function getMessage(item){
        let messagesId = messages.filter(name => name.id == item);
        return messagesId;
    };
    console.log(getMessage(13));

    //Проверка объекта msg на валидность
    function validateMessage(msg){
        if (typeof msg.id === 'string' 
        && typeof msg.text === 'string' 
        && typeof msg.createdAt === 'object' 
        && typeof msg.author === 'string' 
        && typeof msg.isPersonal === 'boolean'
        && (typeof msg.to === 'string' || typeof msg.to === "undefined")){
            return true
        } else {
            return false
        };
    };

    //Если все данные введены корректно 
    console.log('Все данные соответствуют условиям, поэтому ответ', validateMessage({
        id: '21',
        text: 'Пока!',
        createdAt: new Date('2020-10-12T23:00:00'),
        author: 'Happy User1',
        isPersonal: true,
        to: 'Hanna',
    }));

    //Если допущена ошибка (в данном случае введено числовой тип данных в поле author)
    console.log('В данном случае введен числовой тип данных в поле author, поэтому ответ', validateMessage({
        id: '21',
        text: 'Пока!',
        createdAt: new Date('2020-10-12T23:00:00'),
        author: 123,
        isPersonal: false,
    }));

    //Добавление сообщения в массив, если успешно пройдена валидация
    function addMessage(msg){
        if (validateMessage(msg) === true) {
            messages.push(msg);
            return true;  
        } else {
            return false;
        }
    };

    //Проверка работы addMessage
    console.log('В данном случае введен числовой тип данных в поле author, поэтому сообщение не добавлено в массив', addMessage({
        id: '21',
        text: 'Пока!',
        createdAt: new Date('2020-10-12T23:00:00'),
        author: 125,
        isPersonal: true,
        to: 'Hanna',
    }));
    console.log(messages);
    console.log('Все данные соответствуют условиям и сообщение добавлено в массив', addMessage({
        id: '21',
        text: 'Пока!',
        createdAt: new Date('2020-10-12T23:00:00'),
        author: "Hanna",
        isPersonal: true,
        to: 'Hanna',
    }));
    console.log(messages);

    //Поиск мообщения по id и изменение его текста
    function editMessage (id, text){
        const clone = Object.assign([], messages);
        let index = clone.indexOf(clone.find(item => item.id == id));
        console.log(clone[index]); // Вывод первоначального варианта сообщения
        if (index > -1) {
            if (validateMessage(clone[index])) {
                clone[index].text = text;
                console.log(clone[index]);
                return true; 
            }
        } else {
            return false
        };
    }

    //Изменение содержимого текста сообщения с id №5 на 'Хочу зефирку'
    console.log(editMessage(5, 'Хочу зефирку'))

    //Функция, позволяющая удалить сообщение по введенному id
    function removeMessage (id){
        const clone = Object.assign([], messages);
        let index = clone.indexOf(clone.find(item => item.id == id));
        if (index > -1) {
            clone.splice(index, 1);
            console.log(clone); //Проверка с учетом удаления 
            return true;
        } else {
            return false;
        };
    }

    //Удаляем 5 обект массива ( с индексом №4)
    console.log(removeMessage(5));

}());