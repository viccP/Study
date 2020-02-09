var status = 0;  

function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
    if (mode == -1) {  
        cm.dispose();  
    } else {  
        if (mode == 0 && status == 0) {  
            cm.dispose();  
            return;  
        }  
        if (mode == 1)  
            status++;  
        else  
            status--;  
        if (status == 0) {  
            cm.sendSimple ("歡迎來到球球活動! 這是一種運動,類似足球, 可是是把人當足球?!!#e#d" +  
                 "#k\r\n#L80##r炸彈!" +  
                 "#k\r\n#L81##r怎麼玩?." +  
                 "#k\r\n#L82##r離開.");  

            } else if (selection == 80) {  
            if (cm.haveItem(2100067)) { 
                cm.sendOk("妳已經有炸彈了. 用光他們或是丟掉."); 
                cm.dispose(); 
            } else { 
                cm.gainItem(2100067, 50); 
                cm.sendOk("你已經拿到50顆炸彈了! 你必須用光他們才能再拿另外50顆."); 
                } 
            } else if (selection == 81) {  
                cm.sendOk("這是個特別的活動. 會有一個人當作球. 那顆球必須站在中間而且不能動. 當GM裁判說GO才可進行. 這時, 2名站在球旁邊的人可以使用炸彈. 利用 @sb來放炸彈. 當炸彈爆炸, 會把球推開. 先將球推到對方那邊就算獲勝. 稱為得分. 當很多玩家的時候, 遊戲會採取比賽的方式進行."); 
                cm.dispose(); 
        } else if (selection == 82) { 
            cm.warp(910000000); 
            cm.sendOk("掰!"); 
            cm.dispose(); 
        } 
    } 
}  