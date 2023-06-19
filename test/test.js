const translator = require('myanglish-translator-js').default;

// console.log(translator.myanmarWordSpliter("hello ကျွန်မတို့နိုင်ငံတော်ကြီးက"))


// import translator from 'myanglish-translator-js';
// import { Mode } from 'myanglish-translator-js'



console.log(translator.myanmarWordSpliter("hello ကျွန်မတို့နိုင်ငံတော်ကြီးက"))
console.log(translator.convertToMyanglish('ကျွန်မတို့နိုင်ငံတော်ကြီးက fdsa'));
console.log(translator.convertToBurmese('bite sar lo a pyin twar chin dl'));
console.log(translator.getDatasetCount());
console.log(translator.textSimilarity("ကျွန်မတို့နိုင်ငံတော်ကြီးက", 'ကျွန်မတို့နိုင်ငံတော'))