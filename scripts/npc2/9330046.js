var status = 0;

function start() {
    cm.sendSimple("���,ֻҪ����#v4001110#,�ҿ��԰����������PKս��Ŷ!\r\n\r\n   #b����ǰ��ɱ�˴���:#k#d "+cm.getChar().getPvpKills()+"#k    #r��ɱ�Ĵ���:#k#d "+cm.getChar().getPvpDeaths()+"#k#b\r\n#r#L1#ʹ��ս������������ս��");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.sendOk("#r�´�����Ҫ��������.");
            cm.dispose();
        } else
            status++;
        if (status == 1)
            if (cm.haveItem(4001110,1)) {
            cm.sendNext("#r��ȷ��Ҫ��ս�������Ƭ�������ս��ô?.");
            }
            else {
            cm.sendOk("#r��û��ս���������#v4001110#,�빺�����������.");
            cm.dispose();
            }
        else if (status == 2) {
            cm.getChar().setPvpDeaths(0);
            cm.getChar().setPvpKills(0);
            cm.gainItem(4001110,-1);
            cm.sendOk("#r��ϲ��,ս������ɹ�.");
            cm.dispose();
        }
    }
}