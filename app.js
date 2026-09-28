/**
 * わくわくスタディパーク (WakuWaku Study Park)
 * 小学生向け 3D学習アプリ & 印刷プリント生成システム
 */

// ==========================================================================
// 1. 問題データベース (小学1〜6年生 × 5科目)
// ==========================================================================
const QUESTION_DATABASE = {
  1: {
    japanese: [
      {
        question: "「大きい」の はんたいの ことばは どれかな？",
        options: ["小さい", "たかい", "おもい", "ひろい"],
        answerIndex: 0,
        explanation: "「大きい（おおきい）」のはんたいは「小さい（ちいさい）」です。",
        printAnswer: "小さい"
      },
      {
        question: "つぎの なかで「かん字」は どれかな？",
        options: ["日", "あ", "サ", "１"],
        answerIndex: 0,
        explanation: "「日」は ひを あらわす 1ねんせいで ならう かん字です。",
        printAnswer: "日"
      },
      {
        question: "「ねこ（　） いるよ。」（　）に はいる ことばは どれ？",
        options: ["が", "を", "へ", "に"],
        answerIndex: 0,
        explanation: "だれかが いるときは「〜が いる」と つかいます。",
        printAnswer: "が"
      },
      {
        question: "「いぬ」を カタカナで かくと どうなるかな？",
        options: ["イヌ", "ネコ", "トリ", "ウマ"],
        answerIndex: 0,
        explanation: "「いぬ」は カタカナで「イヌ」と かきます。",
        printAnswer: "イヌ"
      },
      {
        question: "「あさ」の あいさつは どれかな？",
        options: ["おはようございます", "こんにちは", "こんばんは", "さようなら"],
        answerIndex: 0,
        explanation: "あさに あったときは「おはようございます」と あいさつします。",
        printAnswer: "おはようございます"
      }
    ],
    math: [
      {
        question: "５ ＋ ３ は いくつかな？",
        options: ["８", "７", "９", "６"],
        answerIndex: 0,
        explanation: "５に ３を たすと ８（はち）になります。",
        printAnswer: "８"
      },
      {
        question: "１０ は ７ と いくつかな？",
        options: ["３", "２", "４", "５"],
        answerIndex: 0,
        explanation: "７ ＋ ３ ＝ １０ なので、のこりは ３です。",
        printAnswer: "３"
      },
      {
        question: "９ − ４ は いくつかな？",
        options: ["５", "４", "６", "３"],
        answerIndex: 0,
        explanation: "９から ４を ひくと ５になります。",
        printAnswer: "５"
      },
      {
        question: "みじかい はりが「３」、ながい はりが「１２」の ときは なんじ？",
        options: ["３じ", "１２じ", "３じはん", "６じ"],
        answerIndex: 0,
        explanation: "みじかい はりが ３、ながい はりが １２の ときは「３じ」です。",
        printAnswer: "３じ"
      },
      {
        question: "りんごが ８こ あります。３こ たべると のこりは なんこ？",
        options: ["５こ", "4こ", "6こ", "11こ"],
        answerIndex: 0,
        explanation: "８ − ３ ＝ ５ なので、のこりは ５こです。",
        printAnswer: "５こ"
      }
    ],
    science: [
      {
        question: "あさがおの たねは いつ まくのが いいかな？",
        options: ["はる（５月ごろ）", "ふゆ（１２月ごろ）", "あき（１０月ごろ）", "いつでもよい"],
        answerIndex: 0,
        explanation: "あたたかくなった はる（５月ごろ）に まくと、元気に めが でます。",
        printAnswer: "はる（５月ごろ）"
      },
      {
        question: "はるに さく ピンクの きれいな はなは どれかな？",
        options: ["さくら", "ひまわり", "あさがお", "コスモス"],
        answerIndex: 0,
        explanation: "さくらは はるの はじめに さく ピンクのはなです。",
        printAnswer: "さくら"
      },
      {
        question: "カブトムシの あしは なんぼん あるかな？",
        options: ["６ぽん", "４ほん", "８ぽん", "１０ぽん"],
        answerIndex: 0,
        explanation: "こんちゅう（カブトムシなど）の あしは ６ぽん あります。",
        printAnswer: "６ぽん"
      },
      {
        question: "ひまわりの はなは どんな いろかな？",
        options: ["きいろ", "あお", "くろ", "みどり"],
        answerIndex: 0,
        explanation: "ひまわりは なつに さく おおきな きいろい はなです。",
        printAnswer: "きいろ"
      },
      {
        question: "あめが ふったあとに そらに でる なないろの ものは なあに？",
        options: ["にじ", "たいよう", "ほし", "くも"],
        answerIndex: 0,
        explanation: "あめのあと、たいようの ひかりで「にじ」が みえることが あります。",
        printAnswer: "にじ"
      }
    ],
    social: [
      {
        question: "しんごうが「あか」の ときは どうするかな？",
        options: ["とまる", "すすむ", "はしる", "ジャンプする"],
        answerIndex: 0,
        explanation: "あかいろの しんごうは「とまれ」の あいずです。ぜったいに わたりません。",
        printAnswer: "とまる"
      },
      {
        question: "おうだんほどうを わたるとき、さいしょに することは なあに？",
        options: ["みぎと ひだりを みる", "めを つぶる", "いきなり はしる", "すわる"],
        answerIndex: 0,
        explanation: "くるまが こないか「みぎ、ひだり、みぎ」を しっかり たしかめて てをあげて わたります。",
        printAnswer: "みぎと ひだりを みる"
      },
      {
        question: "がっこうで ほんを かりられる へやは どこかな？",
        options: ["としょしつ", "ほけんしつ", "しょくいんしつ", "きゅうしょくしつ"],
        answerIndex: 0,
        explanation: "としょしつには たくさんの えほんや 図鑑（ずかん）が あります。",
        printAnswer: "としょしつ"
      },
      {
        question: "からだの ぐあいが わるくなったときに いく がっこうの へやは？",
        options: ["ほけんしつ", "きょうしつ", "たいいくかん", "おんがくしつ"],
        answerIndex: 0,
        explanation: "けがを したり ねつが あるときは ほけんしつの せんせいに みてもらいます。",
        printAnswer: "ほけんしつ"
      },
      {
        question: "いえを でるとき、おうちの ひとに いう あいさつは？",
        options: ["いってきます", "ただいま", "おやすみなさい", "いただきます"],
        answerIndex: 0,
        explanation: "でかけるときは 元気に「いってきます」と いいましょう。",
        printAnswer: "いってきます"
      }
    ],
    english: [
      {
        question: "えいごで「こんにちは」は なんて いうかな？",
        options: ["Hello", "Goodbye", "Thank you", "Sorry"],
        answerIndex: 0,
        explanation: "あいさつの「こんにちは」は えいごで「Hello（ハロー）」です。",
        printAnswer: "Hello"
      },
      {
        question: "「あかいろ」は えいごで どれかな？",
        options: ["Red", "Blue", "Yellow", "Green"],
        answerIndex: 0,
        explanation: "あかは「Red（レッド）」、あおは「Blue（ブルー）」です。",
        printAnswer: "Red"
      },
      {
        question: "「いぬ」は えいごで なんて いうかな？",
        options: ["Dog", "Cat", "Bird", "Fish"],
        answerIndex: 0,
        explanation: "いぬは「Dog（ドッグ）」、ねこは「Cat（キャット）」です。",
        printAnswer: "Dog"
      },
      {
        question: "ありがとうを つたえる ときの えいごは？",
        options: ["Thank you", "Good morning", "Yes", "No"],
        answerIndex: 0,
        explanation: "「ありがとう」は えいごで「Thank you（サンキュー）」です。",
        printAnswer: "Thank you"
      },
      {
        question: "かずの「１（いち）」は えいごで どれ？",
        options: ["One", "Two", "Three", "Four"],
        answerIndex: 0,
        explanation: "１は「One（ワン）」、２は「Two（ツー）」です。",
        printAnswer: "One"
      }
    ]
  },
  2: {
    japanese: [
      {
        question: "「晴」という 漢字の 読み方は どれかな？",
        options: ["は（れる）", "あめ", "くも（る）", "ゆき"],
        answerIndex: 0,
        explanation: "「晴」は「晴れる（はれる）」や「晴天（せいてん）」と読みます。",
        printAnswer: "は（れる）"
      },
      {
        question: "「とりが そらを （　）。」（　）に入る 言葉はどれ？",
        options: ["とぶ", "あるく", "およぐ", "はなす"],
        answerIndex: 0,
        explanation: "とりは つばさで そらを「とぶ」ことができます。",
        printAnswer: "とぶ"
      },
      {
        question: "「友だちと （　）あそぶ。」（　）に入る 正しい言葉は？",
        options: ["いっしょに", "いっしょうに", "いしょに", "いつしょに"],
        answerIndex: 0,
        explanation: "小さな「っ」を使って「いっしょに」と書きます。",
        printAnswer: "いっしょに"
      },
      {
        question: "「多い」の 反対（はんたい）の 言葉は どれかな？",
        options: ["少ない", "小さい", "ひくい", "みじかい"],
        answerIndex: 0,
        explanation: "「多い（おおい）」の 反対は「少ない（すくない）」です。",
        printAnswer: "少ない"
      },
      {
        question: "「馬」の かぞえ方は どれかな？",
        options: ["一頭（いっとう）", "一台（いちだい）", "一冊（いっさつ）", "一本（いっぽん）"],
        answerIndex: 0,
        explanation: "馬や牛などの 大きな動物は「頭（とう）」で数えます。",
        printAnswer: "一頭（いっとう）"
      }
    ],
    math: [
      {
        question: "九九の「３ × ７」の こたえは いくつかな？",
        options: ["２１", "２４", "１８", "２７"],
        answerIndex: 0,
        explanation: "さんしち ２１（にじゅういち）です。",
        printAnswer: "２１"
      },
      {
        question: "九九の「８ × ６」の こたえは いくつかな？",
        options: ["４８", "４２", "５４", "５６"],
        answerIndex: 0,
        explanation: "はちろく ４８（しじゅうはち）です。",
        printAnswer: "４８"
      },
      {
        question: "１ｍ（メートル）は 何ｃｍ（センチメートル）かな？",
        options: ["１００ｃｍ", "１０ｃｍ", "１０００ｃｍ", "５０ｃｍ"],
        answerIndex: 0,
        explanation: "１ｍ ＝ １００ｃｍ です。",
        printAnswer: "１００ｃｍ"
      },
      {
        question: "３５ ＋ ２８ は いくつかな？",
        options: ["６３", "５３", "６１", "７３"],
        answerIndex: 0,
        explanation: "一の位が ５＋８＝１３、十の位が ３＋２＋１＝６で「６３」です。",
        printAnswer: "６３"
      },
      {
        question: "７０ − ２４ は いくつかな？",
        options: ["４６", "56", "44", "54"],
        answerIndex: 0,
        explanation: "十の位から １くり下げて計算すると「４６」になります。",
        printAnswer: "４６"
      }
    ],
    science: [
      {
        question: "ミニトマトの 花の 色は どれかな？",
        options: ["きいろ", "あか", "しろ", "むらさき"],
        answerIndex: 0,
        explanation: "ミニトマトは 黄色い花がさいたあとに、実ができて赤くなります。",
        printAnswer: "きいろ"
      },
      {
        question: "じしゃくにくっつく 物は どれかな？",
        options: ["鉄（てつ）のクリップ", "プラスチックのじょうぎ", "木のえんぴつ", "ガラスのコップ"],
        answerIndex: 0,
        explanation: "じしゃくは「鉄（てつ）」でできた物にくっつきます。",
        printAnswer: "鉄のクリップ"
      },
      {
        question: "ダンゴムシを 指で さわると どうなるかな？",
        options: ["丸くなる", "羽ではえる", "水にとける", "色がかわる"],
        answerIndex: 0,
        explanation: "ダンゴムシは 敵から身を守るために コロンと丸くなります。",
        printAnswer: "丸くなる"
      },
      {
        question: "やご（ヤゴ）が 大きくなると 何の 虫に なるかな？",
        options: ["トンボ", "チョウ", "セミ", "カブトムシ"],
        answerIndex: 0,
        explanation: "水の中にいるヤゴは、大きくなると羽がはえて「トンボ」になります。",
        printAnswer: "トンボ"
      },
      {
        question: "影（かげ）ができるのは、太陽の光と どっちの 向きかな？",
        options: ["太陽の 反対（はんたい）側", "太陽と 同じ側", "真上", "どこでもできる"],
        answerIndex: 0,
        explanation: "光が物にさえぎられるので、影は光の反対側にできます。",
        printAnswer: "太陽の反対側"
      }
    ],
    social: [
      {
        question: "地図記号で「文」と 書く 場所は どこかな？",
        options: ["学校（小・中学校）", "交番", "郵便局", "病院"],
        answerIndex: 0,
        explanation: "「文」は 小学校や 中学校を あらわす 地図記号です。",
        printAnswer: "学校"
      },
      {
        question: "「〒」の 地図記号が あらわす 場所は どこかな？",
        options: ["郵便局（ゆうびんきょく）", "駅", "交番", "消防署"],
        answerIndex: 0,
        explanation: "「〒」は 手紙や荷物をあつかう 郵便局の 記号です。",
        printAnswer: "郵便局"
      },
      {
        question: "バスや 電車に 乗るときに 守る マナーは どれ？",
        options: ["しずかに 順番にならんで乗る", "大きな声で歌う", "席の上に靴で立つ", "ドアの前でふざける"],
        answerIndex: 0,
        explanation: "みんなが使う乗り物では、順番を守り 静かに乗ります。",
        printAnswer: "しずかに順番にならんで乗る"
      },
      {
        question: "町の あんぜんを まもってくれる 人は だれかな？",
        options: ["警察官（けいさつかん）", "運転手", "料理人", "アナウンサー"],
        answerIndex: 0,
        explanation: "パトロールをして町を守ってくれるのは 警察官（おまわりさん）です。",
        printAnswer: "警察官"
      },
      {
        question: "スーパーマーケットで 野菜や果物が たくさん ならんでいるのは なぜ？",
        options: ["お客さんが えらびやすいように", "重たくするため", "かくしておくため", "店員さんが食べるため"],
        answerIndex: 0,
        explanation: "お客さんが 新鮮なものを 買いやすくするために きれいに並べています。",
        printAnswer: "お客さんがえらびやすいように"
      }
    ],
    english: [
      {
        question: "「りんご」は 英語で なんて いうかな？",
        options: ["Apple", "Orange", "Banana", "Grape"],
        answerIndex: 0,
        explanation: "りんごは「Apple（アップル）」です。",
        printAnswer: "Apple"
      },
      {
        question: "「ねこ」は 英語で なんて いうかな？",
        options: ["Cat", "Dog", "Rabbit", "Bear"],
        answerIndex: 0,
        explanation: "ねこは「Cat（キャット）」です。",
        printAnswer: "Cat"
      },
      {
        question: "「さようなら」の 英語の あいさつは？",
        options: ["Goodbye", "Good morning", "Hello", "Please"],
        answerIndex: 0,
        explanation: "別れのあいさつは「Goodbye（グッバイ）」や「See you」です。",
        printAnswer: "Goodbye"
      },
      {
        question: "すうじの「７（なな）」は 英語で どれかな？",
        options: ["Seven", "Six", "Eight", "Five"],
        answerIndex: 0,
        explanation: "７は「Seven（セブン）」です。",
        printAnswer: "Seven"
      },
      {
        question: "「青色（あお）」は 英語で どれかな？",
        options: ["Blue", "Red", "Yellow", "Pink"],
        answerIndex: 0,
        explanation: "あおは「Blue（ブルー）」です。",
        printAnswer: "Blue"
      }
    ]
  },
  3: {
    japanese: [
      {
        question: "「猿も木から落ちる」の 意味は どれかな？",
        options: ["上手な人でも 失敗することがある", "猿は木登りが下手だ", "木に登ってはいけない", "動物を大切にしよう"],
        answerIndex: 0,
        explanation: "その道の達人でも、たまには失敗することがあるというたとえです。",
        printAnswer: "上手な人でも失敗することがある"
      },
      {
        question: "「山」の 音読み（おんよみ）は どれかな？",
        options: ["サン", "やま", "たか", "もり"],
        answerIndex: 0,
        explanation: "「やま」は訓読み、「サン（富士山など）」は音読みです。",
        printAnswer: "サン"
      },
      {
        question: "ローマ字で「さくら」を 書くと どうなるかな？",
        options: ["sakura", "syakura", "sakula", "takura"],
        answerIndex: 0,
        explanation: "さ（sa）、く（ku）、ら（ra）で「sakura」となります。",
        printAnswer: "sakura"
      },
      {
        question: "国語辞典（じてん）で 言葉を さがす ときの 順番は？",
        options: ["五十音順（あいうえお順）", "漢字の画数順", "言葉の長さ順", "書いた人の年齢順"],
        answerIndex: 0,
        explanation: "国語辞典は「あいうえお…」の五十音順にならんでいます。",
        printAnswer: "五十音順"
      },
      {
        question: "「つぎつぎと 雨が ふる。」この「つぎつぎと」に 似た 言葉は？",
        options: ["たえまなく", "ときどき", "まったく", "めったに"],
        answerIndex: 0,
        explanation: "「つぎつぎと」は 途切れずに続くようすなので「たえまなく」が近いです。",
        printAnswer: "たえまなく"
      }
    ],
    math: [
      {
        question: "２４ ÷ ６ の 答えは いくつかな？",
        options: ["４", "３", "５", "６"],
        answerIndex: 0,
        explanation: "６ × ４ ＝ ２４ なので、２４ ÷ ６ ＝ ４ です。",
        printAnswer: "４"
      },
      {
        question: "２７ ÷ ４ の 答え（商とあまり）は どれかな？",
        options: ["６ あまり ３", "５ あまり ７", "６ あまり １", "７ あまり １"],
        answerIndex: 0,
        explanation: "４ × ６ ＝ ２４、２７ − ２４ ＝ ３ なので「６ あまり ３」です。",
        printAnswer: "６ あまり ３"
      },
      {
        question: "１ｋｇ（キログラム）は 何ｇ（グラム）かな？",
        options: ["１０００ｇ", "１００ｇ", "１０ｇ", "５００ｇ"],
        answerIndex: 0,
        explanation: "キロ（ｋ）は１０００倍をあらわすので、１ｋｇ＝１０００ｇです。",
        printAnswer: "１０００ｇ"
      },
      {
        question: "０．４ ＋ ０．３ の 答えは いくつかな？",
        options: ["０．７", "０．１", "７", "０．０７"],
        answerIndex: 0,
        explanation: "小数のたし算です。０．１が（４＋３＝７個）あつまるので ０．７ です。",
        printAnswer: "０．７"
      },
      {
        question: "３つの角が すべて 等しい 三角形の 名前は？",
        options: ["正三角形（せいさんかっけい）", "二等辺三角形", "直角三角形", "四角形"],
        answerIndex: 0,
        explanation: "３本の辺の長さと３つの角がすべて等しいのは正三角形です。",
        printAnswer: "正三角形"
      }
    ],
    science: [
      {
        question: "モンシロチョウの 育ち方の 順番で 正しいものは？",
        options: ["たまご → ようちゅう → さなぎ → 成虫", "たまご → さなぎ → ようちゅう → 成虫", "ようちゅう → たまご → さなぎ → 成虫", "たまご → 成虫 → ようちゅう"],
        answerIndex: 0,
        explanation: "たまごから幼虫（あおむし）にかえり、さなぎになってから成虫（チョウ）になります。",
        printAnswer: "たまご → ようちゅう → さなぎ → 成虫"
      },
      {
        question: "じしゃくの「Ｎ極」と「Ｓ極」を 近づけると どうなる？",
        options: ["引きつけ合う（くっつく）", "退け合う（はなれる）", "なにもおきない", "電気が流れる"],
        answerIndex: 0,
        explanation: "じしゃくのちがう極どうし（ＮとＳ）は 引きつけ合います。",
        printAnswer: "引きつけ合う"
      },
      {
        question: "豆電球に あかりが つく 回路（かいろ）は どれ？",
        options: ["導線が 輪のように ひと回り つながっている", "途中で 切れている", "電池を つながない", "スイッチを 開いたままにする"],
        answerIndex: 0,
        explanation: "電気が通る道（回路）が ひとつながりの輪になっているときに 明かりがつきます。",
        printAnswer: "輪のようにひと回りつながっている"
      },
      {
        question: "虫めがねで 太陽の光を 集めると、どうなるかな？",
        options: ["光が集まったところが 熱くなる", "光が集まったところが 冷たくなる", "暗くなる", "風がふく"],
        answerIndex: 0,
        explanation: "虫めがねで光を１点に集めると、熱くなって黒い紙から煙が出ることがあります。",
        printAnswer: "光が集まったところが熱くなる"
      },
      {
        question: "こんちゅうの 体は、頭・（　）・腹の ３つに分かれています。（　）は？",
        options: ["胸（むね）", "首（くび）", "足（あし）", "背中（せなか）"],
        answerIndex: 0,
        explanation: "昆虫のからだは「頭・胸・腹」の３つに分かれ、足は胸から６本生えています。",
        printAnswer: "胸（むね）"
      }
    ],
    social: [
      {
        question: "火事（かじ）の ときに かける 電話番号は どれかな？",
        options: ["１１９番", "１１０番", "１１８番", "１０４番"],
        answerIndex: 0,
        explanation: "火事や救急車の要請は「１１９番」、事件・事故は「１１０番」です。",
        printAnswer: "１１９番"
      },
      {
        question: "太陽が 沈む（しずむ）方角は どちらかな？",
        options: ["西（にし）", "東（ひがし）", "南（みなみ）", "北（きた）"],
        answerIndex: 0,
        explanation: "太陽は 東からのぼり、南の空をとって、西にしずみます。",
        printAnswer: "西（にし）"
      },
      {
        question: "むかしの 人が ご飯を たくときに 使っていた 道具は？",
        options: ["かまど", "電子レンジ", "電気炊飯器", "トースター"],
        answerIndex: 0,
        explanation: "電気がなかった昔は、まきを燃やして「かまど」でご飯をたいていました。",
        printAnswer: "かまど"
      },
      {
        question: "消防署の 人たちが いつでも 出動できるように している 工夫は？",
        options: ["消防車や 道具を いつも 点検・整備している", "毎日休んでいる", "夜は鍵をしめて寝る", "私服で待っている"],
        answerIndex: 0,
        explanation: "いつ火事が起きてもすぐに駆けつけられるよう、訓練や点検を欠かしません。",
        printAnswer: "消防車や道具を点検・整備している"
      },
      {
        question: "自分たちの 市・区・町・村の ようすを 調べる方法は？",
        options: ["高いところから 見わたしたり 地図を 見る", "目をとじる", "家から一歩も出ない", "外国に行く"],
        answerIndex: 0,
        explanation: "展望台や屋上から見わたしたり、地図や白地図を使って土地の使われ方を調べます。",
        printAnswer: "高いところから見わたしたり地図を見る"
      }
    ],
    english: [
      {
        question: "「私は サッカーが 好きです」を 英語で 言うと？",
        options: ["I like soccer.", "I play soccer.", "I am soccer.", "He likes soccer."],
        answerIndex: 0,
        explanation: "「私は〜が好き」は「I like 〜」と表現します。",
        printAnswer: "I like soccer."
      },
      {
        question: "「元気ですか？」と たずねる 英語は どれかな？",
        options: ["How are you?", "What is this?", "Who are you?", "Where is it?"],
        answerIndex: 0,
        explanation: "調子をたずねるときは「How are you?（お元気ですか？）」を使います。",
        printAnswer: "How are you?"
      },
      {
        question: "「本（ほん）」は 英語で どれかな？",
        options: ["Book", "Pen", "Desk", "Bag"],
        answerIndex: 0,
        explanation: "ほんは「Book（ブック）」です。",
        printAnswer: "Book"
      },
      {
        question: "すうじの「１２」は 英語で なんて 言うかな？",
        options: ["Twelve", "Twenty", "Ten", "Eleven"],
        answerIndex: 0,
        explanation: "１１は Eleven、１２は Twelve（トゥエルブ）です。",
        printAnswer: "Twelve"
      },
      {
        question: "「日曜日」は 英語で どれかな？",
        options: ["Sunday", "Monday", "Friday", "Saturday"],
        answerIndex: 0,
        explanation: "日曜日は「Sunday（サンデー）」、月曜日は「Monday」です。",
        printAnswer: "Sunday"
      }
    ]
  },
  4: {
    japanese: [
      {
        question: "「目がない」という 慣用句の 正しい 意味は？",
        options: ["夢中になるほど 大好きである", "目が見えない", "目が細い", "まわりが見えない"],
        answerIndex: 0,
        explanation: "「甘いものに目がない」のように、大好物で理性を失うほど好きなことを表します。",
        printAnswer: "夢中になるほど大好きである"
      },
      {
        question: "「雨が ふった。（　）、かさを さした。」（　）に入る つなぎ言葉は？",
        options: ["だから", "しかし", "または", "なぜなら"],
        answerIndex: 0,
        explanation: "前のことが原因で後のことが起きるので、順接の「だから」が入ります。",
        printAnswer: "だから"
      },
      {
        question: "「熱心に 勉強する。」この中の 修飾語（しゅうしょくご）は どれ？",
        options: ["熱心に", "勉強する", "両方", "どちらでもない"],
        answerIndex: 0,
        explanation: "「勉強する」という動詞をくわしく説明している「熱心に」が修飾語です。",
        printAnswer: "熱心に"
      },
      {
        question: "漢字の部首で「さんずい（氵）」が 表す 意味は 何に関係がある？",
        options: ["水", "木", "火", "土"],
        answerIndex: 0,
        explanation: "「海」「波」「泳」など、水に関係する漢字に「さんずい」がつきます。",
        printAnswer: "水"
      },
      {
        question: "「きかい」という 同音異義語で「チャンス」の 意味の 漢字は？",
        options: ["機会", "機械", "器械", "気配"],
        answerIndex: 0,
        explanation: "チャンスは「機会」、モーターなどの装置は「機械」と書きます。",
        printAnswer: "機会"
      }
    ],
    math: [
      {
        question: "たて５ｃｍ、よこ８ｃｍの 長方形の 面積は 何ｃｍ² かな？",
        options: ["４０ｃｍ²", "２６ｃｍ²", "１３ｃｍ²", "８０ｃｍ²"],
        answerIndex: 0,
        explanation: "長方形の面積 ＝ たて × よこ なので、５ × ８ ＝ ４０ｃｍ² です。",
        printAnswer: "４０ｃｍ²"
      },
      {
        question: "８４ ÷ ２１ の 答えは いくつかな？",
        options: ["４", "３", "５", "２"],
        answerIndex: 0,
        explanation: "２１ × ４ ＝ ８４ なので、答えは ４ です。",
        printAnswer: "４"
      },
      {
        question: "直角（ちょっかく）は 何度（ど）かな？",
        options: ["９０度", "１８０度", "４５度", "３６０度"],
        answerIndex: 0,
        explanation: "直角は ９０度です。１回転は３６０度、直線は１８０度です。",
        printAnswer: "９０度"
      },
      {
        question: "３．６５ ＋ １．２８ の 計算の 答えは？",
        options: ["４．９３", "４．８３", "５．０３", "４．９２"],
        answerIndex: 0,
        explanation: "位をそろえて計算します。３．６５ ＋ １．２８ ＝ ４．９３ です。",
        printAnswer: "４．９３"
      },
      {
        question: "１辺が １ｍの 正方形の 面積は 何㎡ かな？",
        options: ["１㎡", "１０㎡", "１００㎡", "１００００㎡"],
        answerIndex: 0,
        explanation: "１ｍ × １ｍ ＝ １㎡（平方メートル）です。（＝10000cm²）",
        printAnswer: "１㎡"
      }
    ],
    science: [
      {
        question: "水が ふっとうして 気体に なったものを 何というかな？",
        options: ["水蒸気（すいじょうき）", "氷", "湯気（ゆげ）", "霜（しも）"],
        answerIndex: 0,
        explanation: "水が気体になった見えない気体を「水蒸気」と呼びます。（白い湯気は小さな水滴）",
        printAnswer: "水蒸気"
      },
      {
        question: "冬の夜空に 明るくかがやく「オリオン座」の 星の 配列は？",
        options: ["中央に ３つの星が ならんでいる", "ひしゃくの 形をしている", "Ｗの 形をしている", "十字の 形をしている"],
        answerIndex: 0,
        explanation: "オリオン座は、真ん中に３つの星が並び、そのまわりを４つの星が囲んでいます。",
        printAnswer: "中央に３つの星がならんでいる"
      },
      {
        question: "腕を まげるとき、腕の内側の 筋肉は どうなるかな？",
        options: ["ちぢんで 太く硬くなる", "ゆるんで のびる", "変化しない", "消える"],
        answerIndex: 0,
        explanation: "腕を曲げるとき、内側の筋肉が縮んで盛り上がり、外側の筋肉がゆるみます。",
        printAnswer: "ちぢんで太く硬くなる"
      },
      {
        question: "月は どの 向きから どの 向きへ 動いて 見えるかな？",
        options: ["東から 南をとおって 西へ", "西から 東へ", "北から 南へ", "動かない"],
        answerIndex: 0,
        explanation: "地球の自転によって、太陽と同じように「東から南をとおり西へ」動いて見えます。",
        printAnswer: "東から南をとおって西へ"
      },
      {
        question: "金属（鉄や銅など）を 温めると 体積はどうなるかな？",
        options: ["少し 大きくなる", "少し 小さくなる", "全く 変わらない", "半分になる"],
        answerIndex: 0,
        explanation: "空気・水・金属はすべて、温めると体積が大きくなり、冷やすと小さくなります。",
        printAnswer: "少し大きくなる"
      }
    ],
    social: [
      {
        question: "日本で 一番 面積が 広い 都道府県は どこかな？",
        options: ["北海道", "岩手県", "福島県", "東京都"],
        answerIndex: 0,
        explanation: "日本の総面積の約22%を占める北海道が最も広い都道府県です。",
        printAnswer: "北海道"
      },
      {
        question: "ごみを 減らすための「３Ｒ（スリーアール）」に 入らないものは？",
        options: ["リターン（Return）", "リデュース（Reduce）", "リユース（Reuse）", "リサイクル（Recycle）"],
        answerIndex: 0,
        explanation: "ごみを減らす(Reduce)、再使用(Reuse)、再生利用(Recycle)で３Ｒです。",
        printAnswer: "リターン（Return）"
      },
      {
        question: "ダムの 役割として 正しいものは どれかな？",
        options: ["水をためて洪水を防いだり水道に送る", "魚をぜんぶつかまえる", "川の水をぜんぶ海に流す", "船をはやく走らせる"],
        answerIndex: 0,
        explanation: "大雨のときに水をためて洪水を防ぎ、晴天時に生活用水や農業用水を供給します。",
        printAnswer: "水をためて洪水を防いだり水道に送る"
      },
      {
        question: "地震のときに 命を守る 行動として 最も 適切なものは？",
        options: ["机の下にもぐり 頭を守る", "すぐ外へ 走って飛び出す", "窓ガラスのそばに 立つ", "エレベーターに 乗る"],
        answerIndex: 0,
        explanation: "揺れを感じたら、まずは頭を守るために丈夫な机の下などにもぐります。",
        printAnswer: "机の下にもぐり頭を守る"
      },
      {
        question: "都道府県の数は 全部で いくつあるかな？",
        options: ["４７", "４３", "５０", "３９"],
        answerIndex: 0,
        explanation: "日本には１都１道２府４３県、合計４７の都道府県があります。",
        printAnswer: "４７"
      }
    ],
    english: [
      {
        question: "「今、何時ですか？」と たずねる 英語は どれかな？",
        options: ["What time is it?", "What is your name?", "How old are you?", "Where do you live?"],
        answerIndex: 0,
        explanation: "時間をたずねるときは「What time is it?」と聞きます。",
        printAnswer: "What time is it?"
      },
      {
        question: "「晴れ（いい天気）」を あらわす 英語は どれかな？",
        options: ["Sunny", "Rainy", "Cloudy", "Snowy"],
        answerIndex: 0,
        explanation: "晴れは「Sunny」、雨は「Rainy」、曇りは「Cloudy」です。",
        printAnswer: "Sunny"
      },
      {
        question: "「金曜日」は 英語で なんて 言うかな？",
        options: ["Friday", "Thursday", "Wednesday", "Tuesday"],
        answerIndex: 0,
        explanation: "金曜日は「Friday（フライデー）」です。",
        printAnswer: "Friday"
      },
      {
        question: "「ペンを 持っています」を 英語で 言うと？",
        options: ["I have a pen.", "I am a pen.", "I like a pen.", "I want a pen."],
        answerIndex: 0,
        explanation: "「持っている」は動詞「have」を使います。",
        printAnswer: "I have a pen."
      },
      {
        question: "すうじの「５０」は 英語で なんて 言うかな？",
        options: ["Fifty", "Fifteen", "Five", "Fifth"],
        answerIndex: 0,
        explanation: "１５は Fifteen、５０は Fifty（フィフティ）です。",
        printAnswer: "Fifty"
      }
    ]
  },
  5: {
    japanese: [
      {
        question: "相手を うやまう「尊敬語（そんけいご）」の 表現は どれかな？",
        options: ["先生が いらっしゃる", "私が 参る", "私が 申し上げる", "先生が 見る"],
        answerIndex: 0,
        explanation: "相手の行動を高めて敬意を示すのが尊敬語です。「行く・来る・いる」の尊敬語は「いらっしゃる」です。",
        printAnswer: "先生がいらっしゃる"
      },
      {
        question: "「一石二鳥（いっせきにちょう）」の 意味は どれかな？",
        options: ["１つの行動で ２つの利益を 得ること", "石を投げて 鳥を逃がすこと", "鳥が２羽集まること", "重い石を運ぶこと"],
        answerIndex: 0,
        explanation: "ひとつの石を投げて二羽の鳥を捕らえることから、一つの事で二つの得をすることです。",
        printAnswer: "１つの行動で２つの利益を得ること"
      },
      {
        question: "「雨が降った（　）、試合は中止になった。」因果関係を表す接続語は？",
        options: ["ので", "のに", "だが", "または"],
        answerIndex: 0,
        explanation: "原因・理由を示す接続助詞「ので」が最も自然につながります。",
        printAnswer: "ので"
      },
      {
        question: "「竹取物語」で、竹の中から 生まれた 女の子の 名前は？",
        options: ["かぐや姫", "乙姫", "織姫", "鉢かづき姫"],
        answerIndex: 0,
        explanation: "日本最古の物語といわれる竹取物語の主人公は「かぐや姫」です。",
        printAnswer: "かぐや姫"
      },
      {
        question: "「十人十色（じゅうにんといろ）」の 意味は どれかな？",
        options: ["考えや好みは 人それぞれ 違うということ", "１０色のえのぐがあること", "みんな同じ考えであること", "服の色を合わせること"],
        answerIndex: 0,
        explanation: "人はそれぞれ性格や好みが違っているという意味の四字熟語です。",
        printAnswer: "考えや好みは人それぞれ違うということ"
      }
    ],
    math: [
      {
        question: "２．４ × １．５ の 計算の 答えは いくつかな？",
        options: ["３．６", "３６", "０．３６", "３．８"],
        answerIndex: 0,
        explanation: "２４ × １５ ＝ ３６０。小数の桁数が２桁分なので、小数点を動かして ３．６０ ＝ ３．６ です。",
        printAnswer: "３．６"
      },
      {
        question: "１／３ ＋ １／２ を 通分して 計算すると いくつかな？",
        options: ["５／６", "２／５", "２／６", "１／５"],
        answerIndex: 0,
        explanation: "分母を６に通分します。２／６ ＋ ３／６ ＝ ５／６ となります。",
        printAnswer: "５／６"
      },
      {
        question: "底辺が ８ｃｍ、高さが ５ｃｍの 三角形の 面積は？",
        options: ["２０ｃｍ²", "４０ｃｍ²", "１３ｃｍ²", "２６ｃｍ²"],
        answerIndex: 0,
        explanation: "三角形の面積 ＝ 底辺 × 高さ ÷ ２ なので、８ × ５ ÷ ２ ＝ ２０ｃｍ² です。",
        printAnswer: "２０ｃｍ²"
      },
      {
        question: "定価 ２０００円の 品物を「２０％引き」で 買うと、いくらになる？",
        options: ["１６００円", "１８００円", "４００円", "１４００円"],
        answerIndex: 0,
        explanation: "値引き額は ２０００ × ０．２ ＝ ４００円。２０００ − ４００ ＝ １６００円です。",
        printAnswer: "１６００円"
      },
      {
        question: "正六角形の １つの 内角の 大きさは 何度かな？",
        options: ["１２０度", "１０８度", "90度", "60度"],
        answerIndex: 0,
        explanation: "六角形の内角の和は 180×(6-2)=720度。720 ÷ 6 ＝ 120度です。",
        printAnswer: "１２０度"
      }
    ],
    science: [
      {
        question: "メダカの たんじょうで、受精卵（じゅせいらん）が ふ化するのは 何日後くらい？",
        options: ["約１０日〜２週間後", "約半年後", "約１時間後", "約２ヶ月後"],
        answerIndex: 0,
        explanation: "水温約25度の場合、約10日〜14日ほどで卵の中で稚魚が育ち、ふ化します。",
        printAnswer: "約１０日〜２週間後"
      },
      {
        question: "電磁石の 磁力を 強くする 方法として 正しいものは？",
        options: ["導線の 巻き数を 増やす", "導線の 巻き数を 減らす", "電流を 弱くする", "鉄心を ぬく"],
        answerIndex: 0,
        explanation: "コイルの巻き数を増やすか、流す電流を大きくすると電磁石は強くなります。",
        printAnswer: "導線の巻き数を増やす"
      },
      {
        question: "台風は 通常、日本付近を どちらの 方向に 進むことが多い？",
        options: ["南西から 北東へ", "北東から 南西へ", "北西から 南東へ", "東から 西へ"],
        answerIndex: 0,
        explanation: "貿易風や偏西風、太平洋高気圧の影響により、南西から北東へカーブして進むことが多いです。",
        printAnswer: "南西から北東へ"
      },
      {
        question: "食塩が 水に 溶ける限界の 量（溶解度）は、水の 温度を 上げると？",
        options: ["あまり 変わらない", "急激に たくさん溶けるようになる", "まったく溶けなくなる", "半分になる"],
        answerIndex: 0,
        explanation: "ミョウバンは温度で大きく変化しますが、食塩は温度を上げても溶ける量はあまり変わりません。",
        printAnswer: "あまり変わらない"
      },
      {
        question: "植物の 花粉が めしべの 先に つくことを 何というかな？",
        options: ["受粉（じゅふん）", "光合成", "呼吸", "蒸散"],
        answerIndex: 0,
        explanation: "花粉がめしべにつくことを受粉といい、これによって実や種ができます。",
        printAnswer: "受粉（じゅふん）"
      }
    ],
    social: [
      {
        question: "日本で 米づくりが さかんな 庄内平野（しょうないへいや）がある 都道府県は？",
        options: ["山形県", "新潟県", "秋田県", "北海道"],
        answerIndex: 0,
        explanation: "最上川の下流に広がる庄内平野は山形県にあり、日本有数の穀倉地帯です。",
        printAnswer: "山形県"
      },
      {
        question: "日本の 国土面積の 約何割（％）が 森林（山林）かな？",
        options: ["約７割（約６７％）", "約３割", "約９割", "約５割"],
        answerIndex: 0,
        explanation: "日本は国土の約3分の2（約67%）が森林に覆われた豊かな森林国です。",
        printAnswer: "約７割（約６７％）"
      },
      {
        question: "関東から九州にかけて 連なる 工業地帯・地域の 集まりを 何という？",
        options: ["太平洋ベルト", "日本海ベルト", "内陸工業地域", "臨海工業地帯"],
        answerIndex: 0,
        explanation: "太平洋沿岸に工業地帯が帯状に並んでいることから「太平洋ベルト」と呼ばれます。",
        printAnswer: "太平洋ベルト"
      },
      {
        question: "魚を とるだけでなく、卵から 稚魚を育てて 川や海に 放流する 漁業は？",
        options: ["栽培漁業（さいばいぎょぎょう）", "養殖漁業", "遠洋漁業", "沖合漁業"],
        answerIndex: 0,
        explanation: "育てて海に放流し、成長してから捕る漁業を「栽培漁業」といいます。",
        printAnswer: "栽培漁業"
      },
      {
        question: "食料自給率（自分たちの国で生産する食料の割合）を高める 工夫は？",
        options: ["地産地消（地元でとれたものを地元で消費する）", "外国産ばかり買う", "農地を全部ビルにする", "食べ残しを増やす"],
        answerIndex: 0,
        explanation: "日本の農業や食材を大切にし、地元や国産の農作物を消費することが重要です。",
        printAnswer: "地産地消"
      }
    ],
    english: [
      {
        question: "「私は 医者に なりたいです」を 英語で 正しく 表しているものは？",
        options: ["I want to be a doctor.", "I am a doctor.", "I like a doctor.", "He is a doctor."],
        answerIndex: 0,
        explanation: "「〜になりたい」は「I want to be a 〜」と表現します。",
        printAnswer: "I want to be a doctor."
      },
      {
        question: "道案内で「まっすぐ 行ってください」は 英語で？",
        options: ["Go straight.", "Turn right.", "Turn left.", "Stop here."],
        answerIndex: 0,
        explanation: "直進は「Go straight」、右折は「Turn right」、左折は「Turn left」です。",
        printAnswer: "Go straight."
      },
      {
        question: "「私は 朝７時に 起きます」は 英語で？",
        options: ["I get up at seven.", "I sleep at seven.", "I eat at seven.", "I go to school at seven."],
        answerIndex: 0,
        explanation: "起きるは「get up」です。「I get up at seven.」と言います。",
        printAnswer: "I get up at seven."
      },
      {
        question: "「何が 欲しいですか？」と たずねる 英語は？",
        options: ["What do you want?", "What do you like?", "Where do you go?", "Who are you?"],
        answerIndex: 0,
        explanation: "欲しいものを尋ねるときは「What do you want?」を使います。",
        printAnswer: "What do you want?"
      },
      {
        question: "「季節（きせつ）」を あらわす 英語の 単語は？",
        options: ["Season", "Weather", "Month", "Clock"],
        answerIndex: 0,
        explanation: "季節は「Season（シーズン）」、天気は「Weather」です。",
        printAnswer: "Season"
      }
    ]
  },
  6: {
    japanese: [
      {
        question: "「春眠暁を覚えず」の 詩人（作者）は だれかな？",
        options: ["猛浩然（もうこうねん）", "李白（りはく）", "杜甫（とほ）", "王維（おうい）"],
        answerIndex: 0,
        explanation: "唐代の詩人・猛浩然が詠んだ「春暁（しゅんぎょう）」の有名な冒頭です。",
        printAnswer: "猛浩然（もうこうねん）"
      },
      {
        question: "二字熟語「高低」のように、漢字の組み合わせが「反対・対」のものは？",
        options: ["明暗（めいあん）", "森林（しんりん）", "読書（どくしょ）", "岩石（がんせき）"],
        answerIndex: 0,
        explanation: "「明」と「暗」は明るいと暗いで反対の意味の漢字が組み合わさっています。",
        printAnswer: "明暗（めいあん）"
      },
      {
        question: "ディベート（討論会）で 最も 大切な 姿勢は どれ？",
        options: ["相手の意見をよく聞き 根拠をもとに論理的に述べる", "大声で相手を言いくるめる", "途中で怒り出す", "相手の悪口を言う"],
        answerIndex: 0,
        explanation: "客観的な事実やデータ（根拠）をもとに、互いに敬意を持って論理的に議論します。",
        printAnswer: "相手の意見を聞き根拠をもとに論理的に述べる"
      },
      {
        question: "「温故知新（おんこちしん）」の 意味は どれかな？",
        options: ["昔のことを学び 新しい知識や見解を得ること", "昔のことはすべて忘れること", "新しいことだけを信じること", "温かいものを食べること"],
        answerIndex: 0,
        explanation: "古い教えや歴史をたずねて研究し、そこから新しい知恵を導き出すことです。",
        printAnswer: "昔のことを学び新しい知識や見解を得ること"
      },
      {
        question: "「私は 先生から 記念品を （　）。」適切な 謙譲語は？",
        options: ["いただいた", "くださった", "あげた", "もらった"],
        answerIndex: 0,
        explanation: "相手から物を受けるとき、へりくだって敬意を示す謙譲語は「いただく」です。",
        printAnswer: "いただいた"
      }
    ],
    math: [
      {
        question: "２／５ ÷ ３／４ の 計算の 答えは いくつかな？",
        options: ["８／１５", "６／２０", "５／６", "１５／８"],
        answerIndex: 0,
        explanation: "分数のわり算は、わる数の分子と分母をひっくり返してかけます。２／５ × ４／３ ＝ ８／１５ です。",
        printAnswer: "８／１５"
      },
      {
        question: "半径 ３ｃｍの 円の 面積は 何ｃｍ² かな？（円周率は 3.14）",
        options: ["２８．２６ｃｍ²", "１８．８４ｃｍ²", "９．４２ｃｍ²", "５６．５２ｃｍ²"],
        answerIndex: 0,
        explanation: "円の面積 ＝ 半径 × 半径 × 3.14 なので、３ × ３ × 3.14 ＝ ２８．２６ｃｍ² です。",
        printAnswer: "２８．２６ｃｍ²"
      },
      {
        question: "比の式「３ ： ５ ＝ １２ ： ｘ」の ｘに あてはまる 数は？",
        options: ["２０", "１５", "２５", "１８"],
        answerIndex: 0,
        explanation: "前項が３から１２へ４倍になっているので、後項の５も４倍して ５ × ４ ＝ ２０ です。",
        printAnswer: "２０"
      },
      {
        question: "時速 ６０ｋｍで 走る 車が、２時間３０分で 進む 道のりは？",
        options: ["１５０ｋｍ", "１２０ｋｍ", "１８０ｋｍ", "１４０ｋｍ"],
        answerIndex: 0,
        explanation: "２時間３０分は ２．５時間です。道のり ＝ 速さ × 時間 ＝ ６０ × ２．５ ＝ １５０ｋｍ です。",
        printAnswer: "１５０ｋｍ"
      },
      {
        question: "底面積が １５ｃｍ²、高さが ６ｃｍの 角柱の 体積は？",
        options: ["９０ｃｍ³", "４５ｃｍ³", "３０ｃｍ³", "１８０ｃｍ³"],
        answerIndex: 0,
        explanation: "角柱の体積 ＝ 底面積 × 高さ なので、１５ × ６ ＝ ９０ｃｍ³ です。",
        printAnswer: "９０ｃｍ³"
      }
    ],
    science: [
      {
        question: "植物が 光を受けて「でんぷん」と「酸素」をつくり出す 働きは？",
        options: ["光合成（こうごうせい）", "呼吸", "蒸散", "吸収"],
        answerIndex: 0,
        explanation: "葉緑体で光・二酸化炭素・水を使ってデンプンと酸素をつくる働きを光合成といいます。",
        printAnswer: "光合成（こうごうせい）"
      },
      {
        question: "青色リトマス紙を 赤色に 変える 水溶液の 性質は どれ？",
        options: ["酸性（さんせい）", "中性（ちゅうせい）", "アルカリ性", "不活性"],
        answerIndex: 0,
        explanation: "酸性の水溶液（塩酸や炭酸水など）は、青色リトマス紙を赤色に変えます。",
        printAnswer: "酸性（さんせい）"
      },
      {
        question: "人間の 血液の なかで、酸素を 全身に 運ぶ 役割を持つものは？",
        options: ["赤血球（せっけっきゅう）", "白血球", "血小板", "血しょう"],
        answerIndex: 0,
        explanation: "赤血球に含まれるヘモグロビンが、肺で受け取った酸素を全身の細胞へ運びます。",
        printAnswer: "赤血球（せっけっきゅう）"
      },
      {
        question: "「てこ」の 規則で、力点に 加える 力を 小さくするには どうする？",
        options: ["支点から 力点までの 距離を 長くする", "支点から 力点までの 距離を 短くする", "作用点を 力点から 遠ざける", "支点を なくす"],
        answerIndex: 0,
        explanation: "支点から力点までの距離が長いほど、小さな力で重いものを持ち上げることができます。",
        printAnswer: "支点から力点までの距離を長くする"
      },
      {
        question: "化石（カジツやアンモナイトなど）が 見つかる 岩石の 種類は？",
        options: ["堆積岩（たいせきがん）", "火成岩", "マグマ", "変成岩"],
        answerIndex: 0,
        explanation: "泥や砂、動植物の死がいなどが海底や湖底に積み重なって固まった堆積岩から見つかります。",
        printAnswer: "堆積岩（たいせきがん）"
      }
    ],
    social: [
      {
        question: "日本国憲法の「三大原則」に 含まれないものは どれ？",
        options: ["三権分立", "国民主権", "基本的人権の尊重", "平和主義"],
        answerIndex: 0,
        explanation: "三大原則は「国民主権・基本的人権の尊重・平和主義」です。三権分立は統治機構の仕組みです。",
        printAnswer: "三権分立"
      },
      {
        question: "日本の 三権分立において、法律を 制定する「立法権」を 持つ機関は？",
        options: ["国会（こっかい）", "内閣（ないかく）", "裁判所（さいばんしょ）", "警察"],
        answerIndex: 0,
        explanation: "立法権は「国会」、行政権は「内閣」、司法権は「裁判所」が分担しています。",
        printAnswer: "国会（こっかい）"
      },
      {
        question: "１８６７年、徳川慶喜が 政権を 朝廷に 返した 出来事を 何という？",
        options: ["大政奉還（たいせいほうかん）", "明治維新", "廃藩置県", "壇ノ浦の戦い"],
        answerIndex: 0,
        explanation: "江戸幕府第15代将軍・徳川慶喜が政権を朝廷に返上したことを大政奉還といいます。",
        printAnswer: "大政奉還"
      },
      {
        question: "世界の 平和と 安全を 維持するために 設立された 国際組織は？",
        options: ["国際連合（国連）", "ＥＵ", "ＡＰＥＣ", "ＷＨＯ"],
        answerIndex: 0,
        explanation: "第二次世界大戦後の1945年に設立された世界規模の国際機関が「国際連合」です。",
        printAnswer: "国際連合（国連）"
      },
      {
        question: "聖徳太子が 定めた、役人の 心得や 道徳を 示したものは？",
        options: ["十七条の憲法", "大宝律令", "御成敗式目", "武家諸法度"],
        answerIndex: 0,
        explanation: "推古天皇のもとで聖徳太子が定めた「和を以て貴しと為す」で始まる憲法です。",
        printAnswer: "十七条の憲法"
      }
    ],
    english: [
      {
        question: "「私は 去年 京都を 訪れました」過去を表す 正しい 英語は？",
        options: ["I visited Kyoto last year.", "I visit Kyoto last year.", "I visiting Kyoto.", "I will visit Kyoto."],
        answerIndex: 0,
        explanation: "過去のことなので規則動詞「visit」に「ed」をつけて「visited」にします。",
        printAnswer: "I visited Kyoto last year."
      },
      {
        question: "「寿司は 日本で とても 人気があります」は 英語で？",
        options: ["Sushi is very popular in Japan.", "Sushi is delicious food.", "I like sushi very much.", "Sushi comes from Japan."],
        answerIndex: 0,
        explanation: "人気があるは「popular」を使います。「very popular in Japan」となります。",
        printAnswer: "Sushi is very popular in Japan."
      },
      {
        question: "「中学校で 何の 部活動に 入りたいですか？」たずねる 英語は？",
        options: ["What club do you want to join?", "What sport do you like?", "Where is junior high school?", "How do you go to school?"],
        answerIndex: 0,
        explanation: "部活に入るは「join a club」です。「What club do you want to join?」と聞きます。",
        printAnswer: "What club do you want to join?"
      },
      {
        question: "「私は 昨夜 英語を 勉強しました」は 英語で？",
        options: ["I studied English last night.", "I study English last night.", "I will study English.", "I am studying English."],
        answerIndex: 0,
        explanation: "studyの過去形は y を i に変えて ed をつけた「studied」です。",
        printAnswer: "I studied English last night."
      },
      {
        question: "「将来の夢は何ですか？」と たずねる 英語は？",
        options: ["What is your dream?", "What is your hobby?", "What is this?", "Where do you work?"],
        answerIndex: 0,
        explanation: "夢をたずねるときは「What is your dream?」と聞きます。",
        printAnswer: "What is your dream?"
      }
    ]
  }
};

