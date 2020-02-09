/*
 * 
 * @枫之梦
 * @嘉年华挑战 - 变相修复
 * @npc = 2042002
 */
importPackage(net.sf.cherry.client);

var status = 0;
var 纪念币 = "#v4001129#";

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var 前言 = "#b挑战怪物嘉年华。你有没有足够的胆量挑战一下自己呢？\r\n";
            var 选择1 = "#L0##r我要出去#l\r\n\r\n";
            var 选择2 = "#L1##r#d嘉年华挑战详细说明#l\r\n\r\n";
            var 选择3 = "#L2##b小组挑战嘉年华#k"
            cm.sendSimple("" + 前言 + "" + 选择1 + "" + 选择2 + ""+选择3+"");         // cm.getChar().gainrenwu(1);
        } else if (status == 1) {
            if (selection == 0) {
              cm.warp(103000000);
              cm.dispose();
            } else if (selection == 1) { //嘉年华介绍
                   cm.sendOk("嘉年华组队个人竞技说明：\r\n#b小组进入挑战地图后。会出现一定数量的怪物，怪物会一直刷新。谁能挑战怪物数量最多，谁拿的奖励也就越丰厚。\r\n#r完成嘉年华后，可以获得#b冒险岛纪念币#r，可以兑换#r项链，混沌项链，锻造技能提升材料#k！")
            } else if (selection == 2) { //小组挑战嘉年华
                 cm.openNpc(2042002,3);
            }   
        }
        }
    }
