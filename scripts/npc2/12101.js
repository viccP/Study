/* Duey
Edited by: Ishan1996 Of ragezone.
*/


var status = 0;

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {
if (mode == -1) {
cm.dispose();
} else {
if (mode == 1)
status++;
else
status--;
if (status == 0) {
cm.sendSimple("你要做啥?.\r\n#L0##r騎寵技能#l#k\r\n#L1##r沒事#l#k");
} else if (status == 1) {
if (selection == 0) {
//cm.teachSkill(5001001,20,20); //Start of Pirate Job Skills
//cm.teachSkill(5001002,20,20);
//cm.teachSkill(5001003,20,20);
//cm.teachSkill(5001005,10,10);
//cm.teachSkill(5000000,20,20);
//cm.teachSkill(5101002,20,20);
//cm.teachSkill(5101003,20,20);
//cm.teachSkill(5101004,20,20);
//cm.teachSkill(5101005,10,10);
//cm.teachSkill(5100000,10,10);
//cm.teachSkill(5101007,10,10);
//cm.teachSkill(5100001,20,20);
//cm.teachSkill(5101006,20,20);
//cm.teachSkill(5200000,20,20);
//cm.teachSkill(5201001,20,20);
//cm.teachSkill(5201002,20,20);
//cm.teachSkill(5201003,20,20);
//cm.teachSkill(5201004,20,20);
//cm.teachSkill(5201005,10,10);
//cm.teachSkill(5201006,20,20);
//cm.teachSkill(5110000,20,20);
//cm.teachSkill(5110001,40,40);
//cm.teachSkill(5111002,30,30);
//cm.teachSkill(5111004,20,20);
//cm.teachSkill(5111005,20,20);
//cm.teachSkill(5111006,30,30);
//cm.teachSkill(5210000,20,20);
//cm.teachSkill(5211001,30,30);
//cm.teachSkill(5211002,30,30);
//cm.teachSkill(5211004,30,30);
//cm.teachSkill(5211005,30,30);
//cm.teachSkill(2311001,20,20);
//cm.teachSkill(2311005,20,20);
//cm.teachSkill(2310000,20,20);
//cm.teachSkill(2311003,30,30);
//cm.teachSkill(2311002,30,30);
//cm.teachSkill(2311004,30,30);
//cm.teachSkill(2311006,30,30);
//cm.teachSkill(5211006,30,30); //End of Pirate Job Skills
cm.teachSkill(1003,1,1);
cm.teachSkill(1004,1,1); //End of max-level "1" skill
//cm.teachSkill(1121011,1,1); //hero's will
//cm.teachSkill(1221012,1,1); //hero's will
//cm.teachSkill(1321010,1,1); //hero's will
//cm.teachSkill(2121008,1,1); //hero's will
//cm.teachSkill(2221008,1,1); //hero's will
//cm.teachSkill(2321009,1,1); //hero's will
//cm.teachSkill(3221008,1,1); //hero's will
//cm.teachSkill(3121009,1,1); //hero's will
//cm.teachSkill(4121009,1,1); //hero's will
//cm.teachSkill(4221008,1,1); //hero's will
//cm.teachSkill(2321003,30,30);
//cm.teachSkill(1000002,8,8); //Start of max-level "8" skills
//cm.teachSkill(3000002,8,8);
//cm.teachSkill(4000001,8,8); //End of max-level "8" skills
//cm.teachSkill(1000001,10,10); //Start of max-level "10" skills
//cm.teachSkill(2000001,10,10); //End of max-level "10" skills
//cm.teachSkill(1000000,16,16); //Start of max-level "16" skills
//cm.teachSkill(2000000,16,16);
//cm.teachSkill(3000000,16,16); //End of max-level "16" skills
//cm.teachSkill(1001003,20,20); //Start of max-level "20" skills
//cm.teachSkill(1001004,20,20);
//cm.teachSkill(1001005,20,20);
//cm.teachSkill(2001002,20,20);
//cm.teachSkill(2001003,20,20);
//cm.teachSkill(2001004,20,20);
//cm.teachSkill(2001005,20,20);
//cm.teachSkill(3000001,20,20);
//cm.teachSkill(3001003,20,20);
//cm.teachSkill(3001004,20,20);
//cm.teachSkill(3001005,20,20);
//cm.teachSkill(4000000,20,20);
//cm.teachSkill(4001344,20,20);
//cm.teachSkill(4001334,20,20);
//cm.teachSkill(4001002,20,20);
//cm.teachSkill(4001003,20,20);
//cm.teachSkill(1101005,20,20);
//cm.teachSkill(1100001,20,20); //Start of mastery's
//cm.teachSkill(1100000,20,20);
//cm.teachSkill(1200001,20,20);
//cm.teachSkill(1200000,20,20);
//cm.teachSkill(1300000,20,20);
//cm.teachSkill(1300001,20,20);
//cm.teachSkill(3100000,20,20);
//cm.teachSkill(3200000,20,20);
//cm.teachSkill(4100000,20,20);
//cm.teachSkill(4200000,20,20); //End of mastery's
//cm.teachSkill(4201002,20,20);
//cm.teachSkill(4101003,20,20);
//cm.teachSkill(3201002,20,20);
//cm.teachSkill(3101002,20,20);
//cm.teachSkill(1301004,20,20);
//cm.teachSkill(1301005,20,20);
//cm.teachSkill(1201004,20,20);
//cm.teachSkill(1201005,20,20);
//cm.teachSkill(1101004,20,20); //End of boosters
//cm.teachSkill(1101006,20,20);
//cm.teachSkill(1201006,20,20);
//cm.teachSkill(1301006,20,20);
//cm.teachSkill(2101001,20,20);
//cm.teachSkill(2100000,20,20);
//cm.teachSkill(2101003,20,20);
//cm.teachSkill(2101002,20,20);
//cm.teachSkill(2201001,20,20);
//cm.teachSkill(2200000,20,20);
//cm.teachSkill(2201003,20,20);
//cm.teachSkill(2201002,20,20);
//cm.teachSkill(2301004,20,20);
//cm.teachSkill(2301003,20,20);
//cm.teachSkill(2300000,20,20);
//cm.teachSkill(2301001,20,20);
//cm.teachSkill(3101003,20,20);
//cm.teachSkill(3101004,20,20);
//cm.teachSkill(3201003,20,20);
//cm.teachSkill(3201004,20,20);
//cm.teachSkill(4100002,20,20);
//cm.teachSkill(4101004,20,20);
//cm.teachSkill(4200001,20,20);
//cm.teachSkill(4201003,20,20); //End of second-job skills and first-job
//cm.teachSkill(4211005,20,20);
//cm.teachSkill(4211003,20,20);
//cm.teachSkill(4210000,20,20);
//cm.teachSkill(4110000,20,20);
//cm.teachSkill(4111001,20,20);
//cm.teachSkill(4111003,20,20);
//cm.teachSkill(3210000,20,20);
//cm.teachSkill(3110000,20,20);
//cm.teachSkill(3210001,20,20);
//cm.teachSkill(3110001,20,20);
//cm.teachSkill(3211002,20,20);
//cm.teachSkill(3111002,20,20);
//cm.teachSkill(2210000,20,20);
//cm.teachSkill(2211004,20,20);
//cm.teachSkill(2211005,20,20);
//cm.teachSkill(2111005,20,20);
//cm.teachSkill(2111004,20,20);
//cm.teachSkill(2110000,20,20);
//cm.teachSkill(1311007,20,20);
//cm.teachSkill(1310000,20,20);
//cm.teachSkill(1311008,20,20);
//cm.teachSkill(1210001,20,20);
//cm.teachSkill(1211009,20,20);
//cm.teachSkill(1210000,20,20);
//cm.teachSkill(1110001,20,20);
//cm.teachSkill(1111007,20,20);
//cm.teachSkill(1110000,20,20); //End of 3rd job skills
//cm.teachSkill(1100003,30,30);
//cm.teachSkill(1100002,30,30);
//cm.teachSkill(1101007,30,30);
//cm.teachSkill(1200003,30,30);
//cm.teachSkill(1200002,30,30);
//cm.teachSkill(3100001,30,30);
//cm.teachSkill(1201007,30,30);
//cm.teachSkill(1300003,30,30);
//cm.teachSkill(1300002,30,30);
//cm.teachSkill(1301007,30,30);
//cm.teachSkill(2101004,30,30);
//cm.teachSkill(2101005,30,30);
//cm.teachSkill(2201004,30,30);
//cm.teachSkill(2201005,30,30);
//cm.teachSkill(2301002,30,30);
//cm.teachSkill(2301005,30,30);
//cm.teachSkill(3101005,30,30);
//cm.teachSkill(3201005,30,30);
//cm.teachSkill(4100001,30,30);
//cm.teachSkill(4101005,30,30);
//cm.teachSkill(4201005,30,30);
//cm.teachSkill(4201004,30,30);
//cm.teachSkill(1111006,30,30);
//cm.teachSkill(1111005,30,30);
//cm.teachSkill(1111002,30,30);
//cm.teachSkill(1111004,30,30);
//cm.teachSkill(1111003,30,30);
//cm.teachSkill(1111008,30,30);
//cm.teachSkill(1211006,30,30);
//cm.teachSkill(1211002,30,30);
//cm.teachSkill(1211004,30,30);
//cm.teachSkill(1211003,30,30);
//cm.teachSkill(1211005,30,30);
//cm.teachSkill(1211008,30,30);
//cm.teachSkill(1211007,30,30);
//cm.teachSkill(1311004,30,30);
//cm.teachSkill(1311003,30,30);
//cm.teachSkill(1311006,30,30);
//cm.teachSkill(1311002,30,30);
//cm.teachSkill(1311005,30,30);
//cm.teachSkill(1311001,30,30);
//cm.teachSkill(2110001,30,30);
//cm.teachSkill(2111006,30,30);
//cm.teachSkill(2111002,30,30);
//cm.teachSkill(2111003,30,30);
//cm.teachSkill(2210001,30,30);
//cm.teachSkill(2211006,30,30);
//cm.teachSkill(2211002,30,30);
//cm.teachSkill(2211003,30,30);
//cm.teachSkill(3111004,30,30);
//cm.teachSkill(3111003,30,30);
//cm.teachSkill(3111005,30,30);
//cm.teachSkill(3111006,30,30);
//cm.teachSkill(3211004,30,30);
//cm.teachSkill(3211003,30,30);
//cm.teachSkill(3211005,30,30);
//cm.teachSkill(3211006,30,30);
//cm.teachSkill(4111005,30,30);
//cm.teachSkill(4111006,20,20);
//cm.teachSkill(4111004,30,30);
//cm.teachSkill(4111002,30,30);
//cm.teachSkill(4211002,30,30);
//cm.teachSkill(4211004,30,30);
//cm.teachSkill(4211001,30,30);
//cm.teachSkill(4211006,30,30);


} else{
  cm.gainItem(1010001);
  }
  cm.dispose();
 }}}