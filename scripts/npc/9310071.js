//load("nashorn:mozilla_compat.js");

importPackage(Packages.java.util);
importPackage(Packages.client);
importPackage(Packages.server);


var aaa = "#fUI/UIWindow.img/Quest/icon9/0#";
var zzz = "#fUI/UIWindow.img/Quest/icon8/0#";
var sss = "#fUI/UIWindow.img/QuestIcon/3/0#";
var item;


var jmsz = Array(
    Array(1002232, 0, "未定义", "永久"), //红星绒线 
    Array(1052047, 0, "未定义", "永久"), //红色雪板
    Array(1072334, 0, "未定义", "永久"), //红色帆布鞋
    Array(5150001, 100, "未定义", "永久"), //美发卡 
    Array(1112724, 100, "未定义", "永久"), //我是新人戒指
    Array(1702223, 100, "未定义", "永久")//烟火棒
    );


var jmwq = Array(
    Array(1702105, 3000, "未定义", "永久"), //通心钥匙
    Array(1702051, 3000, "未定义", "永久"), //灯笼
    Array(1702104, 3000, "未定义", "永久"), //巨无霸冰淇淋
    Array(1702374, 3000, "未定义", "永久"), //剑豪之刃
    Array(1702212, 3000, "未定义", "永久"), //异界之器
    Array(1702091, 3000, "未定义", "永久"), //网球拍
    Array(1702115, 3000, "未定义", "永久"), //玫瑰花
    Array(1702217, 3000, "未定义", "永久"), //黄鸭子游泳圈
    Array(1702228, 3000, "未定义", "永久"), //可可香蕉
    Array(1702230, 3000, "未定义", "永久"), //冰蓝雪糕
    Array(1702237, 3000, "未定义", "永久"), //千年白狐
    Array(1702256, 3000, "未定义", "永久"), //风灵使者娃娃
    Array(1702257, 3000, "未定义", "永久"), //魂骑士娃娃
    Array(1702258, 3000, "未定义", "永久"), //炎术士娃娃
    Array(1702259, 3000, "未定义", "永久"), //奇袭者娃娃
    Array(1702260, 3000, "未定义", "永久"), //夜行者娃娃
    Array(1702261, 3000, "未定义", "永久"), //樱花棒
    Array(1702194, 3000, "未定义", "永久"), //圣火火炬
    Array(1702288, 3000, "未定义", "永久"), //豹弩游侠弩
    Array(1702318, 3000, "未定义", "永久"), //暮光雷光剑
    Array(1702319, 3000, "未定义", "永久"), //苹果绿雷光剑
    Array(1702317, 3000, "未定义", "永久"), //血红宝石雷光剑
    Array(1702320, 3000, "未定义", "永久"), //蓝灰闪电雷光剑
    Array(1702321, 3000, "未定义", "永久"), //黑暗中子星雷光剑
    Array(1702322, 3000, "未定义", "永久"), //固态黑色雷光剑
    Array(1702323, 3000, "未定义", "永久"), //翁布拉&鲁切雷光剑
    Array(1702186, 3000, "未定义", "永久"), //迪波
    Array(1702209, 3000, "未定义", "永久"), //驯鹿拐杖
    Array(1702204, 3000, "未定义", "永久"), //日本铁扇
    Array(1702203, 3000, "未定义", "永久"), //万圣节泰迪熊
    Array(1702150, 3000, "未定义", "永久"), //冰凌刀
    Array(1702149, 3000, "未定义", "永久"), //熔岩刀
    Array(1702157, 3000, "未定义", "永久"), //火烤棉花糖
    Array(1702161, 3000, "未定义", "永久"), //凶恶的狗狗
    Array(1702136, 3000, "未定义", "永久"), //雪之花
    Array(1702120, 3000, "未定义", "永久"), //比耶莫特的剑
    Array(1702118, 3000, "未定义", "永久"), //亚努斯的剑
    Array(1702119, 3000, "未定义", "永久"), //夏奇尔的剑
    Array(1702296, 3000, "未定义", "永久"), //溜溜球
    Array(1702285, 3000, "未定义", "永久"), //蓝色蝴蝶结手提包
    Array(1702302, 3000, "未定义", "永久"), //杯具
    Array(1702208, 3000, "未定义", "永久"), //搞怪鳄鱼
    Array(1702305, 3000, "未定义", "永久"), //胡萝卜武器
    Array(1702310, 3000, "未定义", "永久"), //星光魔法棒
    Array(1702374, 3000, "未定义", "永久"), //剑豪之刃
    Array(1702306, 3000, "未定义", "永久"), //花风芭蕉扇
    Array(1702379, 3000, "未定义", "永久"), //阿拉伯魔术洋灯
    Array(1702378, 3000, "未定义", "永久"), //国庆闪亮之光
    Array(1702263, 3000, "未定义", "永久"), //小灰灰猫
    Array(1702308, 3000, "未定义", "永久"), //魔术师帽子
    Array(1702298, 3000, "未定义", "永久"), //暗影刀子
    Array(1702291, 3000, "未定义", "永久"), //玲珑扇
    Array(1702293, 3000, "未定义", "永久"), //秋天旅行者背包
    Array(1702299, 3000, "未定义", "永久"), //可爱巧克力棒
    Array(1702300, 3000, "未定义", "永久"), //电蚊拍
    Array(1702328, 3000, "未定义", "永久"), //粉红天使注射器
    Array(1702329, 3000, "未定义", "永久"), //喜欢草莓
    Array(1702233, 3000, "未定义", "永久"), //彩虹毛笔
    Array(1702187, 3000, "未定义", "永久"), //蓝色极光
    Array(1702188, 3000, "未定义", "永久"), //粉色极光
    Array(1702193, 3000, "未定义", "永久"), //湿抹布
    Array(1702248, 3000, "未定义", "永久"), //圣诞武器
    Array(1702252, 3000, "未定义", "永久"), //鹰的飞舞
    Array(1702276, 3000, "未定义", "永久"), //天际之弓
    Array(1702283, 3000, "未定义", "永久"), //天界圣战手镯
    Array(1702279, 3000, "未定义", "永久"), //天界圣战之剑
    Array(1702280, 3000, "未定义", "永久"), //天界圣战巨剑
    Array(1702281, 3000, "未定义", "永久"), //天界圣战法杖
    Array(1702282, 3000, "未定义", "永久"), //天界圣战藏弓
    Array(1702362, 3000, "未定义", "永久"), //我的好友品克缤
    Array(1702324, 3000, "未定义", "永久"), //冲击波
    Array(1702323, 3000, "未定义", "永久"), //鲁切雷光剑
    Array(1702313, 3000, "未定义", "永久"), //橙色极光
    Array(1702314, 3000, "未定义", "永久"), //天堂极光
    Array(1702315, 3000, "未定义", "永久"), //斯泰拉极光
    Array(1702316, 3000, "未定义", "永久"), //动态极光
    Array(1702295, 3000, "未定义", "永久"), //扑克牌
    Array(1702348, 3000, "未定义", "永久"), //雪片
    Array(1702274, 3000, "未定义", "永久"), //神龙手套
    Array(1702301, 3000, "未定义", "永久")//兔兔魔力棒
    );


