function start() {
    var text = "";
    for (i = 0; i < 10; i++) {
        text += "";
    }
    text += "����������Է���һ��ͨ������߽���һ��ͨ���\r\n#L10#ͨ�������#l            #b#L11#׷�ٹ���#l\r\n\r\n"
    text += "#L0##r����ͨ����#l#k\t\t\t";
    text += "#L1##d����ͨ����#l#k"
    text += "\r\n\r\n#L2##b�鿴ͨ����[�·���]#l    #k"
    text += "#L3##b�鿴ͨ����[������]#k#l\r\n"
    text += "\r\n#L4##b�鿴�ҽ��ܵ�ͨ����#k#l\t"
    text += "#L5##b�鿴�ҷ�����ͨ����#k"
    text += "\r\n\r\n#L6##b�ҽ��ܵ�ͨ����[ɾ��]-����#k\r\n\r\n"
    text += "#L7##b�ҷ�����ͨ����[ɾ��]-����#k"
    cm.sendSimple(text);
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //����ͨ����
        cm.openNpc(1063010, 1);
    } else if (selection == 1) {//����ͨ����
        cm.openNpc(1063010, 2);
    } else if (selection == 2) {//�鿴ͨ����[�·���]
        var a = "#rͨ����#k\r\n";
        a += cm.�鿴ͨ����();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 3) {//�鿴ͨ����[������]
        var a = "#rͨ���񡾽����С�#k\r\n";
        a += cm.�鿴ͨ����2();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 4) {//�鿴�ҽ��ܵ�ͨ��
        var a = "#r�Ѿ����ܵ�ͨ����#k\r\n";
        a += cm.�鿴����();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 5) {//�鿴�ҽ��ܵ�ͨ��
        var a = "#r�Ѿ�������ͨ����#k\r\n";
        a += cm.�鿴����();
        cm.sendOk(a);
        cm.dispose();
    } else if (selection == 6) {//ɾ������
        cm.sendOk("ɾ���ɹ���");
         cm.ɾ������();
        cm.dispose();
    } else if (selection == 7) {//ɾ������
        cm.sendOk("ɾ���ɹ���");
         cm.ɾ������()
        cm.dispose();
    } else if (selection == 10) {
        cm.sendOk("#rͨ������ܣ�#b\r\n�����Ķ�Թ�����������˽᣿ֻ����ͨ����ֻҪ����Ǯ����Ϳ��Խ���ĳһ����ҷ�����ͨ������ܺ��������ĳ��ˣ�����Ի�������ͽ�\r\n����һ��ͨ������Ҫ�����ѡ���ɺ���Ҳ��۳������ѡ�\r\n��ͨ���������ÿ���ص㶼�ᱻ�ܵ�������\r\n�����������һ��ͨ���������Բ鿴���ñ�ͨ������ҵľ�����Ϣ��\r\n\t\t\t\t\t\t\t-------------ף����ˡ�");
        cm.dispose();
    } else if (selection == 11) {//׷�ٹ���
           if (cm.�鿴����() == null) {
             
                cm.sendOk("null");
                cm.dispose();
            }else{
        cm.sendOk("��Ҫ׷�ٵ�������֣�#r"+cm.��ȡ׷ɱ����()+"#k\r\n���ڵ�ͼ��#b#m"+cm.��ȡ��ͼ(cm.��ȡ׷ɱid())+"##k��");
        cm.dispose();
            }
    }
}