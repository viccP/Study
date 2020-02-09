/*发布通缉令 WNMS*/

function start() {
    status = -1;
    action(1, 0, 0);
}
var money = 100000000; //发布需要扣除多少冒险币

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("还在犹豫？有没有搞错？");
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
            var a = "\r\n";
            a += cm.查询魔宠();
            cm.sendGetNumber("魔宠提升品质方法：\r\n3个魔宠(相同品质)可以提升一个品质阶段。你的魔宠："+a+"请输入你要提升的魔宠ID 1/3", 0, 0, 100000);
          
        } else if (status == 1) {
            id = selection;
            if (cm.getPlayer().getId() == id) {
                cm.sendOk("写自己上去？大哥你真逗！");
                cm.dispose();
            } else {
                var a = "\r\n";
                a += cm.查询魔宠2(id);
                cm.sendGetNumber("输入的ID：#r" + id + "#k品质："+cm.读取品质2(id)+"\r\n剩下魔宠：#b" + a + "#k\r\n\r\n#b请输入第二个魔宠：\r\n2/3", 0, 0, 2100000000);
            }
        } else if (status == 2) {
            id2 = selection;
            if(id == id2){
                cm.sendOk("真聪明，输入一样的。");
                cm.dispose();
                return;
            }
            var a = "\r\n";
            a += cm.查询魔宠2(id2);
            if (cm.读取类型(id) != cm.读取类型(id2) || cm.读取品质2(id) != cm.读取品质2(id2)) {
                cm.sendOk("输入了2个不同种类的魔宠，或者品质不正确！无法这样做。");
                cm.dispose();
            } else {
                cm.sendGetNumber("输入的ID：#r" + id2 + "#k品质："+cm.读取品质2(id2)+"\r\n剩下魔宠(排除刚输入)：#b" + a + "#k\r\n\r\n#b请输入第三个魔宠：\r\n3/3", 0, 0, 2100000000);
            }
        } else if (status == 3) {
            id3 = selection;
            
            if (cm.读取类型(id) != cm.读取类型(id3) || cm.读取品质2(id) != cm.读取品质2(id3)) {
                cm.sendOk("错误！");
                cm.dispose();
                return;
            }
            if((id == id3) || (id2 == id3)){
                cm.sendOk("NB!");
                cm.dispose();
                return;
            }
            if(cm.读取品质(id3) == 100){
                cm.sendOK("输入了没有的");
                cm.dispose();
                return;
            }
            var mxb = (cm.读取品质2(id)*200000);
            cm.sendYesNo("输入的ID："+id+" and ID2:"+id2+" and ID3:"+id3+"\r\n是否进行提升品质？这需要消耗冒险币"+mxb);
        } else if (status == 4) {
            var  品质 = (cm.读取品质2(id3)+1);
         
            if (品质 == 1) {
                var  pz = "野生";
            } else if (品质 == 2) {
                var  pz = "普通";
            } else if (品质 == 3) {
                var  pz = "优秀";
            } else if (品质 == 4) {
                var pz = "高级";
            } else if (品质 == 5) {
                var  pz = "极品";
            } else if (品质 == 6) {
                var  pz = "卓越";
            } else {
                var  pz = "无品质";
            }
            var mxb = (cm.读取品质2(id)*200000);
            if (cm.getMeso() >= mxb) {
                cm.sendOk("提升品质成功！");
                cm.gainMeso(-mxb);

                //int charid, String name, int lx,int pz,int kg,int jd
                cm.获得魔宠(cm.getPlayer().getId(),cm.魔宠名字(id3),cm.读取类型(id3),品质,0,0);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11, cm.getC().getChannel(), "[恭喜]" + " : " + " "+cm.getPlayer().getName()+"的魔宠["+cm.魔宠名字(id3)+"突破到["+pz+"]！附加属性上升！！]", true).getBytes());
                cm.删除魔宠(id);
                cm.删除魔宠(id2);
                cm.删除魔宠(id3);
                cm.dispose();
            } else {
                cm.sendOk("你没有足够的钱来支付这一笔费用。");
                cm.dispose();
            }
        }
    }
}


