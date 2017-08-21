
var t = require('assert')
var puppeteer = require('puppeteer')

var options = {
  // headless: false,
  // args: ['--remote-debugging-port=9222']
}

describe('browser', () => {
  var browser, page

  before(async () => {
    await puppeteer.launch(options).then(async (_browser) => {
      browser = _browser
      page = await browser.newPage()
      await page.goto('http://ssd/github/varnalab.github.io/')
    })
  })

  it('set default theme', async () => {
    t.equal(null, await page.evaluate(() =>
      localStorage.getItem('v-theme')
    ))
    t.equal(true, await page.evaluate(() =>
      document.querySelector('body').classList.contains('light')
    ))
  })

  after(() => {
    browser.close()
  })
})
