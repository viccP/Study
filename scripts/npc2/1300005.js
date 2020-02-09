function start() {


if (cm.getLevel() > 1 ) {  
    cm.sendSimple ("#b蘑菇大臣的宝箱双击可以获得里面的极品装备哦！等级在35级可以使用！\r\n#d剩余#r"+cm.getNX()+"#d点卷#r<每个消耗300点卷>\r\n战士宝箱\r\n #L0##v2022570##l   #L1##v2022575##l   #L2##v2022580##l\r\n\r\n魔法师宝箱\r\n #L3##v2022571##l     #L4##v2022576##l   #L5##v2022581##l#l\r\n\r\n弓箭手宝箱\r\n #L9##v2022574##l     #L10##v2022579##l   #L11##v2022584##l\r\n\r\n飞侠宝箱\r\n #L12##v2022572##l     #L13##v2022572##l   #L14##v2022582##l\r\n\r\n海盗宝箱\r\n #L15##v2022573##l     #L16##v2022578##l   #L17##v2022583##l");
    } else {
    cm.sendOk("宝箱在手，还怕没人买吗？~")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {   //战士系列
	if(cm.getNX() >= 300) {
           cm.getChar().gainNX(-300);
	cm.gainItem(2022570,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 1) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022575,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 2) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022580,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 3) { //法师系列
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022571,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 4) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022576,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 5) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022581,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 6) {//海盗
		if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022574,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 7) {
		if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022579,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 8) {
		if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022584,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 9) {//弓箭手
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022572,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022577,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022582,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 12) { //飞侠系列
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022573,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022578,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022583,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 15) {//海盗开始
		if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022574,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 16) {
		if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022579,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
	cm.dispose();}
} else if (selection == 17) {
		if(cm.getNX() >= 300) {
        cm.getChar().gainNX(-300);
	cm.gainItem(2022584,1);//
        }else{
        cm.sendOk("点卷不足哦~枫叶也可以换购点卷哦！"); 
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