/*
 * 
 * @WNMS
 * ÿ���������npc
 * �����������
 */
importPackage(net.sf.cherry.client);
var status = 0;
var ��ˮ�� = 4021008;
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ����new = "#fUI/UIWindow/Quest/icon5/1#";
var ��̾�� = "#fUI/UIWindow/Quest/icon0#";
var ��̾��2 = "#fUI/UIWindow/Quest/icon1#";
var ���� = "#fUI/UIWindow/Quest/reward#";
var ������ͷ = "#fUI/Basic/BtHide3/mouseOver/0#";
var �������� = "#fUI/UIWindow/Quest/summary#"
var �Ҹ� = "#k��ܰ��ʾ���κηǷ��������ҷ�Ŵ���.��ɱ��������.";
var ���ʻ�� = "#fUI/UIWindow/Quest/prob#";
var ��������� = "#fUI/UIWindow/Quest/basic#";
var ��һ�ؼ��ʻ�� = "#v4001038# = 1 #v4001039# = 1 #v4001040# = 1 #v4001041# = 1 #v4001042# = 1 #v4001043# = 1 ";
var ��һ����������� = " #v4001129# ";
var ���� = 200;
var ���� = 300;
var ���� = 500;
var ���� = 800;
function start() {
    status = -1;
    action(1, 0, 0);
}
var qd = "#v1142000# #v2001000# #v2022448# #v2022252# #v2022484# #v2040308# #v3012003#";
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getBossLog('mod') >= 2) {
                cm.sendOk("���ÿ����ս�����Ѿ����ˡ�ÿ��ֻ������ս#r2��#k�����Ѿ���ս����~");
                cm.dispose();
            } else {
                var ����������� = 1 + Math.floor(Math.random() * 9);
                var ������� = 1 + Math.floor(Math.random() * 22); //
                //***********************��ʼ�����������*********************//
                if (������� == 1) {
                    var �������� = "100";
                }
                else if (����������� == 2) {
                    var �������� = "1000";
                }
                else if (����������� == 3) {
                    var �������� = "200";
                }
                else if (����������� == 4) {
                    var �������� = "300";
                }
                else if (����������� == 5) {
                    var �������� = "10";
                }
                else if (����������� == 6) {
                    var �������� = "600";
                }
                else if (����������� == 7) {
                    var �������� = "500";
                }
                else if (����������� == 8) {
                    var �������� = "99";
                }
                else if (����������� == 9) {
                    var �������� = "150";
                } else {
                    var �������� = "400";
                }
                //*************���������������***********//
                if (������� == 1) {
                    var ����ID = "130101"; //����ţ
                }
                else if (������� == 2) {
                    var ����ID = "1210100";//����
                }
                else if (������� == 3) {
                    var ����ID = "130100";//ľ��
                }
                else if (������� == 4) {
                    var ����ID = "2130100";//�ڸ�ľ��
                }
                else if (������� == 5) {
                    var ����ID = "2230100";//�������
                }
                else if (������� == 7) {
                    var ����ID = "2230109";//�����ݷ�����
                }
                else if (������� == 8) {
                    var ����ID = "3210201";//�׻ƶ���ʨ
                }
                else if (������� == 9) {
                    var ����ID = "4230102";//������
                }
                else if (������� == 10) {
                    var ����ID = "4230103";//������
                }
                else if (������� == 11) {
                    var ����ID = "7130300";//������
                }
                else if (������� == 12) {
                    var ����ID = "8140000";//������
                }
                else if (������� == 13) {
                    var ����ID = "8150300";//�����
                }
                else if (������� == 14) {
                    var ����ID = "8150301";//������
                     }
                else if (������� == 15) {
                    var ����ID = "8150302";//�ڷ���
                     }
                else if (������� == 16) {
                    var ����ID = "8160000";//ʱ������
                       }
                else if (������� == 17) {
                    var ����ID = "8190003";//����
                       }
                else if (������� == 18) {
                    var ����ID = "8190004";//�Ϲ���
                       }
                else if (������� == 19) {
                    var ����ID = "5130107";//��ʬ
                       }
                else if (������� == 20) {
                    var ����ID = "5130108";//��ɽ��ʬ
                       }
                else if (������� == 21) {
                    var ����ID = "5140000";//����
                } else {
                    var ����ID = "5130108";
                }
                cm.sendOk("" + �������� + "\r\n��Ҫ����Ĺ���Ϊ��#b#o" + ����ID + "##k����������:#r" + �������� + "#k\r\n\r\n" + ��������� + "\r\n" + ��һ����������� + "#fUI/UIWindow.img/QuestIcon/8/0# #fUI/UIWindow.img/QuestIcon/7/0##l");
                cm.setBossLog('mod');//����+1
               cm.getPlayer().setmodid(""+����ID+"");
                cm.getPlayer().setmodsl(""+��������+"");
                cm.dispose();
            }
        }
    }
}