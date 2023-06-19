# Burmese ~ Myanglish translator
[Home Page](https://myanglish.bytete.com)
This library was created to translate between myanglish to burmese unicode and burmese to myanglish vice-visa. We have trained over 2400+ myanglish phrase and words source from internet, multiple social media platforms.


### Code example
#### Translate Burmese to Myanglish
```javascript
import translator from 'myanglish-translator-js';
const reault = translator.convertToMyanglish('ကျွန်မတို့နိုင်ငံတော်ကြီးက');
console.log(result);

// output => kyun ma do naing ngan taw geyii ka
```

#### Translate Myanglish to Burmese
```javascript
import translator from 'myanglish-translator-js';
const reault = translator.convertToBurmese('bite sar lo a pyin twar chin dl');
console.log(result);

// output => ဗိုက်စာလိုအပြင်သွာချင်တယ်
```


#### Burmese word splitter
```javascript
import translator from 'myanglish-translator-js';
const reault = translator.myanmarWordSpliter('hello ကျွန်မတို့နိုင်ငံတော်ကြီးက');
console.log(result);

// output => ['hello', ' ', 'ကျွန်', 'မ', 'တို့', 'နိုင်', 'ငံ', 'တော်', 'ကြီး', 'က']
```


#### Get total trained phrases
```javascript
import translator from 'myanglish-translator-js';
const reault = translator.getDatasetCount();
console.log(result);

// output => 2400
```


#### Get text similarity
```javascript
import translator from 'myanglish-translator-js';
const reault = textSimilarity("ကျွန်မတို့နိုင်ငံတော်ကြီးက", 'ကျွန်မတို့နိုင်ငံတော');
console.log(result);

// output => 0.32065217391304346
```