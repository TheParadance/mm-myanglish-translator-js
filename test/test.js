// const translator = require('mm-myanglish-translator-js');

// console.log(translator.myanmarWordSpliter("hello ကျွန်မတို့နိုင်ငံတော်ကြီးက"))


import translator from 'mm-myanglish-translator-js';

console.log(translator.myanmarWordSpliter("hello ကျွန်မတို့နိုင်ငံတော်ကြီးက"))
console.log(translator.convertToMyanglish('ကျွန်မတို့နိုင်ငံတော်ကြီးက'));
console.log(translator.convertToBurmese('bite sar lo a pyin twar chin dl'));
console.log(translator.getDatasetCount());