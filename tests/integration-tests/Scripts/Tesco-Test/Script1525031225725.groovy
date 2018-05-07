import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.checkpoint.CheckpointFactory as CheckpointFactory
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('https://www.tesco.com/')

WebUI.click(findTestObject('Page_Tesco - Online Groceries Homew/a_Groceries'))

WebUI.click(findTestObject('Page_Tesco - Online Groceries Homew/span_Shop groceries'))

WebUI.setText(findTestObject('Page_Tesco Groceries  Online Food S/input_query'), 'milk')

WebUI.click(findTestObject('Page_Tesco Groceries  Online Food S/button_Search'))

WebUI.click(findTestObject('Page_Results for milk/span_Add'))

WebUI.closeBrowser()

WebUI.openBrowser('')

WebUI.navigateToUrl('https://www.tesco.com/')

WebUI.click(findTestObject('Page_Tesco - Online Groceries Homew (1)/a_Groceries'))

WebUI.click(findTestObject('Page_Tesco - Online Groceries Homew (1)/div_TescoGroceriesDirectClubca'))

WebUI.setText(findTestObject('Page_Tesco - Online Groceries Homew (1)/input_searchKey'), 'milk')

WebUI.sendKeys(findTestObject('Page_Tesco - Online Groceries Homew (1)/input_searchKey'), Keys.chord(Keys.ENTER))

WebUI.click(findTestObject('Page_Results for milk - Tesco Groce/a_Tesco British Semi Skimmed M'))

WebUI.click(findTestObject('Page_Tesco British Semi Skimmed Mil/span_Add'))

WebUI.click(findTestObject('Page_Sign in  Tesco.com/a_Register for an account'))

WebUI.selectOptionByValue(findTestObject('Page_Register  Tesco.com/select_Select title...MissMrsM'), 'Mr', true)

WebUI.setText(findTestObject('Page_Register  Tesco.com/input_first-name'), 'Wagaka')

WebUI.setText(findTestObject('Page_Register  Tesco.com/input_last-name'), 'Duble')

WebUI.setText(findTestObject('Page_Register  Tesco.com/input_phone-number'), '01234123123')

WebUI.setText(findTestObject('Page_Register  Tesco.com/input_postcode'), 'sw151lx')

WebUI.click(findTestObject('Page_Register  Tesco.com/span_Find address'))

WebUI.selectOptionByValue(findTestObject('Page_Register  Tesco.com/select_Please select your addr'), 'Please select your address', 
    true)

WebUI.setText(findTestObject('Page_Register  Tesco.com/input_username'), '23423423423@asd.com')

WebUI.setText(findTestObject('Page_Register  Tesco.com/input_password'), 'asdasdiasdjk.ao@#@1Q')

WebUI.click(findTestObject('Page_Register  Tesco.com/button_Show'))

WebUI.click(findTestObject('Page_Register  Tesco.com/button_Hide'))

WebUI.click(findTestObject('Page_Register  Tesco.com/span_ui-component__icon--check'))

WebUI.click(findTestObject('Page_Register  Tesco.com/span_Create account'))

WebUI.click(findTestObject('Page_Register - Confirmation  Tesco/span_Continue shopping'))

WebUI.setText(findTestObject('Page_Tesco British Semi Skimmed Mil/input_query'), 'eggs')

WebUI.sendKeys(findTestObject('Page_Tesco British Semi Skimmed Mil/input_query'), Keys.chord(Keys.ENTER))

WebUI.click(findTestObject('Page_Results for eggs/span_Add'))

WebUI.closeBrowser()

