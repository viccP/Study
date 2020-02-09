/*
 * WNMS玩具城组队任务最后阶段
 */

var status;

var itemList = new Array(1102011,1102012,1102013,1102014, //equips
						 2101039,2100017,2100018,2100019,2044901,2044902,2044802,2044801,2044702,2044701,2044602,
					     2044601,2044501,2044502,2044402,2044401,2044302,2044301,2044201,2044202,2044102,2044101,
					     2044002,2044001,2043802,2043801,2043702,2043701,2043302,2043301,2043202,2043201,2043102,
					     2043101,2043002,2043001,2040915,2040914,2040805,2040804,2040532,2040534,2040517,2040516,
					     2040514,2040513,2040502,2040501,2040323,2040321,2040317,2040316,2040302,2040301, //1x use items
						 3010047,3010046,3010024,2000005,3010044,2000005,2000006,2000006,2000006,2000006,2000006,2000005,2000005,
						 2000005,2000005,2000002,2000002,2000002,2000002,2000003,2000003,2000003,2000004,2000004,
						 2000004,2000004,2022003,//multiuse items
						 4020000,4020000,4020001,4020001,4020002,4020002,4020003,4020003,4020004,4020004,4020005,
						 4020005,4020006,4020006,4010000,4010000,4010001,4010001,4010002,4010002,4010003,4010003,
						 4010004,4010004,4010005,4010005,4010006,4020007,4020008,4003000); //etc items

var randNum = Math.floor(Math.random()*(itemList.length + 1));
var randItem = itemList[randNum];
var qty;

switch (randItem) {
	case 4020000:
	case 4020001:
	case 4020002:
	case 4020003:
	case 4020004:
	case 4020005:
	case 4020006:
	case 4010000:
	case 4010001:
	case 4010002:
	case 4010003:
	case 4010004:
	case 4010005:
		qty = 1;
		break;
	case 4010006:
	case 4020007:
	case 4020008:
		qty = 1;
		break;
	case 4003000:
		qty = 1;
		break;
	case 2000002:
	case 2000006:
		qty = 1;
		break;
	case 2000003:
		qty = 1;
		break;
	case 2000004:
		qty = 1;
		break;
	case 2000005:
	case 2022003:
		qty = 1;
		break;
	default:
		qty = 1;
}

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendNext(" 不敢相信，你击败了boss，你可以考虑领取奖励了吗？.");
	} else if (status == 1) {
		if (cm.canHold(randItem)) {
			cm.gainItem(randItem, qty);
  var rand = 1 + Math.floor(Math.random() * 6);
                		if(cm.haveItem(4031329,1)){
				cm.gainItem(4001325,+1);
				}
			cm.warp(221024500,0);
                         cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[玩具城组队任务]" + " : " + " [" + cm.getPlayer().getName() + "]完成了玩具城组队任务！获得了奖励！大家一起祝贺他（她）吧！！", true).getBytes());
			cm.dispose();
		} else {
			cm.sendNext("请检查您是否在使用你的装备，至少有一个空槽，安装等清单。");
		}
	}
}
