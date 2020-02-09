/**
 ***@龙穴探宝活动*** 
 *@NPCName:龙宝宝 ID:2081011
 *@触发条件：拍卖功能
 *@玩家每日：2次
 **/
var 龙穴宝库椅子 = "#v3010012##v3010013##v3010034##v3010043##v3010049##v3010057##v3010070##v3010075#";
var 龙穴宝库装备 = "#v1032055##v1122001##v1002391##v1002392##v1002393##v1002394##v1002395##v1002508##v1002509##v1102139##v1102147##v1302058##v1302060##v1402014##v2022570##v2022571##v2022572##v2022573##v2022574##v2022613##v2022648#";
function start() {
    var 购买次数 = cm.getBossLog('ewai')
    var 探宝次数 = 2+cm.getChar().getVip()+购买次数;
var 剩余次数 = 探宝次数-cm.getBossLog('tb');
	if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()){
	cm.sendOk("您至少应该让装备栏空出一格");
	cm.dispose();
	}else{
    cm.sendSimple ("#b每日可以免费2次参与龙穴探宝活动哦！\r\n今日可以参加 "+剩余次数+" 次.探宝了"+cm.getBossLog('tb')+"次.购买了"+购买次数+"次.\r\n#L1#进入龙穴探宝\r\n#L2#购买探宝次数<200点卷一次>\r\n#L3#查看宝物奖励");    
	}
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	if (cm.getBossLog('tb') < "+探宝次数+"){
           cm.sendOk("2222222222"); 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！11"); 
        cm.setBossLog('tb');
	cm.dispose();}
} else if (selection == 1) { //进入龙穴探宝
 var 购买次数 = cm.getBossLog('ewai')
var 探宝次数 = 2+cm.getChar().getVip()+购买次数;
var 剩余次数 = 探宝次数-cm.getBossLog('tb');
	if (""+剩余次数+"" == 0){
           cm.sendOk("对不起，你没有次数了~如果你还想继续探宝。可以选择购买探宝次数。"); 
        }else{
            cm.setBossLog('tb');
        cm.openNpc(2081011,0);}
} else if (selection == 2) { //购买探宝次数
	if(cm.getChar().getNX() >= 200) {
            cm.gainNX(-200); 
	cm.setBossLog('ewai');
        cm.sendOk("购买了一次~"); 
        }else{
        cm.sendOk("对不起~点卷余额不足！"); 
	cm.dispose();}
} else if (selection == 3) { //查看龙穴宝库
	if(cm.getChar().getNX() >= 0) {
cm.sendOk(""+龙穴宝库椅子+""+龙穴宝库装备+"\r\n#e#r以上只是一部分！还有N多道具期待被你拿走！"); 
        cm.dispose();
        }else{
        cm.sendOk("你的点卷有问题！我已经通知GM了！"); 
	cm.dispose();}
} else if (selection == 4) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1332074,1);//永恒断首刃
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 5) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1372044,1);//永恒蝶翼杖
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 6) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1382057,1);//永恒冰轮杖
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 7) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1402046,1);//永恒玄冥剑
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1412033,1);//永恒碎鼋斧
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 9) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1422037,1);//永恒威震天
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1432047,1);//永恒显圣枪
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1442063,1);//永恒神光戟
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 12) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1452057,1);//永恒惊电弓
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1462050,1);//永恒冥雷弩
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1472068,1);//永恒大悲赋
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 15) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1482023,1);//永恒孔雀翎
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 16) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1492023,1);//永恒凤凰铳
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 17) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072355,1);//永恒坚壁靴
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 18) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072356,1);//永恒缥缈鞋
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 19) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072357,1);//永恒彩虹鞋
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 20) {
	if(cm.gainNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072358,1);//永恒舞空靴
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 21) {
	if(cm.gainNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072359,1);//永恒定海靴
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 22) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052155,1);//永恒演武铠
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 23) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052156,1);//永恒奥神袍
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 24) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052157,1);//永恒巡礼者
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 25) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052158,1);//永恒翻云服
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 26) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052159,1);//永恒霸七海
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 27) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082234,1);//永恒定边手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 28) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082235,1);//永恒逍遥手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 29) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082236,1);//永恒白云手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 30) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082237,1);//永恒探云手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 31) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082238,1);//永恒抚浪手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 32) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002776,1);//永恒冠军盔
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 33) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002777,1);//永恒玄妙帽 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 34) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002778,1);//永恒玄妙帽 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 35) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002778,1);//永恒迷踪帽 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 36) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002780,1);//永恒海王星 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 37) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1102172,1);//永恒不灭披风 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 38) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092057,1);//永恒魔光盾 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 39) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092058,1);//永恒寒冰盾
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 40) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092059,1);//永恒匿踪盾 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 41) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1032031,1);//永恒金盾坠 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
}
}