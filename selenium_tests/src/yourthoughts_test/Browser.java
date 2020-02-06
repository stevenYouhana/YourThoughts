
package yourthoughts_test;

import com.sun.javafx.tk.Toolkit;
import org.openqa.selenium.Dimension;

import org.openqa.selenium.Point;
import util.PropertiesFile;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;

public class Browser {
    WebDriver driver;
    String browser;
    
    public void setBrowserConfig() {        
        String projectLocation = System.getProperty("user.dir");
        browser = PropertiesFile.readPropertiesFile();
        System.out.println("browser: "+browser);
        if (browser.toLowerCase().contains("chrome")) {          
            System.setProperty("webdriver.chrome.driver", 
                    "C:\\Users\\Steven\\Downloads\\chromedriver.exe");
            driver = new ChromeDriver();
        }
        if (browser.toLowerCase().contains("ie")) {
            System.setProperty("webdriver.ie.driver", 
                    "C:\\Users\\Steven\\Downloads\\IEDriverServer.exe");
            driver = new InternetExplorerDriver();
            //NEEDS further dependancies!
        }
        System.out.println("Driver set to >> "+driver.getTitle());
    }
    public WebDriver getDriver() {
        java.awt.Dimension screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        driver.manage().window().setPosition(new Point(0,0));
        Toolkit tk = Toolkit.getToolkit();
        driver.manage().window().setSize(
                new Dimension(screenSize.width/2, screenSize.height));
        return driver;
    }
}
