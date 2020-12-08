class ChatController {
  constructor() {
    this.userList = new UserList(arrUsers, arrActiveUsers);
    this.msgList = new MessageList();
    this.headerView = new HeaderView('authorized-user');
    this.messagesView = new MessagesView('msg-chat');
    this.activeUsersView = new ActiveUsersView('sidebar-online-user');
  }

  setCurrentUser() {
    this.headerView.display(this.msgList.user);
    this.messagesView.display(this.msgList.getPage(), this.msgList.user);
  }

  addMessage(msg) {
    this.msgList.add(msg);
    this.messagesView.display(this.msgList.getPage(0, 10), this.msgList.user);
  }

  editMessage(id, element) {
    document.querySelector(`.${messagesView.id}`).innerHTML = '';
    msgList.edit(id, element);
    messagesView.display(this.msgList.getPage(0, 10), this.msgList.user);
  }

  removeMessage(id) {
    document.querySelector(`.${messagesView.id}`).innerHTML = '';
    msgList.remove(id);
    messagesView.display(msgList.getPage(), msgList.user);
  }

  showMessages(skip = 0, top = 10, filterConfig = {}) {
    document.querySelector(`.${this.messagesView.id}`).innerHTML = '';
    const i = this.msgList.getPage(skip, top, filterConfig);
    this.messagesView.display(i, this.msgList.user);
  }

  showActiveUsers() {
    this.activeUsersView.display(this.userList.activeUsers);
  }

  login() {
    const login = document.querySelector('.login');
    login.style.display = 'block';
  }

  registr() {
    const regist = document.querySelector('.registr');
    regist.style.display = 'block';
  }
}

function sendLocalStor() {
  // if(JSON.parse(localStorage.msgStorage === undefined)){
  //   localStorage.setItem('msgStorage', JSON.stringify(arr.map((item) => new Messages(item))));
  // }
  if (JSON.parse(localStorage.user === undefined)) {
    localStorage.setItem('user', JSON.stringify(''));
  }
  if (JSON.parse(localStorage.token === undefined)) {
    localStorage.setItem('token', JSON.stringify(''));
  }
  // if(JSON.parse(localStorage.allUser === undefined)){
  //   localStorage.setItem('allUser', JSON.stringify(arrUsers))
  // }
  // if(JSON.parse(localStorage.arrActiveUsers === undefined)){
  //   localStorage.setItem('arrActiveUsers', JSON.stringify(arrActiveUsers))
  // }
}

