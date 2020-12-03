const arrUsers = ['Happy User', 'Mary', 'Dima', 'Zhenya Zh.', 'Vika L', 'Nina Art', 'Nika I', 'Vs Ko', 'Ivan ', 'Marta', 'Zhenya H.', 'Sasha', 'Pasha', 'Ira', 'Vero', 'Dima'];
const arrActiveUsers = ['Happy User', 'Dima', 'Zhenya Zh.', 'Sasha', 'Pasha', 'Ira', 'Vero'];
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

const secret = new WeakMap();
class Messages {
  constructor(msg) {
    this._createdAt = msg.createdAt || msg._createdAt;
    this._id = msg.id || msg._id;
    this._author = msg.author || msg._author;
    this.text = msg.text;
    this.isPersonal = msg.isPersonal;
    this.to = msg.to;
  }
    get id() {
      return this._id;
    }
    get author() {
      return this._author;
    }
    get createdAt() {
      return this._createdAt;
    }
    set id(id) {
       this._id = id;
    }
    set author(author) {
       this._author = author;
    }
    set createdAt(createdAt) {
       this._createdAt = createdAt;
    }
}

class MessageList {
  constructor() {
    this._msgList = JSON.parse(localStorage.getItem("msgStorage"), function(key, value){
      if(key === "createdAt" || key === "_createdAt"){
        return new Date(value)
      }return value;
    }).map((item) => new Messages(item)) ;
    
    this._user = JSON.parse(localStorage.getItem('user'));
    this.results = [];
    this.item = null;
    this.messagesId = {};
    this.messagesError = [];
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }
 
  get msgList(){
    return this._msgList;
  }

  set msgList(msgList) {
    this._msgList = msgList;
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
        this.msgList.push(item);
        localStorage.setItem('msgStorage', JSON.stringify(this.msgList));
      } else {
        this.messagesError.push(item);
      }
    }
    return this.messagesError;
  }

  clear() {
    this._arrMsg = [];
    return this._arrMsg;
  }

  pag(skip, top, results) {
    if (this.results.length > top) {
      this.results = this.results.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + top);
      return this.results.sort((a, b) => a.createdAt - b.createdAt)
    }
    this.results = this.results.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + top);
    return this.results.sort((a, b) => a.createdAt - b.createdAt)
  }

  getPage(skip = 0, top = 10, filterConfig) {
    this.results = Object.assign([], this.msgList);
    if (filterConfig !== undefined) {
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
      this.results = this.results.sort((a, b) => -b.createdAt - a.createdAt);
    }
    if (this._user !== undefined || '') {
      this.results = this.results.filter((name) => name.author === this._user
            || name.to === this._user
            || name.to === undefined);
    } else {
      this.results = this.results.filter((name) => name.to === undefined);
    }
    return this.pag(skip, top, this.results);
  }

  get(id) {
    this.messagesId = this.msgList.find((name) => name.id == id);
    return this.messagesId.text;
  }

  save(){
    localStorage.setItem('msgStorage', JSON.stringify(this.msgList));
  }

  add(msg) {
    if (this._user && MessageList.validate(msg)) {
      msg.id = `${+new Date()}`;
      msg.createdAt = new Date();
      msg.author = this._user;
      const newMsg = new Messages(msg);
      this.msgList.push(newMsg);
      this.save();
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

class UserList {
  constructor(users, activeUsers) {
    this._users = JSON.parse(localStorage.getItem('allUser'));
    this._activeUsers = activeUsers;
  }

  get users() {
    return this._users;
  }

  get activeUsers() {
    return this._activeUsers;
  }
}
