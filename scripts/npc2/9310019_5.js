var status = 0;
var selectedType = -1;
var selectedItem = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
    } else {
        status++;
        var map = 541010000;
        if (status == 0) {
            var selStr = "�Ƿ��������ս�ĸ�����?�������,���Ի��#b����ֵ,#r���,#dװ������#kŶ!\r\n\t\t\t\t#b<----������Ϣ----->#k\r\n#r<-�ȼ���"+cm.getLevel()+"->#k\t#r<-���룺"+cm.getBossLog("fb")+"->\t#d<-���֣�"+cm.��ȡ����()+"->#k";
            var pvproom = new Array(
                "\r\n "+
                cm.getPvpRoom("#b���鴬��<�ȼ�:50>#r",map, 0)+"\r\n\r\n",
                cm.getPvpRoom("#b���鴬��<�ȼ�:55>#r",map+10, 1)+"\r\n\r\n",
                cm.getPvpRoom("#b���鴬��<�ȼ�:63>#r",map+20, 2)+"\r\n\r\n",
                cm.getPvpRoom("#b���鴬��<�ȼ�:65>#r",map+30, 3)+"\r\n\r\n",
                cm.getPvpRoom("#b���鴬��<�ȼ�:72>#r",map+40, 4)+"\r\n\r\n",
                cm.getPvpRoom("#b���鴬��<�ȼ�:80>#r",map+50, 5)+"\r\n\r\n",
                cm.getPvpRoom("#b���鴬��<�ȼ�:85>#r",map+60, 6));
            for (var i = 0; i <1; i++) {
                selStr += "" + pvproom + "";
            }
            cm.sendSimple(selStr);
        } else if (status == 1) {
            selectedroom = selection;
            var pvproom2 = new Array(0,10,20,30,40,50,60,7);
            if (cm.getCharQuantity(map+pvproom2[selectedroom]) == 0) {
                
                cm.getMap(map+pvproom2[selectedroom]).addMapTimer(600, 701000210);//ǿ�Ƽ�ʱ��ĵ�ͼID,ʱ��,ʱ�䵽���ͳ�ȥ�ĵ�ͼID
                cm.warp(map+pvproom2[selectedroom]);
                cm.setBossLog("fb");
                cm.Charnotice(1, "�ɹ������������涨ʱ���ڿ��Խ���1����ɫ��");
                cm.dispose();
            } else if (cm.getCharQuantity(map+pvproom2[selectedroom]) == 2) {
                cm.sendOk("�÷�������������");
                cm.dispose();
            } else {
                cm.warp(map+pvproom2[selectedroom]);
                cm.dispose();
            }
        }
    }
} 