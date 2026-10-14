/**
 * わくわくスタディパーク - AI動的無限問題ジェネレーター (ai_generator.js)
 * ルールベースのアルゴリズム自動生成 ＋ 外部LLM (Gemini API) 連携による無限問題生成
 */

class AIGenerator {
  constructor() {
    this.initDictionary();
  }

  // --------------------------------------------------------------------------
  // 1. 知識ベース・辞書データ
  // --------------------------------------------------------------------------
  initDictionary() {
    // 国語データ
    this.antonyms = [
      { a: "大きい", b: "小さい", g: 1 },
      { a: "高い", b: "低い", g: 1 },
      { a: "右", b: "左", g: 1 },
      { a: "上", b: "下", g: 1 },
      { a: "前", b: "後ろ", g: 1 },
      { a: "明るい", b: "暗い", g: 2 },
      { a: "太い", b: "細い", g: 2 },
      { a: "長い", b: "短い", g: 2 },
      { a: "強い", b: "弱い", g: 2 },
      { a: "新しい", b: "古い", g: 2 },
      { a: "安心", b: "不安", g: 3 },
      { a: "安全", b: "危険", g: 3 },
      { a: "幸福", b: "不幸", g: 3 },
      { a: "集合", b: "解散", g: 3 },
      { a: "成功", b: "失敗", g: 4 },
      { a: "勝利", b: "敗北", g: 4 },
      { a: "拡大", b: "縮小", g: 4 },
      { a: "過去", b: "未来", g: 4 },
      { a: "賛成", b: "反対", g: 5 },
      { a: "原因", b: "結果", g: 5 },
      { a: "需要", b: "供給", g: 5 },
      { a: "肯定", b: "否定", g: 5 },
      { a: "抽象", b: "具体", g: 6 },
      { a: "偶然", b: "必然", g: 6 },
      { a: "主観", b: "客観", g: 6 },
      { a: "権利", b: "義務", g: 6 }
    ];

    this.proverbs = [
      { p: "猿も木から落ちる", meaning: "どんな名人でも時には失敗することがある", g: 4 },
      { p: "犬も歩けば棒に当たる", meaning: "何か行動を起こせば、思いがけないことに巡り会う", g: 4 },
      { p: "石の上にも三年", meaning: "つらくても我慢強く続ければ必ず報われる", g: 4 },
      { p: "ちりもつもれば山となる", meaning: "わずかな努力でも積み重なれば大きな力になる", g: 4 },
      { p: "花より団子", meaning: "見た目の美しさよりも実際の役に立つ実利をとること", g: 3 },
      { p: "猫の手も借りたい", meaning: "誰でもいいから手伝ってほしいほど非常に忙しいこと", g: 3 },
      { p: "馬の耳に念仏", meaning: "いくら意見を言っても少しも効き目がないこと", g: 5 },
      { p: "能ある鷹は爪を隠す", meaning: "本当に実力のある人は、むやみにそれを自慢しない", g: 5 },
      { p: "失敗は成功のもと", meaning: "失敗しても反省して工夫すれば成功につながる", g: 3 },
      { p: "雨降って地固まる", meaning: "もめ事があった後は、かえって良い状態に落ち着く", g: 5 },
      { p: "背水の陣", meaning: "失敗したら後がない覚悟で全力を尽くすこと", g: 6 },
      { p: "温故知新", meaning: "古いことを学び、そこから新しい知恵を得ること", g: 5 },
      { p: "一期一会", meaning: "生涯に一度だけ出会うこと、その出会いを大切にすること", g: 6 },
      { p: "十人十色", meaning: "人それぞれ好みや考え方が違っていること", g: 4 }
    ];

    // 都道府県データ
    this.prefectures = [
      { name: "北海道", capital: "札幌市", region: "北海道地方", feature: "日本で最も面積が広く、農業や酪農が盛ん" },
      { name: "青森県", capital: "青森市", region: "東北地方", feature: "りんごの生産量が日本一" },
      { name: "岩手県", capital: "盛岡市", region: "東北地方", feature: "本州で最も面積が広い県" },
      { name: "宮城県", capital: "仙台市", region: "東北地方", feature: "東北地方最大の都市・仙台市がある（杜の都）" },
      { name: "秋田県", capital: "秋田市", region: "東北地方", feature: "あきたこまち等の米作りや伝統のなまはげが有名" },
      { name: "山形県", capital: "山形市", region: "東北地方", feature: "さくらんぼの生産量が日本一" },
      { name: "福島県", capital: "福島市", region: "東北地方", feature: "ももの栽培や会津の漆器などが有名" },
      { name: "茨城県", capital: "水戸市", region: "関東地方", feature: "納豆やメロンの生産が有名" },
      { name: "栃木県", capital: "宇都宮市", region: "関東地方", feature: "日光東照宮やいちご（とちおとめ）が有名" },
      { name: "群馬県", capital: "前橋市", region: "関東地方", feature: "富岡製糸場やキャベツの高原栽培が有名" },
      { name: "埼玉県", capital: "さいたま市", region: "関東地方", feature: "近郊農業や工業が盛んな内陸県" },
      { name: "千葉県", capital: "千葉市", region: "関東地方", feature: "落花生（ピーナッツ）の生産が日本一" },
      { name: "東京都", capital: "東京（新宿区）", region: "関東地方", feature: "日本の首都で、人口が日本で最も多い" },
      { name: "神奈川県", capital: "横浜市", region: "関東地方", feature: "日本有数の貿易港・横浜港がある" },
      { name: "新潟県", capital: "新潟市", region: "中部地方", feature: "越後平野が広がり米（コシヒカリ）の生産が日本一" },
      { name: "富山県", capital: "富山市", region: "中部地方", feature: "北アルプスの雪解け水と売薬（くすり）の伝統" },
      { name: "石川県", capital: "金沢市", region: "中部地方", feature: "兼六園や輪島塗・九谷焼などの伝統工芸" },
      { name: "福井県", capital: "福井市", region: "中部地方", feature: "恐竜化石の発掘やメガネフレームの生産日本一" },
      { name: "山梨県", capital: "甲府市", region: "中部地方", feature: "富士山の北側に位置し、ぶどう・ももの生産日本一" },
      { name: "長野県", capital: "長野市", region: "中部地方", feature: "日本アルプスに囲まれ、高原野菜や精密機械工業が盛ん" },
      { name: "岐阜県", capital: "岐阜市", region: "中部地方", feature: "白川郷の合掌造りや美濃焼が有名" },
      { name: "静岡県", capital: "静岡市", region: "中部地方", feature: "お茶やみかんの栽培、富士山の南側" },
      { name: "愛知県", capital: "名古屋市", region: "中部地方", feature: "中京工業地帯の中心で、自動車産業が日本一" },
      { name: "三重県", capital: "津市", region: "近畿地方", feature: "伊勢神宮や真珠の養殖（英虞湾）が有名" },
      { name: "滋賀県", capital: "大津市", region: "近畿地方", feature: "日本最大の湖「琵琶湖（びわこ）」がある" },
      { name: "京都府", capital: "京都市", region: "近畿地方", feature: "千年の都として栄え、多くの国宝や世界遺産がある" },
      { name: "大阪府", capital: "大阪市", region: "近畿地方", feature: "西日本の経済の中心で「天下の台所」と呼ばれた" },
      { name: "兵庫県", capital: "神戸市", region: "近畿地方", feature: "国際貿易港の神戸港や明石海峡大橋がある" },
      { name: "奈良県", capital: "奈良市", region: "近畿地方", feature: "東大寺の大仏や法隆寺など日本最古級の文化財が残る" },
      { name: "和歌山県", capital: "和歌山市", region: "近畿地方", feature: "みかんや梅（南高梅）の生産が日本一" },
      { name: "鳥取県", capital: "鳥取市", region: "中国地方", feature: "日本最大の観光砂丘「鳥取砂丘」や梨の栽培" },
      { name: "島根県", capital: "松江市", region: "中国地方", feature: "出雲大社や宍道湖（しんじこ）のシジミが有名" },
      { name: "岡山県", capital: "岡山市", region: "中国地方", feature: "瀬戸内海の温暖な気候で白桃やマスカットの産地" },
      { name: "広島県", capital: "広島市", region: "中国地方", feature: "世界遺産の原爆ドームや厳島神社、カキの養殖" },
      { name: "山口県", capital: "山口市", region: "中国地方", feature: "秋吉台のカルスト地形や下関のふぐが有名" },
      { name: "徳島県", capital: "徳島市", region: "四国地方", feature: "阿波おどりや鳴門の渦潮、すだちが有名" },
      { name: "香川県", capital: "高松市", region: "四国地方", feature: "日本一面積が小さい都道府県で讃岐うどんが有名" },
      { name: "愛媛県", capital: "松山市", region: "四国地方", feature: "みかんの栽培や道後温泉、今治タオルが有名" },
      { name: "高知県", capital: "高知市", region: "四国地方", feature: "坂本龍馬の出身地で、カツオの一本釣りや促成栽培" },
      { name: "福岡県", capital: "福岡市", region: "九州地方", feature: "九州最大の都市で、アジアとの交流窓口として発展" },
      { name: "佐賀県", capital: "佐賀市", region: "九州地方", feature: "有田焼・伊万里焼などの陶磁器や有明海苔" },
      { name: "長崎県", capital: "長崎市", region: "九州地方", feature: "出島を通じた南蛮貿易の歴史や多くの島々を持つ" },
      { name: "熊本県", capital: "熊本市", region: "九州地方", feature: "阿蘇山のカルデラや豊富な地下水、トマト生産日本一" },
      { name: "大分県", capital: "大分市", region: "九州地方", feature: "別府や由布院など日本一の温泉湧出量を誇る" },
      { name: "宮崎県", capital: "宮崎市", region: "九州地方", feature: "温暖な気候を生かしたピーマンの促成栽培やマンゴー" },
      { name: "鹿児島県", capital: "鹿児島市", region: "九州地方", feature: "桜島（活火山）やサツマイモ・黒豚の生産、屋久島" },
      { name: "沖縄県", capital: "那覇市", region: "九州・沖縄地方", feature: "美しいサンゴ礁の海、首里城、温暖な亜熱帯気候" }
    ];

    // 歴史人物データ
    this.historicalFigures = [
      { name: "卑弥呼", era: "弥生時代", achievement: "邪馬台国の女王で、中国（魏）に使者を送って金印を授かった" },
      { name: "聖徳太子", era: "飛鳥時代", achievement: "十七条の憲法や冠位十二階を定め、法隆寺を建てた" },
      { name: "中大兄皇子（天智天皇）", era: "飛鳥時代", achievement: "中臣鎌足とともに大化の改新を行い、天皇中心の国づくりを進めた" },
      { name: "聖武天皇", era: "奈良時代", achievement: "仏教の力で国を治めるため、東大寺に大仏を造らせた" },
      { name: "紫式部", era: "平安時代", achievement: "藤原道長の頃に『源氏物語』を著した平安時代の女性作家" },
      { name: "清少納言", era: "平安時代", achievement: "「春はあけぼの…」で始まる随筆『枕草子』を著した" },
      { name: "源頼朝", era: "鎌倉時代", achievement: "鎌倉に幕府を開き、日本最初の本格的な武家政権を打ち立てた" },
      { name: "足利義満", era: "室町時代", achievement: "京都の北山に金閣（鹿苑寺）を建て、明との勘合貿易を行った" },
      { name: "織田信長", era: "安土桃山時代", achievement: "長篠の戦いで鉄砲隊を用い、楽市・楽座で商業を発展させた" },
      { name: "豊臣秀吉", era: "安土桃山時代", achievement: "太閤検地や刀狩りを行い、全国を統一した" },
      { name: "徳川家康", era: "江戸時代", achievement: "関ヶ原の戦いに勝利し、江戸幕府を開いて約260年の平和を築いた" },
      { name: "杉田玄白", era: "江戸時代", achievement: "オランダ語の解剖書を翻訳し『解体新書』を出版した" },
      { name: "伊能忠敬", era: "江戸時代", achievement: "日本全国を歩いて測量し、きわめて正確な日本地図を完成させた" },
      { name: "西郷隆盛", era: "明治時代", achievement: "勝海舟との会談で江戸城無血開城を実現し、明治維新を主導した" }
    ];

    // 英語データ
    this.englishVocab = [
      { en: "sun", ja: "太陽", category: "nature", g: 1 },
      { en: "moon", ja: "月", category: "nature", g: 1 },
      { en: "flower", ja: "花", category: "nature", g: 1 },
      { en: "tree", ja: "木", category: "nature", g: 1 },
      { en: "water", ja: "水", category: "nature", g: 1 },
      { en: "pencil", ja: "えんぴつ", category: "school", g: 2 },
      { en: "notebook", ja: "ノート", category: "school", g: 2 },
      { en: "desk", ja: "机（つくえ）", category: "school", g: 2 },
      { en: "chair", ja: "いす", category: "school", g: 2 },
      { en: "teacher", ja: "先生", category: "people", g: 2 },
      { en: "friend", ja: "友だち", category: "people", g: 3 },
      { en: "breakfast", ja: "朝ごはん", category: "food", g: 3 },
      { en: "lunch", ja: "昼ごはん", category: "food", g: 3 },
      { en: "dinner", ja: "晩ごはん", category: "food", g: 3 },
      { en: "library", ja: "図書館", category: "place", g: 4 },
      { en: "station", ja: "駅", category: "place", g: 4 },
      { en: "hospital", ja: "病院", category: "place", g: 4 },
      { en: "weather", ja: "天気", category: "nature", g: 4 },
      { en: "season", ja: "季節", category: "nature", g: 5 },
      { en: "future", ja: "未来・将来", category: "abstract", g: 5 },
      { en: "memory", ja: "思い出", category: "abstract", g: 6 },
      { en: "tradition", ja: "伝統", category: "culture", g: 6 }
    ];
  }

