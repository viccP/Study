锘縱ar status = -1;

function start(mode, type, selection) {
    if (mode > 0)
        status++;
    else {
        qm.dispose();
        return;
    }
    if (status == 0)
        qm.sendAcceptDecline("鍞夊攭锛屼綘鍥炰締浜嗐€傛垜鍙