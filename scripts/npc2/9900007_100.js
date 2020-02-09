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
		cm.sendNext("如果你想领取点卷，只需要在游戏里面输入#b@领取点卷#k即可");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("你的账号有#b【"+ cm.getmoneyb()*200+"】#k点卷可以领取。\r\n----------------------------------------\r\n已累计充值#b【"+cm.getcz()+"】#kRMB(领取后刷新显示)。\r\n----------------------------------------\r\n你的小伙伴为：#r#k。他可以额外获得10%（#r"+cm.getzb()*10+"#k）点卷！\r\n领取吗？领取后会刷新充值金额。");
	} else if (status == 1) {
            if(cm.getmoneyb() >= 1){
		if (cm.getChar().gettuiguang() > 1) { //推广人和被推广人获得点卷
                    var 可领取点卷 = cm.getmoneyb()*200;
                    var 推广人点卷 = cm.getmoneyb()/10;
                        cm.gainNX(+""+可领取点卷+"");
                        cm.settuiguang2(""+推广人点卷+"");
                        cm.setcz(+""+cm.getmoneyb()+"");
			cm.setmoneyb(-cm.getmoneyb());
                        cm.gainjs(+""+cm.getmoneyb()+"");
			cm.getChar().saveToDB(true,true);
			cm.sendOk("恭喜：操作已成功。领取完成！领取了点卷:"+可领取点卷+"。推广人获得了"+可领取点卷/10+"");
			cm.dispose();
		} else {
                    var 可领取点卷 = cm.getmoneyb()*200;
			cm.sendOk("恭喜：操作已成功。领取完成！领取了点卷:"+可领取点卷+"。");
                        cm.gainNX(+""+可领取点卷+"");
                        cm.setcz(+""+cm.getmoneyb()+"");
                        cm.gainjs(+""+cm.getmoneyb()+"");
			cm.setmoneyb(-cm.getmoneyb());
			cm.getChar().saveToDB(true,true);
			cm.dispose();   
		       }	
		}else{
                    cm.sendOk("看来你没有充值过。是无法使用的。");
                    cm.dispose();
                }
            }
	}
}
