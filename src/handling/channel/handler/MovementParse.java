/*
 * Decompiled with CFR 0.148.
 */
package handling.channel.handler;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import client.MapleCharacter;
import server.maps.AnimatedMapleMapObject;
import server.maps.FakeCharacter;
import server.movement.AbsoluteLifeMovement;
import server.movement.AranMovement;
import server.movement.BounceMovement;
import server.movement.ChairMovement;
import server.movement.ChangeEquipSpecialAwesome;
import server.movement.JumpDownMovement;
import server.movement.LifeMovement;
import server.movement.LifeMovementFragment;
import server.movement.RelativeLifeMovement;
import server.movement.TeleportMovement;
import tools.data.input.SeekableLittleEndianAccessor;

public class MovementParse {
    public static final List<LifeMovementFragment> parseMovement(SeekableLittleEndianAccessor lea, int kind, MapleCharacter chr) {
        ArrayList<LifeMovementFragment> res = new ArrayList<LifeMovementFragment>();
        byte numCommands = lea.readByte();
//        String 类型 = "";
//        if (kind == 1) {
//            类型 = "角色移动";
//        } else if (kind == 2) {
//            类型 = "怪物移动";
//        } else if (kind == 3) {
//            类型 = "宠物移动";
//        } else if (kind == 4) {
//            类型 = "召唤兽移动";
//        } else if (kind == 5) {
//            类型 = "龙移动";
//        }
        block10: for (byte i = 0; i < numCommands; i = (byte)(i + 1)) {
            byte command = lea.readByte();
            if (chr.hasFakeChar()) {
                for (FakeCharacter ch : chr.getFakeChars()) {
                    if (!ch.follow() || ch.getFakeChar().getMap() != chr.getMap() || command != 0) continue;
                    return null;
                }
            }
            switch (command) {
                case -1: {
                    short xpos = lea.readShort();
                    short ypos = lea.readShort();
                    short unk = lea.readShort();
                    short fh = lea.readShort();
                    byte newstate = lea.readByte();
                    short duration = lea.readShort();
                    BounceMovement bm = new BounceMovement(command, new Point(xpos, ypos), duration, newstate);
                    bm.setFH(fh);
                    bm.setUnk(unk);
                    res.add(bm);
                    continue block10;
                }
                case 0: 
                case 5: 
                case 17: {
                    short xpos = lea.readShort();
                    short ypos = lea.readShort();
                    short xwobble = lea.readShort();
                    short ywobble = lea.readShort();
                    short unk = lea.readShort();
                    byte newstate = lea.readByte();
                    short duration = lea.readShort();
                    AbsoluteLifeMovement alm = new AbsoluteLifeMovement(command, new Point(xpos, ypos), duration, newstate);
                    alm.setUnk(unk);
                    alm.setPixelsPerSecond(new Point(xwobble, ywobble));
                    res.add(alm);
                    continue block10;
                }
                case 1: 
                case 2: 
                case 6: 
                case 12: 
                case 13: 
                case 16: {
                    short xmod = lea.readShort();
                    short ymod = lea.readShort();
                    byte newstate = lea.readByte();
                    short duration = lea.readShort();
                    RelativeLifeMovement rlm = new RelativeLifeMovement(command, new Point(xmod, ymod), duration, newstate);
                    res.add(rlm);
                    continue block10;
                }
                case 3: 
                case 4: 
                case 7: 
                case 8: 
                case 9: 
                case 14: {
                    short xpos = lea.readShort();
                    short ypos = lea.readShort();
                    short xwobble = lea.readShort();
                    short ywobble = lea.readShort();
                    byte newstate = lea.readByte();
                    TeleportMovement tm = new TeleportMovement(command, new Point(xpos, ypos), newstate);
                    tm.setPixelsPerSecond(new Point(xwobble, ywobble));
                    res.add(tm);
                    continue block10;
                }
                case 10: {
                    res.add(new ChangeEquipSpecialAwesome(command, lea.readByte()));
                    continue block10;
                }
                case 11: {
                    short xpos = lea.readShort();
                    short ypos = lea.readShort();
                    short unk = lea.readShort();
                    byte newstate = lea.readByte();
                    short duration = lea.readShort();
                    ChairMovement cm = new ChairMovement(command, new Point(xpos, ypos), duration, newstate);
                    cm.setUnk(unk);
                    res.add(cm);
                    continue block10;
                }
                case 15: {
                    short xpos = lea.readShort();
                    short ypos = lea.readShort();
                    short xwobble = lea.readShort();
                    short ywobble = lea.readShort();
                    short unk = lea.readShort();
                    short fh = lea.readShort();
                    byte newstate = lea.readByte();
                    short duration = lea.readShort();
                    JumpDownMovement jdm = new JumpDownMovement(command, new Point(xpos, ypos), duration, newstate);
                    jdm.setUnk(unk);
                    jdm.setPixelsPerSecond(new Point(xwobble, ywobble));
                    jdm.setFH(fh);
                    res.add(jdm);
                    continue block10;
                }
                case 20: 
                case 21: 
                case 22: {
                    short unk = lea.readShort();
                    byte newstate = lea.readByte();
                    AranMovement acm = new AranMovement(command, new Point(0, 0), unk, newstate);
                    res.add(acm);
                }
                default: {
                    return null;
                }
            }
        }
        if (numCommands != res.size()) {
            return null;
        }
        return res;
    }

    public static final void updatePosition(List<LifeMovementFragment> movement, AnimatedMapleMapObject target, int yoffset) {
        for (LifeMovementFragment move : movement) {
            if (!(move instanceof LifeMovement)) continue;
            if (move instanceof AbsoluteLifeMovement) {
                Point position = ((LifeMovement)move).getPosition();
                position.y += yoffset;
                target.setPosition(position);
            }
            target.setStance(((LifeMovement)move).getNewstate());
        }
    }
}