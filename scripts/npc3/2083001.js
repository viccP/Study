function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple("挑战黑暗龙王需要消耗一张：#v5220006#\r\n#L0#我要挑战\r\n#L1#走错了#l");
    } else {
    cm.sendOk("不要再这个地图使用我")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //人气排行
    if(cm.haveItem(5220006) == true){
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"〖公告〗" + " : " + " "+cm.getPlayer().getName()+"去挑战黑龙了！是虐它还是被它虐？",true).getBytes()); 
	cm.deleteboss();
        cm.bossmap(cm.getPlayer().getId(),240060200,3);
    cm.gainItem(5220006,-1);
      cm.warp(240060200);
      cm.dispose();
  }else{
      cm.sendOk("没有");
      cm.dispose();
  }
} else if (selection == 1) {
	
        cm.dispsoe();
} else if (selection == 2) {
        //MapGui
        cm.displayGuildRanks();
	cm.dispose(); 
}  else if (selection == 10) {
        //MapGui
        cm.金币排行();
	cm.dispose(); 
}  
}