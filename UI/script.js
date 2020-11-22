const secret = new WeakMap();
class Messages {
  constructor(text, author, isPersonal, to) {
    secret.set(this, { _id: `${+new Date()}` });
    secret.set(this, { _createdAt: new Date() });
    secret.set(this, { _author: author });
    this.text = text;
    this.isPersonal = isPersonal;
    this.to = to;
  }

  get id() {
    return secret.get(this)._id = `${+new Date()}`;
  }

  get createdAt() {
    return secret.get(this)._createdAt = new Date();
  }

  get author() {
    return secret.get(this)._author;
  }

  set author(author) {
    secret.get(this)._author = author;
  }
}

class MessageList {
  constructor(arrMsg, user) {
    this._arrMsg = arrMsg;
    this._user = user;
    this.results = [];
    this.item = null;
    this.messagesId = {};
    this.mesgList = [];
    this.messagesError = [];
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  static validate(msg) {
    if (typeof msg.text === 'string'
        && msg.text.length <= 200
        && typeof msg.isPersonal === 'boolean'
        && ((msg.isPersonal === true && typeof msg.to === 'string')
        || (msg.isPersonal === false && typeof msg.to === 'undefined'))) {
      return true;
    }
    return false;
  }

  addAll() {
    for (const item of this._arrMsg) {
      if (this.constructor.validate(item) === true) {
        this._id = item.id;
        this.text = item.text;
        this._createdAt = item.createdAt;
        this._author = item.author;
        this.isPersonal = item.isPersonal;
        this.to = item.to;
        this.mesgList.push(item);
      } else {
        this.messagesError.push(item);
      }
    } return this.messagesError;
  }

  clear() {
    this._arrMsg = [];
    return this._arrMsg;
  }

  pag(skip, top, results) {
    if (this.results.length > top) {
      console.log('Длина массива', this.results.length);
      return this.results.slice(skip, skip + top).sort((a, b) => a.createdAt - b.createdAt);
    }
    console.log('Длина массива', this.results.length);
    return this.results.splice(skip, this.results.length).sort((a, b) => a.createdAt - b.createdAt);
  }

  getPage(skip = 0, top = 10, filterConfig) {
    if (filterConfig !== undefined) {
      this.results = Object.assign([], this.mesgList);
      for (const key in filterConfig) {
        if (filterConfig?.author) {
          this.results = this.results.filter((name) => (name.author.toLowerCase().includes(filterConfig.author.toLowerCase())));
        }
        if (filterConfig?.text) {
          this.results = this.results.filter((name) => (name.text.toLowerCase().includes(filterConfig.text.toLowerCase())));
        }
        if (filterConfig?.dataTo) {
          this.results = this.results.filter((name) => name.createdAt < filterConfig.dataTo);
        }
        if (filterConfig?.dataFrom) {
          this.results = this.results.filter((name) => name.createdAt > filterConfig.dataFrom);
        }
      } this.results.sort((a, b) => b.createdAt - a.createdAt);
    }
    if (filterConfig === undefined || filterConfig === null) {
      this.results = this.mesgList.sort((a, b) => b.createdAt - a.createdAt);
    }
    if (this._user !== undefined) {
      this.results = this.results.filter((name) => name.author === this._user
            || name.to === this._user
            || name.to === undefined);
    } else {
      this.results = this.results.filter((name) => name.to === undefined);
    }
    return this.pag(skip, top, this.results);
  }

  get(id) {
    this.messagesId = this.mesgList.find((name) => name.id == id);
    return this.messagesId.text;
  }

  add(msg) {
    if (this._user && this.constructor.validate(msg)) {
      msg.id = `${+new Date()}`;
      msg.createdAt = new Date();
      msg.author = this._user;
      this.mesgList.push(msg);
      return true;
    } return false;
  }

  edit(id, element) {
    const index = this.mesgList.findIndex((item) => item.id == id);
    if (this._user === this.mesgList[index].author) {
      if (element?.text !== undefined) {
        if (index > -1) {
          console.log('Текст сообщения до редактирования:', this.mesgList[index].text);
          if (this.constructor.validate(this.mesgList[index])) {
            this.mesgList[index].text = element.text;
            console.log('Текст сообщения после редактирования:', this.mesgList[index].text);
            return true;
          }
        }
      } if (element?.isPersonal !== undefined) {
        if (index > -1) {
          if (element.isPersonal === true && element.to !== undefined) {
            console.log('Данные сообщения до редактирования:', this.mesgList[index].isPersonal, this.mesgList[index].to);
            this.mesgList[index].isPersonal = element.isPersonal;
            this.mesgList[index].to = element.to;
            if (this.constructor.validate(this.mesgList[index])) {
              console.log('Данные сообщения после редактирования:', this.mesgList[index].isPersonal, this.mesgList[index].to);
              return true;
            } return false;
          }
          if (element.isPersonal == false) {
            console.log('Данные сообщения до редактирования: isPersonal =', this.mesgList[index].isPersonal, 'to =', this.mesgList[index].to);
            this.mesgList[index].isPersonal = element.isPersonal;
            delete this.mesgList[index].to;
            if (this.constructor.validate(this.mesgList[index])) {
              console.log('Данные сообщения после редактирования: isPersonal =', this.mesgList[index].isPersonal);
              return true;
            } return false;
          } return false;
        }
      }
    } else {
      return false;
    }
  }

  remove(id) {
    const index = this.mesgList.findIndex((item) => item.id == id);
    if (this._user === this.mesgList[index].author && index > -1) {
      this.mesgList.splice(index, 1);
      return true;
    } return false;
  }
}

const arr = [
  {
    id: '1',
    text: 'Привет!',
    createdAt: new Date('2020-10-11T23:01:10'),
    author: 'Иванов Иван',
    isPersonal: true,
    to: 'Петров Петр',
  },
  {
    id: '2',
    text: 'Как дела?',
    createdAt: new Date('2020-10-11T23:01:52'),
    author: 'Петров Петр',
    isPersonal: false,
  },
  {
    id: '3',
    text: 'Я думаю приготовить что-нибудь особенное сегодня вечером. Что посоветуете?',
    createdAt: new Date('2020-10-12T23:02:15'),
    author: 'Happy User',
    isPersonal: false,
  },
  {
    id: '4',
    text: 'Нужно подумать...',
    createdAt: new Date('2020-10-12T23:03:14'),
    author: 'Anastasia',
    isPersonal: false,
  },
  {
    id: '5',
    text: 'ты любишь  мясо?',
    createdAt: new Date('2020-10-12T23:04:37'),
    author: 'Иван Иванович',
    isPersonal: true,
    to: 'Happy User',
  },
  {
    id: '6',
    text: 'Я скорее вегетарианец. Я предпочитаю фрукты и овощи.В особенности мне нравятся блюда из тыквы или цукини. Ещё я люблю фруктовые салаты.',
    createdAt: new Date('2020-10-12T23:06:01'),
    author: 'Happy User',
    isPersonal: true,
    to: 'Иван Иванович',
  },
  {
    id: '7',
    text: 'Как насчет сезонных салатов? Например, летом мне нравится есть салаты из свежих помидоров и огурцов с луком и различными приправами.',
    createdAt: new Date('2020-10-12T23:06:15'),
    author: 'Mary',
    isPersonal: false,
  },
  {
    id: '8',
    text: 'Вкусно получается суп из цукини и салат из свежих овощей с итальянским соусом',
    createdAt: new Date('2020-10-12T23:07:41'),
    author: 'Sasha',
    isPersonal: false,
  },
  {
    id: '9',
    text: 'Что лучше приготовить на десерт?',
    createdAt: new Date('2020-10-12T23:10:11'),
    author: 'Vika',
    isPersonal: false,
  },
  {
    id: '10',
    text: 'Я бы хотела попробовать торт с корицей и ирландским кремом.',
    createdAt: new Date('2020-10-12T23:00:00'),
    author: 'Anastasia',
    isPersonal: false,
  },
  {
    id: '11',
    text: 'Звучит вкусно.',
    createdAt: new Date('2020-10-12T23:12:12'),
    author: 'Happy User',
    isPersonal: false,
  },
  {
    id: '12',
    text: 'А у меня сегодня на ужин паста с жареным лососем.',
    createdAt: new Date('2020-10-12T23:13:11'),
    author: 'Sasha',
    isPersonal: false,
  },
  {
    id: '13',
    text: 'Ты сама готовила?',
    createdAt: new Date('2020-10-12T23:14:16'),
    author: 'Happy User',
    isPersonal: true,
    to: 'Sasha',
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
  },
  {
    id: '21',
    text: 'Привет!',
    createdAt: new Date('2020-10-11T23:01:10'),
    author: 'Иванов Иван',
    isPersonal: true,
  },
];

// Класс, хранящий коллекцию пользователей и активных пользователей.
class UserList {
  constructor(users, activeUsers) {
    this._users = users;
    this._activeUsers = activeUsers;
  }

