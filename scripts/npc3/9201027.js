importPackage(net.sf.cherry.client); 


var wui = 0; function start() { 
cm.sendYesNo("��������ȥ��"); 
} 

function action(mode, type,selection) { 

if (mode == 0 || wui == 1) { 
cm.dispose(); 
} 
else 
{ 
wui = 1;    
        cm.warp(100000000,0);
        m.dispose();
    }
}
