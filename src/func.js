import MyanglishToMyanmarDict from './dict.js';



// console.log(MyanglishToMyanmarDict);
let dataOptimized = false;
let TotalDataCount = 0;
let DataSet = {
    '1': {}
};

const MyanmarToMyanglishDataSet = {
    '1': {}
}

const MyanmarAlphabet = [
    'က','ခ','ဂ','ဃ','င',
    'စ','ဆ','ဇ','ဈ','ည',
    'ဋ','ဌ','ဍ','ဎ','ဏ',
    'တ','ထ','ဒ','ဓ','န',
    'ပ','ဖ','ဗ','ဘ','မ',
    'ယ','ရ','လ','ဝ','သ','ဟ',
    'ဠ','အ','ဢ','ဣ','ဤ','ဥ',
    'ဩ', 'ဿ', '၌', '၍', '၎',
    '၏','ၮ','႟','ဧ',
    '၁','၂','၃','၄','၅','၆','၇','၈','၉','၀'
]
const MyanmarVowelSound = [
    // 'ခ်', 'ခံ', 'ခ့', 'ခး', 'ခ္',
    '်', 'ံ', '့', 'း', '္',
    // 'ာ'
];




function isBurmeseVowel(str) {
    // const key = str.slice(-1);
    // return key == 'း' || key == "ံ" || key == '့';
    // return str.includes('း') || str.includes("ံ") || str.includes('့');

    if(str.includes('း')) return {
        type: 'double',
        originalValue: str.slice(0, -1),
        symbol: null
    }

    if(str.includes('့')) return {
        type: '.',
        originalValue: str.slice(0, -1),
        symbol: 'k'
    }

    return false;
    
}





function optimizeData() {
     Object.entries(MyanglishToMyanmarDict).sort(([aKey, aValue], [bKey, bValue]) => {
        return bKey.length - aKey.length;
    }).forEach(([key, value]) => {
        const split = key.split(' ');
        const keyLength = split.length;
        if(DataSet[keyLength]){
            DataSet[keyLength][key] = value;
            DataSet['1'][split.join('')] = value;
        }else{
            DataSet[keyLength] = { 
                [key]: value
            };
        }
        TotalDataCount++;
    })

    

    let Temp = {};
    Object.entries(MyanglishToMyanmarDict).forEach(([key, value]) => {
        Temp[value] = key;
    });
    Object.entries(Temp).sort(([aKey, aValue], [bKey, bValue]) => {
        return bKey.length - aKey.length;
    }).forEach(([key, value]) => {
        const len = myanmarWordSpliter(key).length;
        if(MyanmarToMyanglishDataSet[len]){
            MyanmarToMyanglishDataSet[len][key] = value;
        }else{
            MyanmarToMyanglishDataSet[len] = {
                [key]: value
            };
        }
    })
    // Temp == null;
    console.log(MyanmarToMyanglishDataSet);
    // console.log(DataSet);
    dataOptimized = true;
}





