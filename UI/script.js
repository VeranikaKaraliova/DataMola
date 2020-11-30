class ChatController {
  constructor() {
    this.userList = new UserList(arrUsers, arrActiveUsers);
    this.msgList = new MessageList(arr, this.user);
    this.headerView = new HeaderView('authorized-user');
    this.messagesView = new MessagesView('msg-chat');
    this.activeUsersView = new ActiveUsersView('sidebar-online-user');
    this.messages = new Messages();
  }

  setCurrentUser() {
    this.headerView.display(this.msgList.user);
    this.msgList.addAll();
    this.messagesView.display(this.msgList.getPage(), this.msgList.user);
  }

  addMessage(msg) {
    document.querySelector(`.${messagesView.id}`).innerHTML = '';
    msgList.add(msg);
    messagesView.display(msgList.getPage(0, 10), msgList.user);
  }

  editMessage(id, element) {
    document.querySelector(`.${messagesView.id}`).innerHTML = '';
    msgList.edit(id, element);
    messagesView.display(msgList.getPage(0, 10), msgList.user);
  }

  removeMessage(id) {
    document.querySelector(`.${messagesView.id}`).innerHTML = '';
    msgList.remove(id);
    messagesView.display(msgList.getPage(), msgList.user);
  }

  showMessages(skip = 0, top = 10, filterConfig = {}) {
    console.log(filterConfig);
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
  if (JSON.parse(localStorage.msgStorage === undefined)) {
    localStorage.setItem('msgStorage', JSON.stringify(arr));
  }
  if (JSON.parse(localStorage.user === undefined)) {
    localStorage.setItem('user', JSON.stringify(''));
  }
  if (JSON.parse(localStorage.allUser === undefined)) {
    localStorage.setItem('allUser', JSON.stringify(arrUsers));
  }
  if (JSON.parse(localStorage.arrActiveUsers === undefined)) {
    localStorage.setItem('arrActiveUsers', JSON.stringify(arrActiveUsers));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  sendLocalStor();
  const controller = new ChatController();
  controller.showActiveUsers();
  controller.setCurrentUser();
  const linkLogin = document.querySelector('.login-button');
  linkLogin.onclick = function () {
    const login = document.querySelector('.login');
    login.style.display = 'block';
    const formLogin = document.getElementById('form-login');
    formLogin.addEventListener('submit', (event) => {
      event.preventDefault();
      if (controller.userList.users.find((item) => item === formLogin[0].value)) {
        console.log(formLogin[0].value);
        controller.msgList.user = formLogin[0].value;
        localStorage.setItem('user', JSON.stringify(formLogin[0].value));
        login.style.display = 'none';
        controller.setCurrentUser();
      }
    });
  };

  const linkRegistr = document.querySelector('.regisrt-button');
  linkRegistr.onclick = function () {
    const registr = document.querySelector('.registr');
    registr.style.display = 'block';
    const formRegistr = document.getElementById('form-registr');
    formRegistr.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!controller.userList.users.find((item) => item === formRegistr[1].value)) {
        controller.msgList.user = formRegistr[1].value;
        localStorage.setItem('user', JSON.stringify(formRegistr[1].value));
        const allUserSror = JSON.parse(localStorage.allUser);
        allUserSror.push(formRegistr[1].value);
        localStorage.setItem('allUser', JSON.stringify(allUserSror));
        registr.style.display = 'none';
        controller.setCurrentUser();
      }
    });
  };

  const btnRegistr = document.querySelector('.form-registr');
  btnRegistr.onsubmit = function () {
    controller.sendFormRegistr(btnRegistr);
    this.msgList.user = JSON.parse(localStorage.user);
    console.log(this.msgList.user);
  };
});