var jzmp = Array(
    Array(1112197, 3000, "未定义", "永久"), //钻石聊天戒指
    Array(1115010, 3000, "未定义", "永久"), //钻石聊天戒指
    Array(1112198, 3000, "未定义", "永久"), //黄金聊天戒指
    Array(1115011, 3000, "未定义", "永久"), //小熊猫聊天戒指
    Array(1112199, 3000, "未定义", "永久"), //蝙蝠聊天戒指
    Array(1115015, 3000, "未定义", "永久"), //蝙蝠聊天戒指
    Array(1112144, 3000, "未定义", "永久"), //虎喵名片戒指
    Array(1112256, 3000, "未定义", "永久"), //虎喵聊天戒指
    Array(1112261, 3000, "未定义", "永久"), //Naver对话框戒指
    Array(1112149, 3000, "未定义", "永久"), //Naver名片戒指
    Array(1112120, 3000, "未定义", "永久"), //可乐(White) 名片戒指
    Array(1112230, 3000, "未定义", "永久"), //可乐(White)聊天戒
    Array(1112272, 3000, "未定义", "永久"), //西瓜物语聊天戒指
    Array(1112160, 3000, "未定义", "永久"), //西瓜物语名片戒指
    Array(1112268, 3000, "未定义", "永久"), //猪猪聊天戒指
    Array(1112156, 3000, "未定义", "永久"), //猪猪名片戒指
    Array(1112267, 3000, "未定义", "永久"), //青蛙聊天戒指
    Array(1112155, 3000, "未定义", "永久"), //青蛙名片戒指
    Array(1112277, 3000, "未定义", "永久"), //绿光森林聊天戒指
    Array(1112165, 3000, "未定义", "永久"), //绿光森林名片戒指
    Array(1112270, 3000, "未定义", "永久"), //我爱胡子聊天戒指(红色)
    Array(1112158, 3000, "未定义", "永久"), //我爱胡子名片戒指(红色)
    Array(1112269, 3000, "未定义", "永久"), //我爱胡子聊天戒指(蓝色)
    Array(1112157, 3000, "未定义", "永久"), //我爱胡子名片戒指(蓝色)
    Array(1112278, 3000, "未定义", "永久"), //乖宝贝聊天戒指
    Array(1112166, 3000, "未定义", "永久"), //乖宝贝名片戒指
    Array(1112253, 3000, "未定义", "永久"), //木乃伊聊天戒指
    Array(1112142, 3000, "未定义", "永久"), //木乃伊名片戒指
    Array(1112257, 3000, "未定义", "永久"), //浪漫花边聊天戒指
    Array(1112145, 3000, "未定义", "永久"), //浪漫花边名片戒指
    Array(1112258, 3000, "未定义", "永久"), //青苹果之恋聊天戒指
    Array(1112146, 3000, "未定义", "永久"), //青苹果之恋名片戒指
    Array(1112263, 3000, "未定义", "永久"), //美味蛋糕聊天戒指
    Array(1112151, 3000, "未定义", "永久"), //美味蛋糕名片戒指
    Array(1112171, 3000, "未定义", "永久"), //狗狗名片戒指
    Array(1112172, 3000, "未定义", "永久"), // 狗狗名片戒指
    Array(1112173, 3000, "未定义", "永久"), //奶白兔名片戒指
    Array(1112285, 3000, "未定义", "永久"), //奶白兔LT戒指
    Array(1112174, 3000, "未定义", "永久"), //足球聊天戒指
    Array(1112175, 3000, "未定义", "永久"), //足球MP戒指
    Array(1112176, 3000, "未定义", "永久"), //旋律戒指
    Array(1112288, 3000, "未定义", "永久"), //旋律戒指
    Array(1112177, 3000, "未定义", "永久"), //进击聊天戒指
    Array(1112289, 3000, "未定义", "永久"), //进击聊天戒指
    Array(1112283, 3000, "未定义", "永久"), //GG聊天戒指
    Array(1112171, 3000, "未定义", "永久"), //GG聊天戒指
    Array(1112284, 3000, "未定义", "永久"), //GG聊天戒指
    Array(1112172, 3000, "未定义", "永久"), //GG聊天戒指
    Array(1112276, 3000, "未定义", "永久"), //XR聊天戒指
    Array(1112164, 3000, "未定义", "永久"), //XR聊天戒指
    Array(1112290, 3000, "未定义", "永久"), //MH聊天戒指
    Array(1112178, 3000, "未定义", "永久"), //MH聊天戒指
    Array(1112291, 3000, "未定义", "永久"), //XH聊天戒指
    Array(1112179, 3000, "未定义", "永久"), //XH聊天戒指
    Array(1112190, 3000, "未定义", "永久"), //AC聊天戒指
    Array(1115003, 3000, "未定义", "永久"), //AC聊天戒指
    Array(1112191, 3000, "未定义", "永久"), //MF聊天戒指
    Array(1115004, 3000, "未定义", "永久"), //MF聊天戒指
    Array(1112192, 3000, "未定义", "永久"), //BL聊天戒指
    Array(1115005, 3000, "未定义", "永久"), //BL聊天戒指
    Array(1112193, 3000, "未定义", "永久"), //gz聊天戒指
    Array(1115006, 3000, "未定义", "永久"), //gz聊天戒指
    Array(1112194, 3000, "未定义", "永久"), //GL聊天戒指
    Array(1115007, 3000, "未定义", "永久"), //GL聊天戒指
    Array(1112195, 3000, "未定义", "永久"), //KL聊天戒指
    Array(1115008, 3000, "未定义", "永久"), //KL聊天戒指
    Array(1112196, 3000, "未定义", "永久"), //CT聊天戒指
    Array(1115009, 3000, "未定义", "永久"), //CT聊天戒指
    Array(1112237, 3000, "未定义", "永久"), //小竹林聊天戒指
    Array(1112134, 3000, "未定义", "永久")//小竹林名片戒指
    );

