class HeaderView {
  constructor(id = 'header-chat') {
    this.activeUser = document.getElementById(id);
  }

  display(user) {
    if (!user) {
      this.activeUser.innerHTML = `<a href='#' class="login-button">${'Войти'}|</a><a href='#' class="regisrt-button">${'Зарегистрироваться'}</a><div class="circle-user-white"><div>`;
      const removeNode = document.getElementById('send-msg');
      removeNode.style.display = 'none';
    }

    if (user) {
      console.log(user);
      this.activeUser.innerHTML = `<p>${user}</p>`;
      const initials = document.getElementById('circle-user');
      initials.className = 'circle-user';
      initials.innerHTML = `<h3>${user.match(/\b(\w)/g).join('')}</h3>`;
      const removeNode = document.getElementById('send-msg');
      removeNode.style.display = 'flex';
    }
  }
}
class MessagesView {
  constructor(id = 'msg-chat') {
    this.id = id;
  }

  display(arrMsg = [], user) {
    const partMsg = document.getElementById(this.id);
    partMsg.innerHTML = '';
    for (let i = 0; i < arrMsg.length; i++) {
      if (arrMsg[i].author === user) {
        const outgoingMsg = document.createElement('div');
        outgoingMsg.className = 'outgoing_msg';
        outgoingMsg.innerHTML = `<div class="outgoing_msg"><div class="my_msg_img"><p>${arrMsg[i].author[0]}</p></div>
        <div class="sent-msg">
        <div class="sent-width-msg">
            <div class="info-msg" id="info-msg">
                <p class="sender">${arrMsg[i].author}</p>
                <p class="time_date">09/07/2020 13:52</p>
                <button class="possible-msg" id= "possible-msg">${'...'}</button>
            </div> 
            <div class="change-msg">
              <ul>
                <li id='edit'>Редактировать</li>
                <li id='delete'>Ударить</li>
              </ul>
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
