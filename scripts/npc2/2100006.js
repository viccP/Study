/* KIN
annfine製作-銀行系統測試版-Memory修正
*/
var status = 0;
var t=new Array("存錢","取錢","查看","開戶");
//var money=new Array("100W","300W","500W","1000W"); 
//var money1=new Array("1000000","3000000","5000000","10000000"); 
var x=0;
function start() {
status = -1;
action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
      cm.dispose();
    } else {
          if (mode == 0 && status == 0) {
          cm.dispose();
          return;
      }
      if (mode == 1)
      status++;
      else
      status--;
      if (status == 0) 
      {
        cm.sendNext("歡迎使用 #b小馬銀行系統#k 我的朋友!"); 
      } 
      else if (status == 1) { 
        var a = "請選擇你需要的功能.#b"; 
                    for (var i=0; i < t.length; i++) { 
                    a += "\r\n#L" + i + "#" + t[ i ]+""; 
                    } 
                  cm.sendSimple(a); 
        }
      else if(status == 2)
      {
            x=selection;
          if(x==2)
          {
            cm.sendOk("您的存款有#r"+cm.getMoney()+"#k元");
            cm.dispose();
          }
          else if (x==3)
            {
                if(cm.addBank()>0)
                {
                    cm.sendOk("恭喜您,開戶成功!"); 
                    }
                    else
                    {
                        cm.sendOk("很抱歉,開戶失敗!可能您已經開戶過了哦!");
                    }
                    cm.dispose();
            }
          else
          {
          
          cm.sendGetText("你想要存/領多少錢呢?#r注意! 如果提款身上錢超過21e,領出來最多還是21e,多餘的皆會被回收");
          }
      }
      else if (status == 3) { 
          var choose=cm.getText();
          if(x==0)//存 
            { 
            if(cm.getMeso()<choose)
            {
                cm.sendOk("Oh,Sorry,您的錢不夠!");    
            }
            else if(cm.addMoney(choose,0)>0)
                {
                cm.gainMeso(-choose);
                cm.sendOk("好的,已經存入!");
                }
                else
                {
                cm.sendOk("不好意思妳尚未開戶唷!或是銀行錢超過21E~");

                }
                cm.dispose();
            } 
            else if(x==1)//取 
            { 
            if(cm.getMoney()<choose)
            {
                cm.sendOk("Oh,Sorry,您存款沒有那麼多呢!");    
            }
                else if(cm.addMoney(-choose,1)>0)
                {
                cm.gainMeso(choose);
                cm.sendOk("好的,請收好您的錢!");
                }
                else
                {
                cm.sendOk("不好意思妳尚未開戶唷!或是銀行錢超過21E~");
                }
                cm.dispose();
              }
            
      
      }
      else
      {
      cm.dispose();
      }
    }
}