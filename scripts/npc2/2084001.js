/**
 ***@��Ѩ̽���*** 
 *@NPCName:������ ID:2081011
 *@������������������
 *@���ÿ�գ�2��
 **/

function start() {
    var �Ѿ�������� = cm.getBossLog('lj')
    var �������� = cm.getBossLog('ewlj')
    var ������� = 2 + cm.getChar().getVip();
    var ʣ��������� = ������� - cm.getBossLog('lj');
    var �������� = (�Ѿ�������� + ��������) * 20 - cm.getChar().getVip();
    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()) {
        cm.sendOk("������Ӧ����װ�����ճ�һ��");
        cm.dispose();
    } else {
        cm.sendSimple("#b�������ҿ�����ʯ�����壡�������������ʹ��#d������#b��\r\n����������" + ʣ��������� + "�Ρ��Ѿ�����" + �Ѿ�������� + "�Σ��ܹ���������" + ������� + "�Σ�\r\n#L0#��Ҫ����#v2140002##l   #L1#ʹ�õ������#r����#e" + �������� + "#n���#v2140008#");
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        var �Ѿ�������� = cm.getBossLog('lj')
        var ������� = 2 + cm.getChar().getVip();
        var ʣ��������� = ������� - �Ѿ��������;
        if ("" + ʣ��������� + "" > 0) {
            var rand = 1 + Math.floor(Math.random() * 6);
            cm.setBossLog('lj');
            if (rand == 1) {
                cm.gainMeso(20000 * cm.getChar().getVip()); //ѩ����
                cm.sendOk("�����20000ð�ձ�.", 2);
            }
            else if (rand == 2) {
                cm.gainMeso(21000); //ѩ����
                cm.sendOk("�����21000ð�ձ�.", 2);
            }
            else if (rand == 3) {
                cm.gainMeso(40000); //ѩ����
                cm.sendOk("�����40000ð�ձ�.", 2);
            }
            else if (rand == 4) {
                cm.gainMeso(100000); // ��������
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[����ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�����˱������������10Wð�ձң�", true).getBytes());
                cm.dispose();
            }
            else if (rand == 5) {
                cm.gainMeso(60000);
                cm.sendOk("�����60000ð�ձ�.", 2);
            }
            else if (rand == 6) {
                cm.gainMeso(200005);
                cm.sendOk("�����2000ð�ձ�.", 2);
            } else {
                cm.gainNx(30);
                cm.sendOk("�����ʮ���");
                cm.dispose();
            }

        } else {
            cm.sendOk("���յ���������Ѿ�û����Ŷ��");
            cm.dispose();
        }
    } else if (selection == 1) {
        var �������� = cm.getBossLog('ewlj')
        var �Ѿ�������� = cm.getBossLog('lj');
        var ������� = 2 + cm.getChar().getVip();
        var ʣ��������� = ������� - �Ѿ��������;
        var �������� = (�Ѿ�������� + ��������) * 20;
        if (cm.getChar().getNX() >= "" + �������� + "") {
            cm.gainNX(-��������);
            var rand = 1 + Math.floor(Math.random() * 6);
            cm.setBossLog('lj');
            if (rand == 1) {
                cm.gainMeso(2000 * cm.getChar().getVip()); //ѩ����
                cm.sendOk("�����2000����ð�ձ�.�ӳɺ���" + 2000 * cm.getChar().getVip() + "ð�ձң�", 2);
            }
            else if (rand == 2) {
                cm.gainMeso(2100 * cm.getChar().getVip()); //ѩ����
                cm.sendOk("�����2100ð�ձ�.�ӳɺ���" + 2100 * cm.getChar().getVip() + "ð�ձң�", 2);
            }
            else if (rand == 3) {
                cm.gainMeso(4000 * cm.getChar().getVip()); //ѩ����
                cm.sendOk("�����4000ð�ձ�.�ӳɺ���" + 4000 * cm.getChar().getVip() + "ð�ձң�", 2);
            }
            else if (rand == 4) {
                cm.gainMeso(1000000); // ��������
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[����ϵͳ]" + " : " + " [" + cm.getPlayer().getName() + "]�����˱������������һ����ð�ձң�", true).getBytes());
                cm.dispose();
            }
            else if (rand == 5) {
                cm.gainMeso(60000);
                cm.sendOk("�����60000ð�ձ�.", 2);
            }
            else if (rand == 6) {
                cm.gainMeso(200005);
                cm.sendOk("�����20005ð�ձ�.", 2);
            } else {
                cm.gainNx(30);
                cm.sendOk("�����ʮ���");
                cm.dispose();
            }

        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
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
    } else if (selection == 5) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1372044, 1);//���������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 6) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1382057, 1);//���������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 7) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1402046, 1);//������ڤ��
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 8) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1412033, 1);//����������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 9) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1422037, 1);//����������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 10) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1432047, 1);//������ʥǹ
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 11) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1442063, 1);//��������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 12) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1452057, 1);//���㾪�繭
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 13) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1462050, 1);//����ڤ����
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 14) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1472068, 1);//����󱯸�
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 15) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1482023, 1);//�����ȸ��
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 16) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1492023, 1);//�������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 17) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072355, 1);//������ѥ
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 18) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072356, 1);//�������Ь
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 19) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072357, 1);//����ʺ�Ь
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 20) {
        if (cm.gainNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072358, 1);//�������ѥ
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 21) {
        if (cm.gainNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1072359, 1);//���㶨��ѥ
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 22) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052155, 1);//����������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 23) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052156, 1);//���������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 24) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052157, 1);//����Ѳ����
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 25) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052158, 1);//���㷭�Ʒ�
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 26) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1052159, 1);//������ߺ�
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 27) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082234, 1);//���㶨������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 28) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082235, 1);//������ң����
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 29) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082236, 1);//�����������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 30) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082237, 1);//����̽������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 31) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1082238, 1);//���㸧������
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }

    } else if (selection == 32) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002776, 1);//����ھ���
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 33) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002777, 1);//��������ñ 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 34) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002778, 1);//��������ñ 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 35) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002778, 1);//��������ñ 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 36) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1002780, 1);//���㺣���� 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 37) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1102172, 1);//���㲻������ 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 38) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1092057, 1);//����ħ��� 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 39) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1092058, 1);//���㺮����
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 40) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1092059, 1);//�������ٶ� 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    } else if (selection == 41) {
        if (cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000);
            cm.gainItem(1032031, 1);//������׹ 
        } else {
            cm.sendOk("�Բ�����û���㹻�ĵ㣬���ܸ���һ�����");
            cm.dispose();
        }
    }
}