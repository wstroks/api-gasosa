'use strict'

const Posto = use('App/Models/Posto');
const Combustivel = use('App/Models/Combustivel');
const Historico = use('App/Models/Historico');
const Database = use('Database');
const puppeteer = require('puppeteer');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with postos
 */
class PostoController {



    async starts({ response }) {

        return response.status(200).json({ "gasosa": "Bot Online" });
    }
    /**
     * Show a list of all postos.
     * GET postos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, params, response, view }) {
        try {
            var posto = await Posto.query().with('combustiveis', (builder) => { builder.orderBy("valor", "ASC") }).fetch();
            return response.status(200).json(posto);
        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }
    }

    async gnv({ response }) {

        var dataseet = [];

        var fs = require('fs');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page1 = await browser.newPage();

        await page1.setViewport({
            width: 1920,
            height: 1080
        });
        await page1.goto('https://precodahora.ba.gov.br/produtos/', { waitUntil: "networkidle2" });

        await page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.location-box > button');
        setTimeout(function () {
            page1.screenshot({ path: 'test01.png' });

            page1.click('#add-center');
            page1.screenshot({ path: 'test02.png' });

        }, 6000);

        setTimeout(function () {
            page1.screenshot({ path: 'test022.png' });
            page1.focus('#modal-regions > div > div > div.modal-body > input');
            page1.click('#modal-regions > div > div > div.modal-body > input');
            page1.waitForNavigation();


            page1.$eval('input[name=municipio]', el => el.value = 'f');


        }, 8000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'eira ');

        }, 11000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'de ');

        }, 12000);

        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'santana');
            page1.keyboard.press("Enter");


        }, 13000);
        setTimeout(function () {

            page1.click('#sugerir-municipios > ul > li.set-mun');
            page1.screenshot({ path: 'test03.png' });


            page1.screenshot({ path: 'test04.png' });

        }, 16000);

        setTimeout(function () {


            page1.screenshot({ path: 'test03.png' });
            page1.click('#aplicar');

            page1.screenshot({ path: 'test04.png' });

        }, 20000);


        setTimeout(function () {
            page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.gas-box > button');
            page1.screenshot({ path: 'test1.png' });

        }, 25000);
        setTimeout(function () {

            page1.evaluate(() => {
                document.querySelector("#lista-combustivel").value = "GNV";
            })
            page1.screenshot({ path: 'test2.png' });
        }, 30000);


        setTimeout(function () {


            page1.screenshot({ path: 'test3.png' });
            page1.click('#sel-combustivel');


            page1.screenshot({ path: 'test4.png' });



        }, 35000);


        setTimeout(function () {



        }, 42000);

        setTimeout(function () {



        }, 44000);
        setTimeout(function () {

            page1.click('body > div.ctrl-top > a');
        }, 46000);

        setTimeout(function () {


            page1.screenshot({ path: 'test5.png' });
            let data = page1.evaluate(() => {

                let array1 = [];

                var contadorArray = 5;
                for (var i = 2; i <= 8; i++) {

                    let p = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2").innerText;


                    let contato = null;
                    let nome = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(1) > strong").innerText;

                    let preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(2)").innerText;
                    let status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;


                    let posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;
                    let endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                    //let contato = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(7)").innerText;
                    var test = preco.split(" ");
                    if (test[0] == "De") {
                        preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;
                        status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;


                        posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                        endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(6)").innerText;
                    }


                    var x = "GNV" + "\n" + preco + "\n" + status.substr(1, status.length - 1) + "\n" + posto.substr(1, posto.length - 1) + "\n" + endereco.substr(1, endereco.length - 1) + "\n" + contato + "\n" + "null";

                    array1.push(x);

                }


                return array1;
            });




            data.then(t => {

                // console.log("1" + t.length);
                var datas = [];
                for (var i = 0; i < t.length; i++) {

                    var agora = t[i].split('\n');

                    // console.log(JSON.stringify(agora[7]));
                    datas.push({
                        combustivel: agora[0],
                        preco: agora[1],
                        status: agora[2],
                        posto: agora[3],
                        endereco: agora[4],
                        contato: agora[6],
                        cidade: "Feira de Santana"

                    });

                }


                const devtoListTrimmed = datas.filter(n => 1 != undefined)
                fs.writeFile("gnvfsa.json",
                    JSON.stringify(devtoListTrimmed, null, 4),
                    (err) => console.log('File successfully written!'))


            });



            console.log("GNV - Console");

        }, 70000);


    }
    async diesel() {

        var dataseet = [];
        var fs = require('fs');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page1 = await browser.newPage();

        await page1.setViewport({
            width: 1920,
            height: 1080
        });
        await page1.goto('https://precodahora.ba.gov.br/produtos/', { waitUntil: "networkidle2" });

        await page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.location-box > button');
        setTimeout(function () {
            page1.screenshot({ path: 'test01.png' });

            page1.click('#add-center');
            page1.screenshot({ path: 'test02.png' });


        }, 6000);

        setTimeout(function () {
            page1.screenshot({ path: 'test022.png' });
            page1.focus('#modal-regions > div > div > div.modal-body > input');
            page1.click('#modal-regions > div > div > div.modal-body > input');
            page1.waitForNavigation();

            page1.$eval('input[name=municipio]', el => el.value = 'f');

        }, 8000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'eira ');

        }, 11000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'de ');

        }, 12000);

        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'santana');
            page1.keyboard.press("Enter");

        }, 13000);
        setTimeout(function () {

            page1.click('#sugerir-municipios > ul > li.set-mun');
            page1.screenshot({ path: 'test03.png' });

            page1.screenshot({ path: 'test04.png' });

        }, 16000);

        setTimeout(function () {

            page1.screenshot({ path: 'test03.png' });
            page1.click('#aplicar');

            page1.screenshot({ path: 'test04.png' });

        }, 20000);


        setTimeout(function () {
            page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.gas-box > button');
            page1.screenshot({ path: 'test1.png' });

        }, 25000);
        setTimeout(function () {

            page1.evaluate(() => {
                document.querySelector("#lista-combustivel").value = "DIESEL";
            })
            page1.screenshot({ path: 'test2.png' });
        }, 30000);


        setTimeout(function () {

            page1.screenshot({ path: 'test3.png' });
            page1.click('#sel-combustivel');

            page1.screenshot({ path: 'test4.png' });

        }, 35000);


        setTimeout(function () {
            page1.click('#updateResults');

        }, 42000);

        setTimeout(function () {
            page1.click('#updateResults');

        }, 44000);
        setTimeout(function () {
            page1.click('#updateResults');
            page1.click('body > div.ctrl-top > a');
        }, 46000);

        setTimeout(function () {

            page1.screenshot({ path: 'test5.png' });
            let data = page1.evaluate(() => {

                let array1 = [];

                for (var i = 2; i < 102; i++) {

                    let p = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2").innerText;

                    let contato = null;
                    let nome = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(1) > strong").innerText;

                    let preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(2)").innerText;
                    let status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;


                    let posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;
                    let endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                    //let contato = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(7)").innerText;
                    var test = preco.split(" ");
                    if (test[0] == "De") {
                        preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;
                        status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;


                        posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                        endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(6)").innerText;
                    }
                    var str = nome;
                    var result1 = str.indexOf('1');
                    var result2 = str.indexOf('5');

                    var x = nome + "\n" + preco + "\n" + status.substr(1, status.length - 1) + "\n" + posto.substr(1, posto.length - 1) + "\n" + endereco.substr(1, endereco.length - 1) + "\n" + contato + "\n" + "null";

                    array1.push(x);

                }

                return array1;
            });




            data.then(t => {

                // console.log("1" + t.length);
                var datas = [];
                for (var i = 0; i < t.length; i++) {
                    //console.log(t[i]);
                    var agora = t[i].split('\n');

                    //console.log(JSON.stringify(agora[7]));
                    datas.push({
                        combustivel: agora[0],
                        preco: agora[1],
                        status: agora[2],
                        posto: agora[3],
                        endereco: agora[4],
                        contato: agora[6],
                        cidade: "Feira de Santana"

                    });


                }

                const devtoListTrimmed = datas.filter(n => 1 != undefined)
                fs.writeFile("dieselfsa.json",
                    JSON.stringify(devtoListTrimmed, null, 4),
                    (err) => console.log('File successfully written!'))

            });



            console.log("Diesel - Console.");

        }, 70000);

    }
    async etanol() {

        var dataseet = [];
        var adicionarData = 0;
        var fs = require('fs');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page1 = await browser.newPage();

        await page1.setViewport({
            width: 1920,
            height: 1080
        });
        await page1.goto('https://precodahora.ba.gov.br/produtos/', { waitUntil: "networkidle2" });

        await page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.location-box > button');
        setTimeout(function () {
            page1.screenshot({ path: 'test01.png' });

            page1.click('#add-center');
            page1.screenshot({ path: 'test02.png' });

        }, 6000);

        setTimeout(function () {
            page1.screenshot({ path: 'test022.png' });
            page1.focus('#modal-regions > div > div > div.modal-body > input');
            page1.click('#modal-regions > div > div > div.modal-body > input');
            page1.waitForNavigation();

            page1.$eval('input[name=municipio]', el => el.value = 'f');
        }, 8000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'eira ');

        }, 11000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'de ');

        }, 12000);

        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'santana');
            page1.keyboard.press("Enter");

        }, 13000);
        setTimeout(function () {

            page1.click('#sugerir-municipios > ul > li.set-mun');
            page1.screenshot({ path: 'test03.png' });
            page1.screenshot({ path: 'test04.png' });

        }, 16000);

        setTimeout(function () {

            page1.screenshot({ path: 'test03.png' });
            page1.click('#aplicar');
            page1.screenshot({ path: 'test04.png' });

        }, 20000);


        setTimeout(function () {
            page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.gas-box > button');
            page1.screenshot({ path: 'test1.png' });

        }, 25000);
        setTimeout(function () {
            page1.evaluate(() => {
                document.querySelector("#lista-combustivel").value = "ETANOL";
            })
            page1.screenshot({ path: 'test2.png' });
        }, 30000);


        setTimeout(function () {

            page1.screenshot({ path: 'test3.png' });
            page1.click('#sel-combustivel');
            page1.screenshot({ path: 'test4.png' });

        }, 35000);


        setTimeout(function () {
            page1.click('#updateResults');

        }, 42000);

        setTimeout(function () {
            page1.click('#updateResults');

        }, 44000);
        setTimeout(function () {
            page1.click('#updateResults');
            page1.click('body > div.ctrl-top > a');
        }, 46000);

        setTimeout(function () {

            page1.screenshot({ path: 'test5.png' });
            let data = page1.evaluate(() => {

                let array1 = [];


                for (var i = 2; i < 96; i++) {

                    let p = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2").innerText;

                    let contato = null;

                    let nome = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(1) > strong").innerText;

                    let preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(2)").innerText;
                    let status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;


                    let posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;
                    let endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                    //let contato = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(7)").innerText;
                    var test = preco.split(" ");
                    if (test[0] == "De") {
                        preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;
                        status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;


                        posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                        endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(6)").innerText;
                    }

                    var x = "ETANOL" + "\n" + preco + "\n" + status.substr(1, status.length - 1) + "\n" + posto.substr(1, posto.length - 1) + "\n" + endereco.substr(1, endereco.length - 1) + "\n" + contato + "\n" + "null";


                    array1.push(x);

                }

                return array1;
            });




            data.then(t => {

                // console.log("1" + t.length);
                var datas = [];
                for (var i = 0; i < t.length; i++) {
                    //console.log(t[i]);
                    var agora = t[i].split('\n');
                    // console.log(JSON.stringify(agora[7]));
                    datas.push({
                        combustivel: agora[0],
                        preco: agora[1],
                        status: agora[2],
                        posto: agora[3],
                        endereco: agora[4],
                        contato: agora[6],
                        cidade: "Feira de Santana"

                    });

                }
                // var fs = require('fs');
                const devtoListTrimmed = datas.filter(n => 1 != undefined)
                fs.writeFile("etanolfsa.json",
                    JSON.stringify(devtoListTrimmed, null, 4),
                    (err) => console.log('File successfully written!'))

                
            });



            console.log("Etanol - Console.");
            //browser.close();

        }, 70000);




    }
    async app() {
        var dataseet = [];
        var fs = require('fs');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page1 = await browser.newPage();

        await page1.setViewport({
            width: 1920,
            height: 1080
        });
        await page1.goto('https://precodahora.ba.gov.br/produtos/', { waitUntil: "networkidle2" });

        await page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.location-box > button');
        setTimeout(function () {
            page1.screenshot({ path: 'test01.png' });

            page1.click('#add-center');
            page1.screenshot({ path: 'test02.png' });

        }, 6000);

        setTimeout(function () {
            page1.screenshot({ path: 'test022.png' });
            page1.focus('#modal-regions > div > div > div.modal-body > input');
            page1.click('#modal-regions > div > div > div.modal-body > input');
            page1.waitForNavigation();

            page1.$eval('input[name=municipio]', el => el.value = 'f');


        }, 8000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'eira ');

        }, 11000);
        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'de ');

        }, 12000);

        setTimeout(function () {
            page1.$eval('input[name=municipio]', el => el.value = el.value + 'santana');
            page1.keyboard.press("Enter");

        }, 13000);
        setTimeout(function () {

            page1.click('#sugerir-municipios > ul > li.set-mun');
            page1.screenshot({ path: 'test03.png' });


            page1.screenshot({ path: 'test04.png' });

        }, 16000);

        setTimeout(function () {

            page1.screenshot({ path: 'test03.png' });
            page1.click('#aplicar');
            page1.screenshot({ path: 'test04.png' });

        }, 20000);


        setTimeout(function () {
            page1.click('body > div.row-fluid.bg-white.mb-3 > div > div > div.gas-box > button');
            page1.screenshot({ path: 'test1.png' });

        }, 25000);
        setTimeout(function () {
            page1.screenshot({ path: 'test2.png' });
        }, 30000);


        setTimeout(function () {
            page1.screenshot({ path: 'test3.png' });
            page1.click('#sel-combustivel');
            page1.screenshot({ path: 'test4.png' });

        }, 35000);

        setTimeout(function () {
            page1.click('#updateResults');
        }, 42000);

        setTimeout(function () {
            page1.click('#updateResults');
        }, 44000);
        setTimeout(function () {
            page1.click('#updateResults');
            page1.click('body > div.ctrl-top > a');
        }, 46000);

        setTimeout(function () {
            page1.screenshot({ path: 'test5.png' });
            let data = page1.evaluate(() => {

                let array1 = [];
                for (var i = 2; i <= 101; i++) {
                    let p = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2").innerText;

                    let contato = null;
                    if (!document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(7)")) {
                        // console.log(contato + "xxxx");

                    } else {
                        contato = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(7)").innerText;
                    }
                    let nome = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(1) > strong").innerText;

                    let preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(2)").innerText;
                    let status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;


                    let posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;
                    let endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                    //let contato = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(7)").innerText;
                    var test = preco.split(" ");
                    if (test[0] == "De") {
                        preco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(3)").innerText;
                        status = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(4)").innerText;


                        posto = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(5)").innerText;
                        endereco = document.querySelector("#nav-lista > div:nth-child(" + i + ") > div.flex-item2 > div:nth-child(6)").innerText;
                    }
                    var str = nome;
                    var result1 = str.indexOf('COMUM') > -1;
                    var result2 = str.indexOf('ADITIVADA') > -1;
                    if (result1) {
                        nome = "GASOLINA COMUM";
                    } else {
                        nome = "GASOLINA ADITIVADA"
                    }
                    var x = nome + "\n" + preco + "\n" + status.substr(1, status.length - 1) + "\n" + posto.substr(1, posto.length - 1) + "\n" + endereco.substr(1, endereco.length - 1) + "\n" + contato + "\n" + "null";

                    array1.push(x);

                }

                return array1;
            });


            data.then(t => {
                var datas = [];
                for (var i = 0; i < t.length; i++) {
                    //console.log(t[i]);
                    var agora = t[i].split('\n');
                    // console.log(agora);
                    datas.push({
                        combustivel: agora[0],
                        preco: agora[1],
                        status: agora[2],
                        posto: agora[3],
                        endereco: agora[4],
                        contato: agora[6],
                        cidade: "Feira de Santana"

                    });



                }

                const devtoListTrimmed = datas.filter(n => n != undefined)
                fs.writeFile("gfsa.json",
                    JSON.stringify(devtoListTrimmed, null, 4),
                    (err) => console.log('File successfully written!'))

            });


            console.log("Gasolina - Console.");

        }, 70000);
    }

    /**
     * Render a form to be used for creating a new posto.
     * GET postos/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

    async jsonvisualizar({ request, response, view }) {
        try {
            var array = ['../../../dieselfsa.json', '../../../gfsa.json', '../../../gnvfsa.json', '../../../etanolfsa.json']
            //var mydata = JSON.parse(json);
            var dataseet = [];
            for (var y = 0; y < array.length; y++) {
                // console.log(array[y]);
                var data = require(array[y]);

                for (var i = 0; i < Object.keys(data).length; i++) {
                    dataseet.push(data[i]);

                }
            }
            return response.status(200).json({ message: "Arquivos gerados!", data: dataseet });
        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }



    }
    async jsonadd({ request, response, view }) {
        try {
            var array = ['../../../dieselfsa.json', '../../../gfsa.json', '../../../gnvfsa.json', '../../../etanolfsa.json']
            //var mydata = JSON.parse(json);
            for (var y = 0; y < array.length; y++) {
                // console.log(array[y]);
                var data = require(array[y]);
                for (var i = 0; i < Object.keys(data).length; i++) {
                    var dados = [];
                    var dadosCombustivel = [];

                    if (data[i].posto == null) {
                        dados.push({
                            'nome': "Não tem",
                            'endereco': data[i].endereco,
                            'contato': data[i].contato,
                            'status': data[i].status,
                            'cidade': "Feira de Santana"


                        });
                    } else {
                        dados.push({
                            'nome': data[i].posto,
                            'endereco': data[i].endereco,
                            'contato': data[i].contato,
                            'status': data[i].status,
                            'cidade': "Feira de Santana"


                        });
                    }

                    var posto = await Posto.query().where('endereco', '=', data[i].endereco).first();


                    if (!posto) {
                        var posto1 = await Posto.create(...dados);

                        dadosCombustivel.push({
                            'valor': data[i].preco,
                            'tipo': data[i].combustivel,
                            'posto_id': posto1.id

                        });

                        var combustivel = await Combustivel.create(...dadosCombustivel);
                        var historico = await Historico.create(...dadosCombustivel);
                    } else {
                        //console.log('1');
                        var combustivel1 = await Combustivel.query().where('posto_id', posto.id).where('tipo', '=', data[i].combustivel).first();
                        dadosCombustivel.push({
                            'valor': data[i].preco,
                            'tipo': data[i].combustivel,
                            'posto_id': posto.id

                        });
                        if (combustivel1) {
                            combustivel1.valor = data[i].preco;
                            combustivel1.save();
                            var historico = await Historico.create(...dadosCombustivel);
                        } else {

                            var combustivel = await Combustivel.create(...dadosCombustivel);
                            var historico = await Historico.create(...dadosCombustivel);
                        }

                    }

                }
            }
            return response.status(404).send({ message: "Update realizado com sucesso!" });
        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }



    }
    async create({ request, response, view }) {

        var data = request.all();

        for (var i = 0; i < Object.keys(data).length; i++) {
            //console.log(data);
            var dados = [];
            var dadosCombustivel = [];

            dados.push({
                'nome': data[i].posto,
                'endereco': data[i].endereco,
                'contato': data[i].contato,
                'status': data[i].status,
                'cidade': "Feira de Santana"

            });

            var find = await Posto.query().where('endereco', '=', data[i].endereco).first();

            if (!find) {
                var posto1 = await Posto.create(...dados);
                console.log("2");
                dadosCombustivel.push({
                    'valor': data[i].preco,
                    'tipo': data[i].combustivel,
                    'posto_id': posto1.id
                });

                var combustivel = await Combustivel.create(...dadosCombustivel);
            } else {
                console.log('1');
                dadosCombustivel.push({
                    'valor': data[i].preco,
                    'tipo': data[i].combustivel,
                    'posto_id': find.id

                });
                var combustivel1 = await Combustivel.query().where('posto_id', find.id).where('tipo', '=', data[i].combustivel).first();
                if (combustivel1) {
                    combustivel1.valor = data[i].preco;
                    combustivel1.save();
                } else {

                    var combustivel = await Combustivel.create(...dadosCombustivel);
                }
            }


        }

        return "FOi";


    }

    /**
     * Create/save a new posto.
     * POST postos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
    }

    /**
     * Display a single posto.
     * GET postos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        
        try {
            const posto = await Posto.query().with('combustiveis').where('id', params.id).first();
            if (!posto) {
                return response.status(404).send({ message: "ID de Posto não existe!" });
            }
            return response.status(200).json(posto);
        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }

    }

    /**
     * Render a form to update an existing posto.
     * GET postos/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {

        try {
            const data = request.all();
            const posto = await Posto.query().where('id', params.id).first();

            if (!posto) {
                return response.status(404).send({ message: "ID de Posto não existe!" });

            } else {

                posto.nome = data.nome;
                posto.endereco = data.endereco;
                posto.contato = data.contato;
                posto.status = data.status;
                posto.cidade = data.cidade;
                posto.latitude = data.latitude;
                posto.longitude = data.longitude;
                posto.url = data.url;
                posto.bandeira = data.bandeira;
                posto.save();
            }
            return response.status(200).json(posto);

        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }

    }

    /**
     * Update posto details.
     * PUT or PATCH postos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {

        const data = request.all();
        for (var i = 0; i < Object.keys(data).length; i++) {

            var dados = [];
            var dadosCombustivel = [];

            if (data[i].posto == null) {
                dados.push({
                    'nome': "Não tem",
                    'endereco': data[i].endereco,
                    'contato': data[i].contato,
                    'status': data[i].status,
                    'cidade': "Feira de Santana"
                });
            } else {
                dados.push({
                    'nome': data[i].posto,
                    'endereco': data[i].endereco,
                    'contato': data[i].contato,
                    'status': data[i].status,
                    'cidade': "Feira de Santana"
                });
            }

            var posto = await Posto.query().where('endereco', '=', data[i].endereco).first();
           
            if (!posto) {
                var posto1 = await Posto.create(...dados);
                console.log(posto1.id + "n");
                dadosCombustivel.push({
                    'valor': data[i].preco,
                    'tipo': data[i].combustivel,
                    'posto_id': posto1.id
                });

                var combustivel = await Combustivel.create(...dadosCombustivel);
            } else {
                console.log('1');
                var combustivel1 = await Combustivel.query().where('posto_id', posto.id).where('tipo', '=', data[i].combustivel).first();
                  
                if (combustivel1) {
                    combustivel1.valor = data[i].preco;
                    combustivel1.save();
                } else {
                    dadosCombustivel.push({
                        'valor': data[i].preco,
                        'tipo': data[i].combustivel,
                        'posto_id': posto.id

                    });

                    var combustivel = await Combustivel.create(...dadosCombustivel);
                }
                
            }


        }

        return "FOi";

    }

    /**
     * Delete a posto with id.
     * DELETE postos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = PostoController
