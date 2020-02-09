/**
 * 马龙
 * 废弃都市
 * 1052012
 * 低级任务npc
 * */

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("网吧地图有#b网吧经验加成#k可享受#b百分之20#k的经验加成！");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("是否想进入#b网吧地图#k呢？\r\n这可不是免费进入的。需要看到你的#b#z5581002##k我才会给你进入。\r\n入场卷是这个样子的#v5581002#。\r\n#r怎么样，你有吗？");
	} else if (status == 1) {
            if(cm.haveItem(5581002,1)){
		cm.warp(193000000);
		cm.dispose();
		}else{
                  cm.sendOk("很抱歉，你没有#b#z5581002##k，#b这个物品在现金商城有出售！#k");
                  cm.dispose();
                }}
	}
}