  get users() {
    return this._users;
  }

  get activeUsers() {
    return this._activeUsers;
  }
}

// Класс, который отображает текущего пользователя, если он задан
class HeaderView {
  constructor(id = 'authorized-user') {
    this.activeUser = document.getElementById(id);
  }

  display(user) {
    this.activeUser.innerHTML = `<a href='#' class="login-button">${'Войти|Зарегистрироваться'}</a><div class="circle-user-white"><div>`;
    if (user) {
      console.log(user);
      this.activeUser.innerHTML = `<p>${user}</p>`;
      const initials = document.getElementById('circle-user');
      initials.className = 'circle-user';
      initials.innerHTML = `<h3>${user.match(/\b(\w)/g).join('')}</h3>`;
    }
  }
}

class MessagesView {
  constructor(id = 'msg-chat') {
    this.id = id;
  }

  display(arrMsg = [], user) {
    for (let i = 0; i < arrMsg.length; i++) {
      const partMsg = document.getElementById(this.id);
      if (arrMsg[i].author === user) {
        const outgoingMsg = document.createElement('div');
        outgoingMsg.className = 'outgoing_msg';
        outgoingMsg.innerHTML = `<div class="outgoing_msg"><div class="my_msg_img"><p>${arrMsg[i].author[0]}</p></div>
        <div class="sent-msg">
        <div class="sent-width-msg">
            <div class="info-msg">
                <p class="sender">${arrMsg[i].author}</p>
                <p class="time_date">09/07/2020 13:52</p>
                <button class="possible-msg">${'...'}</button>
            </div> 
            <p>${arrMsg[i].text}</p>
        </div>
        </div>`;
        partMsg.appendChild(outgoingMsg);
      }
      if (arrMsg[i].author !== user) {
        const msgContainer = document.createElement('div');
        msgContainer.className = 'incoming_msg';
        msgContainer.innerHTML = `<div class="incoming_msg">
                    <div class="incoming_msg_img"><p>${arrMsg[i].author[0]}</p></div>
                    <div class="received_msg">
                        <div class="received_withd_msg">
                            <div class="info-msg">
                                <p class="sender">${arrMsg[i].author}</p>
                                <p class="time_date">${arrMsg[i].createdAt.toLocaleString()}</p>
                                <button class="possible-msg">${'...'}</button>
                            </div> 
                            <p class="text-msg">${arrMsg[i].text}</p>
                        </div>
                    </div>
                </div>`;
        partMsg.appendChild(msgContainer);
      }
    }
  }
}

// Класс, для отображения списка активных пользователей
class ActiveUsersView {
  constructor(id = 'sidebar-online-user') {
    this.id = id;
  }

