function start() {

if (cm.getChar().getMapId() != 209000015){
    cm.sendSimple("��ս�ڰ�������Ҫ����һ�ţ�#v5220006#\r\n#L0#��Ҫ��ս\r\n#L1#�ߴ���#l");
    } else {
    cm.sendOk("��Ҫ�������ͼʹ����")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) { //��������
    if(cm.haveItem(5220006) == true){
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"�����桽" + " : " + " "+cm.getPlayer().getName()+"ȥ��ս�����ˣ���Ű�����Ǳ���Ű��",true).getBytes()); 
	cm.deleteboss();
        cm.bossmap(cm.getPlayer().getId(),240060200,3);
    cm.gainItem(5220006,-1);
      cm.warp(240060200);
      cm.dispose();
  }else{
      cm.sendOk("û��");
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
        cm.�������();
	cm.dispose(); 
}  
}