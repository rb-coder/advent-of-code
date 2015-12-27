import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class LookAndSay {
	public static void main(String[] args) {
		String input = args[0];
		Integer times = Integer.parseInt(args[1]);

		System.out.println(String.format("Playing Look-and-Say starting with %s %d times, checking length:", input, times));
		new LookAndSay(input, times).run();
	}

	private static final String MESSAGE = "Playing Look-and-Say %d times starting from %s is %d charaters long";
	private final Pattern pattern = Pattern.compile("(.)\\1*");
	private String input;
	private Integer runs;

	public LookAndSay(String input, Integer runs) {
		this.input = input;
		this.runs = runs;
	}

	private String lookAndSay(String input) {
		Matcher matcher = pattern.matcher(input);
		StringBuffer output = new StringBuffer();
	    while (matcher.find()) { 
	    	matcher.appendReplacement(output, String.valueOf(matcher.end() - matcher.start()) + matcher.group(1));
	    }
		return output.toString();
	}

	private String lookAndSay(String input, Integer run) {
		System.out.println(String.format("%d -> %d", run, input.length()));
		if (run < this.runs) {
			return lookAndSay(lookAndSay(input), run + 1);
		}
		return input;
	}

	public void run() {
		lookAndSay(this.input, 0);
	}
}