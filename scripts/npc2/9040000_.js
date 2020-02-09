//��������ͷNPC
//CherryMS LoveMXD

var status;
var GQItems = new Array(1032033, 4001024, 4001025, 4001026, 4001027, 4001028, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037);

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
			cm.sendSimple("������Կ�ʼ��������������Ҫ��ʲô��#b\r\n#L0#��ʼ��������#l\r\n#L1#���빤�������");						
		}
		else if (status == 1) {
			if (selection == 0) { //Start
				if (cm.getPlayer().getGuildId() == 0 || cm.getPlayer().getGuildRank() >= 3) { //no guild or not guild master/jr. master
					cm.sendNext("�Բ���ֻ�и��峤�����峤����������������");
					cm.dispose();
				}
				else {
                                        //no true requirements, make an instance and start it up
                                        //cm.startPQ("ZakumPQ");
                                        var em = cm.getEventManager("GuildQuest");
                                        if (em == null) {
                                                cm.sendOk("ϵͳ�����뵽��̳�ύ������Ա��");
                                        } else {
                                                if (getEimForGuild(em, cm.getPlayer().getGuildId()) != null) {
                                                        cm.sendOk("��Ĺ����Ѿ���������ս�������Ժ����ԡ�")
                                                }
                                                else {
                                                        //start GQ
                                                        var guildId = cm.getPlayer().getGuildId();
                                                        var eim = em.newInstance(guildId);
                                                        em.startInstance(eim, cm.getPlayer().getName());
                                                        
                                                        //force the two scripts on portals in the map
                                                        var map = eim.getMapInstance(990000000);
                                                        
                                                        map.getPortal(5).setScriptName("guildwaitingenter");
                                                        map.getPortal(4).setScriptName("guildwaitingexit");
                                                        
                                                        eim.registerPlayer(cm.getPlayer());
                                                        cm.guildMessage("[���幫��]���幫�Ὺʼ��̽���ű���������" + cm.getC().getChannel() + "Ƶ�����Խ��롣");

                                                        //remove all GQ items from player entering
                                                        for (var i = 0; i < GQItems.length; i++) {
                                                                cm.removeAll(GQItems[i]);
                                                        }
                                                }
                                        }
                                        cm.dispose();
				}
			}
			else if (selection == 1) { //entering existing GQ
				if (cm.getPlayer().getGuildId() == 0) { //no guild or not guild master/jr. master
					cm.sendNext("�������峤���߸��峤����̸����");
					cm.dispose();
				}
				else {
                                        var em = cm.getEventManager("GuildQuest");
                                        if (em == null) {
                                                cm.sendOk("ϵͳ������͹���Ա��ϵ����");
                                        } else {
                                                var eim = getEimForGuild(em, cm.getPlayer().getGuildId());
                                                if (eim == null) {
                                                        cm.sendOk("��Ĺ���û�п�ʼ̽���ű�������");
                                                }
                                                else {
                                                        if ("true".equals(eim.getProperty("canEnter"))) {
                                                                eim.registerPlayer(cm.getPlayer());
                                                                
                                                                //remove all GQ items from player entering
                                                                for (var i = 0; i < GQItems.length; i++) {
                                                                        cm.removeAll(GQItems[i]);
                                                                }
                                                        }
                                                        else {
                                                                cm.sendOk("�Բ��𣬹��������Ѿ���ʼ�����߻�δ���š����Ժ����ԡ�");
                                                        }
                                                }
                                        }
                                        cm.dispose();
                                }
			}
		}
	}
}

function getEimForGuild(em, id) {
        var stringId = "" + id;
        return em.getInstance(stringId);
}
