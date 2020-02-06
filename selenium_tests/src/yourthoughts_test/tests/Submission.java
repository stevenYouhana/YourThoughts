
package yourthoughts_test.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Submission {
    WebDriver driver;
    
    public Submission(WebDriver driver) {
        this.driver = driver;
    }    
    public void sendKeys(WebElement el, String string) {
        el.clear();
        el.sendKeys(string);
    }
    public WebElement thought() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        return wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.cssSelector("#thought-input")));        
    }
    public WebElement email() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        return wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.cssSelector("#user-email-field")));        
    }
    public WebElement send() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        return wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.cssSelector("#btn-submit")));        
    }
    public WebElement currentWord() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        return wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.cssSelector("#selectedWord")));
    }
    public WebElement nextWord() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        return wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.cssSelector("#btn-nextWord")));        
    }
    public WebElement alert() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        return wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("react-alert")));        
    }    
    public void quit() {
        driver.quit();
    }
}
