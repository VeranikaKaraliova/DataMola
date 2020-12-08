class HeaderView {
  constructor(id = 'header-chat') {
    this.activeUser = document.getElementById(id);
  }

  display(user) {
    if (!user) {
      const loginRegistr = document.getElementById('login-registr');
      loginRegistr.style.display = 'block';
      const removeNode = document.getElementById('send-msg');
      removeNode.style.display = 'none';
      const activeUser = document.getElementById('authorized-user');
      activeUser.style.display = 'none';
      const circleUser = document.getElementById('circle-user');
      circleUser.style.display = 'none';
    } else {
      this.activeUser.innerHTML = `<p>${user}</p>`;
      const initials = document.getElementById('circle-user');
      initials.className = 'circle-user';
      initials.innerHTML = `<h3>${user.match(/\b(\w)/g).join('')}</h3>`;
      const removeNode = document.getElementById('send-msg');
      removeNode.style.display = 'flex';
      const loginRegistr = document.getElementById('login-registr');
      loginRegistr.style.display = 'none';
      const activeUser = document.getElementById('authorized-user');
      activeUser.style.display = 'flex';
      const circleUser = document.getElementById('circle-user');
      circleUser.style.display = 'block';
    }
  }
}
class MessagesView {
  constructor(id = 'msg-chat') {
    this.id = id;
  }

  display(arrMsg = [], user, skip = 0, top = 10) {
    arrMsg = arrMsg.sort((a, b) => a.createdAt - b.createdAt).slice(skip, skip + top);
    const partMsg = document.getElementById(this.id);
    partMsg.innerHTML = '';
    for (let i = 0; i < arrMsg.length; i++) {
      if (arrMsg[i].author === user) {
        const initials = arrMsg[i].author[0];
        const outgoingMsg = document.createElement('div');
        outgoingMsg.className = 'outgoing_msg';
        outgoingMsg.innerHTML = `<div class="outgoing_msg"><div class="my_msg_img"><p>${initials}</p></div>
        <div class="sent-msg">
        <div class="sent-width-msg">
            <div class="info-msg" id="info-msg">
                <p class="sender">${arrMsg[i].author}</p>
                <p class="time_date">${arrMsg[i].createdAt.getHours()}:${arrMsg[i].createdAt.getMinutes()}</p>
                <button class="possible-msg" id= "possible-msg">${'...'}</button>
            </div> 
            <p>${arrMsg[i].text}</p>
        </div>
        </div>
        <div class="change-msg" id="change-msg">
              <ul>
                <li id='edit'>Редактировать</li>
                <li id='delete'>Ударить</li>
              </ul>
            </div>`;
        partMsg.appendChild(outgoingMsg);
      }
      if (arrMsg[i].author !== user && arrMsg[i].isPersonal === true) {
        const initials = arrMsg[i].author[0];
        const msgContainer = document.createElement('div');
        msgContainer.className = 'incoming_msg';
        msgContainer.innerHTML = `<div class="incoming_msg">
                                    <div class="incoming_msg_img"><p>${initials}</p></div>
                                    <div class="received_msg">
                                        <div class="received_withd_msg">
                                            <div class="info-msg" id="info-msg">
                                                <p class="sender">${arrMsg[i].author}</p>
                                                <p class="time_date">${arrMsg[i].createdAt.getHours()}:${arrMsg[i].createdAt.getMinutes()}</p>
                                                <p class='privat'>only for me</p>
                                            </div> 
                                            <p class="text-msg">${arrMsg[i].text}</p>
                                        </div>
                                    </div>
                                  </div>`;
        partMsg.appendChild(msgContainer);
      }
      if (arrMsg[i].author !== user && arrMsg[i].isPersonal === false) {
        const initials = arrMsg[i].author[0];
        const msgContainer = document.createElement('div');
        msgContainer.className = 'incoming_msg';
        msgContainer.innerHTML = `<div class="incoming_msg">
                                    <div class="incoming_msg_img"><p>${initials}</p></div>
                                    <div class="received_msg">
                                        <div class="received_withd_msg">
                                            <div class="info-msg" id="info-msg">
                                                <p class="sender">${arrMsg[i].author}</p>
                                                <p class="time_date">${arrMsg[i].createdAt.getHours()}:${arrMsg[i].createdAt.getMinutes()}</p>
                                            </div> 
                                            <p class="text-msg">${arrMsg[i].text}</p> 
                                        </div>
                                    </div>
                                  </div>`;
        partMsg.appendChild(msgContainer);
        const infoMsg = document.getElementById('info-msg');
      }
    }
  }
}

class ActiveUsersView {
  constructor(id = 'sidebar-online-user') {
    this.id = id;
  }

  display(activeUser = [], user) {
    const sidebar = document.getElementById(this.id);
    sidebar.innerHTML = '';
    for (let i = 0; i < activeUser.length; i++) {
      if (activeUser[i].isActive === true && user !== activeUser[i].name) {
        const el = document.createElement('div');
        el.className = 'user-online-container';
        el.innerHTML = `<div class="circle-user-container"><p>${activeUser[i].name[0]}</p></div> 
                          <p class="name-user">${activeUser[i].name}</p>
                          <p class="online-user">online</p>`;
        sidebar.append(el);
      }
    }
  }
}