class ChatApiService {
  constructor() {
    this.top = 10;
    this.token = JSON.parse(localStorage.getItem('token'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.headerView = new HeaderView('authorized-user');
    this.messagesView = new MessagesView('msg-chat');
    this.activeUsersView = new ActiveUsersView('sidebar-online-user');
  }

  messages(skip = 0, elseTop = 0) {
    let { top } = this;
    top += elseTop;
    const url = `https://jslabdb.datamola.com/messages?skip=${skip}&top=${top}`;

    if (this.msgScreen) {
      clearTimeout(this.msgScreen);
    }
    return fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` },
    })
      .then((result) => result.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].createdAt = new Date(data[i].createdAt);
        }
        return data.sort((a, b) => a.createdAt - b.createdAt);
      }).then((data) => {
        this.top = data.length;
        this.messagesView.display(data.map((item) => new Messages(item)), this.user, skip, top);
        this.msgScreen = setTimeout(() => {
          this.messages();
        }, 45000);
      });
  }

  users() {
    const url = 'https://jslabdb.datamola.com/users';
    return fetch(url)
      .then((result) => result.json()).then((data) => {
        this.activeUsersView.display(data, this.user);
      });
  }

  register(name, pass) {
    const url = 'https://jslabdb.datamola.com/auth/register';
    const formData = new FormData();
    formData.set('name', name);
    formData.set('pass', pass);
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    localStorage.setItem('user', JSON.stringify(name));
    this.user = JSON.parse(localStorage.getItem('user'));
    const json = JSON.stringify(obj);
    return fetch(url, {
      method: 'POST',
      body: formData,
    });
  }

  login(name, pass) {
    const url = 'https://jslabdb.datamola.com/auth/login';
    const formData = new FormData();
    formData.set('name', name);
    formData.set('pass', pass);
    return fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((result) => {
        if (result.ok) {
          localStorage.setItem('user', JSON.stringify(name));
          this.user = JSON.parse(localStorage.getItem('user'));
        }
        const resJson = result.json();
        return resJson;
      })
      .then(((result) => result.token))
      .then((res) => {
        this.token = res;
        return this.token;
      })
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res));
        this.token = JSON.parse(localStorage.getItem('token'));
        return this.token;
      })
      .then((res) => {
        this.headerView.display(this.user);
        this.activeUsersView.display(this.users(), this.user);
        this.messages();
      });
  }

  logout() {
    const url = 'https://jslabdb.datamola.com/auth/logout';
    return fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` },
    })
      .then((result) => {
        this.user = localStorage.setItem('user', JSON.stringify(''));
        localStorage.setItem('token', JSON.stringify(''));
        return this.user;
      })
      .then((res) => {
        this.headerView.display(res);
      });
  }

  messagesSend(data) {
    const url = 'https://jslabdb.datamola.com/messages';
    this.token = JSON.parse(localStorage.getItem('token'));
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => {
      this.messages();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const chatApiService = new ChatApiService();
  sendLocalStor();
  chatApiService.headerView.display(chatApiService.user);
  chatApiService.messages();
  chatApiService.users();

  const linkRegistr = document.querySelector('.regisrt-button');
  linkRegistr.onclick = function () {
    const registr = document.querySelector('.registr');
    registr.style.display = 'block';
    const formRegistr = document.getElementById('form-registr');
    formRegistr.addEventListener('submit', (event) => {
      event.preventDefault();
      registr.style.display = 'none';
      const name = formRegistr[1].value;
      const pass = formRegistr[2].value;
      chatApiService.register(name, pass);
      registr.style.display = 'none';
      const login = document.querySelector('.login');
      login.style.display = 'block';
      const formLogin = document.getElementById('form-login');
      formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        login.style.display = 'none';
        const name = formLogin[0].value;
        const pass = formLogin[1].value;
        chatApiService.login(name, pass);
        chatApiService.headerView.display(chatApiService.user);
        chatApiService.messages();
      });
    });
  };

  const linkLogin = document.querySelector('.login-button');
  linkLogin.addEventListener('click', () => {
    const login = document.querySelector('.login');
    login.style.display = 'block';
    const formLogin = document.getElementById('form-login');
    formLogin.addEventListener('submit', (event) => {
      event.preventDefault();
      login.style.display = 'none';
      const name = formLogin[0].value;
      const pass = formLogin[1].value;
      chatApiService.login(name, pass);
      chatApiService.messages();
    });
  });

  const exit = document.querySelector('.authorized-user');
  exit.onclick = function () {
    const windowExit = document.querySelector('.exit');
    if (windowExit.style.display !== 'block') {
      windowExit.style.display = 'block';
    } else {
      windowExit.style.display = 'none';
    }
  };

  const windowExit = document.querySelector('.exit');
  windowExit.addEventListener('click', () => {
    windowExit.style.display = 'none';
    chatApiService.logout();
  });

  const btnSendMsg = document.querySelector('.msg-send-btn');
  btnSendMsg.addEventListener('click', () => {
    const inputSendMsg = document.getElementById('write-msg');
    chatApiService.messagesSend({ text: inputSendMsg.value, isPersonal: false, author: chatApiService.user });
    inputSendMsg.value = '';
  });

  const possibleMsg = document.querySelector('.msg-chat');
  possibleMsg.addEventListener('click', (event) => {
    const { target } = event;
    if (target.tagName === 'BUTTON') {
      document.getElementById('change-msg').style.display = 'block';
    } else {
      document.getElementById('change-msg').style.display = 'none';
    }
  });

  const elseMsgBtn = document.getElementById('else-msg-btn');
  elseMsgBtn.addEventListener('click', () => {
    chatApiService.messages(0, 10);
  });
});
