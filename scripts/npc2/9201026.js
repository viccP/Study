/**
  Nana(L) - 9201026.js
-- Original Author --------------------------------------------------------------------------------
	Jvlaple
-- Modified by -----------------------------------------------------------------------------------
	XoticMS.
---------------------------------------------------------------------------------------------------
**/
var status;
 
function start() {
   cm.sendOk("以下為 弓箭手技能書 掉落怪物\r\n#b會心之眼20 怪物:尖鼻鯊魚、海怒斯、泰勒熊、娃娃獅王\r\n#r會心之眼30 怪物:化石龍長老、海怒斯\r\n#b龍魂之箭20 怪物:幼年龍、海怒斯、洞穴幼年龍\r\n#r龍魂之箭30 怪物:海怒斯\r\n#b弓術精通20 怪物:回憶守護兵、拉圖斯、雙刀龍戰士\r\n#r弓術精通30 怪物:殘暴炎魔\r\n#b牽制射擊20 怪物:化石龍長老\r\n#r牽制射擊30 怪物:多多、格瑞芬多\r\n#b暴風神射20 怪物:幼龍保護者\r\n#r暴風神射30 怪物:拉圖斯、萊伊卡\r\n#b召喚鳳凰20 怪物:化石龍\r\n#r召喚鳳凰30 怪物:噴火龍\r\n#b念力集中20 怪物:殘暴炎魔\r\n#r念力集中20 怪物:闇黑龍王\r\n#b弩術精通20 怪物:幼年龍、回憶的神官、拉圖斯、洞穴幼年龍\r\n#r弩術精通30 怪物:殘暴炎魔\r\n#b黑暗狙擊20 怪物:化石龍長老\r\n#r黑暗狙擊30 怪物:格瑞芬多\r\n#b光速神弩20 怪物:化石龍\r\n#r光速神弩30 怪物:拉圖斯\r\n#b召喚銀隼20 怪物:格瑞芬多、雙刀龍戰士\r\n#r召喚銀隼30 怪物:回憶守護隊長\r\n#b必殺狙擊20 怪物:殘暴炎魔\r\n#r必殺狙擊30 怪物:闇黑龍王")
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
}
}
