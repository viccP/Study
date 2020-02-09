importPackage(net.sf.cherry.client);

var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("巨大的威力..");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("是否已经准备好迎接第四次转职了？");
        } else if (status == 1) {
            if(cm.getJob() >= 10000 && cm.getJob() <= 15010){
                cm.sendNext("哇，你是骑士团的一员，我很高兴为你服务哦！！！");
                status = 160;
                return;
            }
            if(cm.getJob() >= 20000){
                cm.sendNext("哇~~战神战起来！新职业哦~我很高兴为你服务哦！！！");
                status = 163;
                return;
            }
            if (cm.getLevel() < 255 && cm.getJob() == 0) {
                if (cm.getLevel() < 8) {
                    cm.sendNext("你的等级和你这里完全不符合");
                    status = 98;
                } else if (cm.getLevel() < 1) {
                    cm.sendYesNo("我们需要集结魔法师的精神力去封印魔王的力量,#b管理员#k 正在与魔王对抗,我们应该尽快赶过去支援他,因此你必须比其他职业提前进行修炼并领悟魔法的精髓,这是一条艰苦的道路,那么你想成为 #b魔法师#k 吗？");
                    status = 150;
                    
                } else{
			cm.dispose();
			}
            } else if (cm.getLevel() == 1) {
                cm.sendNext("怎么样？冒险还算顺利吧。有努力就有回报。当然这一切都不是容易的。当你到达 #r[30级]#k 的时候就可以进行#b[第二次转职]#k到时别忘记来找我哦！");
                status = 98;
            } else if (cm.getJob() == 400) {
              	cm.dispose();
            } else if (cm.getJob() == 100) {
                cm.dispose();
            } else if (cm.getJob() == 200) {
               cm.dispose();
            } else if (cm.getJob() == 300) {
               cm.dispose();
            } else if (cm.getJob() == 500) {
               cm.dispose();

            } else if (cm.getLevel() < 120) {
                cm.sendNext("第四次。是最后一次。需要你的智慧与勇气！");
                status = 98;
            } else if (cm.getJob() == 410) {
                status = 63;
               cm.dispose();
            } else if (cm.getJob() == 420) {
                status = 66;
               cm.dispose();
            } else if (cm.getJob() == 310) {
                status = 69;
              cm.dispose();
            } else if (cm.getJob() == 320) {
                status = 72;
               cm.dispose();
            } else if (cm.getJob() == 210) {
                status = 75;
               cm.dispose();
            } else if (cm.getJob() == 220) {
                status = 78;
               cm.dispose();
            } else if (cm.getJob() == 230) {
                status = 81;
              cm.dispose();
            } else if (cm.getJob() == 110) {
                status = 84;
              cm.dispose();
            } else if (cm.getJob() == 120) {
                status = 87;
               cm.dispose();
            } else if (cm.getJob() == 130) {
                status = 90;
             cm.dispose();
            } else if (cm.getJob() == 510) {
                status = 93;
               cm.dispose();
            } else if (cm.getJob() == 520) {
                status = 96;
               cm.dispose();
            } else if (cm.getLevel() < 120) {
                cm.sendNext("#b你离#r第四次转职#b已经不远。。。");
                status = 98;
            } else if (cm.getJob() == 411) {
                status = 105;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 421) {
                status = 108;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 311) {
                status = 111;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 321) {
                status = 114;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 211) {
                status = 117;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 221) {
                status = 120;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 231) {
                status = 123;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 111) {
                status = 126;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 121) {
                status = 129;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 131) {
                status = 132;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 511) {
                status = 135;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getJob() == 521) {
                status = 138;
                cm.sendYesNo("准备好了吗？开始第四次转职！");
            } else if (cm.getLevel() < 255) {
                cm.sendNext("找我有事吗。");
                status = 98;
            } else if (cm.getLevel() >= 255) {
                cm.sendOk("#d啊哈... 伟大的 #r[#h #]#k ,你已经通过一个漫长而充满挑战的道路,终于成为了风起云涌的人物.但这个世界阴暗的深处,被 #r[管理员]#k #d封印的魔王正蠢蠢欲动,它的残忍无人能及,你需要修炼的更加强大才能拯救所有的居民!"); 
                cm.dispose();
            } else {
                cm.dispose();
            }

        } else if (status == 2) {
            if (selection == 0) {
                jobName = "刺客";
                job = 410;
            }
            if (selection == 1) {
                jobName = "侠客";
                job = 420;
            }
            if (selection == 2) {
                jobName = "剑客";
                job = 110;
            }
            if (selection == 3) {
                jobName = "准骑士";
                job = 120;
            }
            if (selection == 4) {
                jobName = "枪战士";
                job = 130;
            }
            if (selection == 5) {
                jobName = "冰雷法师";
                job = 220;
            }
            if (selection == 6) {
                jobName = "火毒法师";
                job = 210;
            }
            if (selection == 7) {
                jobName = "牧师";
                job = 230;
            }
            if (selection == 8) {
                jobName = "猎人";
                job = 310;
            }
            if (selection == 9) {
                jobName = "弩手";
                job = 320;
            }
            if (selection == 10) {
                jobName = "拳手";
                job = 510;
            }
            if (selection == 11) {
                jobName = "火枪手";
                job = 520;
            }
            cm.sendYesNo("准备好了吗？"); 
                        
                        
        } else if (status == 3) {
            cm.changeJob(job);
            if (cm.getJob() == 410) {
            } else if (cm.getJob() == 420) {
               // //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 110) {
            //    //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 120) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 130) {
             //   //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 220) {
              //  //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 210) {
               // //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 230) {
              //  //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 310) {
               // //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 320) {
              //  //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 510) {
              //  //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            } else if (cm.getJob() == 520) {
               // //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            }

            cm.sendOk("加油锻炼");
            cm.dispose();

        } else if (status == 61) {
            if (cm.getJob() == 410) {
                status = 63;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 420) {
                status = 66;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 310) {
                status = 69;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 320) {
                status = 72;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 210) {
                status = 75;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 220) {
                status = 78;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 230) {
                status = 81;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 110) {
                status = 84;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 120) {
                status = 87;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 130) {
                status = 90;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 510) {
                status = 93;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob() == 520) {
                status = 960;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else { 
                cm.dispose();
            }

        } else if (status == 64) {
            cm.changeJob(411);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 67) {
            cm.changeJob(421);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 70) {
            cm.changeJob(311);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 73) {
            cm.changeJob(321);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 76) {
            cm.changeJob(211);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 79) {
            cm.changeJob(221);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 82) {
            cm.changeJob(231);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 85) {
            cm.changeJob(111);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 88) {
            cm.changeJob(121);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 91) {
            cm.changeJob(131);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
        } else if (status == 94) {
            cm.changeJob(511);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
        } else if (status == 97) {
            cm.changeJob(521);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
            cm.dispose();
        } else if (status == 99) {
            cm.sendOk("你还差一些距离。。");
            cm.dispose();

        } else if (status == 102) {
            if (cm.getJob() == 411) {
                status = 105;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 421) {
                status = 108;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 311) {
                status = 111;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 321) {
                status = 114;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 211) {
                status = 117;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 221) {
                status = 120;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 231) {
                status = 123;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 111) {
                status = 126;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 121) {
                status = 129;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 131) {
                status = 132;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 511) {
                status = 135;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob() == 521) {
                status = 137;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else { 
                cm.dispose();
            }


        } else if (status == 106) {
            cm.changeJob(412);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    //标飞
    cm.teachSkill(4120002,0,10);//假动作
    cm.teachSkill(4120005,0,10);//毒液
    cm.teachSkill(4121000,0,10);//勇士
    cm.teachSkill(4121003,0,10);//挑衅
    cm.teachSkill(4121004,0,10);//忍者伏击
    cm.teachSkill(4121006,0,10);//暗器伤人
    cm.teachSkill(4121007,0,10);//三连环光击破
    cm.teachSkill(4121008,0,10);//忍者冲击
    cm.teachSkill(4121009,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 109) {
            cm.changeJob(422);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
	//刀飞
    cm.teachSkill(4220002,0,10);
    cm.teachSkill(4220005,0,10);
    cm.teachSkill(4221000,0,10);
    cm.teachSkill(4221001,0,10);
    cm.teachSkill(4221003,0,10);
    cm.teachSkill(4221004,0,10);
    cm.teachSkill(4221006,0,10);
    cm.teachSkill(4221007,0,10);
    cm.teachSkill(4221008,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 112) {
            cm.changeJob(312);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
	//神射手
    cm.teachSkill(3120005,0,10);
    cm.teachSkill(3121000,0,10);
    cm.teachSkill(3121002,0,10);
    cm.teachSkill(3121003,0,10);
    cm.teachSkill(3121004,0,10);
    cm.teachSkill(3121006,0,10);
    cm.teachSkill(3121007,0,10);
    cm.teachSkill(3121008,0,10);
    cm.teachSkill(3121009,0,5);	
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 115) {
            cm.changeJob(322);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
	//神弩手
    cm.teachSkill(3220004,0,10);
    cm.teachSkill(3221000,0,10);
    cm.teachSkill(3221001,0,10);
    cm.teachSkill(3221002,0,10);
    cm.teachSkill(3221003,0,10);
    cm.teachSkill(3221005,0,10);
    cm.teachSkill(3221006,0,10);
    cm.teachSkill(3221007,0,10);
    cm.teachSkill(3221008,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 118) {
            cm.changeJob(212);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 火毒魔导士
    cm.teachSkill(2121000,0,10);
    cm.teachSkill(2121001,0,10);
    cm.teachSkill(2121002,0,10);
    cm.teachSkill(2121003,0,10);
    cm.teachSkill(2121004,0,10);
    cm.teachSkill(2121005,0,10);
    cm.teachSkill(2121006,0,10);
    cm.teachSkill(2121007,0,10);
    cm.teachSkill(2121008,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 121) {
            cm.changeJob(222);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 冰雷魔导士
    cm.teachSkill(2221000,0,10);
    cm.teachSkill(2221001,0,10);
    cm.teachSkill(2221002,0,10);
    cm.teachSkill(2221003,0,10);
    cm.teachSkill(2221004,0,10);
    cm.teachSkill(2221005,0,10);
    cm.teachSkill(2221006,0,10);
    cm.teachSkill(2221007,0,10);
    cm.teachSkill(2221008,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 124) {
            cm.changeJob(232);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 主教
    cm.teachSkill(2321000,0,10);
    cm.teachSkill(2321001,0,10);
    cm.teachSkill(2321002,0,10);
    cm.teachSkill(2321003,0,10);
    cm.teachSkill(2321004,0,10);
    cm.teachSkill(2321005,0,10);
    cm.teachSkill(2321006,0,10);
    cm.teachSkill(2321007,0,10);
    cm.teachSkill(2321008,0,10);
    cm.teachSkill(2321009,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 127) {
            cm.changeJob(112);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 英雄
    cm.teachSkill(1120003,0,10);
    cm.teachSkill(1120004,0,10);
    cm.teachSkill(1120005,0,10);
    cm.teachSkill(1121000,0,10);
    cm.teachSkill(1121001,0,10);
    cm.teachSkill(1121002,0,10);
    cm.teachSkill(1121006,0,10);
    cm.teachSkill(1121008,0,10);
    cm.teachSkill(1121010,0,10);
    cm.teachSkill(1121011,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 130) {
            cm.changeJob(122);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 圣骑士
    cm.teachSkill(1220005,0,10);
    cm.teachSkill(1220006,0,10);
    cm.teachSkill(1220010,0,10);
    cm.teachSkill(1221000,0,10);
    cm.teachSkill(1221001,0,10);
    cm.teachSkill(1221002,0,10);
    cm.teachSkill(1221003,0,10);
    cm.teachSkill(1221004,0,10);
    cm.teachSkill(1221007,0,10);
    cm.teachSkill(1221009,0,10);
    cm.teachSkill(1221011,0,10);
    cm.teachSkill(1221012,0,5);
            cm.dispose();
        } else if (status == 133) {
            cm.changeJob(132);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 黑骑士
    cm.teachSkill(1320005,0,10);
    cm.teachSkill(1320006,0,10);
    cm.teachSkill(1320008,0,10);
    cm.teachSkill(1320009,0,10);
    cm.teachSkill(1321000,0,10);
    cm.teachSkill(1321001,0,10);
    cm.teachSkill(1321002,0,10);
    cm.teachSkill(1321003,0,10);
    cm.teachSkill(1321007,0,10);
    cm.teachSkill(1321010,0,5);
            cm.dispose();
        } else if (status == 136) {
            cm.changeJob(512);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 冲锋队长
    cm.teachSkill(5121000,0,10);
    cm.teachSkill(5121001,0,10);
    cm.teachSkill(5121002,0,10);
    cm.teachSkill(5121003,0,10);
    cm.teachSkill(5121004,0,10);
    cm.teachSkill(5121005,0,10);
    cm.teachSkill(5121007,0,10);
    cm.teachSkill(5121008,0,5);
    cm.teachSkill(5121009,0,10);
    cm.teachSkill(5121010,0,10);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 139) {
            cm.changeJob(522);
            
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
    // 船长
    cm.teachSkill(5220001,0,10);
    cm.teachSkill(5220002,0,10);
    cm.teachSkill(5220011,0,10);
    cm.teachSkill(5221000,0,10);
    cm.teachSkill(5221003,0,10);
    cm.teachSkill(5221004,0,10);
    cm.teachSkill(5221006,0,10);
    cm.teachSkill(5221007,0,10);
    cm.teachSkill(5221008,0,10);
    cm.teachSkill(5221009,0,10);
    cm.teachSkill(5221010,0,5);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 151) {
            if (cm.c.getPlayer().getInt() >= 4) {
                cm.teachSkill(2000000,0,16); //Improving MP Recovery
                cm.teachSkill(2000001,0,10); //Improving Max MP Increase
                cm.teachSkill(2001002,0,20); //Magic Guard
                cm.teachSkill(2001003,0,20); //Magic Armor
                cm.teachSkill(2001004,0,20); //Energy Bolt
                cm.teachSkill(2001005,0,20); //Magic Claw
                cm.changeJob(200);
                cm.sendOk("转职成功！希望你成为出色的 #b[魔法师]#k ！");
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
                cm.dispose();
            } else {
                cm.sendOk("你没有符合最小需求: #b[20 智力]#k ！");
                cm.dispose();
            }
            
        } else if (status == 154) {
            cm.sendSimple("怎么样~~在下面选择一种你所喜欢的职业吧！#b\r\n#L0#战士#l  #L1#魔法师#l  #L2#弓箭手#l  #L3#飞侠#l  #L4#海盗#l#k");


        } else if (status == 155) {
            if (selection == 0) {
                jobName = "战士";
                job = 100;

            }
            if (selection == 1) {
                jobName = "魔法师";
                job = 200;

            }
            if (selection == 2) {
                jobName = "弓箭手";
                job = 300;

            }
            if (selection == 3) {
                jobName = "飞侠";
                job = 400;

            }
            if (selection == 4) {
                jobName = "海盗";
                job = 500;

            }
            cm.sendYesNo("不错的选择哦，确定要成为一名 #b[" + jobName + "] #k吗？"); 
        } else if (status == 156) {
                cm.changeJob(job);
                
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职成功！");
                cm.dispose();
            
        } else if (status == 161) {
            if(cm.getJob() == 10000 && cm.getLevel()>=10){
                cm.sendSimple("看起来你还是一个初心者,快选择一个适合自己的职业吧!#b\r\n#L0#魂骑士#l #L1#炎术士#l #L2#风灵使者#l #L3#夜行者#l #L4#奇袭者#l#k");
            }else if(parseInt(cm.getJob() / 100) >10 && cm.getLevel()>=300 && cm.getJob()%100 == 0){
                cm.sendYesNo("您真的确定要进行第二次转职了吗？");
            }else if(parseInt(cm.getJob() / 100) >10 && cm.getLevel()>=700 && cm.getJob()%10 == 0){
                cm.sendYesNo("您真的确定要进行第三次转职了吗？");
            }else{
                cm.sendOk("您目前的条件不能使用我的服务哦!");
                cm.dispose();
            }
        } else if (status == 162) {
            if(cm.getJob() == 10000 && cm.getLevel()>=10){
                if (selection == 0) {
                    job = 1100; //1100 魂骑士
                } else if (selection == 1) {
                    job = 1200; //炎术士
                } else if (selection == 2) {
                    job = 1300; //风灵
                } else if (selection == 3) {
                    job = 1400; //夜行者
                } else if (selection == 4) {
                    job = 1500; //奇袭者
                }
                cm.changeJob(job);
                //cm.gainItem(1142066,1);
                cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职为骑士团职业！");
                
            } else if(parseInt(cm.getJob() / 100) >10 && cm.getLevel()>=300 && cm.getJob()%100 == 0){
                cm.changeJob(MapleJob.getById(cm.getJob()+10));
                //cm.gainItem(1142067,1);
                cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职为骑士团职业！");
                
            } else if(parseInt(cm.getJob() / 100) >10 && cm.getLevel()>=700 && cm.getJob()%10 == 0){
                cm.gainItem(1142068,1);
                cm.getPlayer().gainAp(5);
                cm.changeJob(MapleJob.getById(cm.getJob()+1));
		cm.teachSkill(11110005,0,20);//进阶斗气
		cm.teachSkill(11111004,0,30);//轻舞飞扬
		cm.teachSkill(15111004,0,30);//光速拳
		cm.teachSkill(15111005,0,20);//极速领域
		cm.teachSkill(13111002,0,20);//暴风箭雨
		cm.teachSkill(14111005,0,20);//三连环极光破
                
                cm.sendOk("转职成功！希望您以后的冒险之路顺利!");
            }
            cm.dispose();
        } else if (status == 164) {
            if(cm.getJob() == 20000 && cm.getLevel() >=10){
                cm.sendYesNo("战神战起来！\r\n看起来你还是一个战童,您确定要进行第一次转职吗？");
            } else if(cm.getJob() == 2100 && cm.getLevel() >=30) {
                cm.sendYesNo("战神战起来！您真的确定要进行第二次转职了吗？");
            } else if(cm.getJob() == 2110 && cm.getLevel() >=70){
                cm.sendYesNo("战神战起来！您真的确定要进行第三次转职了吗？");
            } else if(cm.getJob() == 2111 && cm.getLevel() >=120) {
                cm.sendYesNo("战神战起来！您真的确定要进行第四次转职了吗？");
            } else if(cm.getJob() == 2112 && cm.getLevel() >120) {
                cm.sendOk("你已经完成了所有的转职工作。继续加油吧！！");
            } else {
                cm.sendOk("按照您目前的条件，我还不能为您服务哦！加油吧！");
                cm.dispose();
            }
        } else if (status == 165) {
            if(cm.getJob() == 20000 && cm.getLevel() >=10){
                cm.changeJob(2100);
				cm.teachSkill(21000000,0,10); //矛连击强化
				cm.teachSkill(21001001,0,15); //战斗步伐
				cm.teachSkill(21000002,0,20); //双重重击
				cm.teachSkill(21001003,0,20); //快速矛
                cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职为战神职业！");
                
            } else if(cm.getJob() == 2100 && cm.getLevel() >=30){
                cm.changeJob(2110);
				cm.teachSkill(21100000,0,20); //精准矛
				cm.teachSkill(21100001,0,20); //三重重击
				cm.teachSkill(21100002,0,30); //战神突进
				cm.teachSkill(21101003,0,20); //抗压
				cm.teachSkill(21100004,0,20); //斗气爆裂
				cm.teachSkill(21100005,0,20); //连环吸血
                cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职为战神职业！");
                
            } else if(cm.getJob() == 2110 && cm.getLevel() >=70){
                cm.getPlayer().gainAp(5);
                cm.changeJob(2111);
				cm.teachSkill(21110000,0,20); //爆击强化
				cm.teachSkill(21111001,0,20); //灵巧击退
				cm.teachSkill(21110002,0,20); //全力挥击
				cm.teachSkill(21110003,0,30); //终极投掷
				cm.teachSkill(21110004,0,30); //幻影狼牙
				cm.teachSkill(21111005,0,20); //冰雪矛
				cm.teachSkill(21110006,0,20); //旋风
				cm.teachSkill(21110007,20,20); //全力挥击
				cm.teachSkill(21110008,20,20); //全力挥击
                cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职为战神职业！");
                
            } else if(cm.getJob() == 2111 && cm.getLevel() >=120){
                cm.getPlayer().gainAp(5);
				cm.teachSkill(21121000,0,10); //冒险岛勇士
				cm.teachSkill(21120001,0,10); //攻击策略
				cm.teachSkill(21120002,0,10); //战神之舞
                                cm.teachSkill(21120009,0,10); //战神之舞
                                cm.teachSkill(21120010,0,10); //战神之舞
				cm.teachSkill(21121003,0,10); //战神的意志
				cm.teachSkill(21120004,0,10); //防守策略
				cm.teachSkill(21120005,0,10); //巨熊咆哮
				cm.teachSkill(21120006,0,10); //钻石星辰
				cm.teachSkill(21120007,0,10); //战神之盾
				cm.teachSkill(21121008,0,1); //勇士的意志
                cm.changeJob(2112);
                cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：可乐小姐 快速转职为战神职业！");
                cm.sendOk("转职成功！希望您以后的冒险之路顺利！");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }  

    }
}
