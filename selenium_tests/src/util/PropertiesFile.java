
package util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openqa.selenium.WebDriver;

public class PropertiesFile {
    static String projectLocation = System.getProperty("user.dir");
    static Properties props;
    static String file = projectLocation + "/src/util/config.properties";   
    
    public static String readPropertiesFile() {
        props = new Properties();
        String browser = "";
        try {
            InputStream is = new FileInputStream(file);
            props.load(is);
            browser = props.getProperty("browser");
        } catch(Exception ex) {
            Logger.getLogger(PropertiesFile.class.getName()).log(Level.SEVERE, null, ex);
        }
        return browser;
    }
    public static void writeProperties(String test, String testResult, String comments) {
        try {
            OutputStream os = new FileOutputStream(file);
            props.setProperty(test, testResult);
            props.store(os, comments);

        } catch(Exception ex) {
            Logger.getLogger(PropertiesFile.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
