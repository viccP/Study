var messages = Array("准备好吃一鼻子灰吧！!", "挑战武陵道场，真有勇气！");

function start(ms) {
	if (ms.getPlayer().getMap().getId() == 925020000) {
		ms.getPlayer().startMapEffect(messages[Math.floor(Math.random()*messages.length)], 5120024);
	} else {
		ms.getPlayer().resetEnteredScript();
		ms.getPlayer().startMapEffect("哈！我不会让你离开的，除非你能打败我！", 5120024);
	}
}