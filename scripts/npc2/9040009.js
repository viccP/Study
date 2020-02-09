importPackage(net.sf.odinms.server.maps);

var status;
var stage;

function start() {
	status = -1;
        action (1, 0, 0);
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
                var eim = cm.getPlayer().getEventInstance();
                if (eim == null) {
                        cm.warp(990001100);
                } else {
                        if (eim.getProperty("leader").equals(cm.getPlayer().getName())) {
                                if (cm.getPlayer().getMap().getReactorByName("statuegate").getState() > 0){
                                        cm.sendOk("Proceed.");
                                        cm.dispose();
                                } else {
                                        if (status == 0) {
                                                if (eim.getProperty("stage1status") == null || eim.getProperty("stage1status").equals("waiting")) {
                                                        if (eim.getProperty("stage1phase") == null) {
                                                                stage = 1;
                                                                eim.setProperty("stage1phase",stage);
                                                        } else {
                                                                stage = parseInt(eim.getProperty("stage1phase"));
                                                        }
                                                        if (stage == 1) {
                                                                cm.sendOk("�b�o��, �ڷ|��ܫG�I. �����ܧ��F, �ӵ۶��ǧ����L��.");
                                                        }
                                                        else {
                                                                cm.sendOk("�ڱN��ܫG�I���A��. ���A�n�B.")
                                                        }
                                                }
                                                else if (eim.getProperty("stage1status").equals("active")) {
                                                        stage = parseInt(eim.getProperty("stage1phase"));
                                                        if (eim.getProperty("stage1combo").equals(eim.getProperty("stage1guess"))) {
                                                                if (stage == 3) {
                                                                        cm.getPlayer().getMap().getReactorByName("statuegate").hitReactor(cm.getC());
                                                                        cm.sendOk("Excellent work. Please proceed to the next stage.");
                                                                        cm.showEffect("quest/party/clear");
                                                                        cm.playSound("Party1/Clear");
                                                                        var prev = eim.setProperty("stage1clear","true",true);
                                                                        if (prev == null) {
                                                                                cm.getGuild().gainGP(15);
                                                                        }
                                                                } else {
                                                                        
                                                                        cm.sendOk("�D�`�n. �A�٦���h��������, ��A�ǳƦn�A��ڻ��a.");
                                                                        eim.setProperty("stage1phase", stage + 1);
                                                                        cm.mapMessage("�A�w�g���� " + stage + " ���q �b�o��.");
                                                                }
                                                                
                                                        } else {
                                                                cm.sendOk("�A���ѤF.");
                                                                cm.mapMessage("�A�b�o�����ѤF �Э��s�Inpc.");
                                                                eim.setProperty("stage1phase","1")
                                                        }
                                                        eim.setProperty("stage1status", "waiting");
                                                        cm.dispose();
                                                }
                                                else {
                                                        cm.sendOk("Please wait.");
                                                        cm.dispose();
                                                }
                                        }
                                        else if (status == 1) {
                                                //only applicable for "waiting"
                                                var reactors = getReactors();
                                                var combo = makeCombo(reactors);
                                                /*/var reactorString = "Debug: Reactors in map: ";
                                                for (var i = 0; i < reactors.length; i++) {
                                                        reactorString += reactors[i] + " ";
                                                }
                                                cm.playerMessage(reactorString);
                                                reactorString = "Debug: Reactors in combo: ";
                                                for (var i = 0; i < combo.length; i++) {
                                                        reactorString += combo[i] + " ";
                                                }
                                                cm.playerMessage(reactorString);*/
                                                cm.mapMessage("�G�I�X�{�� �е���.");
                                                
                                                var delay = 5000;
                                                for (var i = 0; i < combo.length; i++) {
                                                        cm.getPlayer().getMap().getReactorByOid(combo[i]).delayedHitReactor(cm.getC(), delay + 3500*i);
                                                }
                                                eim.setProperty("stage1status", "display");
                                                eim.setProperty("stage1combo","");       
                                                cm.dispose();
                                        }
                                }

                        } else {
                                cm.sendOk("�s�A�̶����Ӹ�ڻ���!.");
                                cm.dispose();
                        }
                }
        }
}

//method for getting the statue reactors on the map by oid
function getReactors() {
        var reactors = new Array();
        
        var iter = cm.getPlayer().getMap().getMapObjects().iterator();
        while (iter.hasNext()) {
                var mo = iter.next();
                if (mo.getType() == MapleMapObjectType.REACTOR && !mo.getName().equals("statuegate")) {
                        reactors.push(mo.getObjectId());
                }
        }
        
        return reactors;
}

function makeCombo(reactors) {
        var combo = new Array();
        
        while (combo.length < (stage + 3)) {
                var chosenReactor = reactors[Math.floor(Math.random() * reactors.length)];
                //cm.log("Debug: Chosen Reactor " + chosenReactor)
                var repeat = false;
                
                if (combo.length > 0) {
                        for (var i = 0; i < combo.length; i++) {
                                if (combo[i] == chosenReactor) {
                                        repeat = true;
                                        //cm.log("Debug: repeat reactor: " + chosenReactor);
                                        break;
                                }
                        }
                }
                
                if (!repeat) {
                        //cm.log("Debug: unique reactor: " + chosenReactor);
                        combo.push(chosenReactor);
                }
        }
        
        return combo;
}