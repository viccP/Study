function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple ("#b查看哪种排名？\r\n#L0#5000豆豆兑换区#l    \r\n#L1#10000豆豆兑换区#l    \r\n#r#L2#15000豆豆兑换区#l");
    } else {
    cm.sendOk("不要再这个地图使用我")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //人气排行
       cm.openNpc(9310101,0);//5000豆豆
} else if (selection == 1) {
	cm.openNpc(9310101,1);//10000豆豆
} else if (selection == 2) {
        cm.openNpc(9310101,2);//15000豆豆
}  
}