  // --------------------------------------------------------------------------
  // 2. 自動問題生成メインエントリー
  // --------------------------------------------------------------------------
  generateQuestion(grade, subject) {
    const g = parseInt(grade, 10);
    switch (subject) {
      case 'math':
        return this.generateMathQuestion(g);
      case 'japanese':
        return this.generateJapaneseQuestion(g);
      case 'science':
        return this.generateScienceQuestion(g);
      case 'social':
        return this.generateSocialQuestion(g);
      case 'english':
        return this.generateEnglishQuestion(g);
      default:
        return this.generateMathQuestion(g);
    }
  }

  generateBatch(grade, subject, count = 5) {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(this.generateQuestion(grade, subject));
    }
    return list;
  }

  // --------------------------------------------------------------------------
  // 3. 算数の動的生成（完全ランダム＆無限バリエーション）
  // --------------------------------------------------------------------------
  generateMathQuestion(grade) {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    if (grade === 1) {
      // 1年生: 繰り上がり足し算、繰り下がり引き算、時計
      const type = rand(1, 3);
      if (type === 1) {
        // 繰り上がり足し算
        const a = rand(6, 9);
        const b = rand(11 - a, 9);
        const ans = a + b;
        const d1 = ans + 1;
        const d2 = ans - 1;
        const d3 = ans - 2;
        return {
          question: `計算をしよう！ 「${a} ＋ ${b}」の こたえは いくつかな？`,
          options: [`${ans}`, `${d1}`, `${d2}`, `${d3}`],
          answerIndex: 0,
          explanation: `${a}に ${10 - a}をたして10をつくり、残りの ${b - (10 - a)}をたすと ${ans} になります。`,
          printAnswer: `${ans}`,
          isAIGenerated: true
        };
      } else if (type === 2) {
        // 繰り下がり引き算
        const ans = rand(3, 9);
        const b = rand(4, 9);
        const a = ans + b; // 11〜18
        const d1 = ans + 1;
        const d2 = ans - 1;
        const d3 = ans + 2;
        return {
          question: `計算をしよう！ 「${a} − ${b}」の こたえは いくつかな？`,
          options: [`${ans}`, `${d1}`, `${d2}`, `${d3}`],
          answerIndex: 0,
          explanation: `10から ${b}をひいて ${10 - b}、一の位の ${a - 10}を足すと ${ans} です。`,
          printAnswer: `${ans}`,
          isAIGenerated: true
        };
      } else {
        // 時計
        const h = rand(1, 12);
        return {
          question: `とけいの 長い針が「12」、短い針が「${h}」のときは 何時かな？`,
          options: [`${h}時`, `${(h % 12) + 1}時`, `${h}時半`, `12時`],
          answerIndex: 0,
          explanation: `短い針が ${h} をさしていて長い針が12のときは「${h}時」ちょうどです。`,
          printAnswer: `${h}時`,
          isAIGenerated: true
        };
      }
    } else if (grade === 2) {
      // 2年生: 九九、2桁加減
      const type = rand(1, 2);
      if (type === 1) {
        const a = rand(2, 9);
        const b = rand(2, 9);
        const ans = a * b;
        const d1 = a * (b + 1);
        const d2 = a * (b - 1);
        const d3 = (a + 1) * b;
        return {
          question: `九九の計算！ 「${a} × ${b}」の 答えは いくつかな？`,
          options: [`${ans}`, `${d1}`, `${d2}`, `${d3}`],
          answerIndex: 0,
          explanation: `${a}の段の九九です。${a} × ${b} ＝ ${ans} です。`,
          printAnswer: `${ans}`,
          isAIGenerated: true
        };
      } else {
        const a = rand(24, 68);
        const b = rand(15, 29);
        const ans = a + b;
        return {
          question: `筆算をしよう！ 「${a} ＋ ${b}」の 答えは いくつかな？`,
          options: [`${ans}`, `${ans - 10}`, `${ans + 1}`, `${ans - 1}`],
          answerIndex: 0,
          explanation: `一の位は ${a % 10} + ${b % 10}、十の位も計算して繰り上がりを足すと ${ans} です。`,
          printAnswer: `${ans}`,
          isAIGenerated: true
        };
      }
    } else if (grade === 3) {
      // 3年生: 割り算（あまりあり・なし）、3桁掛け算
      const type = rand(1, 2);
      if (type === 1) {
        const b = rand(3, 9);
        const q = rand(3, 9);
        const r = rand(1, b - 1);
        const a = b * q + r;
        return {
          question: `あまりのある割り算！ 「${a} ÷ ${b}」の 答えは どれかな？`,
          options: [`${q} あまり ${r}`, `${q} あまり ${r + 1}`, `${q + 1} あまり ${r}`, `${q - 1} あまり ${r}`],
          answerIndex: 0,
          explanation: `${b} × ${q} ＝ ${b * q} で、あまりは ${a} − ${b * q} ＝ ${r} です。`,
          printAnswer: `${q} あまり ${r}`,
          isAIGenerated: true
        };
      } else {
        const a = rand(20, 90);
        const b = rand(3, 9);
        const ans = a * b;
        return {
          question: `掛け算の計算！ 「${a} × ${b}」の 答えは いくつかな？`,
          options: [`${ans}`, `${ans + 10}`, `${ans - 10}`, `${ans + b}`],
          answerIndex: 0,
          explanation: `${a} × ${b} ＝ ${ans} です。`,
          printAnswer: `${ans}`,
          isAIGenerated: true
        };
      }
    } else if (grade === 4) {
      // 4年生: 面積、角、小数の計算
      const type = rand(1, 2);
      if (type === 1) {
        const w = rand(4, 12);
        const h = rand(3, 9);
        const ans = w * h;
        return {
          question: `たてが ${h}cm、よこが ${w}cm の長方形の面積は何cm²かな？`,
          options: [`${ans}cm²`, `${(w + h) * 2}cm²`, `${ans + 4}cm²`, `${ans - 4}cm²`],
          answerIndex: 0,
          explanation: `長方形の面積 ＝ たて × よこ ＝ ${h} × ${w} ＝ ${ans}cm² です。`,
          printAnswer: `${ans}cm²`,
          isAIGenerated: true
        };
      } else {
        const a = (rand(20, 50) / 10).toFixed(1);
        const b = (rand(11, 29) / 10).toFixed(1);
        const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
        return {
          question: `小数の足し算！ 「${a} ＋ ${b}」の 答えは いくつかな？`,
          options: [`${ans}`, `${(parseFloat(ans) + 0.2).toFixed(1)}`, `${(parseFloat(ans) - 0.2).toFixed(1)}`, `${(parseFloat(ans) + 1.0).toFixed(1)}`],
          answerIndex: 0,
          explanation: `小数点の位置をそろえて位ごとに足すと ${ans} になります。`,
          printAnswer: `${ans}`,
          isAIGenerated: true
        };
      }
    } else if (grade === 5) {
      // 5年生: 三角形の面積、割合（％）、小数の乗算
      const type = rand(1, 2);
      if (type === 1) {
        const b = rand(6, 14) * 2; // 偶数
        const h = rand(4, 11);
        const ans = (b * h) / 2;
        return {
          question: `底辺が ${b}cm、高さが ${h}cm の三角形の面積は何cm²かな？`,
          options: [`${ans}cm²`, `${b * h}cm²`, `${ans + 6}cm²`, `${ans - 4}cm²`],
          answerIndex: 0,
          explanation: `三角形の面積 ＝ 底辺 × 高さ ÷ ２ ＝ ${b} × ${h} ÷ ２ ＝ ${ans}cm² です。`,
          printAnswer: `${ans}cm²`,
          isAIGenerated: true
        };
      } else {
        const price = rand(10, 50) * 100;
        const discountRate = rand(1, 4) * 10; // 10%, 20%, 30%, 40%
        const ans = price * (1 - discountRate / 100);
        return {
          question: `定価 ${price}円 の商品を「${discountRate}％引き（${discountRate / 10}割引き）」で買うと、代金は何円かな？`,
          options: [`${ans}円`, `${price * (discountRate / 100)}円`, `${price - 100}円`, `${ans + 200}円`],
          answerIndex: 0,
          explanation: `割引額は ${price} × 0.${discountRate / 10} ＝ ${price * (discountRate / 100)}円。代金は ${price} − ${price * (discountRate / 100)} ＝ ${ans}円 です。`,
          printAnswer: `${ans}円`,
          isAIGenerated: true
        };
      }
    } else {
      // 6年生: 速さ、比、円の面積
      const type = rand(1, 2);
      if (type === 1) {
        const speed = rand(4, 8) * 10; // 時速40〜80km
        const time = rand(2, 4); // 2〜4時間
        const dist = speed * time;
        return {
          question: `時速 ${speed}km で走る自動車が、${time}時間 進むと進む道のりは何kmかな？`,
          options: [`${dist}km`, `${dist + speed}km`, `${Math.round(dist / 2)}km`, `${speed + time}km`],
          answerIndex: 0,
          explanation: `道のり ＝ 速さ × 時間 ＝ ${speed} × ${time} ＝ ${dist}km です。`,
          printAnswer: `${dist}km`,
          isAIGenerated: true
        };
      } else {
        const r = rand(2, 6) * 5; // 半径10, 15, 20, 25, 30
        const ans = Math.round(r * r * 3.14 * 10) / 10;
        return {
          question: `半径が ${r}cm の円の面積は何cm²かな？（円周率は 3.14 として計算）`,
          options: [`${ans}cm²`, `${Math.round(r * 2 * 3.14 * 10) / 10}cm²`, `${ans + 10}cm²`, `${ans - 20}cm²`],
          answerIndex: 0,
          explanation: `円の面積 ＝ 半径 × 半径 × 3.14 ＝ ${r} × ${r} × 3.14 ＝ ${ans}cm² です。`,
          printAnswer: `${ans}cm²`,
          isAIGenerated: true
        };
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. 国語の動的生成
  // --------------------------------------------------------------------------
  generateJapaneseQuestion(grade) {
    const randItem = arr => arr[Math.floor(Math.random() * arr.length)];
    const eligibleAntonyms = this.antonyms.filter(x => x.g <= grade);
    const item = eligibleAntonyms.length > 0 ? randItem(eligibleAntonyms) : randItem(this.antonyms);

    // ダミーの選択肢を集める
    const dummyPool = this.antonyms.filter(x => x.b !== item.b).map(x => x.b);
    // ランダムに3つ選ぶ
    const shuffledDummies = [...new Set(dummyPool)].sort(() => Math.random() - 0.5).slice(0, 3);

    return {
      question: `「${item.a}」の 反対の意味の言葉（対義語）は どれかな？`,
      options: [item.b, ...shuffledDummies],
      answerIndex: 0,
      explanation: `「${item.a}」の反対の言葉は「${item.b}」です。`,
      printAnswer: item.b,
      isAIGenerated: true
    };
  }

  // --------------------------------------------------------------------------
  // 5. 理科の動的生成
  // --------------------------------------------------------------------------
  generateScienceQuestion(grade) {
    const templates = [
      {
        q: "植物の葉に日光がよく当たると、葉の中で何がつくられるかな？",
        correct: "デンプン（養分）",
        d: ["水銀", "二酸化炭素", "塩分"],
        exp: "光合成（こうごうせい）の働きによって、日光と水と二酸化炭素からデンプンが作られます。"
      },
      {
        q: "昆虫の足は全部で何本あるかな？",
        correct: "６本（３対）",
        d: ["４本", "８本", "１０本"],
        exp: "昆虫の成虫の足は胸の部分から左右に３本ずつ、合計６本生えています。"
      },
      {
        q: "太陽は朝どの方角から昇り、夕方どの方角へ沈むかな？",
        correct: "東から昇り、西へ沈む",
        d: ["西から昇り、東へ沈む", "南から昇り、北へ沈む", "北から昇り、南へ沈む"],
        exp: "地球が西から東へ自転しているため、太陽は東から昇って西へ沈んで見えます。"
      },
      {
        q: "酸性の水溶液に青色リトマス紙をつけると何色に変化するかな？",
        correct: "赤色に変化する",
        d: ["青色のまま変わらない", "黄色に変化する", "緑色に変化する"],
        exp: "酸性の水溶液は「青色リトマス紙を赤色に変える」性質があります。"
      },
      {
        q: "ものが激しく燃えるために必要な空気中の気体はどれかな？",
        correct: "酸素（さんそ）",
        d: ["二酸化炭素", "窒素", "水素"],
        exp: "酸素には他のものが燃えるのを助ける性質（支燃性）があります。"
      },
      {
        q: "水が凍って氷になると、体積（かさ）はどう変化するかな？",
        correct: "ふえる（大きくなる）",
        d: ["へる（小さくなる）", "まったく変わらない", "半分になる"],
        exp: "水は凍ると分子がすき間のある結晶構造をつくるため、体積が約1.1倍に増えます。"
      }
    ];

    const t = templates[Math.floor(Math.random() * templates.length)];
    return {
      question: t.q,
      options: [t.correct, ...t.d],
      answerIndex: 0,
      explanation: t.exp,
      printAnswer: t.correct,
      isAIGenerated: true
    };
  }

  // --------------------------------------------------------------------------
  // 6. 社会の動的生成
  // --------------------------------------------------------------------------
  generateSocialQuestion(grade) {
    if (grade >= 4 && Math.random() > 0.4) {
      // 都道府県と県庁所在地
      const pref = this.prefectures[Math.floor(Math.random() * this.prefectures.length)];
      const otherCapitals = this.prefectures
        .filter(p => p.capital !== pref.capital)
        .map(p => p.capital)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      return {
        question: `【都道府県クイズ】 「${pref.name}」の県庁所在地（中心都市）はどこかな？`,
        options: [pref.capital, ...otherCapitals],
        answerIndex: 0,
        explanation: `${pref.name}（${pref.region}）の県庁所在地は「${pref.capital}」です。特徴：${pref.feature}。`,
        printAnswer: pref.capital,
        isAIGenerated: true
      };
    } else if (grade >= 5 && Math.random() > 0.5) {
      // 歴史人物
      const fig = this.historicalFigures[Math.floor(Math.random() * this.historicalFigures.length)];
      const otherNames = this.historicalFigures
        .filter(f => f.name !== fig.name)
        .map(f => f.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      return {
        question: `【歴史人物】 「${fig.achievement}」という功績で知られる人物はだれかな？`,
        options: [fig.name, ...otherNames],
        answerIndex: 0,
        explanation: `${fig.era}に活躍した「${fig.name}」です。${fig.achievement}。`,
        printAnswer: fig.name,
        isAIGenerated: true
      };
    } else {
      // 生活・社会科基本
      const items = [
        { q: "火事や急病のときに消防車や救急車を呼ぶ電話番号はどれ？", a: "119番", d: ["110番", "118番", "104番"], exp: "消防署・救急車は119番、事件・事故の警察は110番です。" },
        { q: "日本の全都道府県の数は全部でいくつあるかな？", a: "47", d: ["43", "50", "45"], exp: "1都1道2府43県で合計47都道府県です。" },
        { q: "日本国憲法の三大原則に含まれないものはどれかな？", a: "自由貿易主義", d: ["国民主権", "基本的人権の尊重", "平和主義"], exp: "憲法の三大原則は「国民主権」「基本的人権の尊重」「平和主義」です。" },
        { q: "法律を話し合って制定する国の最高機関はどこかな？", a: "国会", d: ["内閣", "最高裁判所", "市役所"], exp: "衆議院と参議院からなる「国会」が日本の立法機関です。" }
      ];
      const it = items[Math.floor(Math.random() * items.length)];
      return {
        question: it.q,
        options: [it.a, ...it.d],
        answerIndex: 0,
        explanation: it.exp,
        printAnswer: it.a,
        isAIGenerated: true
      };
    }
  }

  // --------------------------------------------------------------------------
  // 7. 英語の動的生成
  // --------------------------------------------------------------------------
  generateEnglishQuestion(grade) {
    const rand = arr => arr[Math.floor(Math.random() * arr.length)];
    const word = rand(this.englishVocab);
    const dummyWords = this.englishVocab.filter(w => w.ja !== word.ja).map(w => w.ja).sort(() => Math.random() - 0.5).slice(0, 3);

    return {
      question: `英単語「${word.en}」の 日本語の意味は どれかな？`,
      options: [word.ja, ...dummyWords],
      answerIndex: 0,
      explanation: `「${word.en}」は日本語で「${word.ja}」という意味です。`,
      printAnswer: word.ja,
      isAIGenerated: true
    };
  }

  // --------------------------------------------------------------------------
  // 8. 外部LLM（Gemini API）連携機能
  // --------------------------------------------------------------------------
  async generateWithGemini(apiKey, grade, subject, topic = '', count = 3) {
    const subjectNames = {
      japanese: '国語',
      math: '算数',
      science: '理科',
      social: '社会',
      english: '英語'
    };
    const sName = subjectNames[subject] || subject;
    const prompt = `あなたは小学校の教育専門家です。
小学${grade}年生向けの「${sName}」に関する4択クイズ問題を【${count}問】作成してください。
${topic ? `指定テーマ: ${topic}` : ''}

小学生が楽しく学べて、学習指導要領に準拠した正確な問題にしてください。
必ず以下のJSON配列形式のみを出力してください（Markdownコードブロック\`\`\`json で囲んでください）：

[
  {
    "question": "問題文",
    "options": ["正解の選択肢", "不正解1", "不正解2", "不正解3"],
    "answerIndex": 0,
    "explanation": "子どもに分かりやすい解説文",
    "printAnswer": "プリント用の正解記述"
  }
]`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!response.ok) {
      throw new Error(`APIリクエスト失敗: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return this.parseAIResponse(text);
  }

  parseAIResponse(text) {
    // ```json ... ``` または純粋な [ ... ] を抽出
    let jsonStr = text;
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      jsonStr = match[1];
    } else {
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      if (start !== -1 && end !== -1) {
        jsonStr = text.substring(start, end + 1);
      }
    }

    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) {
        return parsed.map(item => ({
          question: item.question || '問題文',
          options: (item.options && item.options.length >= 4) ? item.options.slice(0, 4) : ['ア', 'イ', 'ウ', 'エ'],
          answerIndex: item.answerIndex !== undefined ? item.answerIndex : 0,
          explanation: item.explanation || '解説はありません。',
          printAnswer: item.printAnswer || (item.options ? item.options[item.answerIndex || 0] : ''),
          isAIGenerated: true
        }));
      }
    } catch (e) {
      console.error('Failed to parse AI response JSON:', e, text);
      throw new Error('AIの応答をJSONとして解析できませんでした。');
    }
    return [];
  }

  getCopyablePrompt(grade, subject, topic = '', count = 5) {
    const subjectNames = {
      japanese: '国語',
      math: '算数',
      science: '理科',
      social: '社会',
      english: '英語'
    };
    const sName = subjectNames[subject] || subject;
    return `小学${grade}年生の「${sName}」の4択学習クイズを${count}問作成してください。${topic ? `テーマは「${topic}」です。` : ''}
以下のJSON配列形式のみで出力してください：

\`\`\`json
[
  {
    "question": "問題文",
    "options": ["正解の選択肢", "不正解1", "不正解2", "不正解3"],
    "answerIndex": 0,
    "explanation": "わかりやすい解説",
    "printAnswer": "正解の選択肢"
  }
]
\`\`\``;
  }
}

// グローバル公開
window.AIGenerator = AIGenerator;


if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIGenerator;
}
