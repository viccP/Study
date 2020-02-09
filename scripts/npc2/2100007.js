/* 92MS
by Some
*/
function start() {
status = -1;
action(1, 0, 0);
}
function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
cm.sendOk("好的,如果你想好了要做什麼,我會很樂意的為你服務的..");
cm.dispose();
return;                    
                }
                if (mode == 1) {
status++;
}
else {
status--;
}
        if (status == 0) { 
cm.sendSimple("您好我是消除戒指的NPC,請問您要刪除什麼戒指什麼呢（戒指請取下清理-放背包中\r\n #b#L0#星星友情戒指#l \r\n #L1#幸運草友情戒指#l \r\n #L2##t1112801##l \r\n #L3##t1112001##l \r\n #L4##t1112003##l\r\n #L5##t1112002##l\r\n #L6##t1112005##l\r\n #L7##t1112006##l");
} else if (status == 1) {
if (selection == 0) {
     if (cm.haveItem(1112802)) {
	      cm.gainItem(1112802,-1);
              cm.sendOk("恭喜你截止成功刪除!"); 
              cm.dispose();
              }else{
              //cm.gainItem(1112802,-1);
              //cm.sendOk("恭喜你截止成功刪除!");
              cm.sendOk("妳沒有星星友情戒指,無法刪除");
              cm.dispose();
              }
            } else if (selection == 1) {
     if (cm.haveItem(1112800)) {
              cm.gainItem(1112800,-1);
              cm.sendOk("恭喜你截止成功刪除!");
              cm.dispose();
              }else{
              cm.gainItem(1112800,-1);
              cm.sendOk("妳沒有#t1112800#,無法刪除");
              cm.dispose();
              }
            } else if (selection == 2) {
  if (cm.haveItem(1112801)) {
              cm.gainItem(1112801,-1);
              cm.sendOk("恭喜你截止成功刪除!")
              cm.dispose();
              }else{
              cm.sendOk("妳沒有#t1112801#,無法刪除");
              cm.dispose();
              }
            } else if (selection == 3) {
  if (cm.haveItem(1112001)) {
              cm.gainItem(1112001,-1);
              cm.sendOk("恭喜你截止成功刪除!");
              cm.dispose();
              }else{
              cm.sendOk("妳沒有#t1112001#,無法刪除");
              cm.dispose();
              }
            } else if (selection == 4) {
  if (cm.haveItem(1112003)) {
              cm.gainItem(1112003,-1);
              cm.sendOk("恭喜你截止成功刪除!");
              cm.dispose();
              }else{
              cm.sendOk("妳沒有#t1112003#,無法刪除");
              cm.dispose();
              }
            } else if (selection == 5) {
  if (cm.haveItem(1112002)) {
              cm.gainItem(1112002,-1);
              cm.sendOk("恭喜你截止成功刪除!");
              cm.dispose();
              }else{
              cm.sendOk("妳沒有#t1112002#,無法刪除");
              cm.dispose();
              }
            } else if (selection == 6) {
  if (cm.haveItem(1112005)) {
              cm.gainItem(1112005,-1);
              cm.sendOk("恭喜你截止成功刪除!");
              cm.dispose();
              }else{
              cm.sendOk("妳沒有#t1112005#,無法刪除");
              cm.dispose();
}
            } else if (selection == 7) {
  if (cm.haveItem(1112006)) {
              cm.gainItem(1112006,-1);
              cm.sendOk("恭喜你截止成功刪除!");
              cm.dispose();
              }else{
              cm.sendOk("妳沒有#t1112005#,無法刪除");
              cm.dispose();
}
            } else if (selection == 11) {
              cm.sendOk("#b增加裝備升級次數還未開放");
              cm.dispose();
             
}
}
}
} 
