importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);

var slot;
var item;
var qty;
var status = 0;
var display;
var needap = 1000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status <= 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("�p���W�S������_���J��?�I");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("�п�J�p�n�I��������. \r\n �һݪ��~��#i2022065#\r\n#r�@���I��10W �Ъ`�N���W����#k",1,1,100);
        } else if (status == 1) {
            slot = selection;
            item = 2022065;
            if (item==0){
                cm.sendOk("�p���W�S���Ӫ��~!")
                cm.dispose();
            }else
                cm.sendYesNo("�A�T�w�n�I����?�A�N��o#r"+100000*slot+"#k��")
        } else if (status == 2) {
            if (cm.getChar().getMeso() >= 2000000000) {
                cm.sendNext("��p,�A���W���W�L20e");
                cm.dispose();
            }else{
                cm.gainItem(2022065, -slot)
                cm.gainMeso(100000*slot) 
                
                    
                    cm.sendOk("#b���ߧA���\��!�֧֬ݧA���]�q�a!#k");
                
                
                cm.dispose();
            }
    }
}
} 