var tjId = Array(
    Array(1702301, 3000, "未定义", "永久"),//兔兔魔力棒
    Array(1102665, 3000, "未定义", "永久"), //狐狸围脖
    Array(1002960, 3000, "未定义", "永久"), //暗夜娃娃皇冠
    Array(1051295, 5000, "未定义", "永久"), //魔法裙装
    Array(3010163, 2000, "未定义", "10天", 60000 * 60 * 24 * 10, 1)//满月椅子
    );

var syxh = Array(
    Array(2340000, 2000, "未定义", 1), //祝福卷轴
    Array(2049100, 1000, "未定义", 1), //混沌卷轴60%
    Array(2340000, 20000, "未定义", 10), //祝福卷轴
    Array(2049100, 10000, "未定义", 10)//混沌卷轴60%
    );

var tscl = Array(
    Array(4000151, 1000, 100), //时间门神的轴标
    Array(4001109, 1000, 5)//强化玻璃瓶
    );

var xswp = Array(
    Array(5000191, 10000, "神马", 60000 * 60 * 90 * 1, 1),
    Array(5000212, 10000, "火红小恶魔", 60000 * 60 * 90 * 1, 1),
    Array(5000213, 10000, "幽青小恶魔", 60000 * 60 * 90 * 1, 1),
    Array(5000214, 10000, "雷黄小恶魔", 60000 * 60 * 90 * 1, 1),
    Array(5000244, 10000, "冰龙", 60000 * 60 * 90 * 1, 1),
    Array(5000013, 10000, "大象", 60000 * 60 * 90 * 1, 1),
    Array(5000014, 10000, "圣诞鹿", 60000 * 60 * 90 * 1, 1),
    Array(5000055, 10000, "水晶银圣诞鹿", 60000 * 60 * 90 * 1, 1),
    Array(5000053, 10000, "大猩猩机器人", 60000 * 60 * 90 * 1, 1),
    Array(5000038, 10000, "萌太郎", 60000 * 60 * 90 * 1, 1),
    Array(5000072, 10000, "臭鼬", 60000 * 60 * 90 * 1, 1),
    Array(5000075, 10000, "小象宠物", 60000 * 60 * 90 * 1, 1),
    Array(5000076, 10000, "威尔士柯基狗", 60000 * 60 * 90 * 1, 1),
    Array(5000077, 10000, "波斯猫", 60000 * 60 * 90 * 1, 1),
    Array(5000081, 10000, "飞行小鲸鱼", 60000 * 60 * 90 * 1, 1),
    Array(5000084, 10000, "独角兽安塞尔", 60000 * 60 * 90 * 1, 1),
    Array(5000085, 10000, "蛋糕宝宝", 60000 * 60 * 90 * 1, 1),
    Array(5000086, 10000, "馅饼宝宝", 60000 * 60 * 90 * 1, 1),
    Array(5000089, 10000, "独角兽迪埃尔", 60000 * 60 * 90 * 1, 1),
    Array(5000090, 10000, "独角兽吉尼", 60000 * 60 * 90 * 1, 1),
    Array(5000091, 10000, "独角兽埃塞尔", 60000 * 60 * 90 * 1, 1),
    Array(5000096, 10000, "稀有白色小象", 60000 * 60 * 90 * 1, 1),
    Array(5000250, 10000, "粉小熊", 60000 * 60 * 90 * 1, 1),
    Array(5000251, 10000, "蓝小熊", 60000 * 60 * 90 * 1, 1),
    Array(5000252, 10000, "艾克索", 60000 * 60 * 90 * 1, 1),
    Array(5000253, 10000, "阿黛尔", 60000 * 60 * 90 * 1, 1),
    Array(5000264, 10000, "跳跳袋鼠", 60000 * 60 * 90 * 1, 1),
    Array(5000271, 10000, "绿色考拉", 60000 * 60 * 90 * 1, 1),
    Array(5000272, 10000, "黄色考拉", 60000 * 60 * 90 * 1, 1),
    Array(5000273, 10000, "粉色考拉", 60000 * 60 * 90 * 1, 1),
    Array(5000274, 10000, "豆豆蛇", 60000 * 60 * 90 * 1, 1),
    Array(5000284, 10000, "冰骑士", 60000 * 60 * 90 * 1, 1),
    Array(5000287, 10000, "血腥皇后", 60000 * 60 * 90 * 1, 1),
    Array(5000288, 10000, "半半", 60000 * 60 * 90 * 1, 1),
    Array(5000289, 10000, "皮埃尔", 60000 * 60 * 90 * 1, 1),
    Array(5000290, 10000, "天使提尔", 60000 * 60 * 90 * 1, 1),
    Array(5000291, 10000, "天使拉尔", 60000 * 60 * 90 * 1, 1),
    Array(5000292, 10000, "天使米尔", 60000 * 60 * 90 * 1, 1),
    Array(5000293, 10000, "蜜桃鲁提", 60000 * 60 * 90 * 1, 1),
    Array(5000294, 10000, "薄荷鲁提", 60000 * 60 * 90 * 1, 1),
    Array(5000295, 10000, "紫色鲁提", 60000 * 60 * 90 * 1, 1),
    Array(5000320, 10000, "铠鼠爱因", 60000 * 60 * 90 * 1, 1),
    Array(5000321, 10000, "铠鼠居里", 60000 * 60 * 90 * 1, 1),
    Array(5000322, 10000, "铠鼠牛顿", 60000 * 60 * 90 * 1, 1),
    Array(5000324, 10000, "火柴人宠物", 60000 * 60 * 90 * 1, 1),
    Array(5000330, 10000, "MINI班雷昂", 60000 * 60 * 90 * 1, 1),
    Array(5000331, 10000, "MINI奥尔卡", 60000 * 60 * 90 * 1, 1),
    Array(5000332, 10000, "MINI希拉", 60000 * 60 * 90 * 1, 1),
    Array(5000369, 10000, "小拉伊", 60000 * 60 * 90 * 1, 1),
    Array(5000370, 10000, "小波波", 60000 * 60 * 90 * 1, 1),
    Array(5000371, 10000, "小阿尔", 60000 * 60 * 90 * 1, 1),
    Array(5000391, 10000, "黄金虾", 60000 * 60 * 90 * 1, 1),
    Array(5000528, 10000, "猫鼬家族", 60000 * 60 * 90 * 1, 1),
    Array(5000402, 10000, "芭蕾女孩丽恩", 60000 * 60 * 90 * 1, 1)
    );


