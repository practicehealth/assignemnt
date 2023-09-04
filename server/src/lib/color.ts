export default class Logging {
  private static getColorCode(color: string) {
    switch (color) {
      case "cyan":
        return "\x1b[36m";
      case "blueBright":
        return "\x1b[94m";
      case "yellowBright":
        return "\x1b[93m";
      case "redBright":
        return "\x1b[91m";
      default:
        return "";
    }
  }

  private static resetColor() {
    return "\x1b[0m";
  }

  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(
      `[${new Date().toLocaleString()}] ${this.getColorCode(
        "cyan"
      )}[INFO]${this.resetColor()} `,
      typeof args === "string"
        ? `${this.getColorCode("blueBright")}${args}${this.resetColor()}`
        : args
    );
  public static warn = (args: any) =>
    console.log(
      `[${new Date().toLocaleString()}] ${this.getColorCode(
        "yellowBright"
      )}[WARN]${this.resetColor()} `,
      typeof args === "string"
        ? `${this.getColorCode("blueBright")}${args}${this.resetColor()}`
        : args
    );
  public static error = (args: any) =>
    console.log(
      `[${new Date().toLocaleString()}] ${this.getColorCode(
        "redBright"
      )}[ERROR]${this.resetColor()} `,
      typeof args === "string"
        ? `${this.getColorCode("blueBright")}${args}${this.resetColor()}`
        : args
    );
}
