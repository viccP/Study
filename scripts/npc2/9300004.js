/*
 *废弃都市任务脚本
*/

var status = 0;
//最低等级
var minLevel = 1; 
//最高等级
var maxLevel = 200; 

var minPartySize = 2; //最少成员
var maxPartySize = 2; //最大成员

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
                    if(cm.getMapId()== 920010000){
                       cm.openNpc(2013000,1);
				//cm.dispose();
                    }
			// 如果是在一个组队上.没有导言.直接检查组队条件
			else if (cm.getParty() == null) { // 不是组队
				cm.sendOk("结婚没组队说个毛");			//cm.mapMessage("请通过组队进入副本！需要30~60级。玩家2~5名！在这个组队挑战任务中，你总共完成了 "+cm.getboss()+" 次！");		
				cm.dispose();
			} else if (!cm.isLeader()) { // 不是组长
			var name = cm.getPlayer().getParty().getLeader().getPlayer().getName();
				cm.sendOk("逗比红袖，帅比蜗牛");
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[月老]" + " : " + " [" + name + "]和["+cm.getPlayer().getName()+"]成功搞基.",true).getBytes()); 
				cm.dispose();
			} else {
				// Check if all party members are within PQ levels
				var party = cm.getParty().getMembers();
				var mapId = cm.getPlayer().getMapId();
				var next = true;
				var levelValid = 0;
				var inMap = 0;
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
						levelValid += 1;
					} else {
						next = false;
					}
					if (cPlayer.getMapid() == mapId) {
						inMap += 1;
					}
				}
				if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
					next = false;
				}
				if (next) { //加载活动脚本
					var name = cm.getPlayer().getParty().getLeader().getPlayer().getName();
					cm.sendOk(+name);
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[月老]" + " : " + " [" + name + "]与小组开始了女神挑战。在" + cm.getC().getChannel() + "频道",true).getBytes()); 
						
					cm.dispose();
				} else {
					cm.sendOk("最低就是2人，最多也是2人，3人就是3P，一人就是BT。重口味绕道。")
					cm.dispose();
				}
			}
		}
	}
}



