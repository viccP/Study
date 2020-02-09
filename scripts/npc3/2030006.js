/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var status = 0;
var qChars = new Array ("Q1: ����ȼ�1����2����Ҫ���پ���ֵ?#10#12#15#20#3",
    "Q1:��һ��תְ��Щ���ݲ���ȷ?#սʿ 35 STR#���� 20 LUK#ħ��ʦ 20 INT#������ 25 DEX#2",
    "Q1: ���ܵ����﹥�������ǲ���ȷ��?#����������#��ӡ�޷�ʹ�ü���#�����ʽ���#���� - ���پ���#1",
    "Q1: ������һ�������յ��Ĳ���ȷ���ܷ�ӳ��?#�Ի�ϵ�����������˺�#����Ĺ�����ɸ�����˺�#ʥ-�������������˺�#��ҩ-BOSS���������˺�#4",
    "Q1: �ڵ�һ�ݹ����Ľ�������ȫ������Ҫ��?#սʿ#������#ħ��ʦ#����#2");
var qItems = new Array( "Q2: �������ֹ���<����>�����ǲ���ȷ��?#Jr �����ͷ��#����-������#ú��ճ����������#���#2",
    "Q2: ����� --> �����ǲ���ȷ��?#���� - ���˿��#������ĭ#����ţ - ����ţ��#��ľ�� - �������#4",
    "Q2: ��ҩˮ --> Ч������ȷ?#��ɫҩˮ -  250 HP#��ɫҩˮ - ���� 400 MP#��ҩˮ - ���� 100 HP#���� - ���� 400 HP#4",
    "Q2: ��ҩˮ�ָ� 50% Hp & Mp?#����ҩˮ#��ҩ��#��֭ҩˮ#ƻ����#1",
    "Q2: ��ҩˮ --> Ч���ǲ���ȷ��?#��ɫҩˮ- �ָ� 300 HP#����ҩˮ - ���лָ�#ΰ�� - ��ǹ����#�����޵�ҩˮ 50 HP#3");
var qMobs = new Array(  "Q3: ��Щ���������ˮƽ?#��Ģ��#����ţ#����#����#4",
    "Q3: ð�յ�û����Щ����?#�Ծ���#����ţ#����ţ#Ģ����#1",
    "Q3: �������ܳ����ڴ�ħ�����ִ����֮��?#ľ��#����ħ#����#�����#2",
    "Q3: ������ﲻ�ڽ�����?#ɳƤ��#����ţ#����ţ#����ţ#1",
    "Q3: ���ǵ���վ��?#mxd.sdo.com#haoyuji.com#haoyuji.net#haoyuji.cn#4",
    "Q3: ��Щ������Է�?#����#��ţ#����#����#1",
    "Q3: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4",
    "Q3: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4");
var qQuests = new Array("Q4: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4",
    "Q4: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4",
    "Q4: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4",
    "Q4: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4",
    "Q4: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4",
    "Q4: �Ǹ�������ð�յ�û�е�?#����#����#Ģ����#����#4");
var qTowns = new Array( "Q5: �������������Ӷ����˿���?#3#4#2#6#4",
    "Q5: ð�յ���ӪԱ������?#������#ħ������#�������#��������#3",
    "Q5: ��Щ������Է�?#����#��ţ#����#����#1",
    "Q5: ��Щ������Է�?#����#��ţ#����#����#1",
    "Q5: ���������?#@�鿴#@help#@����#@����#4",
    "Q5: Ӣ�������ж��ټ����Կ�R?#6#4#2#5#1");
var correctAnswer = 0;

function start() {
    if (cm.haveItem(4031058)) {
        if (cm.haveItem(4031058)) cm.sendOk("#h #����#t4031058#�Ѿ����벻Ҫ�˷��ҵ�ʱ��.");
        cm.dispose();
    } else {
        cm.sendNext("��ӭ #h #, ���� #p2030006#.\r\n���Ѿ����˺�Զ��������׶Ρ�");
    }
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.sendOk("�´��ټ���");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1)
            cm.sendNextPrev("#h #,��������һ��#b�ڰ�ˮ��#k�һ��������Իش�5�����⣬�����Ƕ���ȷ���㽫���#v4031058# #b�ǻ�����#k.");
        else if (status == 2) {
            if (!cm.haveItem(4005004)) {
                cm.sendOk("#h #, ��û��#b4005004#");
                cm.dispose();
            } else {
                cm.gainItem(4005004, -1);
                cm.sendSimple("�������������֪ʶ #b����#k.\r\n\r\n" + getQuestion(qChars[Math.floor(Math.random() * qChars.length)]));
                status = 2;
            }
        } else if (status == 3) {
            if (selection == correctAnswer)
                cm.sendOk("#h # ������ȷ��.\n׼���ý�����һ���������� ?");
            else {
                cm.sendOk("��õ�һ��������Ǵ����!\r\n�����������Լ���֪ʶ��");
                cm.dispose();
            }
        } else if (status == 4)
            cm.sendSimple("������������������һ������.\r\n\r\n" + getQuestion(qItems[Math.floor(Math.random() * qItems.length)]));
        else if (status == 5) {
            if (selection == correctAnswer)
                cm.sendOk("#h # ������û���ʸ�ǣ�����ǵ�Ů�α���?");
            else {
                cm.sendOk("��һ��������!\r\n(��Щ���Ǻ����׵�)\r\n������˼����");
                cm.dispose();
            }
        } else if (status == 6) {
            cm.sendSimple("����������� #b���ڹ���#k.\r\n\r\n" + getQuestion(qMobs[Math.floor(Math.random() * qMobs.length)]));
            status = 6;
        } else if (status == 7) {
            if (selection == correctAnswer)
                cm.sendOk("#h # �����������ǽ�����һ���ؿ� ?");
            else {
                cm.sendOk("������û�лش���ȷ��");
                cm.dispose();
            }
        } else if (status == 8)
            cm.sendSimple("���������ǽ�����һ��ѡ��.\r\n\r\n" + getQuestion(qQuests[Math.floor(Math.random() * qQuests.length)]));
        else if (status == 9) {
            if (selection == correctAnswer) {
                cm.sendOk("#h # ������һ���ؿ� ?");
                status = 9;
            } else {
                cm.sendOk("ʧ����");
                cm.dispose();
            }
        } else if (status == 10) {
            cm.sendSimple("���һ������.\r\n���ҿ������ǲ�����Ĺǻ�.\r\n\r\n" + getQuestion(qTowns[Math.floor(Math.random() * qTowns.length)]));
            status = 10;
        } else if (status == 11) {
            if (selection == correctAnswer) {
                cm.gainItem(4031058, 1);
                cm.sendOk("ף�� #h #, �������ת�Ĵ������.\r\n����� #v4031058# ������Ҫ�ĳ��ϰ�.");
                cm.dispose();
            } else {
                cm.sendOk("���ź�");
                cm.dispose();
            }
        }
    }
}
function getQuestion(qSet){
    var q = qSet.split("#");
    var qLine = q[0] + "\r\n\r\n#L0#" + q[1] + "#l\r\n#L1#" + q[2] + "#l\r\n#L2#" + q[3] + "#l\r\n#L3#" + q[4] + "#l";
    correctAnswer = parseInt(q[5],10);
    correctAnswer--;
    return qLine;
}