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

let logAuthor = 'Veronika';

const fun = (function() {   
    return {
        //Вынесен в отдельную функцию повторяющийся функционал (пагинация)
        pag: function (skip=0, top=10, results) {
                if (skip === 0 && top === 10){
                    if (results.length >= top){
                        var resultsSlice = results.slice(skip, top);
                    } else {
                        var resultsSlice = results.slice(skip, results.length)
                    }
                } else{
                    if (skip> 0 && skip%10 === 0 && top === 10){
                        if (results.length >= top){
                            var resultsSlice = results.slice((skip-1), (skip+9));
                        } else {
                            var resultsSlice = results.slice(skip, results.length)
                        }
                    } else { 
                        alert ('error');
                    }
                }
                return resultsSlice;
            },
        //Функция с сортировкой по дате, пагинацией и возможностью фильтрации сообщений по тексту или автору 
        getMessages: function (skip =0, top=0, filterConfig){
            if (filterConfig !== undefined) {
                let results = Object.assign([], messages);
                for(let key in filterConfig){
                if (filterConfig?.author !== undefined){
                    results = results.filter(name => (name.author.toLowerCase().includes(filterConfig.author.toLowerCase()))) 
                    results.sort((a, b) => a.createdAt - b.createdAt);
                    }
                if (filterConfig?.text !== undefined){
                    results = results.filter(name => (name.text.toLowerCase().includes(filterConfig.text.toLowerCase()))) 
                    results.sort((a, b) => a.createdAt - b.createdAt);
                    }
                if (filterConfig?.dataTo !== undefined){
                    results = results.filter(name => {return name.createdAt < filterConfig.dataTo;}) 
                    results.sort((a, b) => a.createdAt - b.createdAt);
                    }
                if (filterConfig?.dataFrom !== undefined){
                    results = results.filter(name => {return name.createdAt > filterConfig.dataFrom;}) 
                    results.sort((a, b) => a.createdAt - b.createdAt);
                    }
                } return this.pag(skip, top, results)
            };
            if (filterConfig == undefined){ 
                const results = messages.sort((a, b) => a.createdAt - b.createdAt);
                return this.pag(skip, top, results)
            }
        },

        //Функция позволяющая достать сообщение по id
        getMessage: function(item){
            let messagesId = messages.find(name => name.id == item)
            return messagesId.text
        },

        //Проверка объекта msg на валидность
        validateMessage: function (msg){
            if (typeof msg.text === 'string' 
            && msg.text.length <=200
            && typeof msg.isPersonal === 'boolean'
            && ((msg.isPersonal === true && typeof msg.to === 'string') 
            || (msg.isPersonal === false &&typeof msg.to === "undefined"))){
                return true
            } else {
                return false
            }
        },

        //Добавление сообщения в массив, если успешно пройдена валидация
        addMessage: function(msg){
            if (this.validateMessage(msg) === true) {
                msg.id = `${+new Date()}`;
                msg.createdAt = new Date();
                msg.author = logAuthor;
                messages.push(msg);
                return true;
            } else {
                return false;
            }
        },

        //Поиск сообщения по id и изменение его текста
        editMessage: function(id, element){
            const clone = Object.assign([], messages);
            let index = clone.findIndex(item => item.id == id);
            for(let key in element){
                if (element?.text !== undefined){
                    if (index > -1) {
                        if (this.validateMessage(clone[index])) {
                            clone[index].text = element.text;
                            return true; 
                        }
                    }return false
                }if (element?.isPersonal !== undefined){
                    if (index > -1) {
                        if(element.isPersonal == true && element.to !== undefined){
                            clone[index].isPersonal = element.isPersonal;
                            clone[index].to = element.to;
                            console.log(clone[index]);
                            if (this.validateMessage(clone[index])) {
                                return true;
                            } return false
                        }
                        if (element.isPersonal == false) {
                            clone[index].isPersonal = element.isPersonal;
                            delete clone[index].to;
                            console.log(clone[index]);
                            if (this.validateMessage(clone[index])) {
                                return true;
                            } return false  
                        } return false;
                    }
                }
            }
        },

        //Функция, позволяющая удалить сообщение по введенному id
        removeMessage: function(id){
            const clone = Object.assign([], messages);
            let index = clone.findIndex(item => item.id == id);
            if (index > -1) {
                clone.splice(index, 1);
                return true;
            } else {
                return false;
            };
        },
    }
}());

//Проверка работы функции getMessages
console.log('Первые 10 сообщений', fun.getMessages(0,10));
console.log('Следующие 10 сообщений',fun.getMessages(10,10));
console.log('Первые 10 сообщений от автора \'Иван\'', fun.getMessages(0,10, {author: 'Иван'}));
console.log('Первые 10 сообщений от автора\'Anastasia\' с 2020-10-12T23:01:00', fun.getMessages(0, 10,{author: 'Anastasia',dataFrom: new Date('2020-10-12T23:01:00')}));
console.log('Первые 10 сообщений с текстом \'ещё\'', fun.getMessages(0,10, {text:'ещё'}));
//Проверка работы функции getMessage
console.log("В id №11 хранится сообщение:", fun.getMessage(11));
//Проверка работы функции validateMessage, если все данные введены корректно 
console.log('Все данные соответствуют условиям, поэтому ответ', fun.validateMessage({
    text: 'Пока!',
    isPersonal: true,
    to: 'Hanna',
}));
console.log('Все данные соответствуют условиям, поэтому ответ', fun.validateMessage({
    text: 'Пока!',
    isPersonal: false,
}));
//Проверка работы функции validateMessage, если допущена ошибка (персональное сообщение, но нет получателя)
console.log('Персональное сообщение, но нет получателя, поэтому ответ', fun.validateMessage({
    text: 'Пока!',
    isPersonal: true,
}));
//Проверка работы функции addMessage
console.log('Введено персональное сообщение, но не указан получатель, поэтому сообщение не добавлено в массив', fun.addMessage({
    text: 'Пока!',
    isPersonal: true,
}));
console.log('Все данные соответствуют условиям и сообщение добавлено в массив', fun.addMessage({
    text: 'Пока!',
    createdAt: new Date('2020-10-12T23:00:00'),
    isPersonal: false,
}));
//Проверка работы функции editMessage
console.log('Успешно изменен текст сообщения',fun.editMessage(5, {text: 'Уже час ночи'}))
console.log('Сообщение изменено на персональное и добавлен получатель', fun.editMessage(7, {isPersonal: true, to:'Happy user'}))
console.log('Сообщение изменено на персональное и НЕ добавлен получатель', fun.editMessage(7, {isPersonal: true}))
console.log('Сообщение изменено на общее', fun.editMessage(7, {isPersonal: false}))
//Проверка работы функции editMessage: удаляем 5 обект массива (с индексом №4)
console.log('Сообщение успешно удалено', fun.removeMessage(5));