var jmpf = Array(
    Array(1102665, 3000, "未定义", "永久"), //狐狸围脖
    Array(1102217, 3000, "未定义", "永久"), //九尾披风
    Array(1102625, 3000, "未定义", "永久"), //红色蜗牛壳
    Array(1102651, 13000, "未定义", "永久"), //小浣熊尾巴
    Array(1102652, 13000, "未定义", "永久"), //松鼠尾巴
    Array(1102654, 13000, "未定义", "永久"), //狗狗尾巴
    Array(1102655, 13000, "未定义", "永久"), //熊熊尾巴
    Array(1102188, 3000, "未定义", "永久"), //银色狐狸尾巴
    Array(1102187, 3000, "未定义", "永久"), //金色狐狸尾巴
    Array(1102648, 3000, "未定义", "永久"), //K君的猫尾巴
    Array(1102387, 3000, "未定义", "永久"), //海龙尾巴
    Array(1102388, 3000, "未定义", "永久"), //炎龙尾巴
    Array(1102292, 3000, "未定义", "永久"), //尾巴
    Array(1102296, 3000, "未定义", "永久"), //夜叉尾巴（黑色）
    Array(1102656, 3000, "未定义", "永久"), //动物尾巴6
    Array(1102622, 3000, "未定义", "永久"), //时间旅行者的怀表
    Array(1102692, 3000, "未定义", "永久"), //寿司团
    Array(1102574, 3000, "未定义", "永久"), //小鸡叽叽叽
    Array(1102380, 3000, "未定义", "永久"), //我的朋友青蛙酱
    Array(1102549, 3000, "未定义", "永久"), //管家的猫咪
    Array(1102705, 3000, "未定义", "永久"), //企鹅书包
    Array(1102683, 3000, "未定义", "永久"), //兔兔熊背包
    Array(1102684, 3000, "未定义", "永久"), //未来医生听诊器
    Array(1102682, 3000, "未定义", "永久"), //未来天使注射器
    Array(1102593, 3000, "未定义", "永久"), //浮漾的翅膀
    Array(1102668, 3000, "未定义", "永久"), //夜天使之翼
    Array(1102353, 3000, "未定义", "永久"), //自由的翅膀
    Array(1102554, 3000, "未定义", "永久"), //女妖之翼
    Array(1102391, 3000, "未定义", "永久"), //小蜜蜂翅膀
    Array(1102325, 3000, "未定义", "永久"), //紫天使羽翼
    Array(1102326, 3000, "未定义", "永久"), //蓝天使羽翼
    Array(1102389, 3000, "未定义", "永久"), //金色天使
    Array(1102390, 3000, "未定义", "永久"), //银色天使
    Array(1102273, 3000, "未定义", "永久"), //路西法之翼
    Array(1102349, 3000, "未定义", "永久"), //发光精灵翅膀
    Array(1102293, 3000, "未定义", "永久"), //羁绊之翼
    Array(1102152, 3000, "未定义", "永久"), //黑骷髅海盗旗
    Array(1102300, 3000, "未定义", "永久"), //派对舞会灯
    Array(1102288, 3000, "未定义", "永久"), //背背雪人
    Array(1102274, 3000, "未定义", "永久"), //刺柏刀
    Array(1102310, 3000, "未定义", "永久"), //精灵披风
    Array(1102461, 3000, "未定义", "永久"), //粉嫩披风
    Array(1102222, 3000, "未定义", "永久"), //死神披风
    Array(1102583, 3000, "未定义", "永久"), //宝贝龙波比
    Array(1102232, 3000, "未定义", "永久"), //小王子的星星
    Array(1102218, 3000, "未定义", "永久"), //仙女飘飘
    Array(1102356, 3000, "未定义", "永久"), //天使祖母绿
    Array(1102270, 3000, "未定义", "永久"), //风和日丽
    Array(1102261, 3000, "未定义", "永久"), //音符围脖
    Array(1102251, 3000, "未定义", "永久"), //世界杯手巾
    Array(1102373, 3000, "未定义", "永久"), //露西娅披风
    Array(1102301, 3000, "未定义", "永久"), //旅行者披风
    Array(1102255, 3000, "未定义", "永久"), //唤灵斗师披风
    Array(1102254, 3000, "未定义", "永久"), //豹弩游侠披风
    Array(1102242, 3000, "未定义", "永久"), //胡克的船长披风
    Array(1102249, 3000, "未定义", "永久"), //奥兹魔法披风
    Array(1102239, 3000, "未定义", "永久"), //暗影双刀披风
    Array(1102355, 3000, "未定义", "永久"), //怪盗幻影披风
    Array(1102673, 3000, "未定义", "永久"), //僵尸新娘披风
    Array(1102324, 3000, "未定义", "永久"), //传说双层气球
    Array(1102212, 3000, "未定义", "永久"), //丢失的小孩
    Array(1102233, 3000, "未定义", "永久"), //雪娃娃披风
    Array(1102230, 3000, "未定义", "永久"), //企企雪橇披风
    Array(1102245, 3000, "未定义", "永久"), //太阳披风
    Array(1102258, 3000, "未定义", "永久"), //玩具熊气球
    Array(1102215, 3000, "未定义", "永久"), //气球串
    Array(1102271, 3000, "未定义", "永久"), //可爱巧克力棒气球
    Array(1102488, 3000, "未定义", "永久"), //蛋糕杯气球
    Array(1102285, 3000, "未定义", "永久"), //晴天娃娃(粉色)
    Array(1102286, 3000, "未定义", "永久"), //晴天娃娃(天蓝色)
    Array(1102287, 3000, "未定义", "永久")//晴天娃娃(淡黄色)
    );


