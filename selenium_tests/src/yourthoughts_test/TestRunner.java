
package yourthoughts_test;

import org.openqa.selenium.JavascriptExecutor;
import yourthoughts_test.tests.TestCases;
import yourthoughts_test.tests.Submission;

public final class TestRunner extends TestCases {    

    public TestRunner() {
        Browser browser = new Browser();
        browser.setBrowserConfig();
        driver = browser.getDriver();
        submission = new Submission(driver);
    }
    public void runTests() throws InterruptedException {
        driver.get(URL);
        emptyFields();
        Thread.sleep(6000);
        invalidEmil();
        Thread.sleep(6000);
        this.clearLocalStorage();
        submitWithAllFields();
        this.clearLocalStorage();
        repetitiveEmailPerWord();
        this.clearLocalStorage();
        submitForAllWords();

        submission.quit();
    }
    void clearLocalStorage() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.localStorage.clear()");
    }
}