// ==========================================================================
// 2. Web Audio API サウンドシステム（ゼロ外部依存）
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playTone(freq, type = 'sine', duration = 0.15, startTime = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      // Audio Context error handle
    }
  }

  playCorrect() {
    this.init();
    // 華やかなチャイム音 (ド - ミ - ソ - 高いド)
    this.playTone(523.25, 'triangle', 0.12, 0);       // C5
    this.playTone(659.25, 'triangle', 0.12, 0.08);    // E5
    this.playTone(783.99, 'triangle', 0.12, 0.16);    // G5
    this.playTone(1046.50, 'triangle', 0.28, 0.24);   // C6
  }

  playWrong() {
    this.init();
    // ソフトなポヨヨン音
    this.playTone(330, 'sawtooth', 0.15, 0);
    this.playTone(260, 'sawtooth', 0.25, 0.12);
  }

  playClick() {
    this.init();
    this.playTone(600, 'sine', 0.04, 0);
  }

  playComplete() {
    this.init();
    // ファンファーレ
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    const times = [0, 0.1, 0.2, 0.3, 0.45, 0.6];
    const durs = [0.1, 0.1, 0.1, 0.15, 0.1, 0.4];
    notes.forEach((n, i) => {
      this.playTone(n, 'sine', durs[i], times[i]);
    });
  }

  // --- ゲームモード用 効果音 ---
  playTick() {
    this.init();
    this.playTone(800, 'triangle', 0.03, 0);
  }

  playHurryTick() {
    this.init();
    this.playTone(1200, 'square', 0.04, 0);
  }

  playTimeUp() {
    this.init();
    this.playTone(220, 'sawtooth', 0.4, 0);
    this.playTone(180, 'sawtooth', 0.5, 0.15);
  }

  playStreak() {
    this.init();
    // シャキーン！高揚感のあるアルペジオ
    this.playTone(659.25, 'triangle', 0.08, 0);
    this.playTone(880.00, 'triangle', 0.08, 0.06);
    this.playTone(1318.51, 'triangle', 0.2, 0.12);
  }

  playDrumRoll() {
    this.init();
    // ドラムロール風の小太鼓タタタタ…ジャン！
    for (let i = 0; i < 8; i++) {
      this.playTone(180 + (i % 2) * 40, 'triangle', 0.03, i * 0.05);
    }
    this.playTone(523.25, 'sine', 0.25, 0.45);
  }

  playCheer() {
    this.init();
    // 勝利の盛大なファンファーレ
    const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.50];
    const times = [0, 0.12, 0.24, 0.36, 0.5, 0.7];
    const durs = [0.08, 0.08, 0.08, 0.12, 0.15, 0.6];
    notes.forEach((n, i) => {
      this.playTone(n, 'triangle', durs[i], times[i]);
    });
  }
}

