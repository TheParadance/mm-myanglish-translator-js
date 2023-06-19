const translator = require('myanglish-translator-js').default;
const { ConvertMode } = require('myanglish-translator-js');

// console.log(translator.myanmarWordSpliter("hello ကျွန်မတို့နိုင်ငံတော်ကြီးက"))


// import translator from 'myanglish-translator-js';
// import { Mode } from 'myanglish-translator-js'



console.log(translator.myanmarWordSpliter("hello ကျွန်မတို့နိုင်ငံတော်ကြီးက"))
console.log(translator.convertToMyanglish('ကျွန်မတို့နိုင်ငံတော်ကြီးက fdsa', {mode: ConvertMode.ADD_BRACKET_UNKNOWN_KEYWORDS}));
console.log(translator.convertToBurmese('bite sar lo a pyin twar chin dl jfdoksajfs', {mode: ConvertMode.ADD_BRACKET_UNKNOWN_KEYWORDS}));
console.log(translator.getDatasetCount());
console.log(translator.textSimilarity("ကျွန်မတို့နိုင်ငံတော်ကြီးက", 'ကျွန်မတို့နိုင်ငံတော်ကြီးက'))