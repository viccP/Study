importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);

//||

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
            cm.sendOk("�p���W�S��#t4032733#��?�I");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("�п�J�p�n�I�����i��. \r\n �һݪ��~��#i4032733#\r\n#r�@�ӧI��5W �Ъ`�N���W����#k",1,1,1000);
        } else if (status == 1) {
            slot = selection;
            item = 4032733;
            if (cm.haveItem(4032733)&& cm.getChar().getMeso() <= 2000000000){
                cm.gainItem(4032733, -slot);
                cm.gainMeso(50000*slot);
                cm.sendOk("��o#r"+50000*slot+"#k��");
                cm.dispose();
            }else{
               cm.sendOk("�p���W�S���Ӫ��άO�A���W���W�L20e");
                cm.dispose();
}
        //} else if (status == 2) {
            //if (cm.getChar().getMeso() >= 2000000000) {
                //cm.sendOk("��p,�A���W���W�L20e");
                //cm.dispose();
            //}else{
               // cm.gainItem(4032733, -slot)
               // cm.gainMeso(50000*slot) 
                
                    
                   // cm.sendOk("#b���ߧA���\��!�֧֬ݧA���]�q�a!#k");
                
                
               // cm.dispose();
            //}
    }
}
} 