/* 
 This file is part of the OdinMS Maple Story Server 
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>  
        Matthias Butz <matze@odinms.de> 
        Jan Christian Meyer <vimes@odinms.de> 
    This program is free software: you can redistribute it and/or modify 
    it under the terms of the GNU Affero General Public License as 
    published by the Free Software Foundation version 3 as published by 
    the Free Software Foundation. You may not use, modify or distribute 
    this program under any other version of the GNU Affero General Public 
    License. 
    This program is distributed in the hope that it will be useful, 
    but WITHOUT ANY WARRANTY; without even the implied warranty of 
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
    GNU Affero General Public License for more details. 
    You should have received a copy of the GNU Affero General Public License 
    along with this program.  If not, see <http://www.gnu.org/licenses/>. 
*/ 
/* Assistant Nancy 
 Warp to bottom (680000210) 
 located in Amoria (680000000) 
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
  if (status >= 2 && mode == 0) { 
   cm.sendOk("Peace out baby"); 
   cm.dispose(); 
   return; 
  } 
  if (mode == 1) 
   status++; 
  else 
   status--; 
  if (status == 0) { 
   cm.sendNext("Welcome to Fallen CitY~ I am Slippy's Bitch. He sent me here to work as a nun"); 
  } else if (status == 1) { 
   cm.sendNextPrev("Yeah..anyways so i'm guessing you're ready to make babies huh? Awesome just gimmmie a premium wedding ticket"); 
  } else if (status == 2) { 
   if (cm.haveItem(5251003)) { 
    cm.sendNext("Great, you have a ticket. I will warp you down here.\r\nHave a great wedding. Dont forget to fuck each other"); 
    cm.gainItem(5251003,-1); 
     
   } else { 
    cm.sendOk("YOU DONT HAVE A WEDDING TICKET LOL NOOB LOL WHAT NOW? YEAH OWNED BITCH!"); 
    status = 9; 
   } 
  } else if (status == 3) { 
   cm.warp(680000210, 2); 
    cm.changeMusic("BgmGL/cathedral"); 
   cm.mapMessage(5,"High Priest John: We gather here today to pay our love and respects towards these dearly beloved singles whom come forth as a union to signify their love towards each other. Entreat me not to leave you, or to return from following after you, For where you go I will go, and where you stay I will stay. Your people will be my people, and your God will be my God. And where you die, I will die and there I will be buried. May the Lord do with me and more if anything but death parts you from me."); 
   cm.gainItem(1112803,1); 
   cm.gainItem(1050113,1); 
   cm.gainItem(1050114,1); 
   cm.gainItem(1000029,1); 
   cm.gainItem(1081002,1); 
   cm.dispose(); 
  } 
 } 
} 