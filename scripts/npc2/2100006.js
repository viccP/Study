/* KIN
annfine�s�@-�Ȧ�t�δ��ժ�-Memory�ץ�
*/
var status = 0;
var t=new Array("�s��","����","�d��","�}��");
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
        cm.sendNext("�w��ϥ� #b�p���Ȧ�t��#k �ڪ��B��!"); 
      } 
      else if (status == 1) { 
        var a = "�п�ܧA�ݭn���\��.#b"; 
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
            cm.sendOk("�z���s�ڦ�#r"+cm.getMoney()+"#k��");
            cm.dispose();
          }
          else if (x==3)
            {
                if(cm.addBank()>0)
                {
                    cm.sendOk("���߱z,�}�ᦨ�\!"); 
                    }
                    else
                    {
                        cm.sendOk("�ܩ�p,�}�ᥢ��!�i��z�w�g�}��L�F�@!");
                    }
                    cm.dispose();
            }
          else
          {
          
          cm.sendGetText("�A�Q�n�s/��h�ֿ��O?#r�`�N! �p�G���ڨ��W���W�L21e,��X�ӳ̦h�٬O21e,�h�l���ҷ|�Q�^��");
          }
      }
      else if (status == 3) { 
          var choose=cm.getText();
          if(x==0)//�s 
            { 
            if(cm.getMeso()<choose)
            {
                cm.sendOk("Oh,Sorry,�z��������!");    
            }
            else if(cm.addMoney(choose,0)>0)
                {
                cm.gainMeso(-choose);
                cm.sendOk("�n��,�w�g�s�J!");
                }
                else
                {
                cm.sendOk("���n�N��p�|���}���!�άO�Ȧ���W�L21E~");

                }
                cm.dispose();
            } 
            else if(x==1)//�� 
            { 
            if(cm.getMoney()<choose)
            {
                cm.sendOk("Oh,Sorry,�z�s�ڨS������h�O!");    
            }
                else if(cm.addMoney(-choose,1)>0)
                {
                cm.gainMeso(choose);
                cm.sendOk("�n��,�Ц��n�z����!");
                }
                else
                {
                cm.sendOk("���n�N��p�|���}���!�άO�Ȧ���W�L21E~");
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