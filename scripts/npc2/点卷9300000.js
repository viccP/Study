
function start() {
    cm.sendSimple ("��ã����������أ���ͽ�ܰ˽�ȥ��Ե��û���������е���Ұ��֮��Ϊ��ҷ���һ�ᣬ�ҿ��԰���һ������ѡ����Ӧ����Ŀ���жһ���!\r\n#r#L0##e10�ڽ�һ�10000���#n#l\r\n#k#L1##e21�ڽ�һ�25000���#n#l#k\r\n#e#L2#����#v4001126# #b1#k #r100 #k\r\n#e#L3#����#v4001126# #b5#k #r��100 ���s#k\r\n#e#L4#����#v4001126# #b10#k #r��100 ���s#k\r\n#e#L5#����#v4001126# #b25#k #r��100 ���s#k\r\n#e#L6#����#v4001126# #b1#k #g��250 ���#k\r\n#e#L7#����#v4001126# #b5#k #g��250 ���s#k\r\n#e#L8#����#v4001126# #b10#k #g��250 ���s#k\r\n#e#L9#����#v4001126# #b25#k #g��250 ���s#k")
    }

function action(mode, type, selection) {
        cm.dispose();

    switch(selection){
        case 0: 
            if(cm.getMeso() >= 1000000000){
            cm.sendOk("лл! 10,000 ������ӵ������ʻ�! ���ܰ�! #r�Ͽ�ȥ�̳ǹ�����ϲ������Ʒ��!#k");
            cm.gainMeso(-1000000000);
            cm.gainNX(10000);
            cm.modifyNX(10000, 0);//��ʾ�õ�
            cm.dispose();
            }else{
            cm.sendOk("��ȷ������10�ڵ�ʱ�������һ����!");
            cm.dispose();
            }
        break;
        case 1: 
            if(cm.getMeso() >= 2100000000) {
            cm.sendOk("лл! 25,000 ������ӵ������ʻ�! ���ܰ�! #r�Ͽ�ȥ�̳ǹ�����ϲ������Ʒ��!#k");
            cm.gainMeso(-2100000000);
            cm.gainNX(25000);
            cm.modifyNX(25000, 0);//��ʾ�õ�
            cm.dispose();        
            }
            else{    
                cm.sendOk("��ȷ������21�ڵ�ʱ�������һ����!");
                cm.dispose();
            };
        break;
        case 2:
            if(cm.haveItem(4001126, 1)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���100��NX!")
            cm.gainItem(4001126, -1);
            cm.gainNX(100);
			cm.modifyNX(100, 0);
            cm.dispose();
            } else {
                cm.sendOk("#e��û�� #b1#k #v4001126#")
                cm.dispose();    
            };    
        break;
        case 3:
            if(cm.haveItem(4001126, 5)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���500��NX!")
            cm.gainItem(4001126, -5);
            cm.gainNX(500);
			cm.modifyNX(500, 0);
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b5#k �� #v4001126#\r\n�������ı������Ƿ���5��������ȡ��")
                cm.dispose();    
            };    
        break;
        case 4:
            if(cm.haveItem(4001126, 10)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���1000��NX!")
            cm.gainItem(4001126, -10);
            cm.gainNX(1000);
            cm.modifyNX(1000, 0);//��ʾ�õ�
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b10#k �� #v4001126#\r\n�������ı������Ƿ���10��������ȡ��")
                cm.dispose();    
            };    
        break;
        case 5:
            if(cm.haveItem(4001126, 25)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���2500��NX!")
            cm.gainItem(4001126, -25);
            cm.gainNX(2500);
			cm.modifyNX(2500, 0);
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b25#k �� #v4001126#\r\n�������ı������Ƿ���25��������ȡ��")
                cm.dispose();    
            };    
        break;
        case 6:
            if(cm.haveItem(4001126, 1)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���250��NX!")
            cm.gainItem(4001126, -1);
            cm.gainNX(250);
            cm.modifyNX(250, 0);//��ʾ�õ�
            cm.dispose();
            } else {
                cm.sendOk("#e��û�� #b1#k #v4001126#")
                cm.dispose();    
            };
        break;
        case 7:
            if(cm.haveItem(4001126, 5)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���1250��NX!")
            cm.gainItem(4001126, -5);
            cm.gainNX(1250);
            cm.modifyNX(1250, 0);//��ʾ�õ�
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b5#k �� #v4001126#\r\n�������ı������Ƿ���5��������ȡ��")
                cm.dispose();    
            };
        break
        case 8:
            if(cm.haveItem(4001126, 10)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���2500��NX!")
            cm.gainItem(4001126, -10);
            cm.gainNX(2500);
            cm.modifyNX(2500, 0);//��ʾ�õ�
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b10#k �� #v4001126#\r\n�������ı������Ƿ���10��������ȡ��")
                cm.dispose();    
            };
        break
        case 9:
            if(cm.haveItem(4001126, 25)) {
            cm.sendOk("���ĵ㿨�ѱ��ջ�!Ϊ�˻ر��㣬�Ҹ���6250��NX!")
            cm.gainItem(4001126, -25);
            cm.gainNX(6250);
            cm.modifyNX(6250, 0);//��ʾ�õ�
            cm.dispose();
            } else {
                cm.sendOk("#e����Ҫ #b25#k �� #v4001126#\r\n�������ı������Ƿ���25��������ȡ��")
                cm.dispose();    
            };
        }
    }
