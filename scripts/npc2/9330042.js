var status = 0;
var itemList = 
Array(     
			Array(2022216,800,1,1), //ף��
			Array(2022217,800,1,1), //��
			Array(2022218,800,1,1), //����
			Array(2022219,800,1,1), //��
			Array(2022220,800,1,1), //˫��
			Array(2022221,800,1,1), //ǹ
			Array(2022222,800,1,1), //��
			Array(2022223,800,1,1), //ȭ
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("��ӭ��ռ��~��ֻҪ����#5310000#���ҾͿ��԰���Ԥ�Ⲣ�͸���ǳ�������1Сʱ����BUFFŶ~��ô��Ҫ������");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(5310000, 1)) {
            cm.sendYesNo("��ӭ��ռ��~��ֻҪ����#5310000#���ҾͿ��԰���Ԥ�Ⲣ�͸���ǳ�������1Сʱ����BUFFŶ~��ô��Ҫ������");
        } else {
            cm.sendOk("��ӭ��ռ��~��ֻҪ����#5310000#���ҾͿ��԰���Ԥ�Ⲣ�͸���ǳ�������1Сʱ������BUFFŶ~��ô��Ҫ������?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * +900);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "ޱޱ��", notice);
            if (item != -1) {
                cm.gainItem(5310000, -1);
                cm.sendOk("������ #b#t" + item + "##k " + quantity + "����");
            } else {
                cm.sendOk("��ȷʵ��#b#t5310000##k������ǣ�����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("�������������ʲô��û���õ���");
            cm.gainItem(5310000, -1);
            cm.gainItem(4001322, 5);
            cm.safeDispose();
        }
    }
}