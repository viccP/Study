/*    
 תְNPC
 */

importPackage(net.sf.cherry.client);

var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("ף�����!");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("���.����תְNPC.");
        } else if (status == 1) {
            if ((cm.getLevel() < 200 && cm.getJob() == 0)||(cm.getLevel() < 200 && cm.getJob().equals(net.sf.cherry.client.MapleJob.NOBLESSE))) {
                if (cm.getLevel() < 8) {
                    cm.sendNext("�Բ���.������8�����ϲ���תְŶ.");
                    status = 98;
                } else if (cm.getLevel() < 10) {
                    cm.sendYesNo("��ϲ���Ѿ��ﵽ8��.������#rħ��ʦ#kô?");
                    status = 150;
                } else {
                    cm.sendYesNo("��ϲ���Ѿ������һ��תְ�ȼ�.�������һתô?");
                    status = 153;
                }
            } else if (cm.getLevel() < 30) {
                cm.sendNext("�Բ���.������30�����ܽ���#r�ڶ���#kתְ.");
                status = 98;
            } else if (cm.getJob() == 400) {
                cm.sendSimple("��ϲ��ﵽ�ڶ���תְˮƽ. �����Ϊʲôְҵ��?#b\r\n#L0#���#l\r\n#L1#����#l#k");
            } else if (cm.getJob() == 100) {
                cm.sendSimple("��ϲ��ﵽ�ڶ���תְˮƽ. �����Ϊʲôְҵ��?#b\r\n#L2#����#l\r\n#L3#׼��ʿ#l\r\n#L4#ǹսʿ#l#k");
            } else if (cm.getJob() == 200) {
                cm.sendSimple("��ϲ��ﵽ�ڶ���תְˮƽ. �����Ϊʲôְҵ��?#b\r\n#L5#���׷�ʦ#l\r\n#L6#�𶾷�ʦ#l\r\n#L7#��ʦ#l#k");
            } else if (cm.getJob() == 300) {
                cm.sendSimple("��ϲ��ﵽ�ڶ���תְˮƽ. �����Ϊʲôְҵ��?#b\r\n#L8#����#l\r\n#L9#����#l#k");
            } else if (cm.getJob() == 500) {
                cm.sendSimple("��ϲ��ﵽ�ڶ���תְˮƽ. �����Ϊʲôְҵ��?#b\r\n#L10#ȭ����#l\r\n#L11#��ǹ��#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BLAZEWIZARD1)) {
                cm.sendSimple("��ϲ���Ѿ��ﵽ��ʿ�Ŷ�תˮƽ.���ھͽ��ж�תô?#b\r\n#L12#�ǵ�.���Ѿ�����׼����#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DAWNWARRIOR1)) {
                cm.sendSimple("��ϲ���Ѿ��ﵽ��ʿ�Ŷ�תˮƽ.���ھͽ��ж�תô?#b\r\n#L14#�ǵ�.���Ѿ�����׼����#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NIGHTWALKER1)) {
                cm.sendSimple("��ϲ���Ѿ��ﵽ��ʿ�Ŷ�תˮƽ.���ھͽ��ж�תô?#b\r\n#L16#�ǵ�.���Ѿ�����׼����#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WINDARCHER1)) {
                cm.sendSimple("��ϲ���Ѿ��ﵽ��ʿ�Ŷ�תˮƽ.���ھͽ��ж�תô?#b\r\n#L18#�ǵ�.���Ѿ�����׼����#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THUNDERBREAKER1)) {
                cm.sendSimple("��ϲ���Ѿ��ﵽ��ʿ�Ŷ�תˮƽ.���ھͽ��ж�תô?#b\r\n#L20#�ǵ�.���Ѿ�����׼����#l");
            } else if (cm.getLevel() < 70) {
                cm.sendNext("�Բ���.������70�����ϲ��ܽ��е�����תְ.");
                status = 98;
            } else if (cm.getJob() == 410) {
                status = 63;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 420) {
                status = 66;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 310) {
                status = 69;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 320) {
                status = 72;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 210) {
                status = 75;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 220) {
                status = 78;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 230) {
                status = 81;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 110) {
                status = 84;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 120) {
                status = 87;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 130) {
                status = 90;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 520) {
                status = 95;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 510) {
                status = 92;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BLAZEWIZARD2)) {
                status = 169;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DAWNWARRIOR2)) {
                status = 172;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NIGHTWALKER2)) {
                status = 175;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WINDARCHER2)) {
                status = 178;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THUNDERBREAKER2)) {
                status = 181;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getLevel() < 120) {
                cm.sendNext("�Բ���.������120�����ϲ��ܽ���#r���Ĵ�#kתְ.");
                status = 98;
            } else if (cm.getJob() == 411) {
                status = 105;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 421) {
                status = 108;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 311) {
                status = 111;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 321) {
                status = 114;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 211) {
                status = 117;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 221) {
                status = 120;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 231) {
                status = 123;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 111) {
                status = 126;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 121) {
                status = 129;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 131) {
                status = 132;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 511) {
                status = 133;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getJob() == 521) {
                status = 134;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ.���ھͽ���תְô?");
            } else if (cm.getLevel() < 200) {
                cm.sendNext("δ����·���ܳ�.��һ��Ҫ����Ŷ");
                status = 98;
            } else if (cm.getLevel() >= 200) {
                cm.sendYesNo("��ϲ�㵽��200��.�������з��������Ŷ.��Ҫô?");
                status = 160;
            } else {
                cm.dispose();
            }
        } else if (status == 2) {
            if (selection == 0) {
                jobName = "���";
                job = 410;
            }
            if (selection == 1) {
                jobName = "����";
                job = 420;
            }
            if (selection == 2) {
                jobName = "����";
                job = 110;
            }
            if (selection == 3) {
                jobName = "׼��ʿ";
                job = 120;
            }
            if (selection == 4) {
                jobName = "ǹսʿ";
                job = 130;
            }
            if (selection == 5) {
                jobName = "���׷�ʦ";
                job = 220;
            }
            if (selection == 6) {
                jobName = "�𶾷�ʦ";
                job = 210;
            }
            if (selection == 7) {
                jobName = "��ʦ";
                job = 230;
            }
            if (selection == 8) {
                jobName = "����";
                job = 310;
            }
            if (selection == 9) {
                jobName = "����";
                job = 320;
            }
            if (selection == 10) {
                jobName = "ȭ����";
                job = 510;
            }
            if (selection == 11) {
                jobName = "��ǹ��";
                job = 520;
            }
            if (selection == 12) {
                jobName = "��ת����ʿ";
                job = net.sf.cherry.client.MapleJob.BLAZEWIZARD2;
            }
            if (selection == 13) {
                cm.sendOk("������Ѿ�׼����תְ,�Ǿ��������Ұ�.");
                cm.dispose();
            }
            if (selection == 14) {
                jobName = "��ת����ʿ";
                job = net.sf.cherry.client.MapleJob.DAWNWARRIOR2;
            }
            if (selection == 15) {
                cm.sendOk("������Ѿ�׼����תְ,�Ǿ��������Ұ�.");
                cm.dispose();
            }
            if (selection == 16) {
                jobName = "��תҹ����";
                job = net.sf.cherry.client.MapleJob.NIGHTWALKER2;
            }
            if (selection == 17) {
                cm.sendOk("������Ѿ�׼����תְ,�Ǿ��������Ұ�.");
                cm.dispose();
            }
            if (selection == 18) {
                jobName = "��ת��֮����";
                job = net.sf.cherry.client.MapleJob.WINDARCHER2;
            }
            if (selection == 19) {
                cm.sendOk("������Ѿ�׼����תְ,�Ǿ��������Ұ�.");
                cm.dispose();
            }
            if (selection == 20) {
                jobName = "��ת��Ϯ��";
                job = net.sf.cherry.client.MapleJob.THUNDERBREAKER2;
            }
            if (selection == 21) {
                cm.sendOk("������Ѿ�׼����תְ,�Ǿ��������Ұ�.");
                cm.dispose();
            }
            cm.sendYesNo("�����Ϊ #r" + jobName + "#kô?");
        } else if (status == 3) {
            cm.changeJob(job);
            cm.sendOk("��ϲ��תְ�ɹ�.δ����·���ܳ�Ŷ");
            cm.dispose();
        } else if (status == 61) {
            if (cm.getJob() == 410) {
                status = 63;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 420) {
                status = 66;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 310) {
                status = 69;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 320) {
                status = 72;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 210) {
                status = 75;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 220) {
                status = 78;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 230) {
                status = 81;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 110) {
                status = 84;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 120) {
                status = 87;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 130) {
                status = 90;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 520) {
                status = 98;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 510) {
                status = 93;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BLAZEWIZARD2)) {
                status = 170;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DAWNWARRIOR2)) {
                status = 173;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NIGHTWALKER2)) {
                status = 176;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WINDARCHER2)) {
                status = 179;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THUNDERBREAKER2)) {
                status = 182;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else {
                cm.dispose();
            }
        } else if (status == 64) {
            cm.changeJob(411);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 67) {
            cm.changeJob(421);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 70) {
            cm.changeJob(311);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 73) {
            cm.changeJob(321);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 76) {
            cm.changeJob(211);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 79) {
            cm.changeJob(221);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 82) {
            cm.changeJob(231);
            cm.sendOk("T��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 85) {
            cm.changeJob(111);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 88) {
            cm.changeJob(121);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 91) {
            cm.changeJob(131);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 93) {
            cm.changeJob(511);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 96) {
            cm.changeJob(521);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 170) {
            cm.changeJob(MapleJob.BLAZEWIZARD3);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 173) {
            cm.changeJob(MapleJob.DAWNWARRIOR3);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 176) {
            cm.changeJob(MapleJob.NIGHTWALKER3);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 179) {
            cm.changeJob(MapleJob.WINDARCHER3);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 182) {
            cm.changeJob(MapleJob.THUNDERBREAKER3);
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 99) {
            cm.sendOk("ף������!");
            cm.dispose();
        } else if (status == 102) {
            if (cm.getJob() == 411) {
                status = 105;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 421) {
                status = 108;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 311) {
                status = 111;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 321) {
                status = 114;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 211) {
                status = 117;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 221) {
                status = 120;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 231) {
                status = 123;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô?");
            } else if (cm.getJob() == 111) {
                status = 126;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 121) {
                status = 129;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 131) {
                status = 132;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 511) {
                status = 134;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else if (cm.getJob() == 521) {
                status = 136;
                cm.sendYesNo("��ϲ��ﵽ��תˮƽ,���ھ�תְô");
            } else {
                cm.dispose();
            }
        } else if (status == 106) {
            cm.changeJob(412);
	  
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 109) {
            cm.changeJob(422);
	
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 112) {
            cm.changeJob(312);
	   
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 115) {
            cm.changeJob(MapleJob.MARKSMAN);
	    
            cm.sendOk("T��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 118) {
            cm.changeJob(212);
	   
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 121) {
            cm.changeJob(222);
	   
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 124) {
            cm.changeJob(232);
		
            cm.sendOk("Th��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 127) {
            cm.changeJob(112);
	    
            cm.sendOk("T��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 130) {
            cm.changeJob(122);
	   
            cm.sendOk("T��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 133) {
            cm.changeJob(132);
	  
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 134) {
            cm.changeJob(512);
	    
            cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 135) {
            cm.changeJob(522);
	    
            cm.sendOk("T��ϲ��תְ�ɹ�.ϣ���������ټ���");
            cm.dispose();
        } else if (status == 151) {
            if (1) {
                cm.sendSimple("�����Ϊ����ħ��ʦ#b\r\n#L0#ð�ռ�ħ��ʦ#l\r\n#L1#��ʿ������ʿ#l#k");
                status = 200;
            } else {
                cm.sendOk("������Ҫ��#r20������#k.");
            }
        } else if (status == 154) {
            cm.sendSimple("�����Ϊ����ð�ռ�ְҵ��? #b\r\n#L0#սʿ#l\r\n#L1#ħ��ʦ#l\r\n#L2#������#l\r\n#L3#����#l\r\n#L4#����#l\r\n\r\n�����Ϊ������ʿ��ְҵ��?\r\n#L5#����ʿ#l\r\n#L6#ҹ����#l\r\n#L7#����ʿ#l\r\n#L8#��֮����#l\r\n#L9#��Ϯ��#l#k");
        } else if (status == 155) {
            if (selection == 0) {
                jobName = "սʿ";
                job = 100;
            }
            if (selection == 1) {
                jobName = "ħ��ʦ";
                job = 200;
            }
            if (selection == 2) {
                jobName = "������";
                job = 300;
            }
            if (selection == 3) {
                jobName = "����";
                job = 400;
            }
            if (selection == 4) {
                jobName = "����";
                job = 500;
            }
            if (selection == 5) {
                jobName = "����ʿ";
                job = net.sf.cherry.client.MapleJob.DAWNWARRIOR1;
            }
            if (selection == 6) {
                jobName = "ҹ����";
                job = net.sf.cherry.client.MapleJob.NIGHTWALKER1;
            }
            if (selection == 7) {
                jobName = "����ʿ";
                job = net.sf.cherry.client.MapleJob.BLAZEWIZARD1;
            }
            if (selection == 8) {
                jobName = "��֮����";
                job = net.sf.cherry.client.MapleJob.WINDARCHER1;
            }
            if (selection == 9) {
                jobName = "��Ϯ��";
                job = net.sf.cherry.client.MapleJob.THUNDERBREAKER1;
            }
            cm.sendYesNo("�����Ϊ#r" + jobName + "#k?");
        } else if (status == 156) {
            if (0) {
                cm.sendOk("������Ҫ#r35������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r20������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r25������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r25������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r20������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r35������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ #r25������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r20������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r25������#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("������Ҫ#r20������#k.");
                cm.dispose();
            } else {
                cm.changeJob(job);
                cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���.");
                cm.dispose();
            }
        } else if (status == 161) {
            
            cm.sendOk("��ϲ��.��ˣ��!");
            cm.dispose();
        } else if (status == 201) {
            if (selection == 0) {
                cm.changeJob(200);
                cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
                cm.dispose();
            }
            if (selection == 1) {
                cm.changeJob(net.sf.cherry.client.MapleJob.BLAZEWIZARD1);
                cm.sendOk("��ϲ��תְ�ɹ�.ϣ���������ټ���");
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    }
}
