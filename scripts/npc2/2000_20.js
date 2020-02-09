/*兑换需要 #v4000425#  或者 #v4000424#  或者 #v4000423# 或者#v4000422#*/

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

            cm.sendOk("感谢你的光临！");
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "兑换需要 #v4000425#  或者 #v4000424#  或者 #v4000423# 或者#v4000422# (兑换的戒指为一对，聊天+名片)\r\n"
            text += "#L1#使用#v4000425#兑换戒指#l\t\t";//七天
            text += "#L2#使用#v4000424#兑换戒指#l\r\n"//单手剑
            text += "#L3#使用#v4000423#兑换戒指#l\t\t"//短剑
            text += "#L4#使用#v4000422#兑换戒指#l\r\n\r\n"//地狱大公短杖
            cm.sendSimple(text);
        } else if (selection == 1) { //租凭枫叶耳环
           cm.openNpc(2000,100);
        } else if (selection == 2) {  //地狱大公单手剑      
          cm.openNpc(2000,200);
        } else if (selection == 3) { //地狱大公短剑 
          cm.openNpc(2000,300);
        } else if (selection == 4) {
           cm.openNpc(2000,400);
        } else if (selection == 5) { //地狱大公长杖
           
        } else if (selection == 5) {
          
        } else if (selection == 6) {
         
        } else if (selection == 7) {
           
        } else if (selection == 8) {
           
        } else if (selection == 9) {
          
        }
    }
}


