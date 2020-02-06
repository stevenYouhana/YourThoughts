
package yourthoughts_test.tests;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebDriver;
import util.PropertiesFile;

public class TestCases {
    protected WebDriver driver;
    protected final String URL = "localhost:3000";
    protected Submission submission;
    final String THOUGHT_TXT = "Test: thoughts for testing";
    final String EMAIL_TXT = "tests@gmail.com";

    protected void generalSubmit() {
        submission.thought().click();
        submission.sendKeys(submission.thought(), THOUGHT_TXT);
        submission.email().click();
        submission.sendKeys(submission.email(), EMAIL_TXT);
        submission.send().click();
    }
    protected void submitWithAllFields() throws InterruptedException {
        submission.thought().click();
        submission.sendKeys(submission.thought(), THOUGHT_TXT);
        submission.email().click();
        submission.sendKeys(submission.email(), EMAIL_TXT);
        submission.send().click();
        Thread.sleep(5000);
    }

    protected void invalidEmil() {
        final String INVALID_EMAIL = "INVALID EMAIL ADDRESS!";
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

        submission.thought().click();
        submission.sendKeys(submission.thought(), THOUGHT_TXT);
        submission.email().click();
        submission.sendKeys(submission.email(), "wrongemail.com");
        submission.send().click();
        checkAlert(INVALID_EMAIL, "invalidEmil");
    }
    protected void emptyFields() {
        final String EMPTY_FIELD = "FILL IN ALL FIELDS TO SUBMIT";

        submission.send().click();
        if (submission.alert().getText().equals(EMPTY_FIELD))
            PropertiesFile.writeProperties("emptyFields", "PASS", null);
        else PropertiesFile.writeProperties("emptyFields", "FAIL",
                "emptyFields(): "+submission.alert().getText()+" instead of "+EMPTY_FIELD);

        submission.thought().click();
        submission.sendKeys(submission.thought(), THOUGHT_TXT);
        submission.send().click();
        checkAlert(EMPTY_FIELD, "emptyFields");
    }
    protected void repetitiveEmailPerWord() {
        final String EMAIL_REPEAT = "THANKS! YOU HAVE ALREADY SUBMITTED YOUR THOUGHT";

        submission.email().click();
        submission.sendKeys(submission.email(), EMAIL_TXT);
        submission.thought().click();
        submission.sendKeys(submission.thought(), THOUGHT_TXT);

        for (int i=0; i<2; i++ ) {
            submission.send().click();
        }
        checkAlert(EMAIL_REPEAT, "repetitiveEmailPerWord");
    }
    protected void submitForAllWords() {
        class Word {
            String word;
            boolean existing = false;
            public void setExisting(boolean bool) {
                existing = bool;
            }
            public boolean getExisting() {
                return existing;
            }
            public void setWord(String word) {
                this.word = word;
            }
            public String getWord() {
                return word;
            }
        }
        Word word = new Word();
        word.setWord(submission.currentWord().getText());
        ArrayList<String> words = new ArrayList<>();

        while (!word.getExisting()) {
            words.add(word.getWord());
            submission.nextWord().click();
            word.setWord(submission.currentWord().getText());
            words.forEach(w -> {
                if (w.equals(word.getWord())) word.setExisting(true);
            });
            generalSubmit();
        }
        PropertiesFile.writeProperties("submitForAllWords", "PASS", null);
    }
    void checkAlert(String shouldBe, String propKey) {
        if (submission.alert().getText().equals(shouldBe))
            PropertiesFile.writeProperties(propKey, "PASS", null);
        else PropertiesFile.writeProperties(propKey, "FAIL",
                propKey+": "+submission.alert().getText()+" instead of "+shouldBe);
    }
    void recordTest() {

    }

}