var jmmz = Array(
    Array(1002960, 3000, "未定义", "永久"), //暗夜娃娃皇冠
    Array(1004639, 3000, "未定义", "永久"), //北极罩帽
    Array(1004665, 3000, "未定义", "永久"), //暖绒兔兔帽
    Array(1004638, 3000, "未定义", "永久"), //茅山道士帽
    Array(1004592, 3000, "未定义", "永久"), //紫色时间
    Array(1004592, 3000, "未定义", "永久"), //粉色时间
    Array(1004590, 3000, "未定义", "永久"), //蓝莓宝石头饰
    Array(1004589, 3000, "未定义", "永久"), //侠盗猫眼罩
    Array(1004570, 3000, "未定义", "永久"), //黑色海魂帽
    Array(1004571, 3000, "未定义", "永久"), //海贼团贝雷帽
    Array(1004541, 3000, "未定义", "永久"), //茶会大蝴蝶结
    Array(1004540, 3000, "未定义", "永久"), //奥尔卡的睡帽
    Array(1004506, 3000, "未定义", "永久"), //白色兔耳发带
    Array(1004504, 3000, "未定义", "永久"), //贵族花纹帽子
    Array(1004499, 3000, "未定义", "永久"), //蓝色金鱼帽子
    Array(1004500, 3000, "未定义", "永久"), //蓝色金鱼帽子
    Array(1004491, 3000, "未定义", "永久"), //西红柿帽子
    Array(1004481, 3000, "未定义", "永久"), //反抗者护目镜
    Array(1004480, 3000, "未定义", "永久"), //小淘气的飞行帽
    Array(1004470, 3000, "未定义", "永久"), //毛绒雷锋帽
    Array(1004469, 3000, "未定义", "永久"), //爱情宣言
    Array(1004463, 3000, "未定义", "永久"), //方块兔帽子
    Array(1004448, 3000, "未定义", "永久"), //黑色啵啵鼠帽
    Array(1004414, 3000, "未定义", "永久"), //热腾腾包子帽
    Array(1004409, 3000, "未定义", "永久"), //松鼠的休闲帽
    Array(1004403, 3000, "未定义", "永久"), //嘻哈兔子
    Array(1004405, 3000, "未定义", "永久"), //睡虎休闲帽
    Array(1004397, 3000, "未定义", "永久"), //清扫头巾
    Array(1004336, 3000, "未定义", "永久"), //暴走斯乌假发
    Array(1004332, 3000, "未定义", "永久"), //我爱小狗
    Array(1004330, 3000, "未定义", "永久"), //奢华羊绒小礼帽
    Array(1004328, 3000, "未定义", "永久"), //粉色棒球帽
    Array(1004329, 3000, "未定义", "永久"), //蓝色棒球帽发夹
    Array(1004324, 3000, "未定义", "永久"), //防毒面罩
    Array(1004294, 3000, "未定义", "永久"), //甜柿帽
    Array(1004295, 3000, "未定义", "永久"), //音乐飞天小鸡帽
    Array(1004296, 3000, "未定义", "永久"), //萌动飞天小鸡帽
    Array(1004298, 3000, "未定义", "永久"), //泰迪萌犬帽(白)
    Array(1004299, 3000, "未定义", "永久"), //泰迪萌犬帽(白)
    Array(1004275, 3000, "未定义", "永久"), //幸运帽
    Array(1004269, 3000, "未定义", "永久"), //苹果蒂风情帽
    Array(1004239, 3000, "未定义", "永久"), //桃太郎帽子
    Array(1004212, 3000, "未定义", "永久"), //晶莹精致丝带
    Array(1004211, 3000, "未定义", "永久"), //哈尼绒绒耳
    Array(1004204, 3000, "未定义", "永久"), //蓝色小马憨憨针织帽
    Array(1004205, 3000, "未定义", "永久"), //蓝色小马憨憨针织帽
    Array(1004202, 3000, "未定义", "永久"), //隐武士战盔
    Array(1004200, 3000, "未定义", "永久"), //夏日兔草帽
    Array(1004198, 3000, "未定义", "永久"), //太极发箍
    Array(1004196, 3000, "未定义", "永久"), //风车头箍
    Array(1004194, 3000, "未定义", "永久"), //蝴蝶结贝雷帽
    Array(1004169, 3000, "未定义", "永久"), //美味荷包蛋帽
    Array(1004171, 3000, "未定义", "永久"), //旋转木马帽
    Array(1004163, 3000, "未定义", "永久"), //爱丽丝表丝带
    Array(1004158, 3000, "未定义", "永久"), //鼠鼠派对发箍
    Array(1004137, 3000, "未定义", "永久"), //兔兔熊帽
    Array(1004025, 3000, "未定义", "永久"), //绿猫猫帽子
    Array(1004026, 3000, "未定义", "永久"), //黑猫无边帽
    Array(1004027, 3000, "未定义", "永久"), //白猫无边帽
    Array(1004028, 3000, "未定义", "永久"), //黄猫无边帽
    Array(1004029, 3000, "未定义", "永久"), //北极熊无边帽
    Array(1004033, 3000, "未定义", "永久"), //红猫猫帽子
    Array(1004003, 3000, "未定义", "永久"), //粉红猫耳套头帽
    Array(1004004, 3000, "未定义", "永久"), //粉红猫耳套头帽
    Array(1003967, 3000, "未定义", "永久"), //巧克力绵羊玩偶帽
    Array(1003968, 3000, "未定义", "永久"), //巧克力绵羊玩偶帽
    Array(1003951, 3000, "未定义", "永久"), //欧黛特头箍
    Array(1003952, 3000, "未定义", "永久"), //欧黛特头箍
    Array(1003937, 3000, "未定义", "永久"), //浪漫斗笠
    Array(1003919, 3000, "未定义", "永久"), //花花绒线帽
    Array(1003920, 3000, "未定义", "永久"), //夏威夷草帽
    Array(1003921, 3000, "未定义", "永久"), //咕噜噜鸭舌帽
    Array(1003917, 3000, "未定义", "永久"), //粉红太阳镜帽
    Array(1003900, 3000, "未定义", "永久"), //蓝色桃心透明帽子
    Array(1003892, 3000, "未定义", "永久"), //树叶钻石
    Array(1003859, 3000, "未定义", "永久"), //满天星普赛克
    Array(1003847, 3000, "未定义", "永久"), //鬼剑士假发
    Array(1003831, 3000, "未定义", "永久"), //卷卷绵羊发卡
    Array(1003829, 3000, "未定义", "永久"), //兔耳管家礼帽
    Array(1003776, 3000, "未定义", "永久"), //海豹白白帽
    Array(1003777, 3000, "未定义", "永久"), //伶俐猫咪斗篷
    Array(1003778, 3000, "未定义", "永久"), //可爱猫咪斗篷
    Array(1003779, 3000, "未定义", "永久"), //爱丽丝兔兔帽
    Array(1003763, 3000, "未定义", "永久"), //黑色之翼首领帽
    Array(1003710, 3000, "未定义", "永久"), //[MS折扣]怪医黑杰克帽
    Array(1003596, 3000, "未定义", "永久"), //金属粉色棒球帽
    Array(1003594, 3000, "未定义", "永久"), //凉爽夏日潜水镜
    Array(1003586, 3000, "未定义", "永久"), //薄荷星海军帽
    Array(1003587, 3000, "未定义", "永久"), //薄荷星海军帽
    Array(1003508, 3000, "未定义", "永久"), //时尚香肠帽
    Array(1003509, 3000, "未定义", "永久"), //时尚香肠帽
    Array(1003417, 3000, "未定义", "永久"), //恐龙帽子
    Array(1003220, 3000, "未定义", "永久"), //尼龙花头绳
    Array(1003203, 3000, "未定义", "永久"), //小红帽
    Array(1003149, 3000, "未定义", "永久"), //洛比尔兔子斗篷
    Array(1003146, 3000, "未定义", "永久"), //蕾丝蝴蝶结发箍
    Array(1003147, 3000, "未定义", "永久"), //天蓝女仆头饰
    Array(1003131, 3000, "未定义", "永久"), //黑色精致丝带
    Array(1003132, 3000, "未定义", "永久"), //黑色精致丝带
    Array(1003133, 3000, "未定义", "永久"), //黑色精致丝带
    Array(1003122, 3000, "未定义", "永久"), //黄色兔兔巾
    Array(1003123, 3000, "未定义", "永久"), //黄色兔兔巾
    Array(1003109, 3000, "未定义", "永久"), //皇家彩虹斗篷
    Array(1003006, 3000, "未定义", "永久"), //猫猫野营帽
    Array(1002976, 3000, "未定义", "永久"), //女仆头饰
    Array(1002885, 3000, "未定义", "永久"), //心型蝴蝶结
    Array(1002721, 3000, "未定义", "永久"), //狸毛护耳
    Array(1002704, 3000, "未定义", "永久"), //黄独眼怪婴
    Array(1002691, 3000, "未定义", "永久"), //半人马假发(棕色)
    Array(1002695, 3000, "未定义", "永久"), //幽灵帽
    Array(1004636, 3000, "未定义", "永久"), //香蕉郊游帽
    Array(1004628, 3000, "未定义", "永久"), //卖萌小叶子发卡
    Array(1004629, 3000, "未定义", "永久"), //卖萌小叶子发卡
    Array(1004630, 3000, "未定义", "永久"), //卖萌小叶子发卡
    Array(1004631, 3000, "未定义", "永久"), //卖萌小叶子发卡
    Array(1004632, 3000, "未定义", "永久"), //卖萌小叶子发卡
    Array(1004602, 3000, "未定义", "永久"), //农夫的瑰宝
    Array(1004601, 3000, "未定义", "永久"), //小企鹅帽子
    Array(1004589, 3000, "未定义", "永久"), //侠盗猫眼罩
    Array(1004570, 3000, "未定义", "永久"), //黑色海魂帽
    Array(1004571, 3000, "未定义", "永久"), //海贼团贝雷帽
    Array(1004568, 3000, "未定义", "永久"), //呆萌鼠鼠帽
    Array(1004543, 3000, "未定义", "永久"), //复古头巾
    Array(1004544, 3000, "未定义", "永久"), //棒球帽
    Array(1004545, 3000, "未定义", "永久"), //棒球帽
    Array(1004546, 3000, "未定义", "永久"), //棒球帽
    Array(1004547, 3000, "未定义", "永久"), //棒球帽
    Array(1004548, 3000, "未定义", "永久"), //棒球帽
    Array(1004532, 3000, "未定义", "永久"), //女皇关注
    Array(1004533, 3000, "未定义", "永久"), //女皇关注
    Array(1004535, 3000, "未定义", "永久"), //女皇关注
    Array(1004540, 3000, "未定义", "永久"), //女皇关注
    Array(1004541, 3000, "未定义", "永久"), //女皇关注
    Array(1004542, 3000, "未定义", "永久"), //女皇关注
    Array(1004530, 3000, "未定义", "永久"), //蓝色熊猫玩偶帽子
    Array(1004510, 3000, "未定义", "永久"), //糖糖绿水灵帽子
    Array(1004511, 3000, "未定义", "永久"), //糖糖绿水灵帽子
    Array(1004512, 3000, "未定义", "永久"), //糖糖绿水灵帽子
    Array(1004513, 3000, "未定义", "永久"), //糖糖绿水灵帽子
    Array(1004514, 3000, "未定义", "永久"), //糖糖绿水灵帽子
    Array(1004503, 3000, "未定义", "永久"), //黑猫
    Array(1004504, 3000, "未定义", "永久"), //黑猫
    Array(1004505, 3000, "未定义", "永久"), //黑猫
    Array(1004506, 3000, "未定义", "永久"), //黑猫
    Array(1004499, 3000, "未定义", "永久"), //蓝鱼帽子
    Array(1004500, 3000, "未定义", "永久"), //黑猫
    Array(1004491, 3000, "未定义", "永久"), //西红柿
    Array(1004486, 3000, "未定义", "永久"), //春之主人
    Array(1004463, 3000, "未定义", "永久"), //方块兔子
    Array(1004467, 3000, "未定义", "永久"), //方块兔子
    Array(1004469, 3000, "未定义", "永久"), //方块兔子
    Array(1004470, 3000, "未定义", "永久"), //方块兔子
    Array(1004471, 3000, "未定义", "永久"), //方块兔子
    Array(1004472, 3000, "未定义", "永久"), //黑猫
    Array(1004473, 3000, "未定义", "永久"), //黑猫
    Array(1004478, 3000, "未定义", "永久"), //黑猫
    Array(1004480, 3000, "未定义", "永久"), //黑猫
    Array(1004572, 3000, "未定义", "永久"), //黑猫
    Array(1004572, 3000, "未定义", "永久"), //黑猫
    Array(1004506, 3000, "未定义", "永久"), //黑猫
    Array(1003084, 3000, "未定义", "永久"), //帝国皇冠
    Array(1003861, 3000, "未定义", "永久"), //明星小皇冠
    Array(1003401, 3000, "未定义", "永久"), //黑暗伊卡尔特
    Array(1003402, 3000, "未定义", "永久"), //黑暗胡克
    Array(1003458, 3000, "未定义", "永久"), //茅山道士帽
    Array(1003104, 3000, "未定义", "永久"), //巨型蛋糕帽
    Array(1003246, 3000, "未定义", "永久"), //可爱兔子帽
    Array(1004112, 3000, "未定义", "永久"), //刀马旦花帽
    Array(1003776, 3000, "未定义", "永久"), //海豹白白帽
    Array(1003392, 3000, "未定义", "永久"), //小蜜蜂帽子
    Array(1003802, 3000, "未定义", "永久"), //小恐龙绿豆帽子
    Array(1003803, 3000, "未定义", "永久"), //小恐龙云豆帽子
    Array(1003728, 3000, "未定义", "永久"), //蓝色精灵帽
    Array(1003727, 3000, "未定义", "永久"), //红色精灵帽
    Array(1003509, 3000, "未定义", "永久"), //时尚香肠帽
    Array(1003508, 3000, "未定义", "永久"), //西红柿帽子
    Array(1004124, 3000, "未定义", "永久"), //恋爱小草莓帽
    Array(1004125, 3000, "未定义", "永久"), //歌唱大菠萝帽
    Array(1003829, 3000, "未定ray(1004629, 3000, "鏈