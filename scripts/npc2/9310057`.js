
/*
星缘NPC
枫叶换取点卷
*/

importPackage(net.sf.odinms.client);

function start() {
	status = -1;
	
	action(1, 0, 0);
}

function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
			cm.sendOk("我是土豪，我不和你交朋友！");
			cm.dispose();
			return;                    
                }
                if (mode == 1) {
			status++;
		}
		else {
			status--;
		} 
		        if (status == 0) {
			cm.sendSimple("冒险岛什么最值钱？当然是点卷了！你冒险币足够多，但是没有一身点装你还叼个屁啊！\r\n即日起，在我这里可以用枫叶兑换点卷了哦！\r\n#b比例是1:1\r\n#L1##b50个枫叶兑换50点卷#n\r\n#L2##b500个枫叶兑换500点卷#k\r\n#L3##b1000个枫叶兑换1000点卷#k\r\n#L4##b2000个枫叶兑换2000点卷#k ");
			} else if (status == 1) { //使用50枫叶换取50点卷
			if (selection == 1) {
			if (cm.haveItem(4001126, 50)) {
                        cm.gainItem(4001126,-50);
			cm.gainNX(50);
			cm.sendOk("成功兑换");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("不足~");
			cm.dispose(); }
//-------------------------------激活四转技能-----------------------------
			} else if  (selection == 2) { //使用500枫叶500点卷
			if (cm.haveItem(4001126, 500)) {
                        cm.gainItem(4001126,-500);
			cm.gainNX(500);
			cm.sendOk("成功兑换");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("不足~");
			cm.dispose(); }
//------------------------------高级鱼饵兑换----------------------------------
            } else if (selection == 3) { //1000兑换1000
			if (cm.haveItem(4001126, 1000)) {
                        cm.gainItem(4001126,-1000);
			cm.gainNX(1000);
			cm.sendOk("成功兑换");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("不足~");
			cm.dispose(); }
//--------------------------------鱼饵兑换------------------------------------
            } else if (selection == 4) {
			if (cm.haveItem(4001126, 2000)) {
                        cm.gainItem(4001126,-2000);
			cm.gainNX(2000);
			cm.sendOk("成功兑换");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("不足~");
			cm.dispose(); }
//-------------------------------关于钓鱼场------------------------------------
	                 } else if (selection == 5) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1372058,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
	                 } else if (selection == 6) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1382080,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
	                 } else if (selection == 7) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1452085,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
	                 } else if (selection == 8) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1462075,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
	                 } else if (selection == 9) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1332099,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
	                 } else if (selection == 10) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1472100,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
	                 } else if (selection == 11) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1482046,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }
	                 } else if (selection == 12) {
			if ((cm.getNX() >= 2000)) { 
			cm.gainNX(-2000);
		   	cm.gainItem(1492048,1);
			cm.sendOk("成功兑换了装备!");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("点卷不足~");
			cm.dispose(); }


}}
	}
}