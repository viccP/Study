function enter(pi) {
	var returnMap = pi.getPlayer().getSavedLocation("PVP");
	if (returnMap < 0) {
		returnMap = 102000000;
	}
	var target = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(returnMap);
	var portal = target.getPortal("pvp00");
	if (portal == null) {
		portal = target.getPortal(0);
	}
	pi.getPlayer().clearSavedLocation("PVP");
	pi.getPlayer().changeMap(target, portal);
	return true;
}
