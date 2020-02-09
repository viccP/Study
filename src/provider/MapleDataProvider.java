/*
 * Decompiled with CFR 0.148.
 */
package provider;

import provider.MapleData;
import provider.MapleDataDirectoryEntry;

public interface MapleDataProvider {
    public MapleData getData(String var1);

    public MapleDataDirectoryEntry getRoot();
}

