/**
 ***@��Ѩ̽���*** 
 *@NPCName:������ ID:2081011
 *@������������������
 *@���ÿ�գ�2��
 **/

function start() {
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("������Ӧ����װ�����ճ�һ��");
        cm.dispose();
    } else {
        cm.sendSimple("#b����~��ϲ�������������ڡ��Ƿ���ȡ��Ӧ�еĽ�����#k\r\n\r\n\r\n#L0##r������ȡ��������#l");
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        if (cm.getChar().getrenwu() == 1) {
            var rand = 1 + Math.floor(Math.random() * 6);
            if (rand == 1) {
                cm.gainItem(4001038, 1); //ľ����Ƥ��
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵�һ�����������Ƥ������", true).getBytes());
            }
            else if (rand == 2) {
                cm.gainItem(4001039, 1); // Ģ������Ƥ��
            }
            else if (rand == 3) {
                cm.gainItem(4001040, 1); // ������Ƥ��
            }
            else if (rand == 4) {
                cm.gainItem(4001041, 1); // ��������Ƥ��
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵�һ��[�������Ƥ��]��", true).getBytes());
                cm.dispose();
            }
            else if (rand == 5) {
                cm.gainItem(4001042, 1); //��ˮ����Ƥ��
            }
            else if (rand == 6) {
                cm.gainItem(4001043, 1); //����������Ƥ�� 
            }
            cm.getChar().gainrenwu(1);//�����1
            cm.getChar().setsgs(0); //����ɱ����
            cm.gainItem(4001136, 20);//����Ƭ
            cm.gainItem(4001129, 30);//ð�յ������
            cm.sendOk("��ϲ��������Ʒ��\r\n#v4001136# x20 \r\n#v4001129# x30\r\n#r(һ����������Ѿ����ŵ���ı������ע�����)#k");
            cm.dispose();
        } else if (cm.getChar().getrenwu() == 3) {  //�ڶ�������
            var rand = 1 + Math.floor(Math.random() * 6);
            if (rand == 1) {
                cm.gainItem(4001038, 1); //ľ����Ƥ��
                cm.gainItem(4021008, 5);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵ڶ������������Ƥ������5����ˮ������", true).getBytes());
            }
            else if (rand == 2) {
                cm.gainItem(4001039, 1); // Ģ������Ƥ��
                cm.gainItem(2049000, 1);
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵ڶ�������", true).getBytes());
            }
            else if (rand == 3) {
                cm.gainItem(4001040, 1); // ������Ƥ��
                cm.gainItem(4021008, 3);
            }
            else if (rand == 4) {
                cm.gainItem(4001041, 1); // ��������Ƥ��
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵ڶ���[�������Ƥ��]��", true).getBytes());
            }
            else if (rand == 5) {
                cm.gainItem(4001042, 1); //��ˮ����Ƥ��
                cm.gainItem(4021008, 1);
            }
            else if (rand == 6) {
                cm.gainItem(4001043, 1); //����������Ƥ�� 
            }
            cm.getChar().setsgs(1); //����ɱ����
            cm.getChar().gainrenwu(1);//�����1
            cm.gainItem(4021008, 1);
            cm.gainItem(4001136, 20);//����Ƭ
            cm.gainItem(4001129, 30);//ð�յ������
            cm.sendOk("��ϲ��������Ʒ��\r\n#v4001136# x20 \r\n#v4001129# x30\r\n#r(һ����������Ѿ����ŵ���ı������ע�����)#k");
            cm.dispose();
        }
    else if (cm.getChar().getrenwu() == 5) { 
        var rand = 1 + Math.floor(Math.random() * 6);
        if (rand == 1) {
            cm.gainItem(4001038, 2); //ľ����Ƥ��
            cm.gainItem(4021008, 5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��������������Ƥ������5����ˮ������", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(4001039, 2); // Ģ������Ƥ��
            cm.gainItem(4021008, 1);
        }
        else if (rand == 3) {
            cm.gainItem(4001040, 2); // ������Ƥ��
            cm.gainItem(4021008, 3);
        }
        else if (rand == 4) {
            cm.gainItem(4001041, 1); // ��������Ƥ��
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵�����[�������Ƥ��]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(4001042, 3); //��ˮ����Ƥ��
            cm.gainItem(4021008, 1);
        }
        else if (rand == 6) {
            cm.gainItem(4001043, 4); //����������Ƥ�� 
        }
        cm.getChar().gainrenwu(1);//�����1
        cm.getChar().setsgs(0); //����ɱ����
        cm.gainItem(4021008, 5);
        cm.gainItem(2049000, 1);//���¾���
        cm.gainItem(4001136, 25);//����Ƭ
        cm.gainItem(4001129, 30);//ð�յ������
        cm.sendOk("��ϲ��������Ʒ��\r\n#v4001136# x25 \r\n#v4001129# x30\r\n#r(һ����������Ѿ����ŵ���ı������ע�����)#k");
        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[���¾���]��", true).getBytes());
        cm.dispose();
    } else if (cm.getChar().getrenwu() == 7) { //���Ļ�
        var rand = 1 + Math.floor(Math.random() * 25);
        if (rand == 1) {
            cm.gainItem(3010006, 1); //����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ��������[��ɫʱ��ת��]��", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(3010008, 2); //����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ��������[��ɫ��������]��", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(2044013, 1); // ˫�ֽ������ʾ���:30%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ��������[˫�ֽ������ʾ���:30%]��", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2044012, 1); // ��˫�ֽ�����������.\n�ɹ���:60%, ������+3, ����+2, ��������+1
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵�һ��[˫�ֽ�����60%]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2044006, 1); //˫�ֽ�����
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[˫�ֽ�������60%]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 6) {
            cm.gainItem(2043301, 1); //�̽���������ɹ���60%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[�̽���������ɹ���60%]��", true).getBytes());
            cm.dispose();
        } else if (rand == 7) {
            cm.gainItem(2043212, 1); //���ֶ��������ʾ���
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[���ֶ��������ʾ���%]��", true).getBytes());
            cm.dispose();
        }else if (rand == 8) {
            cm.gainItem(2043208, 1); //���ֶ�����������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[���ֶ�����������%]��", true).getBytes());
            cm.dispose();
        }else if (rand == 9) {
            cm.gainItem(2043112, 1); //���ָ������ʾ���
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[���ָ������ʾ���%]��", true).getBytes());
            cm.dispose();
        }else if (rand == 10) {
            cm.gainItem(2041210, 1); //���������������70%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[���������������70%]��", true).getBytes());
            cm.dispose();
        }else if (rand == 11) {
            cm.gainItem(2043804, 1); //����ħ�������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[����ħ�������%]��", true).getBytes());
            cm.dispose();
        }else if (rand == 12) {
            cm.gainItem(2043805, 1); //����ħ���������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[����ħ���������%]��", true).getBytes());
            cm.dispose();
        }else if (rand == 13) {//���ȳɹ���60%��ħ��������+2������+1
            cm.gainItem(2043805, 1); //���ȳɹ���60%��ħ��������+2������+1
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[���ȳɹ���60%��ħ��������+2������+1]��", true).getBytes());
            cm.dispose();
        }else if (rand == 14) {
            cm.gainItem(2043704, 1); //���ȳɹ���60%��ħ��������+2������+1
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[����ħ���������]��", true).getBytes());
            cm.dispose();
        }else if (rand == 15) {
            cm.gainItem(2044107, 1); //��������˫�ָ��������ԡ�
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[˫�ָ�������]��", true).getBytes());
            cm.dispose();
        }else if (rand == 16) {
            cm.gainItem(2044205, 1); //��˫�ֶ�������������� 
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[˫�ֶ�������������� ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 17) {
            cm.gainItem(2044301, 1); //ǹ��������ɹ���60%
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[ǹ��������ɹ���60% ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 18) {
            cm.gainItem(2044304, 1); //ǹ�����������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[ǹ����������� ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 19) {
            cm.gainItem(2044401, 1); //ǹì��������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[ì�������� ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 20) {
            cm.gainItem(2044404, 1); //ì�����������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[ì����������� ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 21) {
            cm.gainItem(2044504, 1); //�������������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[������������� ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 22) {
            cm.gainItem(2044604, 1); //�󹥻��������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[�󹥻�������� ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 23) {
            cm.gainItem(2044903, 1); //���Ӷ�ǹ��������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[��ǹ�������� ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 24) {
            cm.gainItem(2048004, 1); //������Ծ������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ�[������Ծ������ ]��", true).getBytes());
            cm.dispose();
        }else if (rand == 25) {
            cm.gainItem(2048004, 5); //��Ϣ
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��Ļ���", true).getBytes());
            cm.dispose();
        }
        cm.getChar().gainrenwu(1);//�����1
        cm.getChar().setsgs(0); //����ɱ����
        cm.gainItem(4021008, 5);
        cm.gainItem(2049000, 1);//���¾���
        cm.gainItem(4001136, 25);//����Ƭ
        cm.gainItem(4001129, 30);//ð�յ������
        cm.sendOk("��ϲ��������Ʒ��\r\n#v4001136# x25 \r\n#v4001129# x30\r\n#r(һ����������Ѿ����ŵ���ı������ע�����)#k");
        cm.dispose();
        
    }else if (cm.getChar().getrenwu() == 9) {
        var rand = 1 + Math.floor(Math.random() * 6);
        if (rand == 1) {
            cm.gainItem(2100013, 1); //���³�ķ����ٻ�
            cm.gainItem(4021008, 5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��廷��������һ�����", true).getBytes());
        }
        else if (rand == 2) {
            cm.gainItem(2180000, 3); // ϴ���������
            cm.gainItem(4021008, 5);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��廷�������[ϴ���������]��", true).getBytes());
        }
        else if (rand == 3) {
            cm.gainItem(2290004, 1); // ͻ��
            cm.gainItem(4021008, 3);
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��廷�������[ͻ��70%]���ֲᣡ", true).getBytes());
        }
        else if (rand == 4) {
            cm.gainItem(2290048, 1); // ʥ������
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��廷�������[ʥ������70%]���ܲᣡ", true).getBytes());
            cm.dispose();
        }
        else if (rand == 5) {
            cm.gainItem(2340000, 1); //��ˮ����Ƥ��
            cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��廷�����[ף������]��", true).getBytes());
            cm.dispose();
        }
        else if (rand == 6) {
            cm.gainItem(4001043, 4); //����������Ƥ�� 
        }
        cm.getChar().gainrenwu(1);//�����1
        cm.getChar().setsgs(0); //����ɱ����
        cm.gainItem(2022670, 1);//��������
        cm.gainItem(2049000, 1);//���¾���
        cm.gainItem(2340000, 1);//ף������
        cm.gainItem(2430000, 1);//������Ʒ
        cm.gainItem(4001136, 25);//����Ƭ
        cm.gainItem(4001129, 30);//ð�յ������
        cm.sendOk("��ϲ��������Ʒ��\r\n#v4001136# x25 \r\n#v4001129# x30\r\n#r(һ����������Ѿ����ŵ���ı������ע�����)#k");
        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[�ͽ�����]" + " : " + " [" + cm.getPlayer().getName() + "]����˵��廷���������[ף������]��[��������]��", true).getBytes());
        cm.dispose();
    }
} } 