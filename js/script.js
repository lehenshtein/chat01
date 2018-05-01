        var sidebarBtn = document.getElementById('sidebarBtn');
        sidebarBtn.onclick = showContacts;
        function showContacts () {
            var sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
            };
        
        
        dialog = '';

        window.addEventListener("load", function(){
             var users = document.querySelectorAll('.sidebar__user');
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    user.innerHTML = '<div class="sidebar__user-name">' + user.id + '</div>';
                }
            
        });
          var users = document.querySelectorAll('.sidebar__user');
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            user.onclick = newDialog;
        };
        
        function newDialog() {
            var chatUser = document.getElementById('chatUser');
            var create = document.createElement('div');
            chatUser.removeChild(chatUser.children[0]);
            create.className = 'chat__window';
            create.id = 'chat-' + (this).id;
            window.dialog = 'chat-' + (this).id;
            chatUser.appendChild(create);
            var history = localStorage.getItem(dialog);
            if (history == null) {
                      history = 'Вы еще не отправляли сообщений этому пользователю';
                  } ; 
            document.getElementById(dialog).innerHTML = '<div class="chat__name">'+(this).id+'</div>' + history;
            console.log(history);
            var sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('active');      
        }

        
       var send = document.getElementById("send");  
        send.onclick = sendMessage;
         document.addEventListener('keypress', function (e) {
            e = e || window.event;
            if (e.keyCode === 13) {
                sendMessage();
                event.preventDefault();
                }
            });   
        
        function sendMessage() {
            var block = document.querySelector(".chat__window");
            var bubble = document.createElement("p"),
            chatUser = document.getElementById("chatUser"),
            msg = document.getElementById("chatWrite"),
            written = msg.value;
            if (written.replace(/\s/g,"") == "") {
                msg.value = "";
                return;
            } else {
            bubble.className = "out-bubble";
            bubble.innerHTML = written;
            writtenLow = written.toLowerCase();
            writtenLow = writtenLow.replace(/[^A-Za-zА-Яа-яЁё\s]/g, "");
            document.getElementById(dialog).appendChild(bubble);
            msg.value = "";
            chatUser.scrollTop = chatUser.scrollHeight;
                
                 if (block.id == 'chat-bot') { 
                    var bubbleBot = document.createElement("p");
                    bubbleBot.className = "in-bubble";
                     setTimeout( function() {
                         document.getElementById(dialog).appendChild(bubbleBot);
                         switch (writtenLow) {
                            case 'привет':
                            case 'йо':
                                {
                                    bubbleBot.innerHTML = 'Здарова';
                                }
                                break;
                            case 'как тебя зовут':
                                {
                                    bubbleBot.innerHTML = 'Меня величают Бот! Автобот. Ну как в трансформерах...';
                                }
                                break;
                             case 'как дела':
                                {
                                    bubbleBot.innerHTML = 'Отлично, а твои?';
                                }
                                break;
                            case 'хорошо':
                                {
                                    bubbleBot.innerHTML = 'Ты красавчик';
                                }
                                break;
                            case 'плохо':
                                {
                                    bubbleBot.innerHTML = 'Не переживай, всё будет хорошо';
                                }
                                break;
                            case 'отлично':
                                {
                                    bubbleBot.innerHTML = 'Это же - отлично!';
                                }
                                break;
                            default:
                                 {
                                     bubbleBot.innerHTML = 'Мой словарный запас еще не велик. Можешь написать мне: "Привет", "Как дела", "Как тебя зовут", а ответить: "Хорошо", "Плохо" и "Отлично".';
                                 }
                        }
                        chatUser.scrollTop = chatUser.scrollHeight;
                         
                     }, 700);
                }
            }
            setTimeout( function() {
                localStorage.setItem(dialog, document.getElementById(dialog).innerHTML)
                }, 800);
        };