/**
 ***@��Ѩ̽���*** 
 *@NPCName:������ ID:2081011
 *@������������������
 *@���ÿ�գ�2��
 **/

function start() {
    var ����0 = "#i4002000#";
    var ����1 = "#i4002001#";
    var ����2 = "#i4002002#";
    var ����3 = "#i4002003#";
       if(cm.getPlayer().getqiandao2() < 120 || cm.getBossLog('lihe') > 0){
        cm.sendOk("�������ʱ�䲻��2Сʱ���޷���������ӡ��������Ѿ���ȡ�ˣ�\r\n���Ѿ�������"+cm.getPlayer().getqiandao2()+"���ӣ�\r\nÿ�տ��Կ���һ�δ˺��ӡ�������������Ʒ��");
        cm.dispose();
    }else{
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("������Ӧ����װ�����ճ�һ��");
        cm.dispose();
    } else {
         
        cm.setBossLog('lihe');
        cm.sendSimple("#b��ӭ�μ�#e#r�������Ѩ̽�������#n\r\n��ѡ��һ����Ʊ�����ɣ�"+cm.getBossLog('lihe')+"\r\n\r\n#L0#" + ����0 + "#l #L1#" + ����1 + "#l #L2#" + ����2 + "#l #L3#" + ����3 + "#l #L4#" + ����1 + "#l", 2);
    
}}}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        var rand = 1 + Math.floor(Math.random() * 16);
        if (rand == 1) {
            cm.gainItem(3010049, 1); //ѩ����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]���Сɧ�������[ѩ����]��", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(2002017, 8); // ����ҩˮ
        }
        else if (rand == 3) {
            cm.gainItem(2002019, 8); // ħ��������ʿ��ҩˮ
        }
        else if (rand == 4) {
            cm.gainItem(3010047, 1); // ��������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[������]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2022247, 50); //������
        }
        else if (rand == 6) {
            cm.gainItem(2070003, 1); //�շ����ǵ�����
        } else {
            cm.sendOk("�����~���������ɣ����x50");
            cm.gainNX(50);
            cm.dispose();
        }

    } else if (selection == 1) {
        var rand = 1 + Math.floor(Math.random() * 13);
        if (rand == 1) {
            cm.gainItem(3010043, 1); //ħŮɨ�� 
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[ħŮɨ��]��", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(2002017, 8); // ����ҩˮ
        }
        else if (rand == 3) {
            cm.gainItem(3010040, 1); // ħ��������ʿ��ҩˮ
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[������]��", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2332000, 1); // ��������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[������ħ��]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2332000, 1); //������
        }
        else if (rand == 6) {
            cm.gainItem(4032056, 60); //ˮ����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л���˶һ����ްԵ�ˮ���򣡣�", true).getBytes());
        } else {
            cm.sendOk("�����~���������ɣ�ˮ����10��~");
            cm.gainItem(4032056, 10);
            cm.dispose();
        }
    } else if (selection == 2) {
        var rand = 1 + Math.floor(Math.random() * 13);
        if (rand == 1) {
            cm.gainItem(1122001, 1); //��/ȹ�����������
        }
        else if (rand == 2) {
            cm.gainItem(1122001, 1); // ����ҩˮ
        }
        else if (rand == 3) {
            cm.gainItem(1122001, 1); //������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[������]��", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(1002394, 1); // ������ɫ
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[����ͷ�� ��]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(1002395, 1); //������ɫ
        }
        else if (rand == 6) {
            cm.gainItem(4032056, 60); //ˮ����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л���˶һ����ްԵ�ˮ���򣡣�", true).getBytes());
        } else {
            cm.sendOk("�����~���������ɣ�ˮ����8��~");
            cm.gainItem(4032056, 8);
            cm.dispose();
        }
    } else if (selection == 3) {
        var rand = 1 + Math.floor(Math.random() * 20);
        if (rand == 1) {
            cm.gainItem(1002508, 1); //��Ҷͷ��
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[��Ҷͷ��]��", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(1002509, 1); // ����ҩˮ
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[��Ҷͷ��]��", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(1102139, 1); // ħ��������ʿ��ҩˮ
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[��������]��", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2332000, 1); // ��������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[������ħ��]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(1102147, 1); //��߽�������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[��߽�������]��", true).getBytes());
        }
        else if (rand == 6) {
            cm.gainItem(4032056, 40); //ˮ����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л���˶һ����ްԵ�ˮ���򣡣�", true).getBytes());
        } else {
            cm.sendOk("�����~���������ɣ�ˮ����10��~");
            cm.gainItem(4032056, 10);
            cm.dispose();
        }
    } else if (selection == 4) {
        var rand = 1 + Math.floor(Math.random() * 20);
        if (rand == 1) {
            cm.gainItem(1302058, 1); //��Ҷͷ��
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[��Ҷɡ]��", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(1302060, 1); //ս��
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[ս��]��", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(1402014, 1); // �¶ȼ���
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[�¶ȼ�]�������Գ�ݵ�Ŀ�⿴�����ѣ���", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(3010012, 1); //��ʿ����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[��ʿ����]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(3010013, 1); //�Ƴ�����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[�Ƴ�����]��", true).getBytes());
        }
        else if (rand == 6) {
            cm.gainItem(3010034, 1); //�Ƴ����� ��ɫ
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[��Ѩ̽��]" + " : " + " [" + cm.getPlayer().getName() + "]�ڻ�л����[�Ƴ����� ��ɫ]��", true).getBytes());
        } else {
            cm.sendOk("�����~���������ɣ����x50");
            cm.gainNX(50);
            cm.dispose();
        }
    }
}