importPackage(Packages.tools);

var closeTime = 120000; //The time to close the gate
var beginTime = 120000; //The time to begin the ride
var rideTime = 60000; //The time that require move to destination
var KC_Waiting;
var Subway_to_KC;
var KC_docked;
var NLC_Waiting;
var Subway_to_NLC;
var NLC_docked;

function init() {
    KC_Waiting = em.getChannelServer().getMapFactory().getMap(600010004);
    NLC_Waiting = em.getChannelServer().getMapFactory().getMap(600010002);
    Subway_to_KC = em.getChannelServer().getMapFactory().getMap(600010003);
    Subway_to_NLC = em.getChannelServer().getMapFactory().getMap(600010005);
    KC_docked = em.getChannelServer().getMapFactory().getMap(103000100);
    NLC_docked = em.getChannelServer().getMapFactory().getMap(600010001);
    scheduleNew();
}

function scheduleNew() {
    em.setProperty("docked", "true");
    em.setProperty("entry", "true");
    KC_docked.broadcastMessage(MaplePacketCreator.serverNotice(6, "鍦伴惖鍒楄粖鍒扮珯浜嗐€