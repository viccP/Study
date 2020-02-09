/*
 * 
 * WNMS
 * 推广码填写
 */

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

            cm.sendOk("嘿咻！");
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
            cm.sendGetNumber("玩玩看？5以内的数字，猜中有奖！\r\n#r请下注点卷！\r\n#b下限100，上限1000点！\r\n#r猜中双倍！",0,100,1000);
        }
        else if(status == 1){
            xz = selection;
            cm.sendGetNumber("下注金额：#r"+xz+"#k点卷\r\n\r\n#b请输入你要和我一样的数字<5以内>：",0,1,5);
        }else if(status == 2){
            hm = selection;
            cm.sendYesNo("下注金额：#r"+xz+"#k\r\n投注号码："+hm+",是否开始？");
        }else if(status == 3){
            var random = (Math.random()*5)+1;
            if(random <2){
                var random = 1;
            }else if(random >= 2 && random <3){
                var random = 2;
            }else if(random >= 3 && random <4){
                var random = 3;
            }else if(random >= 4 && random < 5){
                var random = 4;
            }else if(random >= 5 && random <6){
                var random = 5;
            }
            if(random != hm){
                var zt = "你输了！！！";
                cm.gainNX(-xz);
            }else if(hm == random){
                var zt = "猜中了，你赢了！";
                cm.gainNX(+(xz*2));
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"会员[" + cm.getPlayer().getName() + "]" + " : " + " 在[猜猜猜]模式赢走了双倍点卷！！",true).getBytes()); 
            }
            cm.sendOk("庄家点数："+random+"\r\n你的点数:"+hm+"\r\n\r\n结果："+zt+"");
            cm.dispose();
        }    
    }
}


