/* 92MS
by Some
*/
function start() {
status = -1;
action(1, 0, 0);
}
function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
cm.sendOk("�n��,�p�G�A�Q�n�F�n������,�ڷ|�ַܼN�����A�A�Ȫ�..");
cm.dispose();
return;                    
                }
                if (mode == 1) {
status++;
}
else {
status--;
}
        if (status == 0) { 
cm.sendSimple("�z�n�ڬO�����٫���NPC,�аݱz�n�R������٫�����O�]�٫��Ш��U�M�z-��I�]��\r\n #b#L0#�P�P�ͱ��٫�#l \r\n #L1#���B��ͱ��٫�#l \r\n #L2##t1112801##l \r\n #L3##t1112001##l \r\n #L4##t1112003##l\r\n #L5##t1112002##l\r\n #L6##t1112005##l\r\n #L7##t1112006##l");
} else if (status == 1) {
if (selection == 0) {
     if (cm.haveItem(1112802)) {
	      cm.gainItem(1112802,-1);
              cm.sendOk("���ߧA�I��\�R��!"); 
              cm.dispose();
              }else{
              //cm.gainItem(1112802,-1);
              //cm.sendOk("���ߧA�I��\�R��!");
              cm.sendOk("�p�S���P�P�ͱ��٫�,�L�k�R��");
              cm.dispose();
              }
            } else if (selection == 1) {
     if (cm.haveItem(1112800)) {
              cm.gainItem(1112800,-1);
              cm.sendOk("���ߧA�I��\�R��!");
              cm.dispose();
              }else{
              cm.gainItem(1112800,-1);
              cm.sendOk("�p�S��#t1112800#,�L�k�R��");
              cm.dispose();
              }
            } else if (selection == 2) {
  if (cm.haveItem(1112801)) {
              cm.gainItem(1112801,-1);
              cm.sendOk("���ߧA�I��\�R��!")
              cm.dispose();
              }else{
              cm.sendOk("�p�S��#t1112801#,�L�k�R��");
              cm.dispose();
              }
            } else if (selection == 3) {
  if (cm.haveItem(1112001)) {
              cm.gainItem(1112001,-1);
              cm.sendOk("���ߧA�I��\�R��!");
              cm.dispose();
              }else{
              cm.sendOk("�p�S��#t1112001#,�L�k�R��");
              cm.dispose();
              }
            } else if (selection == 4) {
  if (cm.haveItem(1112003)) {
              cm.gainItem(1112003,-1);
              cm.sendOk("���ߧA�I��\�R��!");
              cm.dispose();
              }else{
              cm.sendOk("�p�S��#t1112003#,�L�k�R��");
              cm.dispose();
              }
            } else if (selection == 5) {
  if (cm.haveItem(1112002)) {
              cm.gainItem(1112002,-1);
              cm.sendOk("���ߧA�I��\�R��!");
              cm.dispose();
              }else{
              cm.sendOk("�p�S��#t1112002#,�L�k�R��");
              cm.dispose();
              }
            } else if (selection == 6) {
  if (cm.haveItem(1112005)) {
              cm.gainItem(1112005,-1);
              cm.sendOk("���ߧA�I��\�R��!");
              cm.dispose();
              }else{
              cm.sendOk("�p�S��#t1112005#,�L�k�R��");
              cm.dispose();
}
            } else if (selection == 7) {
  if (cm.haveItem(1112006)) {
              cm.gainItem(1112006,-1);
              cm.sendOk("���ߧA�I��\�R��!");
              cm.dispose();
              }else{
              cm.sendOk("�p�S��#t1112005#,�L�k�R��");
              cm.dispose();
}
            } else if (selection == 11) {
              cm.sendOk("#b�W�[�˳ƤɯŦ����٥��}��");
              cm.dispose();
             
}
}
}
} 
