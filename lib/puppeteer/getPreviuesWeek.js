const puppeteer = require('puppeteer');


module.exports = async (username, password) => {
    return new Promise(async (resolve, reject) => {
        console.log(`start`)
        const browser = await puppeteer.launch({
            timeout: 300000,
            args: ["--no-sandbox", "--disabled-setupid-sandbox"],
        })
        const page = await browser.newPage();

        await page
            .goto('https://sosh1.dnevnik.anadyrobr.ru/', {
                waitUntil: 'networkidle2',
                timeout: 0
            })
            .catch(() => reject(`Ошибка на стороне электронного дневника. Пожалуйста, попробуйте снова...`))

        await page.setViewport({ width: 1050, height: 700 })


        await page.type('#main_info > form > p:nth-child(4) > input', `${username}`)
        await page.type('#main_info > form > p:nth-child(6) > input', `${password}`)

        await new Promise(r => setTimeout(r, 10000))

        page
            .click("#main_info > form > p:nth-child(7) > input")
            .catch(() => reject(`Ошибка на стороне электронного дневника. Пожалуйста, попробуйте снова...`))

        await new Promise(r => setTimeout(r, 15000))

        await page
            .click("#panel_center > a:nth-child(2) > img")
            .catch(() => reject(`Ошибка на стороне электронного дневника. Пожалуйста, попробуйте снова...`))
        console.log(`Переходим на страницу оценок`)

        await new Promise(r => setTimeout(r, 10000))

        await page.click("#prev")

        await new Promise(r => setTimeout(r, 9000))
        await page.screenshot({ path: `images/${username}.png` }).catch(() => {
            reject(`Ошибка на стороне электронного дневника. Пожалуйста, попробуйте снова...`)
            unlink(path.resolve() + `/images/${username}.png`, () => console.log(`Файл удалён`))
        })

        await page.close();

        resolve(`images/${username}.png`)
    })
}