import log from 'electron-log'
import { color } from '../../shared/utils/console'

export default class logger{
    /**
     * Log a warning message to the console/log file
     * @param text text to display
     */
    public static warn(text: string) {
        log.warn(this.colorText(text, color.yellow))
    }

    /**
     * Log an error message to the console/log file
     * @param text text to display
     */
    public static error(text: string) {
        log.error(this.colorText(text, color.red))
    }
    
    /**
     * Log a success message to the console/log file
     * @param text text to display
     */
    public static success(text: string) {
        log.info(this.colorText(text, color.green))
    }

    /**
     * Log an info message to the console/log file
     * @param text text to display
     */
    public static info(text: string) {
        log.info(text)
    }

    /**
     * Log a debug message to the console/log file
     * @param text text to display
     */
    public static debug(text: string) {
        log.debug(this.colorText(text, color.blue))
    }

    private static colorText(text: string, textColor: color): string {
        return textColor + text + color.reset
    }
}