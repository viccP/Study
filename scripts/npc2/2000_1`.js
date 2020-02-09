function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple ("#b查看哪种排名？\r\n#L0#人气排行榜#l    #L1#等级排行榜#l    #r#L2#家族排行榜#l\r\n\r\n#L10#金币排行榜l    #L11#通缉令#l");
    } else {
    cm.sendOk("不要再这个地图使用我")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //人气排行
       cm.openNpc(2101017,0);
} else if (selection == 1) {
	//Level
        cm.displayLevelRanks();
        cm.dispsoe();
} else if (selection == 2) {
        //MapGui
        cm.displayGuildRanks();
	cm.dispose(); 
}  else if (selection == 10) {
        //MapGui
        cm.金币排行();
	cm.dispose(); 
}   else if (selection == 11) {
        //MapGui
       cm.openNpc(2000,1000);
}  
}