var status = 0;  


var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_points = Array(200, 1800, 4000, 9200, 17000);

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
            cm.sendSimple ("聽說GM要開放#r#t1122076##i1122076##k?!,聽說有條件的\r\n很像就是每天領取#r九靈龍的蛋#k#i4001094#累積3顆就可以換了?!,這位大哥/大姊 妳要領嗎?!!#e#d" +  
                 "#k\r\n#L80##r好阿!" +   
                 "#k\r\n#L81##r爽啦!我有三顆蛋了快幫我換!!!" + 
                 "#k\r\n#L82##r我才不削哩~.");  

            } else if (selection == 80) {  
		if (cm.getBossLog('dayitem') < 1) {
		cm.gainItem(4001094, 1); // Gains a random item.
		cm.setBossLog('dayitem')
		cm.sendOk("給你吧!");
		cm.dispose();
	    } else {
		cm.sendNext("明天再來吧!");
		cm.dispose();
		}
            } else if (selection == 81) {  
		if (cm.haveItem(4001094 ,3) ==  true) {
		cm.addRandomItem(1122076); // Gains a random item.
		cm.gainItem(4001094, -3);
		cm.sendOk("幫你換了不要吵!!(切記!!每人身上只能存在一條)");
		cm.dispose();
	    } else {
		cm.sendNext("你他X的耍我?沒三顆蛋還敢兇我?滾!");
		cm.dispose();
		}
        } else if (selection == 82) { 
            cm.sendOk("妳不想要拿唷?!"); 
            cm.dispose(); 
        } 
    } 
}  