function detectVowel(token){
    // detect : 
    function detectDoubleSound(token){
        const doubleSound = token.slice(-2).split('');
        return doubleSound[0] == doubleSound[1] && token.length > 2 && doubleSound[0] !== 'k';
    }

    if(DataSet['1'][token]){
        return {
            sound: '',
            originalValue: token
        }
    }

    // detect : with token ending with double keyword, such as ending with "nn", "yayy"
    if(detectDoubleSound(token)){
        return {
            sound: 'း',
            originalValue: token.slice(0, -1)
        }
    }

    // detect ့ with token ending with k
    if(token.slice(-1).toLowerCase() == 'k' || token.slice(-1).toLowerCase() == 't'){
        return {
            sound: '့',
            originalValue: token.slice(0, -1)
        }
    }

    return {
        sound: '',
        originalValue: token
    }
}
function characterSimilarity(text1, text2){
    if(text1 == text2) return{
        rate: 1,
        input: {text1, text2}
    }

    const text1Split = text1.replace(/ /g, '').split('');
    const text2Split = text2.replace(/ /g, '').split('');

    // chars test
    const text1Chars = {};
    const text2Chars = {};
    text1Split.forEach(c => text1Chars[c] ? text1Chars[c] = text1Chars[c] + 1 : text1Chars[c] = 1);
    text2Split.forEach(c => text2Chars[c] ? text2Chars[c] = text2Chars[c] + 1 : text2Chars[c] = 1);

    let text1ToText2Score = 0;
    let text2ToText1Score = 0;
    Object.entries(text1Chars).forEach(([key, value]) => {
        const t2CharScore = text2Chars[key] || 0;
        text1ToText2Score = t2CharScore ? text1ToText2Score + (value / t2CharScore) : text1ToText2Score;
    })
    Object.entries(text2Chars).forEach(([key, value]) => {
        const t1CharScore = text1Chars[key] || 0;
        text2ToText1Score = t1CharScore ? text2ToText1Score + (value / t1CharScore) : text2ToText1Score;
    })
    const mean = (text1ToText2Score + text2ToText1Score) / 2;
    const lengthMean = (text1.length + text2.length) / 2;

    return {
        rate: mean / lengthMean,
        input: {
            text1, text2
        }
    }
}
function phraseSimilarity(text1, text2){
    if(text1 == text2) return{
        rate: 1,
        input: {text1, text2}
    }

    const text1pharase = text1.split(' ').filter(t => t != '');
    const text2pharase = text2.split(' ').filter(t => t != '');

    const text1PharseToText2 = {};
    text1pharase.forEach(phrase1 => {
        text2pharase.forEach(phrase2 => {
            if(phrase1 == phrase2){
                text1PharseToText2[phrase1] = !!text1PharseToText2[phrase1] ? text1PharseToText2[phrase1] + 1 : 1;
            }
        })
        !text1PharseToText2[phrase1] && (text1PharseToText2[phrase1] = 0);
    });

    const text2PharseToText1 = {};
    text2pharase.forEach(phrase2 => {
        text1pharase.forEach(phrase1 => {
            if(phrase1 == phrase2){
                text2PharseToText1[phrase2] = !!text2PharseToText1[phrase2] ? text2PharseToText1[phrase2] + 1 : 1;
            }
        })
        !text2PharseToText1[phrase2] && (text2PharseToText1[phrase2] = 0);
    });



    const score = (() => {
        const ent1 = Object.entries(text1PharseToText2);
        const ent2 = Object.entries(text2PharseToText1);

        const sc1 = (() => {
            let sc = 0;
            ent1.forEach(([key, value]) => {
                const t2Val = text2PharseToText1[key] || 0;
                sc = sc + (value + t2Val) / 2
            })
            return sc / ((ent1.length + ent2.length) / 2);
        })()

        const sc2 = (() => {
            let sc = 0;
            ent2.forEach(([key, value]) => {
                const t1Val = text1PharseToText2[key] || 0;
                sc = sc + (value + t1Val) / 2
            })
            return sc / ((ent1.length + ent2.length) / 2);
        })()

        return (sc1 + sc2) / 2;
    })()



    // console.log(text1PharseToText2);
    // console.log(text2PharseToText1);
    // console.log('score', score);

    return {
        rate: score,
        input: {
            text1, text2
        }
    };
}







