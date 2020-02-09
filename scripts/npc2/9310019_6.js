/*
 *废弃都市任务脚本
*/

var status = 0;
//最低等级
var minLevel = 50; 
//最高等级
var maxLevel = 120; 

var minPartySize = 1; //最少成员
var maxPartySize = 6; //最大成员

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
                    if(cm.getMapId()== 910320001){
                        cm.sendOk("嗯？");	
				cm.dispose();
                    }
			// 如果是在一个组队上.没有导言.直接检查组队条件
			else if (cm.getParty() == null) { // 不是组队
				cm.sendOk("※万魔塔※\r\n是否要挑战？看看谁能挑战最大波数！\r\n#r需要组队#k");			//cm.mapMessage("请通过组队进入副本！需要30~60级。玩家2~5名！在这个组队挑战任务中，你总共完成了 "+cm.getboss()+" 次！");		
				cm.dispose();
			} else if (!cm.isLeader()) { // 不是组长
				cm.sendOk("你如果想挑战，请让队长和我说话！");	
				cm.dispose();
			} else {
                            var party = cm.getParty().getMembers();
                            var j = party.size()*300;
                            if(cm.haveItem(4001126,j)){
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
					var em = cm.getEventManager("wanmota");
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[※万魔塔※]" + " : " + " [" + cm.getPlayer().getName() + "]带着队伍进入了※万魔塔※。在" + cm.getC().getChannel() + "频道",true).getBytes()); 
                                        cm.gainItem(4001126,-j);
                                        //cm.getChar().setsg2(1);
					if (em == null) {
						cm.sendOk("无法加载这个脚本！请确认配置是否有误！");
					} else {
						if (cm.getLevel() > 1 ) {
							em.startInstance(cm.getParty(),cm.getPlayer().getMap());
							cm.removeAll(4001008);
							cm.removeAll(4001007);
							if(cm.partyMemberHasItem(4001008) || cm.partyMemberHasItem(4001007)) { 
								cm.getPlayer().getEventInstance().setProperty("smugglers", "true"); 
								cm.partyNotice("Your smuggling attempt has been detected. We will allow the attempt, but you will not get any NX cash from this run.");

							}
							em.setProperty("entryPossible", "false");
							cm.getPlayer().getEventInstance().setProperty("startTime", new java.util.Date().getTime());
						} else { // Check if the PQ really has people inside
							var playersInPQ = 0;
							for (var mapid = 970040109; mapid <= 970040109; mapid++) {
								playersInPQ += cm.countPlayersInMap(mapid);
							}
							
						}
					}
					cm.dispose();
				} else {
					cm.sendNext("#r需要组队成员:" + minPartySize + " 个玩家。 等级范围,最低 " + minLevel + "级 最高 " + maxLevel + "级.\r\n\r\n#k#b请检查你的小组是否达到以上条件！！");
					cm.dispose();
				}
			}else{
                            cm.sendOk("无法让你进入，请检查你的条件：\r\n你需要"+j+"个#v4001126# 来开启！");
                            cm.dispose();
                        }}
		}
	}
}



