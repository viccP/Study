importPackage(net.sf.cherry.server.maps);

function start() {
    cm.sendAcceptDecline("����������ʿ�ż����Ѿ�ȫ���޸���ϣ��ֿ���#b��ʿ��#kְҵ���´ˣ������������ְҵ����Ȥ�����⡣��ְҵ�汾����Ҳ�����ʢ��ͬ�����¡������ڴ�������ְҵìսʿ�ǳ���");
}

function action(mode, type, selection) {
    var returnmap = cm.getChar().getSavedLocation(SavedLocationType.CYGNUSINTRO);

    if (returnmap == null) {
        cm.warp(130000000, 0);
    } else {
        if (mode == 1) {
            cm.warp(returnmap != -1 ? returnmap : 130000000, 0);
        } else {
            cm.warp(130000000, 0);
        }
        cm.getChar().clearSavedLocation(SavedLocationType.CYGNUSINTRO);
    }
    dispose();
}
