function enter(pi) {
    var gender = pi.getPlayer().getGender();
    if (gender == 1) {
        pi.warp(670010200, 4);
        return true;
    } else {
        pi.getPlayer().dropMessage(5, "�㲻�ܴ������ȥ");
        return false;
    }
}