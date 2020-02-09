/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import handling.channel.ChannelServer;
import handling.channel.PlayerStorage;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import handling.world.PartyOperation;
import handling.world.World;
import java.io.PrintStream;
import java.util.Collection;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import scripting.EventInstanceManager;
import server.maps.Event_PyramidSubway;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class PartyHandler {
    public static final void DenyPartyRequest(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte action = slea.readByte();
        int partyid = slea.readInt();
        if (c.getPlayer().getParty() == null) {
            MapleParty party = World.Party.getParty(partyid);
            if (party != null) {
                MapleCharacter cfrom;
                if (action == 27) {
                    if (party.getMembers().size() < 6) {
                        World.Party.updateParty(partyid, PartyOperation.JOIN, new MaplePartyCharacter(c.getPlayer()));
                        c.getPlayer().receivePartyMemberHP();
                        c.getPlayer().updatePartyMemberHP();
                    } else {
                        c.getSession().write((Object)MaplePacketCreator.partyStatusMessage(17));
                    }
                } else if (action != 22 && (cfrom = c.getChannelServer().getPlayerStorage().getCharacterById(party.getLeader().getId())) != null) {
                    cfrom.getClient().getSession().write((Object)MaplePacketCreator.partyStatusMessage(23, c.getPlayer().getName()));
                }
            } else {
                c.getPlayer().dropMessage(5, "\u8981\u53c2\u52a0\u7684\u961f\u4f0d\u4e0d\u5b58\u5728\u3002");
            }
        } else {
            c.getPlayer().dropMessage(5, "\u60a8\u5df2\u7ecf\u6709\u4e00\u4e2a\u7ec4\u961f\uff0c\u65e0\u6cd5\u52a0\u5165\u5176\u4ed6\u7ec4\u961f!");
        }
    }

    public static final void PartyOperatopn(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte operation = slea.readByte();
        MapleParty party = c.getPlayer().getParty();
        MaplePartyCharacter partyplayer = new MaplePartyCharacter(c.getPlayer());
        switch (operation) {
            case 1: {
                if (c.getPlayer().getParty() == null) {
                    party = World.Party.createParty(partyplayer);
                    c.getPlayer().setParty(party);
                    c.getSession().write((Object)MaplePacketCreator.partyCreated(party.getId()));
                    break;
                }
                if (partyplayer.equals(party.getLeader()) && party.getMembers().size() == 1) {
                    c.getSession().write((Object)MaplePacketCreator.partyCreated(party.getId()));
                    break;
                }
                c.getPlayer().dropMessage(5, "\u4f60\u4e0d\u80fd\u521b\u5efa\u4e00\u4e2a\u7ec4\u961f,\u56e0\u4e3a\u4f60\u5df2\u7ecf\u5b58\u5728\u4e00\u4e2a\u961f\u4f0d\u4e2d");
                break;
            }
            case 2: {
                if (party == null) break;
                if (partyplayer.equals(party.getLeader())) {
                    World.Party.updateParty(party.getId(), PartyOperation.DISBAND, partyplayer);
                    if (c.getPlayer().getEventInstance() != null) {
                        c.getPlayer().getEventInstance().disbandParty();
                    }
                    if (c.getPlayer().getPyramidSubway() != null) {
                        c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                    }
                } else {
                    World.Party.updateParty(party.getId(), PartyOperation.LEAVE, partyplayer);
                    if (c.getPlayer().getEventInstance() != null) {
                        c.getPlayer().getEventInstance().leftParty(c.getPlayer());
                    }
                    if (c.getPlayer().getPyramidSubway() != null) {
                        c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                    }
                }
                c.getPlayer().setParty(null);
                break;
            }
            case 3: {
                int partyid = slea.readInt();
                if (c.getPlayer().getParty() == null) {
                    party = World.Party.getParty(partyid);
                    if (party != null) {
                        if (party.getMembers().size() < 6) {
                            World.Party.updateParty(party.getId(), PartyOperation.JOIN, partyplayer);
                            c.getPlayer().receivePartyMemberHP();
                            c.getPlayer().updatePartyMemberHP();
                            break;
                        }
                        c.getSession().write((Object)MaplePacketCreator.partyStatusMessage(17));
                        break;
                    }
                    c.getPlayer().dropMessage(5, "\u8981\u52a0\u5165\u7684\u961f\u4f0d\u4e0d\u5b58\u5728");
                    break;
                }
                c.getPlayer().dropMessage(5, "\u4f60\u4e0d\u80fd\u521b\u5efa\u4e00\u4e2a\u7ec4\u961f,\u56e0\u4e3a\u4f60\u5df2\u7ecf\u5b58\u5728\u4e00\u4e2a\u961f\u4f0d\u4e2d");
                break;
            }
            case 4: {
                MapleCharacter invited = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                if (invited != null) {
                    if (invited.getParty() == null && party != null) {
                        if (party.getMembers().size() >= 6) break;
                        invited.getClient().getSession().write((Object)MaplePacketCreator.partyInvite(c.getPlayer()));
                        break;
                    }
                    c.getSession().write((Object)MaplePacketCreator.partyStatusMessage(16));
                    break;
                }
                c.getSession().write((Object)MaplePacketCreator.partyStatusMessage(18));
                break;
            }
            case 5: {
                MaplePartyCharacter expelled;
                if (!partyplayer.equals(party.getLeader()) || (expelled = party.getMemberById(slea.readInt())) == null) break;
                World.Party.updateParty(party.getId(), PartyOperation.EXPEL, expelled);
                if (c.getPlayer().getEventInstance() != null && expelled.isOnline()) {
                    c.getPlayer().getEventInstance().disbandParty();
                }
                if (c.getPlayer().getPyramidSubway() == null || !expelled.isOnline()) break;
                c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                break;
            }
            case 6: {
                if (party == null) break;
                MaplePartyCharacter newleader = party.getMemberById(slea.readInt());
                if (newleader != null && partyplayer.equals(party.getLeader())) {
                    World.Party.updateParty(party.getId(), PartyOperation.CHANGE_LEADER, newleader);
                }
                c.getSession().write((Object)MaplePacketCreator.enableActions());
                break;
            }
            default: {
                System.out.println("Unhandled Party function." + operation);
            }
        }
    }
}

