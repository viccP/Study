importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.tools);
function enter(pi) {
  if(pi.getPlayer().getMap().mobCount() < 1 || pi.getPlayer().getMap().getMonsterById(9300216) != null ){	 
	var charcount = pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).getCharacters().size();      	
	
	if (charcount < 1){
	pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).killAllMonsters();  //ɱ��һ��ͼ��
	pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).resetReactors();
	pi.getPlayer().getMap().clearDrops(pi.getPlayer() ,false);
	pi.getPlayer().getMap().killAllMonsters();  //ɱ��ǰ��ͼ��
	pi.getPlayer().getMap().resetReactors();
	}	
  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "���� " + pi.getPlayer().addDojoPointsByMap() +" ����������,�������������Ϊ "+ pi.getPlayer().getDojoPoints() +" ��"));
	if(pi.getPlayer().getMap().getId() >= 925033800 && pi.getPlayer().getMap().getId() <= 925033809){
		pi.warp(925020003);
		pi.showInstruction("���ѳɹ�ͨ�ء�ף����Ϸ���!������ð��--о���������� QQ:7851103", 250, 20);
		return true;
	}

  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.updateDojoStats(pi.getPlayer(),1));
  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.dojoWarpUp());
  var reactor = pi.getPlayer().getMap().getReactorByName("door");
  reactor.delayedHitReactor(pi.getC(), 800);
	pi.getPlayer().saveToDB(true,true);
  return true;
  } else {
  	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "���й���û������"));
  }
    return false;
}  
