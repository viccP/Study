function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple ("#b哦?....你有仇人或者想接受赏金任务吗?\r\n#L0#发布通缉令#l\r\n#L1#接受通缉令#l\r\n#L2#查看通缉令#l");
    } else {
    cm.sendOk("不要再这个地图使用我")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //人气排行
       cm.openNpc(2000,2000);//发布通缉令
} else if (selection == 1) {
	
        cm.dispose();
} else if (selection == 2) {
         //p=cm.paiMing();
            var a = "通缉令发布站\r\n"; 
            a+=cm.查看通缉榜(); 
            cm.sendOk(a);
}  else if (selection == 10) {
        //MapGui
        cm.金币排行();
	cm.dispose(); 
}   else if (selection == 11) {
        //MapGui
       cm.openNpc(2000,1000);
}  
}