const {Builder, By, Capabilities} = require("selenium-webdriver");
const {Options, ServiceBuilder} = require("selenium-webdriver/chrome");
const chromedriver = require('chromedriver');

const bodyParser = require("express");
const app = require('express')();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const chromedriver_path = process.env.CHROMEDRIVER || chromedriver.path;

process.setMaxListeners(20);

const lerp = (a, b, f) => {
    return a * (1.0 - f) + (b * f);
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class MentiBotDriver {
    driver;
    type;

    fieldSet;
    submitBtn;

    constructor(type) {
        this.type = type;
        this.driver = new Builder()
            .forBrowser('chrome')
            //.usingServer('http://localhost:4444/wd/hub')
            .setChromeService(
                new ServiceBuilder(chromedriver_path)
            )
            .setChromeOptions(
                new Options().addArguments("--headless", "incognito", "--disable-notifications", "--no-sandbox", "--disable-dev-shm-usage")
            )
            .withCapabilities(Capabilities.chrome())
            .build();

        this.driver.manage().setTimeouts({implicit: 10000});
    }

    async test() {
        await this.driver.get("https://google.com");
    }

    async open(input) {
        input = input.replaceAll(' ', '');
        if (input.startsWith('http')) {
            await this.driver.get(input);
            await sleep(1000);
        } else {
            await this.driver.get(`https://www.menti.com`);
            await sleep(1000);
            await this.driver.findElement(By.id('enter-vote-key')).sendKeys(input);
            await this.driver.findElement(By.id('enter-vote-key')).submit();
            await sleep(1000);
        }
    }

    async vote(data) {
        if (this.type !== "scales") this.fieldSet = await this.driver.findElement(By.tagName('fieldset'));
        this.submitBtn = await this.driver.findElement(By.css('button[type="submit"]'));

        switch (this.type) {
            case 'multiple_choice':
                await this.voteMultipleChoice(data);
                break;
            case 'word_cloud':
                await this.voteWordCloud(data);
                break;
            case 'open_ended':
                await this.voteOpenEnded(data);
                break;
            case 'scales':
                await this.voteScales(data);
                break;
            default:
                console.error('Invalid type: ' + this.type)
                break;
        }
    }

    async voteMultipleChoice(data) {
        const selection = data.selections[0];
        const options = await this.fieldSet.findElements(By.tagName('label'));
        await options[selection.select * 2].click();
    }

    async voteWordCloud(data) {
        const selections = data.selections;
        const options = await this.fieldSet.findElements(By.css("input[name='wordcloud-input']"));
        for (const selection of selections) {
            await options[selection.select].sendKeys(selection.text);
        }
    }

    async voteOpenEnded(data) {
        const selection = data.selections[0];
        const input = await this.fieldSet.findElement(By.tagName('textarea'));
        await input.sendKeys(selection.text);
    }

    async voteScales(data) {
        const selections = data.selections;
        const fieldSets = await this.driver.findElements(By.tagName('fieldset'));

        for (const selection of selections) {
            const fieldSet = fieldSets[selection.select];
            const input = await fieldSet.findElement(By.tagName('input'));
            const width = parseInt(await input.getCssValue('width'));

            const percentage = selection.percent;
            const value = Math.round(lerp(0, width, percentage / 100) - (width / 2));

            await input.clear();
            await this.driver.actions().dragAndDrop(input, {x: value, y: 0}).perform();
        }
    }

    async getUrl() {
        return await this.driver.getCurrentUrl();
    }

    async close() {
        await this.driver.quit();
    }

    async submit() {
        await this.submitBtn.click();
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/side.html');
});

app.post('/api', async (req, res) => {
    console.log("kommt ja rein");

    const type = req.body.type;
    const input = req.body.input;
    const data = req.body.data;

    if (!type || !input || !data) {
        console.log("return 1");
        return res.status(400).send({
            status: "error",
            error: 'Invalid request',
            body: JSON.stringify(req.body),
        });
    }

    if (type !== "multiple_choice" && type !== "word_cloud" && type !== "open_ended" && type !== "scales") {
        console.log("return 2");
        return res.status(400).send({
            status: "error",
            error: 'Invalid type',
            body: JSON.stringify(req.body),
        });
    }

    try {
        const bot = new MentiBotDriver(type);
        console.log("bot created");
        await bot.open(input);
        console.log("bot opened");
        await bot.vote(data);
        console.log("bot voted");
        await bot.submit();
        console.log("bot submitted");

        await sleep(1000);
        await bot.close();

        console.log("return 3 (gut)");

        res.status(200).send({
            status: "success",
            body: JSON.stringify(req.body),
        });
    } catch (e) {
        console.log("return 4 (error)");
        console.error(e)
        res.status(500).send({
            status: "error",
            error: 'Runtime error',
            body: JSON.stringify(e),
        });
    }
});

app.listen(port, async () => {
    console.log(`Chromedriver path: ${chromedriver_path}`)
    console.info('Server started on http://localhost:' + port);

    try {
        const bot = new MentiBotDriver("multiple_choice");
        await bot.test();
        await bot.close();
        console.info('Selenium works');
    } catch (e) {
        console.error('Selenium does not work');
        throw e;
    }
});
