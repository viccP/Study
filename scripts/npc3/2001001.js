importPackage(net.sf.cherry.client);
var status = 0;
var totAp = 0;
var newAp;
var newStr;
var newDex;
var newInt;
var newLuk;
var Strings = Array("","","","","");
var aplist;
var apnamelist = Array(1,2,3,4);//�������������
var statup;
var p;
var kou = 800;   //ת�����Ҫ�۵���������
var needMeso = 200000000;
var needLevel = 180;
var Skills = Array(1111002,11111001,5121003,5111005,15111002);  //��������ת��󲻱����ļ���
function start() {
	statup = new java.util.ArrayList();
	p = cm.c.getPlayer();
  totAp = p.getRemainingAp() + p.getStr() + p.getDex() + p.getInt() + p.getLuk();  //��������	
  newStr =  p.getStr();
	newDex =  p.getDex();	
	newInt =  p.getInt();
	newLuk =  p.getLuk();
	aplist= Array(p.getStr(), p.getDex(), p.getInt(), p.getLuk()); 	
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {//ExitChat
		cm.dispose();
  }else if (mode == 0){//No
		cm.sendOk("�õ�, ���������ȷ����Ҫ #bͶ̥ת��#k.");
		cm.dispose();
	}else{            //Regular Talk
		if (mode == 1)
    status++;
    else
    status--;    
    if (status == 0) {		
			cm.sendYesNo("����... ΰ���#b#h ##k�����Ѿ�ͨ��һ��������������ս�ĵ�·�����ڳ�Ϊ�˷�����ӿ�����������ܸ���5E��Һ�#b1��Ģ��������Ƥ��#k #v4001010#(糺�����õ�)�� �ҿ������ҵ�Ǭ����Ų���ķ�������ת���� �����һ�������װ�����ڰ�����! ������Ϊ1���� #b����#k, ����ͬʱ�������е�#b����#k�۳��������ܴ�����������ܺͿ۳�" + kou + "���ʣ��ĵ��������Ƿ���#rת��#k��?"); 		
		}else if (status == 1) {
			if(cm.getChar().getLevel() < needLevel){
      	cm.sendOk("�ܱ�Ǹ������Ҫ" + needLevel + "�����ſ���Ͷ̥ת��.");
	      cm.dispose();
      }else if (totAp < (kou + 16)){ 
	    	cm.sendOk("��������ֵ�����쳣����!������ת��������!"); 
	      cm.dispose(); 
      }else if (cm.haveItem(4001010) == false){ 
	      cm.sendOk("��û�д���#bĢ��������Ƥ��#k "); 
	      cm.dispose(); 
      }else if (cm.getMeso() < needMeso) {
	    	cm.sendOk("��û��2E���,�Ҳ��ܰ����æŶ."); 
	      cm.dispose();
      }else{	
      	var temp;
				for (var j = 0; j < 3; j++){   //������ð������˳������Ҫ������������apnamelist������ݡ�ʵ�ִӴ�С��������ֵ��
	 				for (var i = 0; i < 3 - j; i++){
						if(aplist[i] < aplist[i+1]){
							temp = aplist[i];
							aplist[i] = aplist[i+1];
							aplist[i+1] = temp;				
							temp = apnamelist[i];
							apnamelist[i] = apnamelist[i+1];
							apnamelist[i+1] = temp;
						}
	  			}
			 	} 
      	if(p.getRemainingAp() >= kou){
			 		newAp = p.getRemainingAp() - kou;
					Strings[0] = " APֵ����ȥ #r" + kou + " #k��";	
					kou = 0;
				}else{
					newAp =0;
					kou = kou - p.getRemainingAp();
					if (p.getRemainingAp() > 0){
					Strings[0] = " APֵ����ȥ #r" + p.getRemainingAp() + " #k��";
					}  
				}
				for(x = 0; x < 4; x++){
					if(kou > 0){
						if(apnamelist[x] == 1){					
							if(p.getStr() - 4 >= kou){
								newStr = p.getStr() - kou;
								Strings[1] = " ��������ȥ #r" + kou + "#k ��";
								kou = 0;			
							}else{
								newStr = 4;
								kou = kou - (p.getStr() - 4);
								Strings[1] = " ��������ȥ #r" + (p.getStr() - 4) + "#k ��";			
							}
						}else if(apnamelist[x] == 2){
							if(p.getDex() - 4 >= kou){
								newDex = p.getDex() - kou;
								Strings[2] = " ���ݽ���ȥ #r" + kou + "#k ��";			
								kou = 0;
							}else{
								newDex = 4;
								kou = kou - (p.getDex() - 4);
								Strings[2] = " ���ݽ���ȥ #r" + (p.getDex() - 4) + "#k ��";			
							}
						}else if(apnamelist[x] == 3){
							if(p.getInt() - 4 >= kou){
								newInt = p.getInt() - kou;
								Strings[3] = " ��������ȥ #r" + kou + "#k ��";
								kou = 0;
							}else{
								newInt = 4;
								kou = kou - (p.getInt() - 4);
								Strings[3] = " ��������ȥ #r" + (p.getInt() - 4) + "#k ��";
							}
						}else if(apnamelist[x] == 4){
							if(p.getLuk() - 4 >= kou){
								newLuk = p.getLuk() - kou;
								Strings[4] = " ��������ȥ #r" + kou + "#k ��";
								kou = 0;
							}else{
								newInt = 4;
								kou = kou - (p.getLuk() - 4);
								Strings[4] = " ��������ȥ #r" + (p.getLuk() - 4) + "#k ��";
							}
						}
						if (kou < 1) break;
					}	
				}
			var St = "";
			for(s = 0; s < 5; s++){
				if(Strings[s] != "") St = St + Strings[s] + "\r\n";
			}
	    cm.sendOk("#e#b�����÷ǳ���, ������ȷ��ҪͶ̥ת������ת�������ֵ��۳�800��!�۳���ϸ�������!#k\r\n" + St + "#n");
	    }
      }else if (status == 2){
					cm.sendSimple("��ϲ�������г�. ����Ͷ̥��Ϊʲôְҵ��?#b\r\n#L0#����#l\r\n#L1#սͯ#l\r\n#L2#������#l#k");
			}else if (status == 3){	      
				if(selection == 0)  {						
		    	cm.changeJob(0);
        }
				if(selection == 1){	
	        cm.changeJob(2000);
        }
				if(selection == 2){			
        	cm.changeJob(1000);        	
	      }
				cm.gainMeso(-needMeso);
	      cm.gainItem(4001010,-1);
	      for(var n = 0; n < Skills.length; n++){
	      	cm.getPlayer().changeSkillLevel(SkillFactory.getSkill(Skills[n]),0,0); //���һЩ�������ļ���
	      } 
	      cm.getChar().doReborns(); //ת�������¼
				//cm.unequipEverything(); //��װ����䣬��Ҫ��ȥ��ǰ��ġ�//��
        cm.sendNext("#e#b�����÷ǳ���#k, ���Ѿ��ɹ�ת����,�����ڵ����Ե�������£�\r\n" + "   ����: #r" + newStr + " #k��" + "\r\n   ����: #r" + newDex + " #k��" + "\r\n   ����: #r" + newInt + " #k��" + "\r\n   ����: #r" + newLuk + " #k��" + "\r\n   δ�����AP: #r" + newAp + " #k��");
        p.setRemainingAp(newAp);
				p.setStr(newStr);
				p.setDex(newDex);
				p.setInt(newInt);
				p.setLuk(newLuk);
				p.setLevel(1);		
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.STR, java.lang.Integer.valueOf(newStr)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.DEX, java.lang.Integer.valueOf(newDex)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.LUK, java.lang.Integer.valueOf(newLuk)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.INT, java.lang.Integer.valueOf(newInt)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.LEVEL, java.lang.Integer.valueOf(1)));
	      statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(1))); 
        statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(newAp)));
				p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
				cm.getPlayer().saveToDB(true,true);  //����
				cm.serverNotice("[ת��ϵͳ]: ��ϲ [" + cm.getPlayer() + "] �� " + cm.getChar().getReborns() + " ��ת���ɹ���"); 
 				cm.dispose();           
		}
  }
}
 
    
