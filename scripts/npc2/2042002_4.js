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
                var ��������ͼ� = 1 + Math.floor(Math.random() * 9);
                if (��������ͼ� == 1) {
                    var ��Ʒ���� = "100";
                }
                else if (��������ͼ� == 2) {
                    var ��Ʒ���� = "80";
                }
                else if (��������ͼ� == 3) {
                    var ��Ʒ���� = "130";
                }
                else if (��������ͼ� == 4) {
                    var ��Ʒ���� = "166";
                }
                else if (��������ͼ� == 5) {
                    var ��Ʒ���� = "78";
                }
                else if (��������ͼ� == 6) {
                    var ��Ʒ���� = "99";
                }
                else if (��������ͼ� == 7) {
                    var ��Ʒ���� = "25";
                }
                else if (��������ͼ� == 8) {
                    var ��Ʒ���� = "46";
                }
                else if (��������ͼ� == 9) {
                    var ��Ʒ���� = "72";
                } else {
                    var ��Ʒ���� = "25";
                }
                if (��������ͼ� == 1) {
                    var ��Ʒ���� = "200"; //����ţ
                }
                else if (��������ͼ� == 2) {
                    var ��Ʒ���� = "300";//����
                }
                else if (��������ͼ� == 3) {
                    var ��Ʒ���� = "150";//ľ��
                }
                else if (��������ͼ� == 4) {
                    var ��Ʒ���� = "255";//�ڸ�ľ��
                }
                else if (��������ͼ� == 5) {
                    var ��Ʒ���� = "199";//�������
                }
                else if (��������ͼ� == 7) {
                    var ��Ʒ���� = "163";//�����ݷ�����
                }
                else if (��������ͼ� == 8) {
                    var ��Ʒ���� = "123";//�׻ƶ���ʨ
                }
                else if (��������ͼ� == 9) {
                    var ��Ʒ���� = "32";//������
                }
                else if (��������ͼ� == 10) {
                    var ��Ʒ���� = "421";//������
                }
                else if (��������ͼ� == 11) {
                    var ��Ʒ���� = "233";//������
                }
                else if (��������ͼ� == 12) {
                    var ��Ʒ���� = "112";//������
                }
                else if (��������ͼ� == 13) {
                    var ��Ʒ���� = "111";//�����
                }
                else if (��������ͼ� == 14) {
                    var ��Ʒ���� = "222";//������
                     }
                else if (��������ͼ� == 15) {
                    var ��Ʒ���� = "144";//�ڷ���
                     }
                else if (��������ͼ� == 16) {
                    var ��Ʒ���� = "115";//ʱ������
                       }
                else if (��������ͼ� == 17) {
                    var ��Ʒ���� = "147";//����
                       }
                else if (��������ͼ� == 18) {
                    var ��Ʒ���� = "23";//�Ϲ���
                       }
                else if (��������ͼ� == 19) {
                    var ��Ʒ���� = "1";//��ʬ
                       }
                else if (��������ͼ� == 20) {
                    var ��Ʒ���� = "141";//��ɽ��ʬ
                       }
                else if (��������ͼ� == 21) {
                    var ��Ʒ���� = "100";//����
                } else {
                    var ��Ʒ���� = "130";
                }
               cm.sendOk("��ϲ�����ˣ�#v4001129#��������"+��Ʒ����+"");
                 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[" + cm.getPlayer().getName() + "]" + " : " + " ����ˡ�ð�յ�����ҡ�x "+��Ʒ����+" ����",true).getBytes()); 
                cm.gainItem(4001129,""+��Ʒ����+"")
                 cm.getPlayer().setmodid(0);
                cm.getPlayer().setmodsl(0);
                cm.dispose();
            }
        }
}