/*
 NPC Name: 		Sgt. Anderson
 Map(s): 		Ludibrium PQ Maps
 Description: 		Warps you out from Ludi PQ
 */
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var 糺���� = cm.getBossLog('feihong');
    if (糺���� < 1) {
        var 糺���� = "#r�������1��#k"
    } else {
        var 糺���� = "ʹ��糺�����Կ�׽��롣";
    }
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.sendOk("����ȥ��������Ҹ��");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMapId() != 91000000) {
                cm.sendYesNo("���Ƿ�Ը��ȥ��ս糺�Ҫ����\r\n��ǰ��Ľ���״̬Ϊ��#r"+糺����+"#k");
            }
        } else if (status == 1) {
            if (糺���� < 1) {
                cm.warp(803001200, 0);
                cm.setBossLog('feihong');
            } else if (cm.haveItem(5252006, 1)) {
                cm.warp(803001200, 0);
                cm.dispose();
            } else {
                cm.sendOk("��û��Կ�ף��޷����룡")
                cm.dispose();
            }
        }
    }
}