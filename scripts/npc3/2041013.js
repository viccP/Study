/*
玩具城皮肤管理员
枫之梦
*/
var status = 0;
var price = 1000000;
var skin = Array(1, 2, 3, 4, 9, 10);

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
			cm.sendSimple("欢迎光临！欢迎来到我们玩具城护肤中心。你是不是希望拥有像我一样健康、美丽的肌肤呢？如果你有#b#t5153002##k我们可以为你精心护理肌肤。请相信我们的能力，怎么样要不要试一试？\r\n\#L2##b改变肤色#k(使用#b#z5153002##k)#l");
		} else if (status == 1) {
			if (selection == 1) {
				cm.dispose();
			} else if (selection == 2) {
				cm.sendStyle("用我们特殊开发的机器可查看护肤后的效果噢，想换成什么样的皮肤呢？请选择～~", skin, 5153002);
			}
		} else if (status == 2) {
			cm.dispose();
			if (cm.isCash()) {
                            if (cm.getPlayer().getCSPoints(1)>=480) {
                                  cm.getPlayer().modifyCSPoints(1,-480);
				  cm.setSkin(skin[selection]);
				  cm.sendOk("完成了,让朋友们赞叹你的新肤色吧!");
			    } else {
				  cm.sendOk("看起来你并没有我们的会员卡,我恐怕不能给你护肤,我很抱歉.请你先购买吧.");
			    }
                        } else if (cm.haveItem(5153002) == true) {
				cm.gainItem(5153002, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("完成了,让朋友们赞叹你的新肤色吧!");
			} else {
				cm.sendOk("看起来你并没有我们的会员卡,我恐怕不能给你护肤,我很抱歉.请你先购买吧.");
			}
		}
	}
}
