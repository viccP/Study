/*
 * Decompiled with CFR 0.148.
 */
package server.maps;

import java.awt.Point;
import java.io.PrintStream;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import server.maps.MapleFoothold;

public class MapleFootholdTree {
    private MapleFootholdTree nw = null;
    private MapleFootholdTree ne = null;
    private MapleFootholdTree sw = null;
    private MapleFootholdTree se = null;
    private List<MapleFoothold> footholds = new LinkedList<MapleFoothold>();
    private Point p1;
    private Point p2;
    private Point center;
    private int depth = 0;
    private static final byte maxDepth = 8;
    private int maxDropX;
    private int minDropX;

    public MapleFootholdTree(Point p1, Point p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.center = new Point((p2.x - p1.x) / 2, (p2.y - p1.y) / 2);
    }

    public MapleFootholdTree(Point p1, Point p2, int depth) {
        this.p1 = p1;
        this.p2 = p2;
        this.depth = depth;
        this.center = new Point((p2.x - p1.x) / 2, (p2.y - p1.y) / 2);
    }

    public final void insert(MapleFoothold f) {
        if (this.depth == 0) {
            if (f.getX1() > this.maxDropX) {
                this.maxDropX = f.getX1();
            }
            if (f.getX1() < this.minDropX) {
                this.minDropX = f.getX1();
            }
            if (f.getX2() > this.maxDropX) {
                this.maxDropX = f.getX2();
            }
            if (f.getX2() < this.minDropX) {
                this.minDropX = f.getX2();
            }
        }
        if (this.depth == 8 || f.getX1() >= this.p1.x && f.getX2() <= this.p2.x && f.getY1() >= this.p1.y && f.getY2() <= this.p2.y) {
            this.footholds.add(f);
        } else {
            if (this.nw == null) {
                this.nw = new MapleFootholdTree(this.p1, this.center, this.depth + 1);
                this.ne = new MapleFootholdTree(new Point(this.center.x, this.p1.y), new Point(this.p2.x, this.center.y), this.depth + 1);
                this.sw = new MapleFootholdTree(new Point(this.p1.x, this.center.y), new Point(this.center.x, this.p2.y), this.depth + 1);
                this.se = new MapleFootholdTree(this.center, this.p2, this.depth + 1);
            }
            if (f.getX2() <= this.center.x && f.getY2() <= this.center.y) {
                this.nw.insert(f);
            } else if (f.getX1() > this.center.x && f.getY2() <= this.center.y) {
                this.ne.insert(f);
            } else if (f.getX2() <= this.center.x && f.getY1() > this.center.y) {
                this.sw.insert(f);
            } else {
                this.se.insert(f);
            }
        }
    }

    private final List<MapleFoothold> getRelevants(Point p) {
        return this.getRelevants(p, new LinkedList<MapleFoothold>());
    }

    private final List<MapleFoothold> getRelevants(Point p, List<MapleFoothold> list) {
        list.addAll(this.footholds);
        if (this.nw != null) {
            if (p.x <= this.center.x && p.y <= this.center.y) {
                this.nw.getRelevants(p, list);
            } else if (p.x > this.center.x && p.y <= this.center.y) {
                this.ne.getRelevants(p, list);
            } else if (p.x <= this.center.x && p.y > this.center.y) {
                this.sw.getRelevants(p, list);
            } else {
                this.se.getRelevants(p, list);
            }
        }
        return list;
    }

    private final MapleFoothold findWallR(Point p1, Point p2) {
        for (MapleFoothold f : this.footholds) {
            if (!f.isWall() || f.getX1() < p1.x || f.getX1() > p2.x || f.getY1() < p1.y || f.getY2() > p1.y) continue;
            return f;
        }
        if (this.nw != null) {
            MapleFoothold ret;
            if (p1.x <= this.center.x && p1.y <= this.center.y && (ret = this.nw.findWallR(p1, p2)) != null) {
                return ret;
            }
            if ((p1.x > this.center.x || p2.x > this.center.x) && p1.y <= this.center.y && (ret = this.ne.findWallR(p1, p2)) != null) {
                return ret;
            }
            if (p1.x <= this.center.x && p1.y > this.center.y && (ret = this.sw.findWallR(p1, p2)) != null) {
                return ret;
            }
            if ((p1.x > this.center.x || p2.x > this.center.x) && p1.y > this.center.y && (ret = this.se.findWallR(p1, p2)) != null) {
                return ret;
            }
        }
        return null;
    }

    public final MapleFoothold findWall(Point p1, Point p2) {
        if (p1.y != p2.y) {
            throw new IllegalArgumentException();
        }
        return this.findWallR(p1, p2);
    }

    public final boolean checkRelevantFH(short fromx, short fromy, short tox, short toy) {
        MapleFoothold fhdata = null;
        for (MapleFoothold fh : this.footholds) {
            if (fh.getX1() > fromx || fh.getX2() < fromx || fh.getY1() > fromy || fh.getY2() < fromy) continue;
            fhdata = fh;
            break;
        }
        for (MapleFoothold fh2 : this.footholds) {
            if (fh2.getX1() > tox || fh2.getX2() < tox || fh2.getY1() > toy || fh2.getY2() < toy) continue;
            if (fhdata.getId() != fh2.getId() && fh2.getId() != fhdata.getNext() && fh2.getId() != fhdata.getPrev()) {
                System.out.println("Couldn't find the correct pos for next/prev");
                return false;
            }
            return true;
        }
        return false;
    }

    public final MapleFoothold findBelow(Point p) {
        List<MapleFoothold> relevants = this.getRelevants(p);
        LinkedList<MapleFoothold> xMatches = new LinkedList<MapleFoothold>();
        for (MapleFoothold fh : relevants) {
            if (fh.getX1() > p.x || fh.getX2() < p.x || fh.getX1() == fh.getX2()) continue;
            xMatches.add(fh);
        }
        Collections.sort(xMatches);
        for (MapleFoothold fh : xMatches) {
            if (!fh.isWall() && fh.getY1() != fh.getY2()) {
                double s1 = Math.abs(fh.getY2() - fh.getY1());
                double s2 = Math.abs(fh.getX2() - fh.getX1());
                double s4 = Math.abs(p.x - fh.getX1());
                double alpha = Math.atan(s2 / s1);
                double beta = Math.atan(s1 / s2);
                double s5 = Math.cos(alpha) * (s4 / Math.cos(beta));
                int calcY = fh.getY2() < fh.getY1() ? fh.getY1() - (int)s5 : fh.getY1() + (int)s5;
                if (calcY < p.y) continue;
                return fh;
            }
            if (fh.isWall() || fh.getY1() < p.y) continue;
            return fh;
        }
        return null;
    }

    public final int getX1() {
        return this.p1.x;
    }

    public final int getX2() {
        return this.p2.x;
    }

    public final int getY1() {
        return this.p1.y;
    }

    public final int getY2() {
        return this.p2.y;
    }

    public final int getMaxDropX() {
        return this.maxDropX;
    }

    public final int getMinDropX() {
        return this.minDropX;
    }
}