function myanmarWordSpliter(text){
    // func.myanmarWordSpliter("ခြှောက်ပြစ်ကင်းသဲလဲဆင်ကိစ္စကိုစန္ဒာသင်္ကြန်အန္ဒြေရမရှိဘူးအတွေးအခေါ်မရှိကြဘူး");

    //
    // Splitting myanmar sentence will generate following
    // result
    // ['ခ', 'ြ', 'ှ', 'ေ', 'ာ', 'က', '်', 'ပ', 'ြ', 'စ', '်', 'က', 'င', '်', 'း', 'သ', 'ဲ', 'လ', 'ဲ', 'ဆ', 'င', '်', 'က', 'ိ', 'စ', '္', 'စ', 'က', 'ိ', 'ု', 'စ', 'န', '္', 'ဒ', 'ာ', 'သ', 'င', '်', '္', 'က', 'ြ', 'န', '်', 'အ', 'န', '္', 'ဒ', 'ြ', 'ေ', 'ရ', 'မ', 'ရ', 'ှ', 'ိ', 'ဘ', 'ူ', 'း', 'အ', 'တ', 'ွ', 'ေ', 'း', 'အ', 'ခ', 'ေ', 'ါ', '်', 'မ', 'ရ', 'ှ', 'ိ', 'က', 'ြ', 'ဘ', 'ူ', 'း']
    //
    const split = text.split('');
    const word = [];

    // THEN
    // general group အသက် with အက္ခရာ
    // 
    // this will concat with generalization of myanmar consonant with vouwel
    // by detecting base က္ခရာ and concat with အသက်
    // output result will be
    // ['ခြှော', 'က်', 'ပြ', 'စ်', 'က', 'င်း', 'သဲ', 'လဲ', 'ဆ', 'င်', 'ကိ', 'စ္', 'စ', 'ကို', 'စ', 'န္', 'ဒာ', 'သ', 'င်္', 'ကြ', 'န်', 'အ', 'န္', 'ဒြေ', 'ရ', 'မ', 'ရှိ', 'ဘူး']
    //
    // 
    let tmp = '';
    for(let i = 0; i < split.length; i++){
        const char = split[i];
        if(char == ' ' && i > 0){
            word.push(tmp);
            word.push(' ');
            tmp = '';
            continue;
        }

        if(MyanmarAlphabet.includes(char) && i > 0){
            tmp.length > 0 && word.push(tmp);
            tmp = char;
        }else{
            tmp = tmp + char;
        }
        
        // push end of word
        if(i == split.length - 1) {
            word.push(tmp);
            tmp = '';
        }
    }


    // THEN
    // concat with အသတ်
    // 
    // this will concat with generalization of myanmar consonant with vouwel
    // ['ကော','က်', 'ရ', 'င်', 'ကျိုး', 'ရ', 'စန္', 'ဒာ'] => ['ကောက်', 'ရင်', 'ကျိုး', 'ရ', 'စန္', 'ဒာ']
    // output result will be
    // ['ခြှောက်', 'ပြစ်', 'ကင်း', 'သဲ', 'လဲ', 'ဆင်', 'ကိစ္', 'စ', 'ကို', 'စန္', 'ဒာ', 'သင်္', 'ကြန်', 'အန္', 'ဒြေ', 'ရ', 'မ', 'ရှိ', 'ဘူး']
    //
    // 
    let len = word.length;
    for(let i = 0; i < len; i++){
        const wd = word[i];
        if(!wd) continue;

        if(wd.length >= 2 && wd.length <= 3){
            if(MyanmarVowelSound.includes(wd.split('')[1]) && word[i - 1] != ' '){
                word[i - 1] = word[i - 1] + wd;
                word.splice(i, 1);
                len--;
            }
        }
    }


    // THEN
    // concat with ပဆင့်
    // 
    // this will concat with generalization of myanmar consonant with vouwel
    // ['ကောက်', 'ရင်', 'ကျိုး', 'ရ', 'စန္', 'ဒာ'] => ['ကောက်', 'ရင်', 'ကျိုး', 'ရ', 'စန္ဒာ'] 
    // output result will be
    // ['ခြှောက်', 'ပြစ်', 'ကင်း', 'သဲ', 'လဲ', 'ဆင်', 'ကိစ္စ', 'ကို', 'စန္ဒာ', 'သင်္ကြန်', 'အန္ဒြေ', 'ရ', 'မ', 'ရှိ', 'ဘူး', 'အ', 'တွေး', 'အ', 'ခေါ်', 'မ', 'ရှိ', 'ကြ', 'ဘူး']
    //
    // 
    for(let i = 0; i < word.length; i++){
        const wd = word[i];
        if(wd.includes('္')){
            word[i + 1] = wd + word[i + 1];
            word.splice(i, 1);
        }
    }
    
    return word;
}






