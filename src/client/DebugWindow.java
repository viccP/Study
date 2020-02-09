/*
 * Decompiled with CFR 0.148.
 * 
 * Could not load the following classes:
 *  org.apache.mina.common.IoSession
 *  org.apache.mina.common.WriteFuture
 */
package client;

import client.MapleCharacter;
import client.MapleClient;
import handling.MaplePacket;
import java.awt.Component;
import java.awt.Container;
import java.awt.EventQueue;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.LayoutStyle;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.WriteFuture;
import tools.HexTool;
import tools.data.output.MaplePacketLittleEndianWriter;

public class DebugWindow
extends JFrame {
    private MapleClient c;
    private JButton jButton1;
    private JLabel jLabel1;
    private JPanel jPanel1;
    private JScrollPane jScrollPane1;
    private JScrollPane jScrollPane2;
    private JTextArea jTextArea1;
    private JTextArea jTextArea2;

    public DebugWindow() {
        this.initComponents();
    }

    public MapleClient getC() {
        return this.c;
    }

    public void setC(MapleClient c) {
        this.c = c;
        if (c.getPlayer() != null) {
            this.setTitle("\u73a9\u5bb6: " + c.getPlayer().getName() + " - \u5c01\u5305\u6d4b\u8bd5");
        }
    }

    private void initComponents() {
        this.jScrollPane1 = new JScrollPane();
        this.jTextArea1 = new JTextArea();
        this.jPanel1 = new JPanel();
        this.jScrollPane2 = new JScrollPane();
        this.jTextArea2 = new JTextArea();
        this.jButton1 = new JButton();
        this.jLabel1 = new JLabel();
        this.jTextArea1.setColumns(20);
        this.jTextArea1.setRows(5);
        this.jScrollPane1.setViewportView(this.jTextArea1);
        this.setDefaultCloseOperation(3);
        this.jTextArea2.setColumns(20);
        this.jTextArea2.setRows(5);
        this.jScrollPane2.setViewportView(this.jTextArea2);
        this.jButton1.setText("\u53d1\u9001\u5c01\u5305");
        this.jButton1.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                DebugWindow.this.jButton1ActionPerformed(evt);
            }
        });
        GroupLayout jPanel1Layout = new GroupLayout(this.jPanel1);
        this.jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(this.jScrollPane2, -1, 375, 32767).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jLabel1).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, -1, 32767).addComponent(this.jButton1)));
        jPanel1Layout.setVerticalGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jScrollPane2, -2, 156, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, 13, 32767).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton1).addComponent(this.jLabel1))));
        GroupLayout layout = new GroupLayout(this.getContentPane());
        this.getContentPane().setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addComponent(this.jPanel1, -1, -1, 32767).addContainerGap()));
        layout.setVerticalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addComponent(this.jPanel1, -1, -1, 32767).addContainerGap()));
        this.pack();
    }

    private void jButton1ActionPerformed(ActionEvent evt) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (this.c == null) {
            this.jLabel1.setText("\u53d1\u9001\u5931\u8d25\uff0c\u5ba2\u6237\u4e3a\u7a7a.");
            return;
        }
        mplew.write(HexTool.getByteArrayFromHexString(this.jTextArea2.getText()));
        this.c.getSession().write((Object)mplew.getPacket());
        this.c.getPlayer().dropMessage(this.jTextArea2.getText() + "\u5df2\u4f20\u9001\u5c01\u5305[" + mplew.getPacket().getBytes().length + "] : " + mplew.toString());
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
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (InstantiationException ex) {
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (IllegalAccessException ex) {
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (UnsupportedLookAndFeelException ex) {
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        }
        EventQueue.invokeLater(new Runnable(){

            @Override
            public void run() {
                new DebugWindow().setVisible(true);
            }
        });
    }

}

