var fywq = 45222;
var fy   = 4001126;//枫叶
var fys  = 500;//换取武器的数量
function start() {


if (cm.getLevel() > 0 ) {  
    cm.sendSimple ("你好~你相信吗？冒险岛已经成功开放了五周年了！为了庆祝开服活动。特意开放以下装备换购哦！\r\n<每个装备需要消耗"+fys+"个#v"+fy+"#>\r\n#b#L0##z1302030# #l#L1##z1382012##l #L2##z1472032##l #L3##z1452022##l\r\n#L4##z1432012##l #L5##z1462019##l #L6##z1442024# #L7##z1002419##l");
    } else {
    cm.sendOk("找我什么事，想要启动我的力量吗，你需要足够的条件")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1302030,1);//枫叶剑
        }else{
        cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 1) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1382012,1);//2
        }else{
       cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 2) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1472032,1);//2
        }else{
        cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 3) { 
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1452022,1);//3
        }else{
        cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 4) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1432012,1);//4
        }else{
        cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 5) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1462019,1);//5
        }else{
       cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 6) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1442024,1);//
        }else{
         cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 7) {
	 if (cm.haveItem(4001126, 500)) { 
        cm.gainItem(4001126,-500);
	cm.gainItem(1002419,1);//
        }else{
        cm.sendOk("抱歉.你没有搜集足够的枫叶"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302061,1);//蔓藤鞭子
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 9) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1402063,1);//樱花伞
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1402029,1);//鬼刺狼牙棒
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302027,1);//绿雨伞
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 12) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302085,1);//叉子
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302028,1);//紫雨伞
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302016,1);//黄色雨伞
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 15) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302049,1);//光线鞭子
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 16) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302029,1);//褐雨伞
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 17) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302061,1);//蔓藤鞭子
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 18) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302025,1);//红雨伞
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 19) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302084,1);//火柴
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 20) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1442018,1);//冻冻鱼
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 21) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1322051,1);//七夕
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 22) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1302080,1);//七彩霓虹灯泡
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 23) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3012001,1);//篝火
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 24) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3012002,1);//浴桶
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 25) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010046,1);//红龙椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 26) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010047,1);//蓝龙椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 27) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010041,1);//骷髅王座
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 28) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010043,1);//魔女的飞扫把
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 29) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010051,1);//沙漠兔子1靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 30) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010052,1);//沙漠兔子2靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 31) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010044,1);//同一红伞下
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 32) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010036,1);//浪漫秋千
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 33) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010019,1);//寿司椅 
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 34) {
	if(cm.getMeso() <= 21000000) {
        cm.sendOk("抱歉你没有2100万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-21000000);
        cm.summonMob(8160000, 700000, 26500, 30);时间门神 
	cm.dispose(); } 

} else if (selection == 60) {
	if(cm.getMeso() <= 22000000) {
        cm.sendOk("抱歉你没有2200万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-22000000);
        cm.summonMob(8170000, 850000, 27500, 30);黑甲凶灵
	cm.dispose(); } 

} else if (selection == 61) {
	if(cm.getMeso() <= 23000000) {
        cm.sendOk("抱歉你没有2300万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-23000000);
        cm.summonMob(8141100, 900000, 28500, 30);大海贼王
	cm.dispose(); } 
} else if (selection == 62) {
	if(cm.getMeso() <= 24000000) {
        cm.sendOk("抱歉你没有2400万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-24000000);
        cm.summonMob(8143000, 1000000, 30000, 30);时之鬼王 
	cm.dispose(); } 
} else if (selection == 63) {
        if (cm.getBossLog('EMGC') < 1) {
cm.warp(910000022, 0);
                    cm.setBossLog('EMGC');
                    cm.dispose();
                }else{
                    cm.sendOk("你每天只能进入1次超级恶魔广场!");
                    mode = 1;
                    status = -1; }
} else if (selection == 64) {
         cm.warp(209000001, 0);
         cm.dispose();  
                
}
}