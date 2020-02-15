/*
 * Decompiled with CFR 0.148.
 */
package tools;

import java.io.UnsupportedEncodingException;

public class StringUtil {

	private static final String ENCODE = "GBK";

	public static final String getLeftPaddedStr(String in, char padchar, int length) {
		StringBuilder builder = new StringBuilder(length);
		try {
			for (int x = in.getBytes(ENCODE).length; x < length; ++x) {
				builder.append(padchar);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		builder.append(in);
		return builder.toString();
	}

	public static final String getRightPaddedStr(String in, char padchar, int length) {
		StringBuilder builder = new StringBuilder(in);
		try {
			for (int x = in.getBytes(ENCODE).length; x < length; ++x) {
				builder.append(padchar);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return builder.toString();
	}

	public static final String joinStringFrom(String[] arr, int start) {
		return StringUtil.joinStringFrom(arr, start, " ");
	}

	public static final String joinStringFrom(String[] arr, int start, String sep) {
		StringBuilder builder = new StringBuilder();
		for (int i = start; i < arr.length; ++i) {
			builder.append(arr[i]);
			if (i == arr.length - 1)
				continue;
			builder.append(sep);
		}
		return builder.toString();
	}

	public static final String makeEnumHumanReadable(String enumName) {
		StringBuilder builder = new StringBuilder(enumName.length() + 1);
		for (String word : enumName.split("_")) {
			if (word.length() <= 2) {
				builder.append(word);
			} else {
				builder.append(word.charAt(0));
				builder.append(word.substring(1).toLowerCase());
			}
			builder.append(' ');
		}
		return builder.substring(0, enumName.length());
	}

	public static final int countCharacters(String str, char chr) {
		int ret = 0;
		try {
			for (int i = 0; i < str.getBytes(ENCODE).length; ++i) {
				if (str.charAt(i) != chr)
					continue;
				++ret;
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return ret;
	}

	public static final String getReadableMillis(long startMillis, long endMillis) {
		StringBuilder sb = new StringBuilder();
		double elapsedSeconds = (double) (endMillis - startMillis) / 1000.0;
		int elapsedSecs = (int) elapsedSeconds % 60;
		int elapsedMinutes = (int) (elapsedSeconds / 60.0);
		int elapsedMins = elapsedMinutes % 60;
		int elapsedHrs = elapsedMinutes / 60;
		int elapsedHours = elapsedHrs % 24;
		int elapsedDays = elapsedHrs / 24;
		if (elapsedDays > 0) {
			boolean mins = elapsedHours > 0;
			sb.append(elapsedDays);
			sb.append(" day" + (elapsedDays > 1 ? "s" : "") + (mins ? ", " : "."));
			if (mins) {
				boolean secs;
				secs = elapsedMins > 0;
				if (!secs) {
					sb.append("and ");
				}
				sb.append(elapsedHours);
				sb.append(" hour" + (elapsedHours > 1 ? "s" : "") + (secs ? ", " : "."));
				if (secs) {
					boolean millis;
					millis = elapsedSecs > 0;
					if (!millis) {
						sb.append("and ");
					}
					sb.append(elapsedMins);
					sb.append(" minute" + (elapsedMins > 1 ? "s" : "") + (millis ? ", " : "."));
					if (millis) {
						sb.append("and ");
						sb.append(elapsedSecs);
						sb.append(" second" + (elapsedSecs > 1 ? "s" : "") + ".");
					}
				}
			}
		} else if (elapsedHours > 0) {
			boolean mins = elapsedMins > 0;
			sb.append(elapsedHours);
			sb.append(" hour" + (elapsedHours > 1 ? "s" : "") + (mins ? ", " : "."));
			if (mins) {
				boolean secs;
				secs = elapsedSecs > 0;
				if (!secs) {
					sb.append("and ");
				}
				sb.append(elapsedMins);
				sb.append(" minute" + (elapsedMins > 1 ? "s" : "") + (secs ? ", " : "."));
				if (secs) {
					sb.append("and ");
					sb.append(elapsedSecs);
					sb.append(" second" + (elapsedSecs > 1 ? "s" : "") + ".");
				}
			}
		} else if (elapsedMinutes > 0) {
			boolean secs = elapsedSecs > 0;
			sb.append(elapsedMinutes);
			sb.append(" minute" + (elapsedMinutes > 1 ? "s" : "") + (secs ? " " : "."));
			if (secs) {
				sb.append("and ");
				sb.append(elapsedSecs);
				sb.append(" second" + (elapsedSecs > 1 ? "s" : "") + ".");
			}
		} else if (elapsedSeconds > 0.0) {
			sb.append((int) elapsedSeconds);
			sb.append(" second" + (elapsedSeconds > 1.0 ? "s" : "") + ".");
		} else {
			sb.append("None.");
		}
		return sb.toString();
	}

	public static final int getDaysAmount(long startMillis, long endMillis) {
		double elapsedSeconds = (double) (endMillis - startMillis) / 1000.0;
		int elapsedMinutes = (int) (elapsedSeconds / 60.0);
		int elapsedHrs = elapsedMinutes / 60;
		int elapsedDays = elapsedHrs / 24;
		return elapsedDays;
	}
}