// ==========================================================================
// 3. Three.js 3D マスコットキャラクター「ロボまる (Robo-Maru)」＆ステージ演出
// ==========================================================================
class MascotStage {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.robotGroup = null;
    this.headGroup = null;
    this.leftHand = null;
    this.rightHand = null;
    this.visor = null;
    this.particles = null;
    this.subjectProp = null;
    this.currentEmotion = 'idle'; // 'idle', 'happy', 'sad'
    this.jumpProgress = 0;
    this.isJumping = false;
    this.targetRotation = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    
    this.init();
  }

  init() {
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight || 320;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 1.2, 4.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ライティング
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 6, 4);
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 0.6, 10);
    pointLight.position.set(-2, 2, 2);
    this.scene.add(pointLight);

    this.buildRobot();
    this.buildParticles();
    this.setSubjectDecorations('japanese');

    // マウス追従
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('resize', () => this.onResize());

    this.animate();
  }

  buildRobot() {
    this.robotGroup = new THREE.Group();

    // マテリアル
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa, // 明るいブルー
      roughness: 0.3,
      metalness: 0.2
    });
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.2,
      metalness: 0.6
    });

    // 胴体 (丸っこいカプセル風)
    const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.8, 32);
    const body = new THREE.Mesh(bodyGeo, whiteMat);
    body.position.y = 0.5;
    this.robotGroup.add(body);

    // お腹のスクリーン / コントロールバッジ
    const screenGeo = new THREE.PlaneGeometry(0.5, 0.4);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.52, 0.61);
    this.robotGroup.add(screen);

    // 頭部グループ
    this.headGroup = new THREE.Group();
    this.headGroup.position.y = 1.3;

    // 頭の球体
    const headGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const head = new THREE.Mesh(headGeo, bodyMat);
    this.headGroup.add(head);

    // 黒いバイザーフェイス
    const visorGeo = new THREE.SphereGeometry(0.62, 32, 16, 0, Math.PI, 0, Math.PI / 2.2);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.8
    });
    this.visor = new THREE.Mesh(visorGeo, visorMat);
    this.visor.rotation.x = -Math.PI / 2 + 0.3;
    this.visor.position.set(0, 0.05, 0.2);
    this.headGroup.add(this.visor);

    // 目 (発光するシアンの球)
    const eyeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    this.eyeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    this.leftEye = new THREE.Mesh(eyeGeo, this.eyeMat);
    this.leftEye.rotation.x = Math.PI / 2;
    this.leftEye.position.set(-0.24, 0.06, 0.67);
    this.headGroup.add(this.leftEye);

    this.rightEye = new THREE.Mesh(eyeGeo, this.eyeMat);
    this.rightEye.rotation.x = Math.PI / 2;
    this.rightEye.position.set(0.24, 0.06, 0.67);
    this.headGroup.add(this.rightEye);

    // 頭の上のアンテナ
    const antPoleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 12);
    const antPole = new THREE.Mesh(antPoleGeo, darkMat);
    antPole.position.y = 0.8;
    this.headGroup.add(antPole);

    const antBallGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const antBall = new THREE.Mesh(antBallGeo, goldMat);
    antBall.position.y = 1.0;
    this.headGroup.add(antBall);

    // 耳のヘッドフォンパーツ
    const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.1, 16);
    const leftEar = new THREE.Mesh(earGeo, goldMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.72, 0, 0);
    this.headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, goldMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.72, 0, 0);
    this.headGroup.add(rightEar);

    this.robotGroup.add(this.headGroup);

    // 浮遊するかわいい手（球）
    const handGeo = new THREE.SphereGeometry(0.2, 16, 16);
    this.leftHand = new THREE.Mesh(handGeo, whiteMat);
    this.leftHand.position.set(-0.85, 0.45, 0.15);
    this.robotGroup.add(this.leftHand);

    this.rightHand = new THREE.Mesh(handGeo, whiteMat);
    this.rightHand.position.set(0.85, 0.45, 0.15);
    this.robotGroup.add(this.rightHand);

    // 足（浮遊ベース）
    const footGeo = new THREE.CylinderGeometry(0.28, 0.1, 0.25, 24);
    const foot = new THREE.Mesh(footGeo, goldMat);
    foot.position.y = -0.05;
    this.robotGroup.add(foot);

    this.scene.add(this.robotGroup);
  }

  buildParticles() {
    const count = 70;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color(0xf59e0b), // 金
      new THREE.Color(0x38bdf8), // 水色
      new THREE.Color(0xec4899), // ピンク
      new THREE.Color(0x10b981)  // 緑
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 4 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  setSubjectDecorations(subject) {
    if (this.subjectProp) {
      this.scene.remove(this.subjectProp);
      this.subjectProp = null;
    }

    this.subjectProp = new THREE.Group();

    if (subject === 'japanese') {
      // 本のモデル（赤）
      const bookGeo = new THREE.BoxGeometry(0.7, 0.9, 0.18);
      const bookMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
      const book = new THREE.Mesh(bookGeo, bookMat);
      book.position.set(1.4, 0.8, -0.4);
      book.rotation.set(0.3, -0.4, 0.2);
      this.subjectProp.add(book);
    } else if (subject === 'math') {
      // 算数キューブブロック（青・シアン）
      const cubeGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
      const cubeMat1 = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
      const cube1 = new THREE.Mesh(cubeGeo, cubeMat1);
      cube1.position.set(1.3, 0.9, -0.3);
      cube1.rotation.set(0.4, 0.5, 0);
      this.subjectProp.add(cube1);

      const cubeMat2 = new THREE.MeshStandardMaterial({ color: 0x06b6d4 });
      const cube2 = new THREE.Mesh(cubeGeo, cubeMat2);
      cube2.position.set(-1.3, 0.5, -0.3);
      cube2.rotation.set(0.2, -0.3, 0.4);
      this.subjectProp.add(cube2);
    } else if (subject === 'science') {
      // 原子・フラスコ軌道リング（緑）
      const ringGeo = new THREE.TorusGeometry(0.5, 0.04, 16, 50);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(1.3, 0.9, -0.3);
      ring.rotation.x = Math.PI / 3;
      this.subjectProp.add(ring);

      const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({ color: 0x34d399 });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(1.3, 0.9, -0.3);
      this.subjectProp.add(sphere);
    } else if (subject === 'social') {
      // ミニ地球儀（オレンジ・大地）
      const globeGeo = new THREE.SphereGeometry(0.42, 24, 24);
      const globeMat = new THREE.MeshStandardMaterial({ color: 0xf97316 });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      globe.position.set(1.3, 0.8, -0.3);
      this.subjectProp.add(globe);
    } else if (subject === 'english') {
      // アルファベットブロック風（紫）
      const blockGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const blockMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6 });
      const block = new THREE.Mesh(blockGeo, blockMat);
      block.position.set(1.3, 0.8, -0.3);
      block.rotation.set(0.3, 0.6, 0.1);
      this.subjectProp.add(block);
    }

    this.scene.add(this.subjectProp);
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    if (x >= -1.5 && x <= 1.5 && y >= -1.5 && y <= 1.5) {
      this.targetRotation.y = x * 0.45;
      this.targetRotation.x = -y * 0.25;
    }
  }

  onResize() {
    if (!this.canvas.parentElement) return;
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight || 320;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  celebrate() {
    this.currentEmotion = 'happy';
    this.isJumping = true;
    this.jumpProgress = 0;
    this.eyeMat.color.setHex(0xf59e0b); // 目がキラキラゴールドに！

    // 花火パーティクル放出
    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 }
      });
    }

    setTimeout(() => {
      this.currentEmotion = 'idle';
      this.eyeMat.color.setHex(0x38bdf8);
    }, 2200);
  }

  oops() {
    this.currentEmotion = 'sad';
    this.eyeMat.color.setHex(0xef4444); // 目がレッドに
    setTimeout(() => {
      this.currentEmotion = 'idle';
      this.eyeMat.color.setHex(0x38bdf8);
    }, 1800);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // 浮遊アニメーション（呼吸）
    if (this.robotGroup) {
      const hoverY = Math.sin(elapsed * 2.2) * 0.08;
      
      if (this.isJumping) {
        this.jumpProgress += delta * 3.2;
        // 放物線ジャンプ ＆ 360度宙返り
        const jumpH = Math.sin(this.jumpProgress * Math.PI) * 0.8;
        this.robotGroup.position.y = hoverY + Math.max(0, jumpH);
        this.robotGroup.rotation.y += delta * 6; // スピン
        
        // 手をバンザイ
        if (this.leftHand && this.rightHand) {
          this.leftHand.position.y = 1.1 + Math.sin(elapsed * 10) * 0.1;
          this.rightHand.position.y = 1.1 + Math.sin(elapsed * 10) * 0.1;
        }

        if (this.jumpProgress >= 1) {
          this.isJumping = false;
          this.robotGroup.rotation.y = 0;
        }
      } else if (this.currentEmotion === 'sad') {
        // しょんぼり左右に首を振る
        this.robotGroup.position.y = hoverY - 0.15;
        this.headGroup.rotation.z = Math.sin(elapsed * 6) * 0.18;
        this.headGroup.rotation.x = 0.25;
        if (this.leftHand && this.rightHand) {
          this.leftHand.position.y = 0.2;
          this.rightHand.position.y = 0.2;
        }
      } else {
        // 通常のアイドル浮遊
        this.robotGroup.position.y = hoverY;
        this.headGroup.rotation.x += (this.targetRotation.x - this.headGroup.rotation.x) * 0.08;
        this.headGroup.rotation.y += (this.targetRotation.y - this.headGroup.rotation.y) * 0.08;
        this.headGroup.rotation.z = Math.sin(elapsed * 1.5) * 0.04;

        if (this.leftHand && this.rightHand) {
          this.leftHand.position.y = 0.45 + Math.sin(elapsed * 2.5) * 0.05;
          this.rightHand.position.y = 0.45 - Math.sin(elapsed * 2.5) * 0.05;
        }
      }
    }

    // パーティクルの緩やかな回転と上昇
    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.06;
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.003;
        if (positions[i] > 3.5) positions[i] = -0.5;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // 科目アイテムの自転
    if (this.subjectProp) {
      this.subjectProp.rotation.y = elapsed * 0.8;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ==========================================================================
// 4. Kahoot! スタイル バトルゲームシステム (KahootBattleGame)
// ==========================================================================
class KahootBattleGame {
  constructor(app) {
    this.app = app;
    this.soundFX = app.soundFX;

    this.playerName = 'チャレンジャー';
    this.rivals = [
      { name: 'うさぎちゃん', avatar: '🐰', score: 0, prevRank: 0 },
      { name: 'くまごろう', avatar: '🐻', score: 0, prevRank: 0 },
      { name: 'きつねまる', avatar: '🦊', score: 0, prevRank: 0 },
      { name: 'みけねこ', avatar: '🐱', score: 0, prevRank: 0 }
    ];

    this.questions = [];
    this.currentIndex = 0;
    this.playerScore = 0;
    this.playerStreak = 0;
    this.playerPrevRank = 1;

    this.totalTime = 15;
    this.remainTime = 15;
    this.timerInterval = null;
    this.answered = false;

    this.initDOM();
  }

  get mascot() {
    return this.app.mascot;
  }

  initDOM() {
    this.lobbyPanel = document.getElementById('game-lobby-panel');
    this.arenaPanel = document.getElementById('game-arena-panel');
    this.leaderboardPanel = document.getElementById('game-leaderboard-panel');
    this.podiumPanel = document.getElementById('game-podium-panel');

    this.inputNickname = document.getElementById('player-nickname');
    this.btnStartGame = document.getElementById('btn-start-game');
    this.btnRoundNext = document.getElementById('btn-round-next');
    this.btnLbNext = document.getElementById('btn-lb-next');
    this.btnReplayGame = document.getElementById('btn-replay-game');
    this.btnBackStudy = document.getElementById('btn-back-study');

    // 4色ボタン
    this.kahootButtons = document.querySelectorAll('.kahoot-btn');
    this.kahootButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.handlePlayerAnswer(idx);
      });
    });

    if (this.btnStartGame) {
      this.btnStartGame.addEventListener('click', () => {
        this.soundFX.playClick();
        this.startNewGame();
      });
    }

    if (this.btnRoundNext) {
      this.btnRoundNext.addEventListener('click', () => {
        this.soundFX.playClick();
        this.showLeaderboard();
      });
    }

    if (this.btnLbNext) {
      this.btnLbNext.addEventListener('click', () => {
        this.soundFX.playClick();
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
          this.startQuestion();
        } else {
          this.showPodium();
        }
      });
    }

    if (this.btnReplayGame) {
      this.btnReplayGame.addEventListener('click', () => {
        this.soundFX.playClick();
        this.showLobby();
      });
    }

    if (this.btnBackStudy) {
      this.btnBackStudy.addEventListener('click', () => {
        this.app.switchMode('digital');
      });
    }
  }

  showLobby() {
    this.stopTimer();
    if (this.lobbyPanel) this.lobbyPanel.style.display = 'block';
    if (this.arenaPanel) this.arenaPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'none';
  }

  onConfigChanged() {
    if (this.arenaPanel && this.arenaPanel.style.display === 'flex') {
      this.showLobby();
    }
  }

  startNewGame() {
    const rawName = this.inputNickname ? this.inputNickname.value.trim() : '';
    this.playerName = rawName || 'チャレンジャー';

    // 該当学年・科目の問題を取得
    const gradeData = QUESTION_DATABASE[this.app.currentGrade];
    let rawList = (gradeData && gradeData[this.app.currentSubject]) ? gradeData[this.app.currentSubject] : [];
    if (!rawList || rawList.length === 0) {
      // フォールバック（1年国語）
      rawList = QUESTION_DATABASE[1].japanese;
    }
    
    // シャッフルして5問
    this.questions = [...rawList].sort(() => Math.random() - 0.5).slice(0, 5);
    this.currentIndex = 0;
    this.playerScore = 0;
    this.playerStreak = 0;
    this.playerPrevRank = 1;

    // ライバルのスコアもリセット
    this.rivals.forEach((r, idx) => {
      r.score = 0;
      r.prevRank = idx + 2;
    });

    if (this.lobbyPanel) this.lobbyPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'none';
    if (this.arenaPanel) this.arenaPanel.style.display = 'flex';

    this.startQuestion();
  }

  startQuestion() {
    this.answered = false;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    const total = this.questions.length;

    if (this.lobbyPanel) this.lobbyPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'none';
    if (this.arenaPanel) this.arenaPanel.style.display = 'flex';
    const overlay = document.getElementById('round-overlay');
    if (overlay) overlay.classList.remove('show');

    // ヘッダー情報
    const qNumEl = document.getElementById('arena-q-num');
    if (qNumEl) qNumEl.textContent = `第 ${this.currentIndex + 1} / ${total} 問`;

    const scoreEl = document.getElementById('arena-score');
    if (scoreEl) scoreEl.textContent = `${this.playerScore.toLocaleString()} pts`;

    // ストリーク
    const streakEl = document.getElementById('arena-streak');
    if (streakEl) {
      if (this.playerStreak >= 2) {
        streakEl.style.display = 'inline-flex';
        streakEl.textContent = `🔥 STREAK x${this.playerStreak}`;
      } else {
        streakEl.style.display = 'none';
      }
    }

    // 問題文
    const qTextEl = document.getElementById('arena-question-text');
    if (qTextEl) qTextEl.textContent = q.question;

    // 4色ボタンテキストリセット
    if (q && q.options) {
      q.options.forEach((opt, idx) => {
        const textEl = document.getElementById(`k-opt-${idx}`);
        if (textEl) textEl.textContent = opt;
      });
    }

    this.kahootButtons.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove('dimmed', 'correct-highlight');
    });

    // 3Dマスコット吹き出し
    this.app.setSpeechBubble('いそげ！ すばやく答えてね！⏱️');

    // タイマースタート
    this.remainTime = this.totalTime;
    this.updateTimerDisplay();

    let lastSec = Math.ceil(this.remainTime);

    this.timerInterval = setInterval(() => {
      this.remainTime -= 0.1;
      if (this.remainTime <= 0) {
        this.remainTime = 0;
        this.updateTimerDisplay();
        this.stopTimer();
        this.handleTimeUp();
        return;
      }

      this.updateTimerDisplay();

      const currentSec = Math.ceil(this.remainTime);
      if (currentSec !== lastSec) {
        lastSec = currentSec;
        if (currentSec <= 5) {
          this.soundFX.playHurryTick();
        } else {
          this.soundFX.playTick();
        }
      }
    }, 100);
  }

  updateTimerDisplay() {
    const pct = Math.max(0, (this.remainTime / this.totalTime) * 100);
    const fillEl = document.getElementById('game-timer-fill');
    const circleEl = document.getElementById('game-timer-circle');

    if (fillEl) {
      fillEl.style.width = `${pct}%`;
      if (this.remainTime <= 5) {
        fillEl.classList.add('danger');
      } else {
        fillEl.classList.remove('danger');
      }
    }

    if (circleEl) {
      const sec = Math.ceil(this.remainTime);
      circleEl.textContent = `${sec}`;
      if (this.remainTime <= 5) {
        circleEl.classList.add('warning');
      } else {
        circleEl.classList.remove('warning');
      }
    }
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handlePlayerAnswer(chosenIdx) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    const isCorrect = (chosenIdx === q.answerIndex);

    // ライバルたちの得点を計算
    this.simulateRivalsAnswer(q);

    // ボタンのスタイル更新
    this.kahootButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answerIndex) {
        btn.classList.add('correct-highlight');
      } else {
        btn.classList.add('dimmed');
      }
    });

    // 得点計算
    let pointsGained = 0;
    let speedBonus = 0;
    let streakBonus = 0;

    if (isCorrect) {
      this.playerStreak++;
      const basePts = 500;
      speedBonus = Math.round(500 * (this.remainTime / this.totalTime));
      streakBonus = (this.playerStreak >= 3) ? 200 : (this.playerStreak >= 2 ? 100 : 0);
      pointsGained = basePts + speedBonus + streakBonus;
      this.playerScore += pointsGained;

      this.soundFX.playCorrect();
      if (this.playerStreak >= 3) {
        setTimeout(() => this.soundFX.playStreak(), 260);
      }
      if (this.mascot) this.mascot.celebrate();
      this.app.setSpeechBubble('ナイス！ 超ハイスピード！⚡');
    } else {
      this.playerStreak = 0;
      this.soundFX.playWrong();
      if (this.mascot) this.mascot.oops();
      this.app.setSpeechBubble('あちゃ〜！ つぎで挽回だ！');
    }

    // スコア更新
    const scoreEl = document.getElementById('arena-score');
    if (scoreEl) scoreEl.textContent = `${this.playerScore.toLocaleString()} pts`;

    // ラウンド結果オーバーレイを表示
    setTimeout(() => {
      this.showRoundResult(isCorrect, pointsGained, speedBonus, streakBonus, q);
    }, 700);
  }

  handleTimeUp() {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    this.simulateRivalsAnswer(q);

    this.kahootButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answerIndex) {
        btn.classList.add('correct-highlight');
      } else {
        btn.classList.add('dimmed');
      }
    });

    this.playerStreak = 0;
    this.soundFX.playTimeUp();
    if (this.mascot) this.mascot.oops();
    this.app.setSpeechBubble('じかんぎれ！ つぎは急ごう！⏱️');

    setTimeout(() => {
      this.showRoundResult(false, 0, 0, 0, q, true);
    }, 700);
  }

  simulateRivalsAnswer(q) {
    this.rivals.forEach((r) => {
      // 70%〜85%の確率で正解
      const correctProb = 0.75 + Math.random() * 0.15;
      const rivalCorrect = Math.random() < correctProb;
      if (rivalCorrect) {
        const timeSpent = 2 + Math.random() * 11;
        const remain = Math.max(0, this.totalTime - timeSpent);
        const base = 500;
        const spd = Math.round(500 * (remain / this.totalTime));
        r.score += (base + spd);
      }
    });
  }

  showRoundResult(isCorrect, pts, speedBonus, streakBonus, q, isTimeUp = false) {
    const overlay = document.getElementById('round-overlay');
    const iconEl = document.getElementById('round-icon');
    const titleEl = document.getElementById('round-title');
    const ptsEl = document.getElementById('round-pts');
    const tagSpeed = document.getElementById('tag-speed');
    const tagStreak = document.getElementById('tag-streak');
    const explainEl = document.getElementById('round-explain');

    if (!overlay) return;

    if (isCorrect) {
      iconEl.textContent = '⭕️';
      titleEl.textContent = 'せいかい！ かんぺき！';
      titleEl.style.color = '#10b981';
      ptsEl.textContent = `+${pts.toLocaleString()} pts`;
      ptsEl.style.display = 'block';

      if (tagSpeed) {
        tagSpeed.style.display = (speedBonus > 200) ? 'inline-block' : 'none';
        tagSpeed.textContent = `⚡ スピードボーナス +${speedBonus}`;
      }

      if (tagStreak) {
        tagStreak.style.display = (streakBonus > 0) ? 'inline-block' : 'none';
        tagStreak.textContent = `🔥 連続正解ボーナス +${streakBonus}`;
      }
    } else {
      iconEl.textContent = isTimeUp ? '⏰' : '❌';
      titleEl.textContent = isTimeUp ? 'タイムアップ！ 時間切れ' : 'おしい！ 不正解';
      titleEl.style.color = '#ef4444';
      ptsEl.style.display = 'none';
      if (tagSpeed) tagSpeed.style.display = 'none';
      if (tagStreak) tagStreak.style.display = 'none';
    }

    const correctAnsText = q.options[q.answerIndex];
    if (explainEl) {
      explainEl.innerHTML = `正解は <b>「${correctAnsText}」</b> です。<br>${q.explanation}`;
    }

    overlay.classList.add('show');
  }

  showLeaderboard() {
    if (this.arenaPanel) this.arenaPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'block';
    this.soundFX.playDrumRoll();

    const players = [
      { name: this.playerName, avatar: '😎', score: this.playerScore, isPlayer: true, prevRank: this.playerPrevRank },
      ...this.rivals.map(r => ({ ...r, isPlayer: false }))
    ];

    players.sort((a, b) => b.score - a.score);

    const listContainer = document.getElementById('leaderboard-list');
    if (listContainer) {
      listContainer.innerHTML = '';

      players.forEach((p, idx) => {
        const currentRank = idx + 1;
        const row = document.createElement('div');
        row.className = `leaderboard-row ${p.isPlayer ? 'is-player' : ''} ${currentRank === 1 ? 'rank-1' : ''}`;

        let changeBadge = '';
        if (p.prevRank > 0) {
          if (p.prevRank > currentRank) {
            changeBadge = `<span class="lb-change up">▲ ${p.prevRank - currentRank} UP</span>`;
          } else if (p.prevRank < currentRank) {
            changeBadge = `<span class="lb-change same">▼</span>`;
          } else {
            changeBadge = `<span class="lb-change same">-</span>`;
          }
        }

        if (p.isPlayer) {
          this.playerPrevRank = currentRank;
        } else {
          const rivalObj = this.rivals.find(r => r.name === p.name);
          if (rivalObj) rivalObj.prevRank = currentRank;
        }

        row.innerHTML = `
          <div class="lb-left">
            <span class="lb-rank">#${currentRank}</span>
            <span class="lb-avatar">${p.avatar}</span>
            <span class="lb-name">${p.name} ${p.isPlayer ? '(あなた)' : ''}</span>
          </div>
          <div class="lb-right">
            ${changeBadge}
            <span class="lb-score">${p.score.toLocaleString()} pts</span>
          </div>
        `;
        listContainer.appendChild(row);
      });
    }

    const isLast = (this.currentIndex + 1 >= this.questions.length);
    if (this.btnLbNext) {
      this.btnLbNext.textContent = isLast ? '🏆 最終結果（表彰台）をみる ➔' : 'つぎの問題へ進む ➔';
    }
  }

  showPodium() {
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'block';

    const players = [
      { name: this.playerName, avatar: '😎', score: this.playerScore, isPlayer: true },
      ...this.rivals.map(r => ({ ...r, isPlayer: false }))
    ];
    players.sort((a, b) => b.score - a.score);

    const first = players[0];
    const second = players[1];
    const third = players[2];

    const av1 = document.getElementById('podium-avatar-1');
    const nm1 = document.getElementById('podium-name-1');
    const sc1 = document.getElementById('podium-score-1');
    if (av1) av1.textContent = first.avatar;
    if (nm1) nm1.textContent = `${first.name}${first.isPlayer ? ' (あなた)' : ''}`;
    if (sc1) sc1.textContent = `${first.score.toLocaleString()} pts`;

    const av2 = document.getElementById('podium-avatar-2');
    const nm2 = document.getElementById('podium-name-2');
    const sc2 = document.getElementById('podium-score-2');
    if (av2) av2.textContent = second.avatar;
    if (nm2) nm2.textContent = `${second.name}${second.isPlayer ? ' (あなた)' : ''}`;
    if (sc2) sc2.textContent = `${second.score.toLocaleString()} pts`;

    const av3 = document.getElementById('podium-avatar-3');
    const nm3 = document.getElementById('podium-name-3');
    const sc3 = document.getElementById('podium-score-3');
    if (av3) av3.textContent = third.avatar;
    if (nm3) nm3.textContent = `${third.name}${third.isPlayer ? ' (あなた)' : ''}`;
    if (sc3) sc3.textContent = `${third.score.toLocaleString()} pts`;

    this.soundFX.playCheer();

    // プレイヤーが表彰台（1〜3位）に入っている場合
    if (players.slice(0, 3).some(p => p.isPlayer)) {
      if (window.confetti) {
        window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        setTimeout(() => {
          window.confetti({ particleCount: 100, angle: 60, spread: 60, origin: { x: 0 } });
          window.confetti({ particleCount: 100, angle: 120, spread: 60, origin: { x: 1 } });
        }, 500);
      }
      if (this.mascot) this.mascot.celebrate();
      this.app.setSpeechBubble('表彰台おめでとう！ キミがチャンピオンだ！👑');
    }
  }
}

