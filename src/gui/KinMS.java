/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.CloseFuture
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package gui;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Equip;
import client.inventory.IItem;
import client.inventory.ItemFlag;
import client.inventory.MapleInventoryType;
import constants.GameConstants;
import handling.RecvPacketOpcode;
import handling.SendPacketOpcode;
import handling.channel.ChannelServer;
import handling.channel.PlayerStorage;
import handling.world.World;
import java.awt.Canvas;
import java.awt.Component;
import java.awt.Container;
import java.awt.EventQueue;
import java.awt.Image;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.PrintStream;
import java.net.URL;
import java.util.Collection;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.GroupLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTabbedPane;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.LayoutStyle;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import org.apache.mina.common.CloseFuture;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import scripting.PortalScriptManager;
import scripting.ReactorScriptManager;
import server.CashItemFactory;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleShopFactory;
import server.ShutdownServer;
import server.Start;
import server.Timer;
import server.life.MapleMonsterInformationProvider;
import server.quest.MapleQuest;
import tools.MaplePacketCreator;

public class KinMS
extends JFrame {
    private static KinMS instance = new KinMS();
    private static ScheduledFuture<?> ts = null;
    private int minutesLeft = 0;
    private static Thread t = null;
    private Canvas canvas1;
    private JTextPane chatLog;
    private JButton jButton1;
    private JButton jButton10;
    private JButton jButton11;
    private JButton jButton12;
    private JButton jButton13;
    private JButton jButton14;
    private JButton jButton15;
    private JButton jButton16;
    private JButton jButton2;
    private JButton jButton3;
    private JButton jButton4;
    private JButton jButton5;
    private JButton jButton6;
    private JButton jButton7;
    private JButton jButton8;
    private JButton jButton9;
    private JLabel jLabel1;
    private JLabel jLabel2;
    private JPanel jPanel1;
    private JPanel jPanel2;
    private JPanel jPanel5;
    private JPanel jPanel6;
    private JPanel jPanel7;
    private JPanel jPanel8;
    private JScrollPane jScrollPane1;
    private JTabbedPane jTabbedPane2;
    private JTextField jTextField1;
    private JTextField jTextField10;
    private JTextField jTextField11;
    private JTextField jTextField12;
    private JTextField jTextField13;
    private JTextField jTextField14;
    private JTextField jTextField15;
    private JTextField jTextField16;
    private JTextField jTextField17;
    private JTextField jTextField18;
    private JTextField jTextField19;
    private JTextField jTextField2;
    private JTextField jTextField20;
    private JTextField jTextField21;
    private JTextField jTextField22;
    private JTextField jTextField3;
    private JTextField jTextField4;
    private JTextField jTextField5;
    private JTextField jTextField6;
    private JTextField jTextField7;
    private JTextField jTextField8;
    private JTextField jTextField9;

    public static final KinMS getInstance() {
        return instance;
    }

    public KinMS() {
        ImageIcon icon = new ImageIcon(this.getClass().getClassLoader().getResource("gui/Icon.png"));
        this.setIconImage(icon.getImage());
        this.setTitle("KinMS\u670d\u52a1\u7aef\u540e\u53f0\u7ba1\u7406\u5de5\u5177    \u670d\u52a1\u7aef\u7248\u672c\u4e3a\uff1aVer.0.79");
        this.initComponents();
    }

    private void initComponents() {
        this.canvas1 = new Canvas();
        this.jScrollPane1 = new JScrollPane();
        this.chatLog = new JTextPane();
        this.jTabbedPane2 = new JTabbedPane();
        this.jPanel5 = new JPanel();
        this.jButton10 = new JButton();
        this.jTextField22 = new JTextField();
        this.jButton16 = new JButton();
        this.jPanel7 = new JPanel();
        this.jButton7 = new JButton();
        this.jButton8 = new JButton();
        this.jLabel2 = new JLabel();
        this.jPanel6 = new JPanel();
        this.jButton9 = new JButton();
        this.jButton1 = new JButton();
        this.jButton5 = new JButton();
        this.jButton4 = new JButton();
        this.jButton3 = new JButton();
        this.jButton2 = new JButton();
        this.jLabel1 = new JLabel();
        this.jButton6 = new JButton();
        this.jButton12 = new JButton();
        this.jPanel8 = new JPanel();
        this.jButton11 = new JButton();
        this.jTextField1 = new JTextField();
        this.jPanel1 = new JPanel();
        this.jTextField2 = new JTextField();
        this.jButton13 = new JButton();
        this.jTextField3 = new JTextField();
        this.jTextField4 = new JTextField();
        this.jButton14 = new JButton();
        this.jTextField5 = new JTextField();
        this.jTextField6 = new JTextField();
        this.jTextField7 = new JTextField();
        this.jTextField8 = new JTextField();
        this.jTextField9 = new JTextField();
        this.jTextField10 = new JTextField();
        this.jTextField11 = new JTextField();
        this.jTextField12 = new JTextField();
        this.jTextField13 = new JTextField();
        this.jTextField14 = new JTextField();
        this.jTextField15 = new JTextField();
        this.jTextField16 = new JTextField();
        this.jTextField17 = new JTextField();
        this.jTextField18 = new JTextField();
        this.jTextField19 = new JTextField();
        this.jPanel2 = new JPanel();
        this.jTextField20 = new JTextField();
        this.jTextField21 = new JTextField();
        this.jButton15 = new JButton();
        this.setDefaultCloseOperation(3);
        this.jScrollPane1.setViewportView(this.chatLog);
        this.jButton10.setText("\u542f\u52a8\u670d\u52a1\u7aef");
        this.jButton10.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton10ActionPerformed(evt);
            }
        });
        this.jTextField22.setText("\u5173\u95ed\u670d\u52a1\u5668\u5012\u6570\u65f6\u95f4");
        this.jTextField22.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jTextField22ActionPerformed(evt);
            }
        });
        this.jButton16.setText("\u5173\u95ed\u670d\u52a1\u5668");
        this.jButton16.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton16ActionPerformed(evt);
            }
        });
        GroupLayout jPanel5Layout = new GroupLayout(this.jPanel5);
        this.jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(jPanel5Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel5Layout.createSequentialGroup().addContainerGap().addGroup(jPanel5Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(this.jButton10).addGroup(jPanel5Layout.createSequentialGroup().addComponent(this.jTextField22, -2, -1, -2).addGap(18, 18, 18).addComponent(this.jButton16))).addContainerGap(343, 32767)));
        jPanel5Layout.setVerticalGroup(jPanel5Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel5Layout.createSequentialGroup().addContainerGap().addComponent(this.jButton10).addGap(18, 18, 18).addGroup(jPanel5Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField22, -2, -1, -2).addComponent(this.jButton16)).addContainerGap(162, 32767)));
        this.jTabbedPane2.addTab("\u670d\u52a1\u5668\u914d\u7f6e", this.jPanel5);
        this.jButton7.setText("\u4fdd\u5b58\u6570\u636e");
        this.jButton7.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton7ActionPerformed(evt);
            }
        });
        this.jButton8.setText("\u4fdd\u5b58\u96c7\u4f63");
        this.jButton8.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton8ActionPerformed(evt);
            }
        });
        this.jLabel2.setText("\u4fdd\u5b58\u7cfb\u5217\uff1a");
        GroupLayout jPanel7Layout = new GroupLayout(this.jPanel7);
        this.jPanel7.setLayout(jPanel7Layout);
        jPanel7Layout.setHorizontalGroup(jPanel7Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel7Layout.createSequentialGroup().addContainerGap().addGroup(jPanel7Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(this.jLabel2).addGroup(jPanel7Layout.createSequentialGroup().addComponent(this.jButton7).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton8))).addContainerGap(400, 32767)));
        jPanel7Layout.setVerticalGroup(jPanel7Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel7Layout.createSequentialGroup().addContainerGap().addComponent(this.jLabel2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addGroup(jPanel7Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton7).addComponent(this.jButton8)).addContainerGap(182, 32767)));
        this.jTabbedPane2.addTab("\u4fdd\u5b58\u6570\u636e", this.jPanel7);
        this.jButton9.setText("\u91cd\u8f7d\u4efb\u52a1");
        this.jButton9.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton9ActionPerformed(evt);
            }
        });
        this.jButton1.setText("\u91cd\u8f7d\u526f\u672c");
        this.jButton1.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton1ActionPerformed(evt);
            }
        });
        this.jButton5.setText("\u91cd\u8f7d\u7206\u7387");
        this.jButton5.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton5ActionPerformed(evt);
            }
        });
        this.jButton4.setText("\u91cd\u8f7d\u5546\u5e97");
        this.jButton4.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton4ActionPerformed(evt);
            }
        });
        this.jButton3.setText("\u91cd\u8f7d\u4f20\u9001\u95e8");
        this.jButton3.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton3ActionPerformed(evt);
            }
        });
        this.jButton2.setText("\u91cd\u8f7d\u53cd\u5e94\u5806");
        this.jButton2.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton2ActionPerformed(evt);
            }
        });
        this.jLabel1.setText("\u91cd\u8f7d\u7cfb\u5217\uff1a");
        this.jButton6.setText("\u91cd\u8f7d\u5305\u5934");
        this.jButton6.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton6ActionPerformed(evt);
            }
        });
        this.jButton12.setText("\u91cd\u8f7d\u5546\u57ce");
        this.jButton12.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton12ActionPerformed(evt);
            }
        });
        GroupLayout jPanel6Layout = new GroupLayout(this.jPanel6);
        this.jPanel6.setLayout(jPanel6Layout);
        jPanel6Layout.setHorizontalGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel6Layout.createSequentialGroup().addContainerGap().addGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(this.jLabel1).addGroup(jPanel6Layout.createSequentialGroup().addComponent(this.jButton1).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton5).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton3)).addGroup(jPanel6Layout.createSequentialGroup().addComponent(this.jButton9).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton4)).addGroup(jPanel6Layout.createSequentialGroup().addComponent(this.jButton6).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton12))).addContainerGap(202, 32767)));
        jPanel6Layout.setVerticalGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel6Layout.createSequentialGroup().addContainerGap().addComponent(this.jLabel1).addGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton3).addComponent(this.jButton2)).addGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton1).addComponent(this.jButton5))).addPreferredGap(LayoutStyle.ComponentPlacement.UNRELATED).addGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton9).addComponent(this.jButton4)).addGap(10, 10, 10).addGroup(jPanel6Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton6).addComponent(this.jButton12)).addContainerGap(122, 32767)));
        this.jTabbedPane2.addTab("\u91cd\u8f7d\u7cfb\u5217", this.jPanel6);
        this.jButton11.setText("\u89e3\u5361\u73a9\u5bb6");
        this.jButton11.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton11ActionPerformed(evt);
            }
        });
        this.jTextField1.setText("\u8f93\u5165\u73a9\u5bb6\u540d\u5b57");
        this.jTextField1.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jTextField1ActionPerformed(evt);
            }
        });
        GroupLayout jPanel8Layout = new GroupLayout(this.jPanel8);
        this.jPanel8.setLayout(jPanel8Layout);
        jPanel8Layout.setHorizontalGroup(jPanel8Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel8Layout.createSequentialGroup().addContainerGap().addComponent(this.jTextField1, -2, 124, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton11).addContainerGap(357, 32767)));
        jPanel8Layout.setVerticalGroup(jPanel8Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel8Layout.createSequentialGroup().addContainerGap().addGroup(jPanel8Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField1, -2, -1, -2).addComponent(this.jButton11)).addContainerGap(203, 32767)));
        this.jTabbedPane2.addTab("\u5361\u53f7\u5904\u7406", this.jPanel8);
        this.jTextField2.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jTextField2ActionPerformed(evt);
            }
        });
        this.jButton13.setText("\u516c\u544a\u53d1\u5e03");
        this.jButton13.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton13ActionPerformed(evt);
            }
        });
        this.jTextField3.setText("\u73a9\u5bb6\u540d\u5b57");
        this.jTextField4.setText("\u7269\u54c1ID");
        this.jButton14.setText("\u7ed9\u4e88\u7269\u54c1");
        this.jButton14.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton14ActionPerformed(evt);
            }
        });
        this.jTextField5.setText("\u6570\u91cf");
        this.jTextField6.setText("\u529b\u91cf");
        this.jTextField7.setText("\u654f\u6377");
        this.jTextField8.setText("\u667a\u529b");
        this.jTextField9.setText("\u8fd0\u6c14");
        this.jTextField10.setText("HP\u8bbe\u7f6e");
        this.jTextField11.setText("MP\u8bbe\u7f6e");
        this.jTextField12.setText("\u52a0\u5377\u6b21\u6570");
        this.jTextField13.setText("\u5236\u4f5c\u4eba");
        this.jTextField14.setText("\u7ed9\u4e88\u7269\u54c1\u65f6\u95f4");
        this.jTextField15.setText("\u53ef\u4ee5\u4ea4\u6613");
        this.jTextField16.setText("\u653b\u51fb\u529b");
        this.jTextField17.setText("\u9b54\u6cd5\u529b");
        this.jTextField18.setText("\u7269\u7406\u9632\u5fa1");
        this.jTextField19.setText("\u9b54\u6cd5\u9632\u5fa1");
        GroupLayout jPanel1Layout = new GroupLayout(this.jPanel1);
        this.jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel1Layout.createSequentialGroup().addContainerGap().addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jTextField2, -1, 459, 32767).addGap(18, 18, 18).addComponent(this.jButton13)).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jTextField3, -2, 92, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jTextField4, -2, 77, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jTextField5, -2, 52, -2)).addGroup(jPanel1Layout.createSequentialGroup().addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING, false).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jTextField9, -2, 58, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jTextField13)).addGroup(GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup().addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.TRAILING).addComponent(this.jTextField8).addComponent(this.jTextField7)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING, false).addComponent(this.jTextField11, -2, 79, -2).addComponent(this.jTextField12, -2, 79, -2))).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jTextField6, -2, 58, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jTextField10, -2, 79, -2))).addPreferredGap(LayoutStyle.ComponentPlacement.UNRELATED).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING, false).addComponent(this.jTextField16).addComponent(this.jTextField15).addComponent(this.jTextField14).addComponent(this.jTextField17)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING, false).addComponent(this.jButton14, -1, -1, 32767).addComponent(this.jTextField18).addComponent(this.jTextField19)))).addContainerGap()));
        jPanel1Layout.setVerticalGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel1Layout.createSequentialGroup().addContainerGap().addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField2, -2, -1, -2).addComponent(this.jButton13)).addGap(18, 18, 18).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField3, -2, -1, -2).addComponent(this.jTextField4, -2, -1, -2).addComponent(this.jTextField5, -2, -1, -2)).addPreferredGap(LayoutStyle.ComponentPlacement.UNRELATED).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField6, -2, -1, -2).addComponent(this.jTextField10, -2, -1, -2).addComponent(this.jTextField14, -2, -1, -2).addComponent(this.jTextField18, -2, -1, -2)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField7, -2, -1, -2).addComponent(this.jTextField11, -2, -1, -2).addComponent(this.jTextField15, -2, -1, -2).addComponent(this.jTextField19, -2, -1, -2)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField8, -2, -1, -2).addComponent(this.jTextField12, -2, -1, -2).addComponent(this.jTextField16, -2, -1, -2)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField9, -2, -1, -2).addComponent(this.jTextField13, -2, -1, -2).addComponent(this.jTextField17, -2, -1, -2).addComponent(this.jButton14)).addContainerGap(50, 32767)));
        this.jTabbedPane2.addTab("\u6307\u4ee4/\u516c\u544a", this.jPanel1);
        this.jTextField20.setText("\u8f93\u5165\u6570\u91cf");
        this.jTextField20.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jTextField20ActionPerformed(evt);
            }
        });
        this.jTextField21.setText("1\u70b9\u5377/2\u62b5\u7528/3\u91d1\u5e01/4\u7ecf\u9a8c");
        this.jButton15.setText("\u53d1\u653e\u5168\u670d\u70b9\u5377/\u62b5\u7528\u5377/\u91d1\u5e01/\u7ecf\u9a8c");
        this.jButton15.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                KinMS.this.jButton15ActionPerformed(evt);
            }
        });
        GroupLayout jPanel2Layout = new GroupLayout(this.jPanel2);
        this.jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(jPanel2Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel2Layout.createSequentialGroup().addContainerGap().addComponent(this.jTextField20, -2, 88, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jTextField21, -2, -1, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton15).addContainerGap(117, 32767)));
        jPanel2Layout.setVerticalGroup(jPanel2Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel2Layout.createSequentialGroup().addContainerGap().addGroup(jPanel2Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jTextField20, -2, -1, -2).addComponent(this.jTextField21, -2, -1, -2).addComponent(this.jButton15)).addContainerGap(203, 32767)));
        this.jTabbedPane2.addTab("\u5956\u52b1\u7cfb\u5217", this.jPanel2);
        GroupLayout layout = new GroupLayout(this.getContentPane());
        this.getContentPane().setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(this.jScrollPane1).addGroup(layout.createSequentialGroup().addContainerGap(-1, 32767).addComponent(this.canvas1, -2, -1, -2)).addComponent(this.jTabbedPane2, -2, 583, -2));
        layout.setVerticalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addComponent(this.jTabbedPane2).addGap(5, 5, 5).addComponent(this.canvas1, -2, -1, -2).addGap(20, 20, 20).addComponent(this.jScrollPane1, -2, 93, -2).addContainerGap()));
        this.pack();
    }

    private void jButton1ActionPerformed(ActionEvent evt) {
        for (ChannelServer instance1 : ChannelServer.getAllInstances()) {
            if (instance1 == null) continue;
            instance1.reloadEvents();
        }
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u526f\u672c\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u526f\u672c\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton5ActionPerformed(ActionEvent evt) {
        MapleMonsterInformationProvider.getInstance().clearDrops();
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u7206\u7387\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u7206\u7387\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton6ActionPerformed(ActionEvent evt) {
        SendPacketOpcode.reloadValues();
        RecvPacketOpcode.reloadValues();
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u5305\u5934\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u5305\u5934\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton3ActionPerformed(ActionEvent evt) {
        PortalScriptManager.getInstance().clearScripts();
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u4f20\u9001\u95e8\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u4f20\u9001\u95e8\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton4ActionPerformed(ActionEvent evt) {
        MapleShopFactory.getInstance().clear();
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u5546\u5e97\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u5546\u5e97\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton2ActionPerformed(ActionEvent evt) {
        ReactorScriptManager.getInstance().clearDrops();
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u53cd\u5e94\u5806\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u53cd\u5e94\u5806\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton9ActionPerformed(ActionEvent evt) {
        MapleQuest.clearQuests();
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u4efb\u52a1\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u4efb\u52a1\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton8ActionPerformed(ActionEvent evt) {
        int p = 0;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            ++p;
            cserv.closeAllMerchants();
        }
        String \u8f93\u51fa = "[\u4fdd\u5b58\u96c7\u4f63\u5546\u4eba\u7cfb\u7edf] \u96c7\u4f63\u5546\u4eba\u4fdd\u5b58" + p + "\u4e2a\u9891\u9053\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u96c7\u4f63\u5546\u4eba\u4fdd\u5b58" + p + "\u4e2a\u9891\u9053\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton7ActionPerformed(ActionEvent evt) {
        int p = 0;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                ++p;
                chr.saveToDB(true, true);
            }
        }
        String \u8f93\u51fa = "[\u4fdd\u5b58\u6570\u636e\u7cfb\u7edf] \u4fdd\u5b58" + p + "\u4e2a\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, \u8f93\u51fa);
        this.printChatLog(\u8f93\u51fa);
    }

    private void jButton10ActionPerformed(ActionEvent evt) {
        try {
            Start.instance.startServer();
            String \u8f93\u51fa = "[\u670d\u52a1\u5668] \u670d\u52a1\u5668\u542f\u52a8\u6210\u529f\uff01";
            this.printChatLog(\u8f93\u51fa);
        }
        catch (InterruptedException ex) {
            Logger.getLogger(KinMS.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void jTextField1ActionPerformed(ActionEvent evt) {
    }

    private void jButton11ActionPerformed(ActionEvent evt) {
        this.sendNotice(0);
    }

    private void jButton12ActionPerformed(ActionEvent evt) {
        CashItemFactory.getInstance().clearCashShop();
        String \u8f93\u51fa = "[\u91cd\u8f7d\u7cfb\u7edf] \u5546\u57ce\u91cd\u8f7d\u6210\u529f\u3002";
        JOptionPane.showMessageDialog(null, "\u5546\u57ce\u91cd\u8f7d\u6210\u529f\u3002");
        this.printChatLog(\u8f93\u51fa);
    }

    private void jTextField2ActionPerformed(ActionEvent evt) {
    }

    private void jButton13ActionPerformed(ActionEvent evt) {
        this.sendNoticeGG();
    }

    private void jButton14ActionPerformed(ActionEvent evt) {
        this.\u5237\u7269\u54c1();
    }

    private void jTextField20ActionPerformed(ActionEvent evt) {
    }

    private void jButton15ActionPerformed(ActionEvent evt) {
        this.\u7ed9\u5168\u670d\u70b9\u5377();
    }

    private void jButton16ActionPerformed(ActionEvent evt) {
        this.\u91cd\u542f\u670d\u52a1\u5668();
    }

    private void jTextField22ActionPerformed(ActionEvent evt) {
    }

    private void \u91cd\u542f\u670d\u52a1\u5668() {
        try {
            String \u8f93\u51fa = "\u5173\u95ed\u670d\u52a1\u5668\u5012\u6570\u65f6\u95f4";
            this.minutesLeft = Integer.parseInt(this.jTextField22.getText());
            if (!(ts != null || t != null && t.isAlive())) {
                t = new Thread(ShutdownServer.getInstance());
                ts = Timer.EventTimer.getInstance().register(new Runnable(){

                    @Override
                    public void run() {
                        if (KinMS.this.minutesLeft == 0) {
                            ShutdownServer.getInstance();
                            t.start();
                            ts.cancel(false);
                            return;
                        }
                        World.Broadcast.broadcastMessage(MaplePacketCreator.serverNotice(0, "\u672c\u79c1\u670d\u5668\u5c07\u5728 " + KinMS.this.minutesLeft + "\u5206\u9418\u5f8c\u95dc\u9589. \u8acb\u76e1\u901f\u95dc\u9589\u96c7\u4f63\u5546\u4eba \u4e26\u4e0b\u7dda.").getBytes());
                        System.out.println("\u672c\u79c1\u670d\u5668\u5c07\u5728 " + KinMS.this.minutesLeft + "\u5206\u9418\u5f8c\u95dc\u9589.");
                        KinMS.this.minutesLeft--;
                    }
                }, 60000L);
            }
            this.jTextField22.setText("\u5173\u95ed\u670d\u52a1\u5668\u5012\u6570\u65f6\u95f4");
            this.printChatLog(\u8f93\u51fa);
        }
        catch (Exception e) {
            JOptionPane.showMessageDialog(null, "\u9519\u8bef!\r\n" + e);
        }
    }

    private void \u7ed9\u5168\u670d\u70b9\u5377() {
        try {
            int \u6570\u91cf = "\u8f93\u5165\u6570\u91cf".equals(this.jTextField20.getText()) ? 0 : Integer.parseInt(this.jTextField20.getText());
            int \u7c7b\u578b = "1\u70b9\u5377/2\u62b5\u7528/3\u91d1\u5e01/4\u7ecf\u9a8c".equals(this.jTextField21.getText()) ? 0 : Integer.parseInt(this.jTextField21.getText());
            if (\u6570\u91cf <= 0 || \u7c7b\u578b <= 0) {
                return;
            }
            String \u8f93\u51fa = "";
            int ret = 0;
            if (\u7c7b\u578b == 1 || \u7c7b\u578b == 2) {
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        mch.modifyCSPoints(\u7c7b\u578b, \u6570\u91cf);
                        String cash = null;
                        if (\u7c7b\u578b == 1) {
                            cash = "\u70b9\u5377";
                        } else if (\u7c7b\u578b == 2) {
                            cash = "\u62b5\u7528\u5377";
                        }
                        mch.startMapEffect("\u7ba1\u7406\u5458\u53d1\u653e" + \u6570\u91cf + cash + "\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121009);
                        ++ret;
                    }
                }
            } else if (\u7c7b\u578b == 3) {
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        mch.gainMeso(\u6570\u91cf, true);
                        mch.startMapEffect("\u7ba1\u7406\u5458\u53d1\u653e" + \u6570\u91cf + "\u5192\u9669\u5e01\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121009);
                        ++ret;
                    }
                }
            } else if (\u7c7b\u578b == 4) {
                for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                        mch.gainExp(\u6570\u91cf, true, false, true);
                        mch.startMapEffect("\u7ba1\u7406\u5458\u53d1\u653e" + \u6570\u91cf + "\u7ecf\u9a8c\u7ed9\u5728\u7ebf\u7684\u6240\u4ee5\u73a9\u5bb6\uff01\u5feb\u611f\u8c22\u7ba1\u7406\u5458\u5427\uff01", 5121009);
                        ++ret;
                    }
                }
            }
            String \u7c7b\u578bA = "";
            if (\u7c7b\u578b == 1) {
                \u7c7b\u578bA = "\u70b9\u5377";
            } else if (\u7c7b\u578b == 2) {
                \u7c7b\u578bA = "\u62b5\u7528\u5377";
            } else if (\u7c7b\u578b == 3) {
                \u7c7b\u578bA = "\u91d1\u5e01";
            } else if (\u7c7b\u578b == 4) {
                \u7c7b\u578bA = "\u7ecf\u9a8c";
            }
            \u8f93\u51fa = "\u4e00\u4e2a\u53d1\u653e[" + \u6570\u91cf * ret + "]." + \u7c7b\u578bA + "!\u4e00\u5171\u53d1\u653e\u7ed9\u4e86" + ret + "\u4eba\uff01";
            this.jTextField20.setText("\u8f93\u5165\u6570\u91cf");
            this.jTextField21.setText("1\u70b9\u5377/2\u62b5\u7528/3\u91d1\u5e01/4\u7ecf\u9a8c");
            this.printChatLog(\u8f93\u51fa);
        }
        catch (Exception e) {
            JOptionPane.showMessageDialog(null, "\u9519\u8bef!\r\n" + e);
        }
    }

    private void \u5237\u7269\u54c1() {
        try {
            String \u540d\u5b57 = "\u73a9\u5bb6\u540d\u5b57".equals(this.jTextField3.getText()) ? "" : this.jTextField3.getText();
            int \u7269\u54c1ID = "\u7269\u54c1ID".equals(this.jTextField4.getText()) ? 0 : Integer.parseInt(this.jTextField4.getText());
            int \u6570\u91cf = "\u6570\u91cf".equals(this.jTextField5.getText()) ? 0 : Integer.parseInt(this.jTextField5.getText());
            int \u529b\u91cf = "\u529b\u91cf".equals(this.jTextField6.getText()) ? 0 : Integer.parseInt(this.jTextField6.getText());
            int \u654f\u6377 = "\u654f\u6377".equals(this.jTextField7.getText()) ? 0 : Integer.parseInt(this.jTextField7.getText());
            int \u667a\u529b = "\u667a\u529b".equals(this.jTextField8.getText()) ? 0 : Integer.parseInt(this.jTextField8.getText());
            int \u8fd0\u6c14 = "\u8fd0\u6c14".equals(this.jTextField9.getText()) ? 0 : Integer.parseInt(this.jTextField9.getText());
            int HP = "HP\u8bbe\u7f6e".equals(this.jTextField10.getText()) ? 0 : Integer.parseInt(this.jTextField10.getText());
            int MP = "MP\u8bbe\u7f6e".equals(this.jTextField11.getText()) ? 0 : Integer.parseInt(this.jTextField11.getText());
            int \u53ef\u52a0\u5377\u6b21\u6570 = "\u52a0\u5377\u6b21\u6570".equals(this.jTextField12.getText()) ? 0 : Integer.parseInt(this.jTextField12.getText());
            String \u5236\u4f5c\u4eba\u540d\u5b57 = "\u5236\u4f5c\u4eba".equals(this.jTextField13.getText()) ? "" : this.jTextField13.getText();
            int \u7ed9\u4e88\u65f6\u95f4 = "\u7ed9\u4e88\u7269\u54c1\u65f6\u95f4".equals(this.jTextField14.getText()) ? 0 : Integer.parseInt(this.jTextField14.getText());
            String \u662f\u5426\u53ef\u4ee5\u4ea4\u6613 = this.jTextField15.getText();
            int \u653b\u51fb\u529b = "\u653b\u51fb\u529b".equals(this.jTextField16.getText()) ? 0 : Integer.parseInt(this.jTextField16.getText());
            int \u9b54\u6cd5\u529b = "\u9b54\u6cd5\u529b".equals(this.jTextField17.getText()) ? 0 : Integer.parseInt(this.jTextField17.getText());
            int \u7269\u7406\u9632\u5fa1 = "\u7269\u7406\u9632\u5fa1".equals(this.jTextField18.getText()) ? 0 : Integer.parseInt(this.jTextField18.getText());
            int \u9b54\u6cd5\u9632\u5fa1 = "\u9b54\u6cd5\u9632\u5fa1".equals(this.jTextField19.getText()) ? 0 : Integer.parseInt(this.jTextField19.getText());
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            MapleInventoryType type = GameConstants.getInventoryType(\u7269\u54c1ID);
            String \u8f93\u51faA = "";
            String \u8f93\u51fa = "\u73a9\u5bb6\u540d\u5b57\uff1a" + \u540d\u5b57 + " \u7269\u54c1ID\uff1a" + \u7269\u54c1ID + " \u6570\u91cf\uff1a" + \u6570\u91cf + " \u529b\u91cf:" + \u529b\u91cf + " \u654f\u6377:" + \u654f\u6377 + " \u667a\u529b:" + \u667a\u529b + " \u8fd0\u6c14:" + \u8fd0\u6c14 + " HP:" + HP + " MP:" + MP + " \u53ef\u52a0\u5377\u6b21\u6570:" + \u53ef\u52a0\u5377\u6b21\u6570 + " \u5236\u4f5c\u4eba\u540d\u5b57:" + \u5236\u4f5c\u4eba\u540d\u5b57 + " \u7ed9\u4e88\u65f6\u95f4:" + \u7ed9\u4e88\u65f6\u95f4 + " \u662f\u5426\u53ef\u4ee5\u4ea4\u6613:" + \u662f\u5426\u53ef\u4ee5\u4ea4\u6613 + " \u653b\u51fb\u529b:" + \u653b\u51fb\u529b + " \u9b54\u6cd5\u529b:" + \u9b54\u6cd5\u529b + " \u7269\u7406\u9632\u5fa1:" + \u7269\u7406\u9632\u5fa1 + " \u9b54\u6cd5\u9632\u5fa1:" + \u9b54\u6cd5\u9632\u5fa1 + "\r\n";
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    if (!mch.getName().equals(\u540d\u5b57)) continue;
                    if (\u6570\u91cf >= 0) {
                        if (!MapleInventoryManipulator.checkSpace(mch.getClient(), \u7269\u54c1ID, \u6570\u91cf, "")) {
                            return;
                        }
                        if (type.equals((Object)MapleInventoryType.EQUIP) && !GameConstants.isThrowingStar(\u7269\u54c1ID) && !GameConstants.isBullet(\u7269\u54c1ID) || type.equals((Object)MapleInventoryType.CASH) && \u7269\u54c1ID >= 5000000 && \u7269\u54c1ID <= 5000100) {
                            Equip item = (Equip)ii.getEquipById(\u7269\u54c1ID);
                            if (ii.isCash(\u7269\u54c1ID)) {
                                item.setUniqueId(1);
                            }
                            if (\u529b\u91cf > 0 && \u529b\u91cf <= 32767) {
                                item.setStr((short)\u529b\u91cf);
                            }
                            if (\u654f\u6377 > 0 && \u654f\u6377 <= 32767) {
                                item.setDex((short)\u654f\u6377);
                            }
                            if (\u667a\u529b > 0 && \u667a\u529b <= 32767) {
                                item.setInt((short)\u667a\u529b);
                            }
                            if (\u8fd0\u6c14 > 0 && \u8fd0\u6c14 <= 32767) {
                                item.setLuk((short)\u8fd0\u6c14);
                            }
                            if (\u653b\u51fb\u529b > 0 && \u653b\u51fb\u529b <= 32767) {
                                item.setWatk((short)\u653b\u51fb\u529b);
                            }
                            if (\u9b54\u6cd5\u529b > 0 && \u9b54\u6cd5\u529b <= 32767) {
                                item.setMatk((short)\u9b54\u6cd5\u529b);
                            }
                            if (\u7269\u7406\u9632\u5fa1 > 0 && \u7269\u7406\u9632\u5fa1 <= 32767) {
                                item.setWdef((short)\u7269\u7406\u9632\u5fa1);
                            }
                            if (\u9b54\u6cd5\u9632\u5fa1 > 0 && \u9b54\u6cd5\u9632\u5fa1 <= 32767) {
                                item.setMdef((short)\u9b54\u6cd5\u9632\u5fa1);
                            }
                            if (HP > 0 && HP <= 30000) {
                                item.setHp((short)HP);
                            }
                            if (MP > 0 && MP <= 30000) {
                                item.setMp((short)MP);
                            }
                            if ("\u53ef\u4ee5\u4ea4\u6613".equals(\u662f\u5426\u53ef\u4ee5\u4ea4\u6613)) {
                                byte flag = item.getFlag();
                                flag = item.getType() == MapleInventoryType.EQUIP.getType() ? (byte)(flag | ItemFlag.KARMA_EQ.getValue()) : (byte)(flag | ItemFlag.KARMA_USE.getValue());
                                item.setFlag(flag);
                            }
                            if (\u7ed9\u4e88\u65f6\u95f4 > 0) {
                                item.setExpiration(System.currentTimeMillis() + (long)(\u7ed9\u4e88\u65f6\u95f4 * 24 * 60 * 60 * 1000));
                            }
                            if (\u53ef\u52a0\u5377\u6b21\u6570 > 0) {
                                item.setUpgradeSlots((byte)\u53ef\u52a0\u5377\u6b21\u6570);
                            }
                            if (\u5236\u4f5c\u4eba\u540d\u5b57 != null) {
                                item.setOwner(\u5236\u4f5c\u4eba\u540d\u5b57);
                            }
                            String name = ii.getName(\u7269\u54c1ID);
                            if (\u7269\u54c1ID / 10000 == 114 && name != null && name.length() > 0) {
                                String msg = "\u4f60\u5df2\u83b7\u5f97\u79f0\u53f7 <" + name + ">";
                                mch.getClient().getPlayer().dropMessage(5, msg);
                                mch.getClient().getPlayer().dropMessage(5, msg);
                            }
                            MapleInventoryManipulator.addbyItem(mch.getClient(), item.copy());
                        } else {
                            MapleInventoryManipulator.addById(mch.getClient(), \u7269\u54c1ID, (short)\u6570\u91cf, "", null, \u7ed9\u4e88\u65f6\u95f4, (byte)0);
                        }
                    } else {
                        MapleInventoryManipulator.removeById(mch.getClient(), GameConstants.getInventoryType(\u7269\u54c1ID), \u7269\u54c1ID, -\u6570\u91cf, true, false);
                    }
                    mch.getClient().getSession().write((Object)MaplePacketCreator.getShowItemGain(\u7269\u54c1ID, (short)\u6570\u91cf, true));
                    \u8f93\u51faA = "[\u5237\u7269\u54c1]:" + \u8f93\u51fa;
                }
            }
            this.jTextField3.setText("\u73a9\u5bb6\u540d\u5b57");
            this.jTextField4.setText("\u7269\u54c1ID");
            this.jTextField5.setText("\u6570\u91cf");
            this.jTextField6.setText("\u529b\u91cf");
            this.jTextField7.setText("\u654f\u6377");
            this.jTextField8.setText("\u667a\u529b");
            this.jTextField9.setText("\u8fd0\u6c14");
            this.jTextField10.setText("HP\u8bbe\u7f6e");
            this.jTextField11.setText("MP\u8bbe\u7f6e");
            this.jTextField12.setText("\u52a0\u5377\u6b21\u6570");
            this.jTextField13.setText("\u5236\u4f5c\u4eba");
            this.jTextField14.setText("\u7ed9\u4e88\u7269\u54c1\u65f6\u95f4");
            this.jTextField15.setText("\u53ef\u4ee5\u4ea4\u6613");
            this.jTextField16.setText("\u653b\u51fb\u529b");
            this.jTextField17.setText("\u9b54\u6cd5\u529b");
            this.jTextField18.setText("\u7269\u7406\u9632\u5fa1");
            this.jTextField19.setText("\u9b54\u6cd5\u9632\u5fa1");
            this.printChatLog(\u8f93\u51faA);
        }
        catch (Exception e) {
            JOptionPane.showMessageDialog(null, "\u9519\u8bef!\r\n" + e);
        }
    }

    private void printChatLog(String str) {
        this.chatLog.setText(this.chatLog.getText() + str + "\r\n");
    }

    private void sendNoticeGG() {
        try {
            String str = this.jTextField2.getText();
            String \u8f93\u51fa = "";
            for (ChannelServer cserv1 : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()) {
                    mch.startMapEffect(str, 5121009);
                    \u8f93\u51fa = "[\u516c\u544a]:" + str;
                }
            }
            this.jTextField2.setText("");
            this.printChatLog(\u8f93\u51fa);
        }
        catch (Exception e) {
            JOptionPane.showMessageDialog(null, "\u9519\u8bef!\r\n" + e);
        }
    }

    private void sendNotice(int type) {
        try {
            String str = this.jTextField1.getText();
            Object p = null;
            String \u8f93\u51fa = "";
            if (type == 0) {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                        if (chr.getName().equals(str) && chr.getMapId() != 0) {
                            chr.getClient().getSession().close();
                            chr.getClient().disconnect(true, false);
                            \u8f93\u51fa = "[\u89e3\u5361\u7cfb\u7edf] \u6210\u529f\u65ad\u5f00" + str + "\u73a9\u5bb6\uff01";
                            continue;
                        }
                        \u8f93\u51fa = "[\u89e3\u5361\u7cfb\u7edf] \u73a9\u5bb6\u540d\u5b57\u8f93\u5165\u9519\u8bef\u6216\u8005\u8be5\u73a9\u5bb6\u6ca1\u6709\u5728\u7ebf\uff01";
                    }
                }
            }
            this.jTextField1.setText("");
            this.printChatLog(\u8f93\u51fa);
        }
        catch (Exception e) {
            JOptionPane.showMessageDialog(null, "\u9519\u8bef!\r\n" + e);
        }
    }

    public static void main(String[] args) {
        try {
            for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if (!"Nimbus".equals(info.getName())) continue;
                UIManager.setLookAndFeel(info.getClassName());
                break;
            }
        }
        catch (ClassNotFoundException ex) {
            Logger.getLogger(KinMS.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (InstantiationException ex) {
            Logger.getLogger(KinMS.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (IllegalAccessException ex) {
            Logger.getLogger(KinMS.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (UnsupportedLookAndFeelException ex) {
            Logger.getLogger(KinMS.class.getName()).log(Level.SEVERE, null, ex);
        }
        EventQueue.invokeLater(new Runnable(){

            @Override
            public void run() {
                new KinMS().setVisible(true);
            }
        });
    }

}

