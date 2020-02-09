/*
 * Decompiled with CFR 0.148.
 */
package handling;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Properties;

import tools.HexTool;

public class ExternalCodeTableGetter {
    final Properties props;

    public ExternalCodeTableGetter(Properties properties) {
        this.props = properties;
    }

    private static final <T extends Enum<? extends WritableIntValueHolder>> T valueOf(String name, T[] values) {
        for (T val : values) {
            if (!((Enum)val).name().equals(name)) continue;
            return val;
        }
        return null;
    }

    private final <T extends Enum<? extends WritableIntValueHolder> & WritableIntValueHolder> short getValue(final String name, T[] values, final short def) {
        String prop = props.getProperty(name);
        if (prop != null && prop.length() > 0) {
            String offset;
            String trimmed = prop.trim();
            String[] args = trimmed.split(" ");
            short base = 0;
            if (args.length == 2) {
                base = ((WritableIntValueHolder)((Object)ExternalCodeTableGetter.valueOf((String)args[0], values))).getValue();
                if (base == def) {
                    base = this.getValue(args[0], values, def);
                }
                offset = args[1];
            } else {
                offset = args[0];
            }
            if (offset.length() > 2 && offset.substring(0, 2).equals("0x")) {
                return (short)(Short.parseShort(offset.substring(2), 16) + base);
            }
            return (short)(Short.parseShort(offset) + base);
        }
        return def;
    }

    public final static <T extends Enum<? extends WritableIntValueHolder> & WritableIntValueHolder> String getOpcodeTable(T[] enumeration) {
        StringBuilder enumVals = new StringBuilder();
        List<T> all = new ArrayList<T>();
        all.addAll(Arrays.asList(enumeration));
        Collections.sort(all, new Comparator<WritableIntValueHolder>(){

            @Override
            public int compare(WritableIntValueHolder o1, WritableIntValueHolder o2) {
                return Short.valueOf(o1.getValue()).compareTo(o2.getValue());
            }
        });
        for (Enum code : all) {
            enumVals.append(code.name());
            enumVals.append(" = ");
            enumVals.append("0x");
            enumVals.append(HexTool.toString(((WritableIntValueHolder)((Object)code)).getValue()));
            enumVals.append(" (");
            enumVals.append(((WritableIntValueHolder)((Object)code)).getValue());
            enumVals.append(")\n");
        }
        return enumVals.toString();
    }

    public final static <T extends Enum<? extends WritableIntValueHolder> & WritableIntValueHolder> void populateValues(Properties properties, T[] values) {
        ExternalCodeTableGetter exc = new ExternalCodeTableGetter(properties);
        for (T code : values) {
            code.setValue(exc.getValue(code.name(), values, (short) -2));
        }
    }

}

