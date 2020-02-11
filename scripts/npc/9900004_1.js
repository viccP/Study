//地图对象
var mapObj=[
	[
		{mapId:910000000,meso:0,mapName:"自由市场"},
		{mapId:701000210,meso:0,mapName:"大擂台"},
		{mapId:200000000,meso:0,mapName:"天空之城"},
		{mapId:270000100,meso:0,mapName:"神殿入口"},
		{mapId:211000000,meso:0,mapName:"冰峰雪域"},
		{mapId:220000000,meso:0,mapName:"玩具城"},
		{mapId:221000000,meso:0,mapName:"地球防御本部"},
		{mapId:222000000,meso:0,mapName:"童话村"},
		{mapId:230000000,meso:0,mapName:"水下世界"},
		{mapId:240000000,meso:0,mapName:"神木村"},
		{mapId:250000000,meso:0,mapName:"武陵"},
		{mapId:251000000,meso:0,mapName:"百草堂"},
		{mapId:260000000,meso:0,mapName:"阿里安特"},
		{mapId:261000000,meso:0,mapName:"玛加提亚"},
		{mapId:100000000,meso:0,mapName:"射手村"},
		{mapId:101000000,meso:0,mapName:"魔法密林"},
		{mapId:102000000,meso:0,mapName:"勇士部落"},
		{mapId:103000000,meso:0,mapName:"废弃都市"},
		{mapId:105040300,meso:0,mapName:"林中之城"},
		{mapId:110000000,meso:0,mapName:"黄金海滩"},
		{mapId:120000101,meso:0,mapName:"航海室　"},
		{mapId:130000000,meso:0,mapName:"圣地"},
		{mapId:140000000,meso:0,mapName:"里恩"},
		{mapId:701000100,meso:0,mapName:"东方神州"}
	],
	[
		{mapId:104000400,meso:0,mapName:"红蜗牛王"},
		{mapId:101030404,meso:0,mapName:"树妖王"},
		{mapId:701010323,meso:0,mapName:"蜈蚣王"},
		{mapId:100000005,meso:0,mapName:"蘑菇王"},
		{mapId:105070002,meso:0,mapName:"僵尸蘑菇王"},
		{mapId:107000300,meso:0,mapName:"多尔"},
		{mapId:100040105,meso:0,mapName:"浮士德"},
		{mapId:260010201,meso:0,mapName:"大宇"},
		{mapId:230020100,meso:0,mapName:"歇尔夫"},
		{mapId:110040000,meso:0,mapName:"巨型寄居蟹"},
		{mapId:105090900,meso:0,mapName:"蝙蝠怪"},
		{mapId:220050100,meso:0,mapName:"提莫"},
		{mapId:222010401,meso:0,mapName:"鬼怪"},
		{mapId:200010300,meso:0,mapName:"艾力杰"},
		{mapId:211040000,meso:0,mapName:"驼狼雪人"},
		{mapId:250010303,meso:0,mapName:"肯德熊"},
		{mapId:800010100,meso:0,mapName:"蓝蘑菇王"},
		{mapId:240020401,meso:0,mapName:"喷火龙"},
		{mapId:240020101,meso:0,mapName:"天鹰"},
		{mapId:270030500,meso:0,mapName:"雷卡"},
		{mapId:270010500,meso:0,mapName:"多多"},
		{mapId:270020500,meso:0,mapName:"玄冰独角兽"},
		{mapId:250010504,meso:0,mapName:"妖怪禅师"},
		{mapId:240040400,meso:0,mapName:"大海兽"},
		{mapId:230040420,meso:0,mapName:"鱼王"}
	],
	[
		{mapId:220080001,meso:0,mapName:"闹钟"},
		{mapId:702060000,meso:0,mapName:"妖僧"},
		{mapId:280030000,meso:0,mapName:"扎昆"},
		{mapId:551030200,meso:0,mapName:"暴力狮熊"},
		{mapId:240060200,meso:0,mapName:"黑暗龙王"},
		{mapId:270050000,meso:0,mapName:"品客缤"}

	]
];

//第一次选择
var selFir=0;
//第二次选择
var selSec=0;

/**
 * 脚本初始化函数
 * @returns
 */
function start() {
	status = -1;
	action(1, 0, 0);
}

/**
 * 动作函数
 * @param mode
 * @param type
 * @param selection
 * @returns
 */
function action(mode, type, selection) {
	if (mode == -1) {
		cm.sendOk("#b好的,下次再见.");
		cm.dispose();
	} else {
		//结束对话
		if (status >= 0 && mode == 0) {
			cm.sendOk("#b好的,下次再见.");
			cm.dispose();
			return;
		}
		//记录次数
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
	
		//第一步
		if (status == 0) {
	   	    var add = "#e#r豆豆#k冒险岛.快捷传送服务.#k\r\n\r\n";
			add += "#L0##e#d城镇传送#l ";
			add += "#L1#野外BOSS#l ";
			add += "#L2##r副本BOSS#l ";
			cm.sendSimple (add);    
		} 
		//第二步
		else if (status == 1) {
			var selStr = "#r棉花糖冒险岛#k\r\n#d　　　　　　　　　选择你的目的地吧.#k#b";
			//初始化地图列表
			for(var index in mapObj[selection]){
				var item=mapObj[selection][index];
				selStr += "\r\n#L" + index + "#" + item.mapName + "";
			}
			cm.sendSimple(selStr);
			selFir=selection;
		} 
		//第三步
		else if (status == 2) {
			cm.sendYesNo("你确定要去 " + mapObj[selFir][selection].mapName + "?");
			selSec = selection;
		} 
		else if (status == 3) {
			var item=mapObj[selFir][selSec];
			if(cm.getMeso()>=item.meso){
				cm.warp(item.mapId, 0);
				cm.gainMeso(-item.meso);
			}else{
				cm.sendOk("你没有足够的金币哦!");
			}
			cm.dispose();
		}
	}
}

