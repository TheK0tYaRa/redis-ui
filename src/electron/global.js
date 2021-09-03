
const pkg = require('../../package.json');

const Store = require('electron-store');
const conf = new Store();

let currentTranslation = conf.get('current-translation')

if (currentTranslation === undefined) {
    currentTranslation = 'en'
}

// optionToHideMenu
let optionToHideMenu = conf.get('option-to-hide-menu')
if (optionToHideMenu === undefined) {
    conf.set('option-to-hide-menu', false)
    optionToHideMenu = false;
}

global.p3xre = {
    dev: process.env.NODE_ENV === 'development',
    iconFile: `${__dirname}/images/128x128.png`,
    mainWindow: undefined,
    pkg: pkg,
    indexHtml: 'file://' + __dirname + '/window/main/index.html',
    strings: require('../strings/' + currentTranslation + '/index'),
    currentTranslation: currentTranslation,
    conf: conf,
    setLanguage: require('../lib/set-language'),
    optionToHideMenu: optionToHideMenu,
}

global.p3xre.setVisible = (visible = true) => {
    if (visible === null) {
        visible = true;
    }
    if (global.p3xre.mainWindow !== undefined) {
        if (visible) {
            global.p3xre.mainWindow.show();
        } else {
            global.p3xre.mainWindow.hide();
        }
    }

    //global.ngivr.recreateMenus();
}