  display(activeUser = []) {
    for (let i = 0; i < activeUser.length; i++) {
      const sidebar = document.getElementById(this.id);
      const el = document.createElement('div');
      el.className = 'user-online-container';
      el.innerHTML = `<div class="circle-user-container"><p>${activeUser[i].match(/\b(\w)/g).join('')}</p></div> 
                        <p class="name-user">${activeUser[i]}</p>
                        <p class="online-user">online</p>`;
      sidebar.append(el);
    }
  }
}

const arrUsers = ['Dima', 'Zhenya Zh.', 'Vika L', 'Nina Art', 'Nika I', 'Vs Ko', 'Ivan ', 'Marta', 'Zhenya H.', 'Sasha', 'Pasha', 'Ira', 'Vero', 'Mila Ro.', 'Kate Ir.', 'Dima'];
const arrActiveUsers = ['Zhenya Zh.', 'Vika L', 'Nina Art', 'Nika I', 'Vs Ko', 'Ivan ', 'Marta', 'Zhenya H.', 'Sasha', 'Pasha', 'Ira', 'Vero', 'Mila Ro.', 'Kate Ir.'];
const headerView = new HeaderView('authorized-user');
const msgList = new MessageList(arr, 'Happy User');
const messagesView = new MessagesView('msg-chat');
const activeUsersView = new ActiveUsersView('sidebar-online-user');
const userList = new UserList(arrUsers, arrActiveUsers);

function setCurrentUser(user) {
  msgList.user = user;
  headerView.display(user);
  msgList.user = user;
  msgList.addAll();
  messagesView.display(msgList.getPage(), user);
}

function addMessage(msg) {
  document.querySelector(`.${messagesView.id}`).innerHTML = '';
  msgList.add(msg);
  messagesView.display(msgList.getPage(), msgList.user);
}

function editMessage(id, element) {
  console.log(msgList.mesgList);
  document.querySelector(`.${messagesView.id}`).innerHTML = '';
  msgList.edit(id, element);
  messagesView.display(msgList.getPage(), msgList.user);
}

function removeMessage(id) {
  document.querySelector(`.${messagesView.id}`).innerHTML = '';
  msgList.remove(id);
  messagesView.display(msgList.getPage(), msgList.user);
}

function showMessages(skip = 0, top = 10, filterConfig = {}) {
  console.log(filterConfig);
  document.querySelector(`.${messagesView.id}`).innerHTML = '';
  const i = msgList.getPage(skip, top, filterConfig);
  messagesView.display(i, msgList.user);
}

function showActiveUsers() {
  activeUsersView.display(userList.activeUsers);
}
// Проверка работы глобальных методов
setCurrentUser('Happy User');
addMessage({ text: 'bye!', isPersonal: false });
addMessage({ text: 'Как выходные?', isPersonal: false });
addMessage({ text: 'Все хорошо?', isPersonal: false });
editMessage(20, { text: 'Хочу зефирку' });
removeMessage(13);
showMessages(0, 10, { author: 'Иван' });
showMessages(0, 3, { dataFrom: new Date('2020-10-12T23:06:01'), dataTo: new Date('2020-10-12T23:19:00') });
showActiveUsers();

// Создание экземпляра класса Messages и проверка
const msg1 = new Messages('hi', 'Veronika', false);
console.log('Сообщение:', msg1);
console.log('Id сообщения:', msg1.id);
console.log('Дата сообщения:', msg1.createdAt);

// Создание экземпляра класса MessageList и проверка
const getMes1 = new MessageList(arr, 'Mary');
const getMes2 = new MessageList(arr);
const getMes3 = new MessageList(arr, 'Sasha');
getMes2.addAll(arr);
getMes3.addAll(arr);

// Массив сообщений, которые не прошли валидацию
console.log('Массив сообщений, которые не прошли валидацию:', getMes1.addAll(arr));

// Проверка работы метода getPage
console.log('Первые 10 сообщений, которые может видеть только Mary:', getMes1.getPage(0, 10));
console.log('Следующие 10 сообщений, которые может видеть только гость', getMes2.getPage(10, 10));
console.log('Вывод 11 сообщений с 4', getMes1.getPage(4, 11));
console.log('Вывод 5 сообщений с 9', getMes1.getPage(9, 5));
console.log('Вывод 5 сообщений с 12, но т.к. в массиве сообщений меньше, то выводит максимально возможное число', getMes1.getPage(12, 5));
console.log('Первые 10 сообщений от автора \'Иван\', которые видно только Mary:', getMes1.getPage(0, 10, { author: 'Иван' }));
console.log('Поиск по автору \'Happy user\' и тексту \'ты сама\'', getMes3.getPage(0, 10, { author: 'Happy user', text: 'ты сама' }));
console.log('Первые 3 сообщения по дате с - по', getMes2.getPage(0, 3, { dataFrom: new Date('2020-10-12T23:06:01'), dataTo: new Date('2020-10-12T23:19:00') }));
console.log('Первые 10 сообщений от автора\'Anastasia\' с 2020-10-12T23:01:00', getMes1.getPage(0, 10, { author: 'Anastasia', dataFrom: new Date('2020-10-12T23:01:00') }));
console.log('Первые 10 сообщений с текстом \'ещё\'(такое сообщение есть, но его не видно,т.к. оно приватное)', getMes1.getPage(0, 10, { text: 'ещё' }));

// проверка работы метода, позволяющего узнать текст сообщения по id
console.log('В id №11 хранится сообщение:', getMes3.get(11));

// Проверка работы метода add
console.log('Введено персональное сообщение, но не указан получатель, поэтому сообщение не добавлено в массив', getMes1.add({
  text: 'Пока!',
  isPersonal: true,
}));
console.log('Все данные соответствуют условиям и сообщение добавлено в массив', getMes1.add({
  text: 'Пока!',
  isPersonal: false,
}));
console.log('Пользователь не авторизован, поэтому:', getMes2.add({
  text: 'Пока!',
  isPersonal: false,
}));

// Проверка работы метода edit
console.log('Пользователь пытается отредактировать не свое сообщение', getMes1.edit(5, { text: 'Хочу зефирку' }));
console.log('Успешно изменен текст сообщения, т.к. это автор этого сообщения', getMes3.edit(14, { text: 'Хочу зефирку' }));
console.log('Сообщение изменено на персональное и добавлен получатель', getMes1.edit(7, { isPersonal: true, to: 'Happy user' }));
console.log('Сообщение изменено на персональное и НЕ добавлен получатель', getMes1.edit(15, { isPersonal: true }));
console.log('Сообщение изменено на общее', getMes1.edit(7, { isPersonal: false }));

//  Проверка работы метода remove
console.log('Сообщение удалено:', getMes1.remove(7));
console.log('Сообщение Не удалено, т.к. не принадлежит данному автору:', getMes1.remove(13));

//  Проверка работы метода clear
console.log('Содержимое массива удалено', getMes1.clear());
