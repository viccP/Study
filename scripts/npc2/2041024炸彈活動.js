var status = 0;  

function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
    if (mode == -1) {  
        cm.dispose();  
    } else {  
        if (mode == 0 && status == 0) {  
            cm.dispose();  
            return;  
        }  
        if (mode == 1)  
            status++;  
        else  
            status--;  
        if (status == 0) {  
            cm.sendSimple ("�w��Ө�y�y����! �o�O�@�عB��,�������y, �i�O�O��H���y?!!#e#d" +  
                 "#k\r\n#L80##r���u!" +  
                 "#k\r\n#L81##r���?." +  
                 "#k\r\n#L82##r���}.");  

            } else if (selection == 80) {  
            if (cm.haveItem(2100067)) { 
                cm.sendOk("�p�w�g�����u�F. �Υ��L�̩άO�ᱼ."); 
                cm.dispose(); 
            } else { 
                cm.gainItem(2100067, 50); 
                cm.sendOk("�A�w�g����50�����u�F! �A�����Υ��L�̤~��A���t�~50��."); 
                } 
            } else if (selection == 81) {  
                cm.sendOk("�o�O�ӯS�O������. �|���@�ӤH��@�y. �����y�������b�����ӥB�����. ��GM���P��GO�~�i�i��. �o��, 2�W���b�y���䪺�H�i�H�ϥά��u. �Q�� @sb�ө񬵼u. ���u�z��, �|��y���}. ���N�y�����診��N�����. �٬��o��. ��ܦh���a���ɭ�, �C���|�Ĩ����ɪ��覡�i��."); 
                cm.dispose(); 
        } else if (selection == 82) { 
            cm.warp(910000000); 
            cm.sendOk("�T!"); 
            cm.dispose(); 
        } 
    } 
}  