// ==========================================================================
// 5. アプリケーション本体・制御ロジック
// ==========================================================================
class StudyApp {
  constructor() {
    this.currentGrade = 1;
    this.currentSubject = 'japanese';
    this.currentMode = 'digital'; // 'digital' or 'print'

    this.soundFX = new SoundFX();
    this.mascot = null;

    // クイズ状態
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    // 科目名マッピング
    this.subjectNames = {
      japanese: '国語（こくご）',
      math: '算数（さんすう）',
      science: '理科（りか）',
      social: '社会（しゃかい）',
      english: '英語（えいご）'
    };

    this.initDOM();
    this.initMascot();
    this.game = new KahootBattleGame(this);
    this.loadQuiz();
    this.updateWorksheetPreview();
  }

  initDOM() {
    // 学年選択
    this.gradeSelect = document.getElementById('grade-select');
    this.gradeSelect.addEventListener('change', (e) => {
      this.currentGrade = parseInt(e.target.value, 10);
      this.soundFX.playClick();
      this.onGradeChanged();
    });

    // モード切替タブ
    this.tabDigital = document.getElementById('tab-digital');
    this.tabGame = document.getElementById('tab-game');
    this.tabPrint = document.getElementById('tab-print');
    this.digitalView = document.getElementById('digital-view');
    this.gameView = document.getElementById('game-view');
    this.printView = document.getElementById('print-view');

    this.tabDigital.addEventListener('click', () => this.switchMode('digital'));
    if (this.tabGame) {
      this.tabGame.addEventListener('click', () => this.switchMode('game'));
    }
    this.tabPrint.addEventListener('click', () => this.switchMode('print'));

    // サウンドトグル
    this.btnSound = document.getElementById('btn-sound');
    this.btnSound.addEventListener('click', () => {
      const enabled = this.soundFX.toggle();
      this.btnSound.textContent = enabled ? '🔊' : '🔇';
      this.btnSound.title = enabled ? 'おと：ON' : 'おと：OFF';
    });

    // 科目選択カード
    this.subjectCards = document.querySelectorAll('.subject-card');
    this.subjectCards.forEach(card => {
      card.addEventListener('click', () => {
        const subj = card.dataset.subject;
        this.selectSubject(subj);
      });
    });

    // クイズ操作
    this.btnNext = document.getElementById('btn-next');
    this.btnNext.addEventListener('click', () => {
      this.soundFX.playClick();
      this.nextQuestion();
    });

    this.btnRetry = document.getElementById('btn-retry');
    this.btnRetry.addEventListener('click', () => {
      this.soundFX.playClick();
      this.loadQuiz();
    });

    this.btnGoPrint = document.getElementById('btn-go-print');
    this.btnGoPrint.addEventListener('click', () => {
      this.switchMode('print');
    });

    // プリントモード操作
    this.printQCount = document.getElementById('print-q-count');
    this.printQCount.addEventListener('change', () => this.updateWorksheetPreview());

    this.printIncludeAnswer = document.getElementById('print-include-answer');
    this.printIncludeAnswer.addEventListener('change', () => this.updateWorksheetPreview());

    this.btnDoPrint = document.getElementById('btn-do-print');
    this.btnDoPrint.addEventListener('click', () => {
      window.print();
    });

    this.btnShufflePrint = document.getElementById('btn-shuffle-print');
    this.btnShufflePrint.addEventListener('click', () => {
      this.soundFX.playClick();
      this.updateWorksheetPreview();
    });
  }

