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
			// 如果是在一个组队上.没有导言.直接检查组队条件
               if (cm.getParty() == null) { // 不是组队
				cm.sendOk("结婚没组队说个毛");			
				cm.dispose();
			} else if (!cm.isLeader()) { // 不是组长
			
			var name = cm.getPlayer().getParty().getLeader().getPlayer().getName();
			var name2 = cm.getPlayer().getName();
			if(cm.getPlayer().getParty().getLeader().getPlayer().getvip() == 1 || cm.getPlayer().getvip() >= 1){
				cm.sendOk("有没有搞错，已婚了还点我！");
				cm.dispose();
                                return;
			}
				cm.mapMessage(""+name2+"已经和"+name+"成功结婚！");
				//cm.getPlayer().getParty().getLeader().getPlayer().setvip(1);
				//cm.getPlayer().setvip(1);
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[月老]" + " : " + " 苍天在上，厚土在下，高堂其中。我，月下老人，宣布你们俩人结为合法夫妻。小姐珠圆玉润旺夫之相、宜室宜家，先生才高八斗、学富五车。现福禄鸳鸯缘订三生，佳偶天成，珠联璧合。",true).getBytes()); 
//				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[月老]" + " : " + " 我，月下老人，宣布你们俩人结为合法夫妻。。",true).getBytes());
//				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[月老]" + " : " + " 小姐珠圆玉润旺夫之相、宜室宜家，先生才高八斗、学富五车。",true).getBytes()); 
//				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[月老]" + " : " + " 现福禄鸳鸯缘订三生，佳偶天成，珠联璧合。",true).getBytes()); 
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[月老]" + " : " + " 祝 【"+name+"】 和 【"+name2+"】 永结同心，百年好合，百子千孙，无论富贵贫穷同德同心、琴瑟合鸣、相敬如宾。",true).getBytes()); 
				cm.组队传送(700000200);
				cm.sendOk(""+name2+",你已经和"+name+"成功结婚！");
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
					cm.sendOk("这个时候，需要你的另一半点我了~不关你的事了，不然算逼婚。"+cm.getPlayer().getParty().getLeader().getPlayer().getvip()+" ");		
					cm.dispose();
				} else {
					cm.sendOk("最低就是2人，最多也是2人，3人就是3P，一人就是BT。重口味绕道。")
					cm.dispose();
				}
			}
		}
	}
        }



