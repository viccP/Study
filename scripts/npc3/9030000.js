importPackage(net.sf.cherry.server);

var status;
var choice;

function start() {
	status = -1;
	action(1, 0, 0);
} 

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	if (status == 0)
		cm.sendNext("��Ҫ�鿴����ûҪ��ȡ�ĵ��߻�����\r\n�����������ȡ��δ�ڹ�Ӷ�����Ǳ���ȡ�ĵ��߻��ң�����������ʱ���ǵ�Ҫ�Կ����̵�Ľ�ɫ������Ŷ��");
	else if (status == 1)
		if (cm.hasTemp()) {
			if (cm.getHiredMerchantItems(true)) {
				cm.sendOk("�����������ȡ�������ر�ǰ������δ�ܼ�ʱ��ȡ����Ʒ��");
				cm.dispose();
			} else {
				cm.sendOk("��ȷ����ı������㹻�Ŀ�λ����ȡ��Ʒ��");
				cm.dispose();
			}
		} else {
			cm.sendSimple("��������ѡ����Ҫ��ѯ����Ŀ\r\n#b#L0#���#l\r\n#L1#��Ʒ#l");
		}
	else if (status == 2) {
		cm.sendNext("���ڲ�ѯ��ǰ��ɫ���ݿ⣬���Ե�...");
		choice = selection;
	} else {
		if (choice == 0) {
			if (status == 3) {
				var mesoEarnt = cm.getHiredMerchantMesos();//�ܹ��е�Ǯ
				var selfmoney = cm.getMeso(); //�������е�Ǯ
				var Nmoney = 2147483647 - selfmoney;  // ����ȡ��Ǯ
				var s = 0;
				if(Nmoney >= mesoEarnt){
					 Nmoney=mesoEarnt;
					 s = 1;
				}
				if (mesoEarnt > 0){
					if(s == 0){
						cm.sendYesNo("����#r "+ mesoEarnt +" #k���δ��ȡ,������������#r " + selfmoney + " #k��ң���ʱֻ����ȡ#r " + Nmoney + " #k���,ʣ�µĿ����´���ȡ���Ƿ�����Ҫ��ȡ��");					
					}else{
						cm.sendYesNo("����#r "+ mesoEarnt +" #k���δ��ȡ,������ȫ�����ꡣ�Ƿ�����Ҫ��ȡ��");					
					}
				}else {
					cm.sendOk("���ݲ�ѯ��ϣ�������û����Ҫ��ȡ�Ľ�ң�");
					cm.dispose();
				}
			} else if (status == 4) {
				var Smoney = cm.getMeso();  //�������е�Ǯ
				var Lmoney = 2147483647 -Smoney;  // ����ȡ��Ǯ
				if(Lmoney >= cm.getHiredMerchantMesos()){
					Lmoney = cm.getHiredMerchantMesos();
				}
				var SYmoney = cm.getHiredMerchantMesos()- Lmoney;  //��ȡ����δ��ȡ��Ǯ
				
				cm.gainMeso(Lmoney);
				cm.setHiredMerchantMesos(SYmoney);
				if(SYmoney <= 0){
					cm.sendNext("�����ɹ���������ȡ#r " + Lmoney + " #k���,Ŀǰ����ȫ����ȡ�꣡!" );
					cm.dispose();
				}else{
				cm.sendNext("�����ɹ���������ȡ#r " + Lmoney + " #k���,������#r " + SYmoney + " #k���δ��ȡ!" );
				cm.dispose();
			}
			}
		} else {
			if (cm.getHiredMerchantItems(false)) {
				cm.sendOk("�����ɹ�����ȡ��ɡ���л��ʹ�ù�Ӷ���ˣ�");
				cm.dispose();
			} else {
				cm.sendOk("��ȷ����ı������㹻�Ŀ�λ����ȡ��Ʒ��");
				cm.dispose();
			}
		}
	}
}
