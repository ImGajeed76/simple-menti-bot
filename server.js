const {Builder, By} = require("selenium-webdriver");
const {Options, ServiceBuilder} = require("selenium-webdriver/chrome");
const chromedriver = require('chromedriver');

const {Interflow} = require('interflow');
const interflow = new Interflow(process.stdin, process.stdout);

const bodyParser = require("express");
const express = require('express');
const app = express();
app.use(bodyParser.json());

const lerp = (a, b, f) => {
    return a * (1.0 - f) + (b * f);
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
            .setChromeService(
                new ServiceBuilder(chromedriver.path)
            )
            .setChromeOptions(
                new Options().addArguments("--headless", "incognito", "--disable-notifications")
            )
            .build();

        this.driver.manage().setTimeouts({implicit: 10000});
    }

    async open(input) {
        input = input.replaceAll(' ', '');
        if (input.startsWith('http')) {
            await this.driver.get(input);
            await Interflow.sleep(1000);
        } else {
            await this.driver.get(`https://www.menti.com`);
            await Interflow.sleep(100);
            await this.driver.findElement(By.id('enter-vote-key')).sendKeys(input);
            await this.driver.findElement(By.id('enter-vote-key')).submit();
            await Interflow.sleep(1000);
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
                interflow.error('Invalid type: ' + this.type)
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
    res.sendFile(__dirname + '/src/app.html');
});

app.post('/api', async (req, res) => {
    const type = req.body.type;
    const input = req.body.input;
    const data = req.body.data;

    if (!type || !input || !data) return res.send({
        status: "error",
        error: 'Invalid request',
        body: JSON.stringify(req.body),
    });

    if (type !== "multiple_choice" && type !== "word_cloud" && type !== "open_ended" && type !== "scales") return res.send({
        status: "error",
        error: 'Invalid type',
        body: JSON.stringify(req.body),
    });

    try {
        const bot = new MentiBotDriver(type);
        await bot.open(input);
        await bot.vote(data);
        await bot.submit();

        await Interflow.sleep(1000);
        await bot.close();

        res.send({
            status: "success",
            body: JSON.stringify(req.body),
        });
    } catch (e) {
        interflow.error(e)
        res.send({
            status: "error",
            error: 'Runtime error',
            body: JSON.stringify(e),
        });
    }
});

app.listen(3000, () => {
    interflow.info('Server started on http://localhost:3000')
});
