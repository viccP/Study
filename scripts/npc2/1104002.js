importPackage(java.util);
importPackage(net.sf.cherry.client);
importPackage(net.sf.cherry.server);
var chance = Math.floor(Math.random() * 10 + 1);
var luk = 0;
var status = 0;
var display;
var jilv;
var needap = 0
var beilv = 0.02;   //��װ��������Ӻ���˵ı���

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1) == null) {
        // item1.setUniqueId(1);
        cm.sendOk("������п������Ǽ���װ�������װ������װ������һ��");
        cm.dispose();
    } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId() == 1702118) {
        cm.sendOk("�����޷�ǿ������ʹ��#b�������׹���#k��");
        cm.dispose();
    } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId() == 1702119) {
        cm.sendOk("�����޷�ǿ������ʹ��#b�������׹���#k��");
        cm.dispose();
    } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId() == 1702120) {
        cm.sendOk("�����޷�ǿ������ʹ��#b�������׹���#k��");
        cm.dispose();
    } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getxingji() == 0) {
        cm.sendOk("#r#e\r\n#kװ������������\r\n#bװ���޼�����������\r\n#r��ͨ�Ǽ�����\r\n#dPS��ʹ��#g#e����ӡ֮�� - 30��#n#d���Կ�ͨ�Ǽ����ܡ��̳��޷�����õ��ߣ��õ���Ϊ����;����ã�");
        cm.dispose();
    } else {
        var item1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
        var itemId1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId();
        var �����ȼ�1 = 0;//item1.getLevel() * 2
        var �����ȼ����� = item1.getUpgradeSlots();
        var ð�ձ� = item1.getxingji()*20000;
        var needmon = ð�ձ�;  //����ð�ձ�
        if (mode == -1) {
            cm.dispose();
        } else {
            if (mode == 0) {
                cm.dispose();
                return;
            }
            if (mode == 1)
                status++;
            if (status == 0) {
                cm.sendNext("����������һ���µ�ʱ����װ����ʵӵ���޾������������Ծ��ѳ��Ǽ��ĳ������ԡ�");
            } else if (status == 1) {
                if (cm.getMeso() < needmon) {
                    cm.sendOk("#b����ǿ����Ҫ#r" + needmon + "ð�ձ�#k#b,��û����ô��ð�ձң�#k");
                    cm.dispose();
                } else if (cm.getChar().getLevel() < 12) {
                    cm.sendOk("#b#ʮ�����ſ���ʹ���������!#k");
                    cm.dispose();
                } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getExpiration() != null) {
                    cm.sendOk("����װ�����ܽ���ǿ��.");
                    cm.dispose();
                } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getUniqueId() > 0) {
                    cm.sendOk("�ֽ�װ���޷�ǿ����");
                    cm.dispose();
                    
                //      <--------------�ж������Ƿ�һ��1-3��------------->
                
                } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId() == 
                    cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(2).getItemId() &&
                    cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId() ==
                    cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(3).getItemId()) {
                    
                    //      <-------------�жϱ�����һ��Ϊ��--------------->
                
                    if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1) != null) {
                        var item1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
                        var itemId1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId();
                        var newstr = (item1.getStr()) * beilv;
                        var newdex = Math.floor((item1.getDex()) * beilv);
                        var newint = Math.floor((item1.getInt()) * beilv);
                        var newluk = Math.floor((item1.getLuk()) * beilv);
                        var newspeed = Math.floor((item1.getSpeed()) * beilv);
                        var newwatk = Math.floor((item1.getWatk()) * beilv);
                        var newmatk = Math.floor((item1.getMatk()) * beilv);
                        var newwdef = Math.floor((item1.getWdef()) * beilv);
                        var newmdef = Math.floor((item1.getMdef()) * beilv);
                        var newacc = Math.floor((item1.getAcc()) * beilv);
                        var newavoid = Math.floor((item1.getAvoid()) * beilv);
                        var sumstr = Math.floor(item1.getStr());
                        var sumdex = Math.floor(item1.getDex());
                        var sumint = Math.floor(item1.getInt());
                        var sumluk = Math.floor(item1.getLuk());
                        var sumspeed = Math.floor(item1.getSpeed());
                        var sumwatk = Math.floor(item1.getWatk());
                        var summatk = Math.floor(item1.getMatk());
                        var sumwdef = Math.floor(item1.getWdef());
                        var summdef = Math.floor(item1.getMdef());
                        var sumacc = Math.floor(item1.getAcc());
                        var sumavoid = Math.floor(item1.getAvoid() + newavoid);
                        var mek = "";
                        if (item1.getStr() != 0) {
                            mek += "\r\n     >> ����:" + item1.getStr();
                        }
                        if (item1.getDex() != 0) {
                            mek += "\r\n     >> ����:" + item1.getDex();
                        }
                        if (item1.getInt() != 0) {
                            mek += "\r\n     >> ����:" + item1.getInt();
                        }
                        if (item1.getLuk() != 0) {
                            mek += "\r\n     >> ����:" + item1.getLuk();
                        }
                        if (item1.getSpeed() != 0) {
                            mek += "\r\n     >> �ƶ��ٶ�:+" + item1.getSpeed();
                        }
                        if (item1.getAcc() != 0) {
                            mek += "\r\n     >> ������:" + item1.getAcc();
                        }
                        if (item1.getAvoid() != 0) {
                            mek += "\r\n     >> �ر���:" + item1.getAvoid();
                        }
                        if (item1.getWatk() != 0) {
                            mek += "\r\n     >> ��������:" + item1.getWatk();
                        }
                        if (item1.getMatk() != 0) {
                            mek += "\r\n     >> ħ��������:" + item1.getMatk();
                        }
                        if (item1.getWdef() != 0) {
                            mek += "\r\n     >> ���������:" + item1.getWdef();
                        }
                        if (item1.getStr() != 0) {
                            mek += "\r\nħ��������:" + item1.getMdef();
                        }
                        var pai = "";
                        if (newstr >= 1) {
                            pai += "\r\n     >> ��������:" + newstr;
                        }
                        if (newdex >= 1) {
                            pai += "\r\n     >> ��������:" + newdex;
                        }
                        if (newint >= 1) {
                            pai += "\r\n     >> ��������:" + newint;
                        }
                        if (newluk >= 1) {
                            pai += "\r\n     >> ��������:" + newluk;
                        }
                        if (newspeed >= 1) {
                            pai += "\r\n     >> �ƶ��ٶ�����:" + newspeed;
                        }
                        if (newacc >= 1) {
                            pai += "\r\n     >> ����������:" + newacc;
                        }
                        if (newavoid >= 1) {
                            pai += "\r\n     >> �ر�������:" + newavoid;
                        }
                        if (newwatk >= 1) {
                            pai += "\r\n     >> ������������:" + newwatk;
                        }
                        if (newmatk >= 1) {
                            pai += "\r\n     >> ħ������������:" + newwatk;
                        }
                        if (newwdef >= 1) {
                            pai += "\r\n     >> �������������:" + newwdef;
                        }
                        if (newmdef >= 1) {
                            pai += "\r\n     >> ħ������������:" + newmdef;
                        }
                        var paiid = "";
                        if (sumstr >= 1) {
                            paiid += "\r\n     >> ����:" + sumstr;
                        }
                        if (sumdex >= 1) {
                            paiid += "\r\n     >> ����:" + sumdex;
                        }
                        if (sumint >= 1) {
                            paiid += "\r\n     >> ����:" + sumint;
                        }
                        if (sumluk >= 1) {
                            paiid += "\r\n     >> ����:" + sumluk;
                        }
                        if (sumspeed >= 1) {
                            paiid += "\r\n     >> �ƶ��ٶ�:" + sumspeed;
                        }
                        if (sumacc >= 1) {
                            paiid += "\r\n     >> ������:" + sumacc;
                        }
                        if (sumavoid >= 1) {
                            paiid += "\r\n     >> �ر���:" + sumavoid;
                        }
                        if (sumwatk >= 1) {
                            paiid += "\r\n     >> ��������:" + sumwatk;
                        }
                        if (summatk >= 1) {
                            paiid += "\r\n     >> ħ��������:" + summatk;
                        }
                        if (sumwdef >= 1) {
                            paiid += "\r\n     >> ���������:" + sumwdef;
                        }
                        if (summdef >= 1) {
                            paiid += "\r\n     >> ħ��������:" + summdef;
                        }

                        var add = "#rǿ��ǰ���ԣ�#k" + mek;

                        add += "\r\n#rǿ���������ԣ�������(1~װ��׷�ӵȼ�)#k\r\n#g������Ӷ���׿Խ����ֵ 1-���ֵ";

                        add += "\r\n#rǿ�����ۺ����ԣ�#k" + paiid;
                        cm.sendNext("#b����ǰװ��#v" + itemId1 + "#��׷�Ӵ���Ϊ��#k#r(" + item1.getxingji() + "��)#k\r\n#b�����һ��,��ʼ�������ĵ�׷�����ԣ�#k\r\n\r\n" + add);
                        if (item1.getUniqueId() == 0)
                            item1.setUniqueId(1);

                    } else if (cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1) == null) {

                        if (item1.getUniqueId() == 0)
                            item1.setUniqueId(1);
                        cm.sendOk("�뽫Ҫǿ�����������ڵ�һ����ܽ���!");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("ǿ����������Ҫ2����ͬװ��ǿ����һ��װ����\r\n#e#rǿ����װ����#v"+cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId()+"#\r\n#d�ڶ���װ����#v"+cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(2).getItemId()+"#\r\n������װ����#v"+cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(3).getItemId()+"#\r\n\r\n#b��ȷ�����װ���Ƿ���ȷ��");
                    cm.dispose();
                }
            } else if (status == 2) {
                var random = (Math.random()*2)+1;//׷����
                var random2 = (Math.random()*10)+1;//׷�Ӷ���������
                var itemId1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId();
                var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
                if (item.getxingji() <= 5) {
                    
                    var itemId1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId();
                    var item1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
                    var itemId1 = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getItemId();
                    var zhuijia = (Math.random()*item1.getxingji())+1;
                    var newstr = (item1.getStr()) * beilv;


                    var newdex = (item1.getDex()) * beilv;
                    var newint = (item1.getInt()) * beilv;
                    var newluk = (item1.getLuk()) * beilv;
                    var newspeed = (item1.getSpeed()) * beilv;
                    var newwatk = (item1.getWatk()) * beilv;
                    var newmatk = (item1.getMatk()) * beilv;
                    var newwdef = (item1.getWdef()) * beilv;
                    var newmdef = (item1.getMdef()) * beilv;
                    var newacc = (item1.getAcc()) * beilv;
                    var newavoid = (item1.getAvoid()) * beilv;
                    var sumstr = item1.getStr() + newstr;
                    var sumdex = item1.getDex() + newdex;
                    var sumint = item1.getInt() + newint;
                    var sumluk = item1.getLuk() + newluk;
                    var sumspeed = item1.getSpeed() + newspeed;
                    var sumwatk = item1.getWatk() + newwatk;
                    var summatk = item1.getMatk() + newmatk;
                    var sumwdef = item1.getWdef() + newwdef;
                    var summdef = item1.getMdef() + newmdef;
                    var sumacc = item1.getAcc() + newacc;
                    var sumavoid = item1.getAvoid() + newavoid;
                    var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
                    /* item.setStr(sumstr + 0.4); // STR     
                 item.setDex(sumdex + 0.4); // DEX     
                 item.setInt(sumint + 0.4); // INT 
                 item.setLuk(sumluk + 0.4); // INT       
                 item.setWatk(sumwatk); //WATK    
                 item.setMatk(summatk); //MATK    
                 item.setWdef(sumwdef); //WDEF    
                 item.setMdef(summdef); //MDEF    
                 item.setAcc(sumacc); // ACC     
                 item.setAvoid(sumavoid); // AVOID 
                 item.setSpeed(item.getSpeed() + 1); // SPEED 
                 item.setJump(item.getJump() + 1); // Jump
                 item.setLevel((item.getLevel() + 1));*/
                    //<----ɾ������2��װ��---->
                    //                    cm.getChar().getInventory(MapleInventoryType.EQUIP).removeItem(2);
                    //                    cm.getChar().getInventory(MapleInventoryType.EQUIP).removeItem(3);
                    //<----׷��ʧ��������---->
                    if(random >= 1 && random < 2){
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMegas(cm.getC().getChannel(), cm.getPlayer().getName() + " : " + " +" + (item1.getLevel()) + " ׷��ʧ��!", item, true).getBytes());
                        cm.sendOk("#r����#v" + itemId1 + "#׷��ʧ�ܣ�����");
                        cm.ˢ��״̬(); 
                        cm.dispose();
                    //<----׷�ӳɹ�������---->
                    }else if(random >=2){
                        if(item.getxingji() == 1){
                            item.setOwner("������");
                        }else if(item.getxingji() == 2){
                            item.setOwner("������");
                        }else if(item.getxingji() == 3){
                            item.setOwner("������");
                        }else if(item.getxingji() ==4){
                            item.setOwner("������");
                        }else if(item.getxingji() ==5){
                            item.setOwner("������");
                        }
                        if(random2 >= 1 && random2 < 2){
                            item.setStr(item.getStr()+random); // STR    
                        }else if(random2 >= 2 && random2 < 3){
                            item.setDex(item.getDex()+random); // DEX     
                        }else if(random2 >= 3 && random2 < 4){     
                            item.setInt(item.getInt()+random); // INT 
                        }else if(random2 >= 4 && random2 < 5){
                            item.setLuk(item.getLuk()+random); // INT 
                        }else if(random2 >= 6 && random2 < 7){
                            item.setWatk(item.getWatk()+random); //WATK 
                        }else if(random2 >= 7 && random2 < 8){
                            item.setMatk(item.getMatk()+random); //MATK  
                        }else if(random2 >= 8 && random2 < 9){
                            item.setWdef(item.getWdef()+random); //WDEF  
                        }else if(random2 >= 9 && random2 < 10){
                            item.setMdef(item.getMdef()+random); //MDEF    
                        }else if(random2 >= 10 && random2 < 11){
                            item.setAcc(item.getAcc()+random); // ACC     
                        }
                        item.setxingji(item1.getxingji()+1);
                        item.setWatk(item.getWatk()+zhuijia);
                        MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1, 1, true);
                        MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
                        cm.sendOk("#r��ϲ��������#v" + itemId1 + "#�ɹ�\r\n�ɹ�׷���Ǽ�!#k");
                        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMegas(cm.getC().getChannel(), cm.getPlayer().getName() + " : " + " +" + (item1.getLevel() + 1) + " ׷���Ǽ��ɹ�!", item, true).getBytes());
                        var statup = new java.util.ArrayList();
                        cm.gainMeso(-ð�ձ�);
                        cm.gainItem(��ˮ��, -�����ȼ�1);
                        statup.add(new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(cm.getChar().getRemainingAp())));
                        cm.ˢ��״̬();
                        cm.dispose();
                    }
                }else{
                    cm.sendOk("��װ���Ѿ��޷�׷�ӡ�");
                    cm.dispose();
                }
            }
        }
    }
}