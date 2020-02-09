/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Mr. Wang - Victoria Road : Perion (102000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
		if(cm.getChar().getMapId()!=103000800 && cm.getChar().getMapId()!=103000801 && cm.getChar().getMapId()!=103000802 && cm.getChar().getMapId()!=103000803 && cm.getChar().getMapId()!=103000804){
                             cm.getChar().getStorage().sendStorage(cm.getC(), 1022005);
                }else{
			cm.sendOk("無法使用此功能")
               }
}