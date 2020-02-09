var Message = new Array(
"欢迎来到小琦琦冒险岛。请到论坛下载教程进行学习，祝大家游戏愉快。小琦琦冒险岛交流群:305683996", 
"游戏内，所有的东西都是要靠自己的努力得到。GM不会给任何玩家任何东西,带有管理员的装备都是非法装备.", 
"请勿使用任何非法程序：变速齿轮,吸怪,无敌,虚假MISS,飞天,修改WZ,快速过图,修改怪物状态,挂机等外挂,被发现则封号封IP！", 
"小琦琦冒险岛游戏币比例  1RMB=300点卷，有需要的玩家就联系，客服电话:13172819156", 
"使用 @help 命令，可以查看你当前能使用的命令列表。", 
"如果无法和NPC进行对话，请使用 @ea 命令，进行解卡。", 
"在一些常去的城市地图可以点击左边的快捷移动，来快速移动到自由市场，匠人街等等地图。", 
"玩家可以到专业技术地图学习各种生活技能，做武器装备等。",
"如果玩家卡在了地图，可以使用@FM回到市场",
"严禁玩家私下RMB等非游戏数据交易,私下交易不受到保护.");

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    setupTask = em.schedule("start", 900000);
}

function cancelSchedule() {
    setupTask.cancel(false);
}

function start() {
    scheduleNew();
    em.broadcastServerMsg("[公告事项] " + Message[Math.floor(Math.random() * Message.length)]);
}