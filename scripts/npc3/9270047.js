
function start() { 
 status = -1; 
 action(1, 0, 0); 
} 
function action(mode, type, selection) { 
 if (mode == -1 || mode == 0) { 
  cm.dispose(); 
  return; 
 } else { 
  if (mode == 1) 
   status++; 
  else 
   status--; 
  if (status == 0) { 
   cm.sendYesNo("确定要离开吗?"); 
  } 
  else if(status == 1) {
if(cm.getPlayer().getMap().mobCount() > 0){
//cm.刷新状态2();
if (cm.getParty() == null) {
if (!cm.isLeader()) {
        cm.sendOk("#e喊队长点我!#k");
		cm.dispose();
}
cm.warpParty(551030100);
cm.dispose();
}else{
cm.warp(551030100);
cm.dispose();
}
}else{
if (cm.getParty() != null) {
if (!cm.isLeader()) {
        cm.sendOk("#e喊队长点我!#k");
		cm.dispose();
   }else{
cm.刷新状态2();
cm.warpParty(551030100);
cm.dispose();
   }
}else{
cm.刷新状态2();
cm.warp(551030100);
cm.dispose();
}
		}   
  } 
 } 
} 
