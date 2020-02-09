/*
 * Decompiled with CFR 0.148.
 */
package tools;

import java.io.Serializable;
import java.util.Collection;
import java.util.EnumMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public final class ConcurrentEnumMap<K extends Enum<K>, V>
extends EnumMap<K, V>
implements Serializable {
    private static final long serialVersionUID = 11920818021L;
    private ReentrantReadWriteLock reentlock = new ReentrantReadWriteLock();
    private Lock rL = this.reentlock.readLock();
    private Lock wL = this.reentlock.writeLock();

    public ConcurrentEnumMap(Class<K> keyType) {
        super(keyType);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public void clear() {
        this.wL.lock();
        try {
            super.clear();
        }
        finally {
            this.wL.unlock();
        }
    }

    @Override
    public EnumMap<K, V> clone() {
        return super.clone();
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public boolean containsKey(Object key) {
        this.rL.lock();
        try {
            boolean bl = super.containsKey(key);
            return bl;
        }
        finally {
            this.rL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public boolean containsValue(Object value) {
        this.rL.lock();
        try {
            boolean bl = super.containsValue(value);
            return bl;
        }
        finally {
            this.rL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public Set<Map.Entry<K, V>> entrySet() {
        this.rL.lock();
        try {
        	return super.entrySet();
        }
        finally {
            this.rL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public V get(Object key) {
        this.rL.lock();
        try {
            return super.get(key);
        }
        finally {
            this.rL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public Set<K> keySet() {
        this.rL.lock();
        try {
            return super.keySet();
        }
        finally {
            this.rL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public V put(K key, V value) {
        this.wL.lock();
        try {
            V v = super.put(key, value);
            return v;
        }
        finally {
            this.wL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public void putAll(Map<? extends K, ? extends V> m) {
        this.wL.lock();
        try {
            super.putAll(m);
        }
        finally {
            this.wL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public V remove(Object key) {
        this.wL.lock();
        try {
            return super.remove(key);
        }
        finally {
            this.wL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public int size() {
        this.rL.lock();
        try {
            int n = super.size();
            return n;
        }
        finally {
            this.rL.unlock();
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public Collection<V> values() {
        this.rL.lock();
        try {
        	return super.values();
        }
        finally {
            this.rL.unlock();
        }
    }
}

