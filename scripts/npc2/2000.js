/**
 * @���ʲ�ѯϵͳ
 * @�����������������ܴ�
 * @NPC���֣��޽�
 **/

var status = 0; 
var mobIds;
var slc=-1;

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else {         
        if (mode == 1) 
            status++; 
        else {            
            cm.dispose(); 
            return; 
        } 

		if (status == 0) { 
			if (cm.getMapMobsIds().size() <= 0) {
				cm.sendOk("��ǰ��ͼû��ˢ�¹���޷��鿴���ʡ�");
				cm.dispose();
				return;
			}
			mobIds = cm.getMapMobsIds();
			var selStr = "��ѡ����Ҫ�鿴����ı��ʡ�\r\n\r\n#r ��ǰ��ͼ�ܹ�:["+mobIds.size()+"]�ֹ�#k";
			for (var i=0;i<mobIds.size();i++) {
				 selStr +="\r\n#b#L" + i + "##o"+mobIds.get(i)+"##l";				
			}
			cm.sendSimple(selStr);
        } else if (status == 1) {
			slc=selection;
			if(slc<0||slc>=mobIds.size()){
				cm.sendOk("û��ѡ��Ĺ���");
				cm.dispose();
				return;
			}

			var mobId=mobIds.get(slc);
            if (cm.getMapMobDropsIds(mobId).size() <= 0) {
				cm.sendOk("��ǰ��ͼû��ˢ�¹���޷��鿴���ʡ�");
				cm.dispose();
				return;
			}
			var selStr = "#r#o"+mobId+"#���ʡ�\r\n\r\n#k";

			var items = cm.getMapMobDropsIds(mobId);
			for (var i=0;i<items.size();i++) {
				selStr +=" #v"+items.get(i)+"##b  #z"+items.get(i)+"##b "

			}
			cm.sendOk(selStr); 
			cm.dispose();         
        }        
        
    }
}