export default {
    convertToBurmese: (string) => {
        if(!dataOptimized) optimizeData();

        let str = '';
        string = string.toLowerCase();
        string = string.replace(/\n/g, '');
        if (string.includes(' ')) {
            const tokens = string.trim().split(' ')
            // console.log(tokens);
            for(let i = 0; i < tokens.length; i++){
                const groupIndex = tokens.length - i <= 5 ? tokens.length - i : 5;
                if(groupIndex > 1){
                    for(let j = groupIndex; j > 0; j--) {
                        const phrase = tokens.slice(i, i + j);
                        const matchedIndex = DataSet[phrase.length];
                        if(matchedIndex){
                            const re = matchedIndex[phrase.join(' ')];
                            if(re){
                                str = str + re;
                                i = i + j - 1;
                                break;
                            }

                            const groupPhrase = phrase.join('');
                            const mat = DataSet['1'][groupPhrase];
                            if(mat){
                                str = str + mat;
                                i = i + j - 1;
                                break;
                            }
                        }
                        if(j == 1){
                            matchSingleToken(tokens[i]);
                            break;
                        }
                    }
                }else{
                    matchSingleToken(tokens[i])
                }
            }
            return str;
        } else {
            return matchSingleToken(string);
        }


        function matchSingleToken(token){
            const vol = detectVowel(token);
            // console.log(vol);
            if (DataSet['1'][vol.originalValue]) {
                str = str + DataSet['1'][vol.originalValue] + vol.sound;
            } else {
                if(token.length == 0){
                    str = str + ' ';
                }else{
                    str = str + `{${token}}`;
                }
            }
            return str;
        }
    },
    convertToMyanglish: (mmString) => {
        if(!dataOptimized) optimizeData();
        
        const tokens = myanmarWordSpliter(mmString);
        // console.log(tokens);
        let str = '';
        for(let i = 0; i < tokens.length; i ++){
            const groupIndex = tokens.length - i <= 5 ? tokens.length - i : 5;
            for(let j = groupIndex; j > 0; j--){
                const splitToken = tokens.slice(i, i + j);
                const phrase = splitToken.join('');
                const matched = MyanmarToMyanglishDataSet[splitToken.length][`${phrase}`];
                if(matched){
                    appendStr(matched);
                    i = i + j - 1;
                    break;
                }

                if(j == 1){
                    matchSingleToken(phrase);
                    break;
                }
            }
        }

        function matchSingleToken(token){
            const includeSpecialVowel = isBurmeseVowel(token);
            if(includeSpecialVowel){
                const mat = MyanmarToMyanglishDataSet['1'][includeSpecialVowel.originalValue];
                if(mat){
                    if(includeSpecialVowel.type == 'double')
                        appendStr(mat + mat.slice(-1));
                    else if(includeSpecialVowel.type == '.')
                        appendStr(mat + 'k');
                    else
                        appendStr(mat);

                }else if(token == ' ' && token.length == 1) {
                    appendStr(' ');
                }else{
                    appendStr(mat || `{${token}}`);
                }
            }else{
                const mat = MyanmarToMyanglishDataSet['1'][token];
                if(token == ' ' && token.length == 1) {
                    appendStr(' ');
                }else{
                    appendStr(mat || `{${token}}`);
                }
            }
            return str;
        }

        function appendStr(append){
            str = str + (str.length > 0 ? ' ' : '') + append;
        }
        return str;
    },
    getDatasetCount: () => {
        return TotalDataCount;
    },
    textSimilarity: (text1, text2) => {
        // if(text1 == text2) return {
        //     rate: 1,
        //     input: {
        //         text1, text2
        //     }
        // }

        // const text1Split = text1.split('');
        // const text2Split = text2.split('');

        // const charSimilarity = characterSimilarity(text1, text2);


        const charSimilar = characterSimilarity(text1, text2);
        const phraseSimilar = phraseSimilarity(text1, text2);

        return (phraseSimilar.rate + charSimilar.rate) /2;
    },
    myanmarWordSpliter
}




