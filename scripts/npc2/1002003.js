/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 Dolphin in Herb Town

**/

var status = 0;

function start() {
	cm.sendOk ("�H�U�� �C�h���Ҧ��ޯ�� �����Ǫ�\r\n#b��������20 �Ǫ��G����s��\r\n#r��������30 �Ǫ�:�֥d��\r\n#b����ޤO20 �Ǫ�:���s�O�@�̡B���㴵�B�}�ޥ��~�s\r\n#r����ޤO30 �Ǫ�:���㴵\r\n#b�Z�����m20 �Ǫ�:�ƥ��s���ѡB���Ǻ��B�������\r\n#r�Z�����m30 �Ǫ�:�Q���s\r\n#b�s�����20 �Ǫ�:���㴵�B���M�s�Ԥh\r\n#r�s�����30 �Ǫ�:���㴵\r\n#b���20 �Ǫ�:�Թϴ��B���몺�u�@�����B���M�s�Ԥh\r\n#r���30 �Ǫ�:���몺�u�@�L�B�ݼɪ��]\r\n#b�i������20 �Ǫ�:���s�O�@��\r\n#r�i������30 �Ǫ�:�ƥ��s����\r\n#b�L���C�R20 �Ǫ�:���l�s\r\n#r�L���C�R30 �Ǫ�:�Թϴ�\r\n#b�M�h�����i20 �Ǫ�:�ƥ��s\r\n#r�M�h�����i30 �Ǫ�:�Թϴ��B�ܥ�d\r\n#b�s������20 �Ǫ�:�ƥ��s\r\n#r�s������30 �Ǫ�:�Q���s�B���Ǻ��B�������\r\n#b�����z�o20 �Ǫ�:�ݼɪ��]�B�}�ޥ��~�s\r\n#r�����z�o30 �Ǫ�:����s��\r\n#b�t�F���C20 �Ǫ�:���s�O�@�̡B�h�h�B����h\r\n#b�t�F����20 �Ǫ�:�h�h�B����h�B���l�s\r\n#b��������20 �Ǫ�:�ݼɪ��]\r\n#r��������30 �Ǫ�:����s��\r\n#b�·t�O�q20 �Ǫ�:�ݼɪ��]�B���Ǻ��B�������\r\n#r�·t�O�q30 �Ǫ�:����s��")
		}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
}
}