  initMascot() {
    const canvas = document.getElementById('three-canvas');
    if (canvas) {
      this.mascot = new MascotStage(canvas);
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.soundFX.playClick();

    if (this.tabDigital) this.tabDigital.classList.remove('active');
    if (this.tabGame) this.tabGame.classList.remove('active');
    if (this.tabPrint) this.tabPrint.classList.remove('active');

    if (this.digitalView) this.digitalView.style.display = 'none';
    if (this.gameView) {
      this.gameView.classList.remove('show');
      this.gameView.style.display = 'none';
    }
    if (this.printView) {
      this.printView.classList.remove('show');
      this.printView.style.display = 'none';
    }

    if (mode === 'digital') {
      if (this.tabDigital) this.tabDigital.classList.add('active');
      if (this.digitalView) this.digitalView.style.display = 'grid';
    } else if (mode === 'game') {
      if (this.tabGame) this.tabGame.classList.add('active');
      if (this.gameView) {
        this.gameView.classList.add('show');
        this.gameView.style.display = 'block';
      }
      if (this.game) this.game.showLobby();
    } else {
      if (this.tabPrint) this.tabPrint.classList.add('active');
      if (this.printView) {
        this.printView.classList.add('show');
        this.printView.style.display = 'block';
      }
      this.updateWorksheetPreview();
    }
  }

  selectSubject(subj) {
    if (this.currentSubject === subj) return;
    this.currentSubject = subj;
    this.soundFX.playClick();

    this.subjectCards.forEach(c => {
      if (c.dataset.subject === subj) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    if (this.mascot) {
      this.mascot.setSubjectDecorations(subj);
    }

    this.loadQuiz();
    this.updateWorksheetPreview();
    if (this.game) this.game.onConfigChanged();
  }

  onGradeChanged() {
    this.loadQuiz();
    this.updateWorksheetPreview();
    if (this.game) this.game.onConfigChanged();
  }

  loadQuiz() {
    // 該当学年・科目の問題を取得
    const gradeData = QUESTION_DATABASE[this.currentGrade];
    const rawList = (gradeData && gradeData[this.currentSubject]) ? gradeData[this.currentSubject] : [];
    
    // シャッフル
    this.questions = [...rawList].sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    // UI初期化
    document.getElementById('quiz-play-area').style.display = 'block';
    document.getElementById('result-card').classList.remove('show');
    document.getElementById('stat-solved').textContent = '0';
    document.getElementById('stat-grade').textContent = `${this.currentGrade}年生`;

    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    this.answered = false;
    const q = this.questions[this.currentIndex];
    const total = this.questions.length;

    // バッジ
    document.getElementById('quiz-grade-badge').textContent = `小学${this.currentGrade}年生 • ${this.subjectNames[this.currentSubject]}`;
    document.getElementById('quiz-progress').textContent = `${this.currentIndex + 1} / ${total}問`;
    document.getElementById('quiz-score').textContent = `⭐ ${this.score}`;

    // プログレスバー
    const pct = ((this.currentIndex) / total) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    // 吹き出しリセット
    this.setSpeechBubble('いっしょに かんがえよう！');

    // 問題文
    document.getElementById('question-num-tag').textContent = `第 ${this.currentIndex + 1} 問`;
    document.getElementById('question-text').textContent = q.question;

    // 選択肢ボタン
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    const keys = ['ア', 'イ', 'ウ', 'エ'];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-key">${keys[idx]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => this.handleAnswer(idx, btn));
      optionsGrid.appendChild(btn);
    });

    // フィードバック非表示
    const fb = document.getElementById('feedback-box');
    fb.className = 'feedback-box';
    this.btnNext.style.display = 'none';
  }

  handleAnswer(selectedIdx, btnElement) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = (selectedIdx === q.answerIndex);

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.answerIndex) {
        b.classList.add('correct');
      } else if (idx === selectedIdx) {
        b.classList.add('incorrect');
      }
    });

    const fb = document.getElementById('feedback-box');
    const fbTitle = document.getElementById('feedback-title');
    const fbDesc = document.getElementById('feedback-desc');

    if (isCorrect) {
      this.score += 20;
      this.soundFX.playCorrect();
      if (this.mascot) this.mascot.celebrate();
      this.setSpeechBubble('やったね！ だいせいかい！🎉');

      fb.className = 'feedback-box correct show';
      fbTitle.innerHTML = '⭕️ <b>だいせいかい！ すごいね！</b>';
      fbDesc.textContent = q.explanation;
    } else {
      this.soundFX.playWrong();
      if (this.mascot) this.mascot.oops();
      this.setSpeechBubble('おしい！ つぎは がんばろう！💪');

      fb.className = 'feedback-box incorrect show';
      fbTitle.innerHTML = '❌ <b>おしい！ もうちょっと！</b>';
      fbDesc.textContent = `正解は「${q.options[q.answerIndex]}」です。${q.explanation}`;
    }

    document.getElementById('stat-solved').textContent = `${this.currentIndex + 1}`;
    document.getElementById('quiz-score').textContent = `⭐ ${this.score}`;

    this.btnNext.style.display = 'inline-flex';
    this.btnNext.textContent = (this.currentIndex + 1 < this.questions.length) ? 'つぎのもんだいへ ➔' : 'けっかをみる ➔';
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.renderCurrentQuestion();
    } else {
      this.showResult();
    }
  }

  showResult() {
    document.getElementById('quiz-play-area').style.display = 'none';
    const resultCard = document.getElementById('result-card');
    resultCard.classList.add('show');

    const total = this.questions.length;
    const maxScore = total * 20;
    const isPerfect = (this.score === maxScore);

    this.soundFX.playComplete();

    if (isPerfect && window.confetti) {
      window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      this.setSpeechBubble('まんてん！ てんさいだね！🏆✨');
    } else {
      this.setSpeechBubble('よくがんばったね！ はなまる！💮');
    }

    document.getElementById('result-score-val').textContent = `${this.score}点`;
    document.getElementById('result-total-val').textContent = `${maxScore}点`;

    const titleEl = document.getElementById('result-title');
    const msgEl = document.getElementById('result-message');

    if (isPerfect) {
      titleEl.textContent = '🎊 まんてん！ おめでとう！ 🎊';
      msgEl.textContent = '全問正解！キミはまさに学習マスターだ！この調子でどんどん進もう！';
    } else if (this.score >= maxScore * 0.6) {
      titleEl.textContent = '🌟 たいへん よくできました！ 🌟';
      msgEl.textContent = 'すばらしい集中力！まちがえたところを復習するともっとレベルアップできるよ！';
    } else {
      titleEl.textContent = '🌱 ナイスファイト！ つぎはもっとできる！ 🌱';
      msgEl.textContent = 'あきらめずに挑戦してえらい！プリントでもう一度おさらいしてみよう！';
    }
  }

  setSpeechBubble(text) {
    const bubble = document.getElementById('speech-bubble');
    if (bubble) bubble.textContent = text;
  }

  // ==========================================================================
  // 5. プリント自動生成ロジック (A4学習プリント・解答解説シート)
  // ==========================================================================
  updateWorksheetPreview() {
    const container = document.getElementById('worksheet-container');
    if (!container) return;

    const gradeData = QUESTION_DATABASE[this.currentGrade];
    const rawList = (gradeData && gradeData[this.currentSubject]) ? gradeData[this.currentSubject] : [];
    
    // 問題数制限
    const countSelect = parseInt(this.printQCount.value, 10);
    const selectedQuestions = [...rawList].sort(() => Math.random() - 0.5).slice(0, countSelect);

    const includeAnswer = this.printIncludeAnswer.checked;
    const subjectName = this.subjectNames[this.currentSubject];

    let html = '';

    // --- 1ページ目: 問題プリントシート ---
    html += `
      <div class="a4-sheet ws-question-sheet">
        <div class="ws-header">
          <div class="ws-top-row">
            <div class="ws-title-group">
              <h2>小学${this.currentGrade}年生 【${subjectName}】 まなびプリント</h2>
              <div class="ws-subtitle">わくわくスタディパーク 自習＆力だめしプリント（全${selectedQuestions.length}問）</div>
            </div>
            <div class="ws-score-box">
              <div class="ws-score-title">とくてん</div>
              <div class="ws-score-val">/ 100</div>
            </div>
          </div>
          <div class="ws-user-info-row">
            <div class="ws-info-field">
              <span>ひづけ：</span><span class="ws-line">　月　日</span>
            </div>
            <div class="ws-info-field">
              <span>${this.currentGrade}年</span><span class="ws-line" style="min-width:40px;">　組</span>
            </div>
            <div class="ws-info-field">
              <span>なまえ：</span><span class="ws-line name-line"></span>
            </div>
          </div>
        </div>

        <div class="ws-questions">
    `;

    const keys = ['ア', 'イ', 'ウ', 'エ'];
    selectedQuestions.forEach((q, idx) => {
      html += `
        <div class="ws-q-item">
          <div class="ws-q-head">
            <span class="ws-q-num">${idx + 1}</span>
            <span>${q.question}</span>
          </div>
          <div class="ws-q-body">
            <div class="ws-choices-box">
              ${q.options.map((opt, i) => `<span class="ws-choice-item"><b>[${keys[i]}]</b> ${opt}</span>`).join('')}
            </div>
            <div class="ws-answer-area">
              <span>【 こたえ 】</span>
              <div class="ws-answer-box"></div>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    // --- 2ページ目: 答えとかいせつシート（オプション） ---
    if (includeAnswer) {
      html += `
        <div class="a4-sheet ws-answer-sheet">
          <div class="ws-header">
            <div class="ws-top-row">
              <div class="ws-title-group">
                <h2>【こたえ と かいせつ】小学${this.currentGrade}年生 ${subjectName}</h2>
                <div class="ws-subtitle">おうちの方・先生用 まるつけ＆サポートシート</div>
              </div>
            </div>
          </div>

          <div class="ws-questions">
      `;

      selectedQuestions.forEach((q, idx) => {
        const correctKey = keys[q.answerIndex];
        const correctText = q.options[q.answerIndex];

        html += `
          <div class="ws-q-item ws-ans-item">
            <div class="ws-q-head">
              <span class="ws-q-num">${idx + 1}</span>
              <span>${q.question}</span>
            </div>
            <div class="ws-q-body">
              <div class="ws-ans-correct">
                <span>正解：<b>[ ${correctKey} ]　${correctText}</b></span>
              </div>
              <div class="ws-ans-explain">
                💡 <b>ワンポイント解説：</b>${q.explanation}
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }
}

// 起動
document.addEventListener('DOMContentLoaded', () => {
  window.app = new StudyApp();
});
