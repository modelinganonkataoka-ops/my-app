/**
 * わくわくスタディパーク - 先生モード管理モジュール (teacher_manager.js)
 * 先生自身による問題作成、編集、削除、JSON/CSVインポート・エクスポート
 */

class TeacherManager {
  constructor(app) {
    this.app = app;
    this.storageKey = 'wakuwaku_custom_questions_v2';
    this.customQuestions = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load custom questions from localStorage:', e);
    }
    return [];
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.customQuestions));
    } catch (e) {
      console.error('Failed to save custom questions to localStorage:', e);
    }
  }

  /**
   * 指定した学年・科目の全問題（ビルトイン問題 ＋ 先生の自作・AI追加問題）を取得
   */
  getMergedQuestions(grade, subject) {
    const g = parseInt(grade, 10);
    const baseList = (typeof QUESTION_DATABASE !== 'undefined' && QUESTION_DATABASE[g] && QUESTION_DATABASE[g][subject])
      ? [...QUESTION_DATABASE[g][subject]]
      : [];

    const customList = this.customQuestions.filter(q => parseInt(q.grade, 10) === g && q.subject === subject);
    return [...baseList, ...customList];
  }

  /**
   * 先生の自作問題を追加
   */
  addQuestion(qData) {
    const newQ = {
      id: 'q_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      grade: parseInt(qData.grade, 10),
      subject: qData.subject,
      question: qData.question.trim(),
      options: qData.options.map(o => o.trim()),
      answerIndex: parseInt(qData.answerIndex, 10) || 0,
      explanation: (qData.explanation || '').trim(),
      printAnswer: (qData.printAnswer || qData.options[qData.answerIndex || 0] || '').trim(),
      author: qData.author || 'teacher',
      createdAt: new Date().toISOString()
    };

    this.customQuestions.push(newQ);
    this.saveToStorage();
    return newQ;
  }

  /**
   * 問題の更新
   */
  updateQuestion(id, updatedData) {
    const idx = this.customQuestions.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.customQuestions[idx] = {
        ...this.customQuestions[idx],
        ...updatedData,
        grade: parseInt(updatedData.grade, 10),
        answerIndex: parseInt(updatedData.answerIndex, 10)
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * 問題の削除
   */
  deleteQuestion(id) {
    const beforeLen = this.customQuestions.length;
    this.customQuestions = this.customQuestions.filter(q => q.id !== id);
    if (this.customQuestions.length !== beforeLen) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * 自作問題を全リセット
   */
  clearAllCustomQuestions() {
    this.customQuestions = [];
    this.saveToStorage();
  }

  // --------------------------------------------------------------------------
  // エクスポート機能 (JSON / CSV)
  // --------------------------------------------------------------------------

  /**
   * JSONファイルとしてダウンロード
   */
  exportToJSON(onlyCustom = false) {
    let dataToExport = [];
    if (onlyCustom) {
      dataToExport = this.customQuestions;
    } else {
      // 全問題（ビルトイン＋自作）をエクスポート
      for (let g = 1; g <= 6; g++) {
        for (const sub of ['japanese', 'math', 'science', 'social', 'english']) {
          const merged = this.getMergedQuestions(g, sub);
          merged.forEach(q => {
            dataToExport.push({
              grade: g,
              subject: sub,
              question: q.question,
              options: q.options,
              answerIndex: q.answerIndex,
              explanation: q.explanation,
              printAnswer: q.printAnswer,
              author: q.author || (q.isAIGenerated ? 'ai' : 'standard')
            });
          });
        }
      }
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    this.triggerDownload(blob, `wakuwaku_study_questions_${Date.now()}.json`);
  }

  /**
   * Excel対応 CSVファイルとしてダウンロード（UTF-8 with BOM）
   */
  exportToCSV(onlyCustom = false) {
    let list = [];
    if (onlyCustom) {
      list = this.customQuestions;
    } else {
      for (let g = 1; g <= 6; g++) {
        for (const sub of ['japanese', 'math', 'science', 'social', 'english']) {
          const merged = this.getMergedQuestions(g, sub);
          merged.forEach(q => {
            list.push({
              grade: g,
              subject: sub,
              question: q.question,
              opt0: q.options[0] || '',
              opt1: q.options[1] || '',
              opt2: q.options[2] || '',
              opt3: q.options[3] || '',
              answerIndex: q.answerIndex,
              explanation: q.explanation || '',
              printAnswer: q.printAnswer || ''
            });
          });
        }
      }
    }

    const headers = ['学年', '科目', '問題文', '選択肢1(ア)', '選択肢2(イ)', '選択肢3(ウ)', '選択肢4(エ)', '正解番号(0〜3)', '解説', 'プリント用解答'];
    const rows = [headers.join(',')];

    list.forEach(q => {
      const escape = text => `"${String(text || '').replace(/"/g, '""')}"`;
      rows.push([
        q.grade,
        escape(q.subject),
        escape(q.question),
        escape(q.opt0),
        escape(q.opt1),
        escape(q.opt2),
        escape(q.opt3),
        q.answerIndex,
        escape(q.explanation),
        escape(q.printAnswer)
      ].join(','));
    });

    // UTF-8 BOM (\uFEFF) を付与してExcelで文字化けしないようにする
    const csvContent = '\uFEFF' + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.triggerDownload(blob, `wakuwaku_study_questions_${Date.now()}.csv`);
  }

  /**
   * 先生用CSVひな形（テンプレート）をダウンロード
   */
  downloadCSVTemplate() {
    const headers = ['学年', '科目', '問題文', '選択肢1(ア)', '選択肢2(イ)', '選択肢3(ウ)', '選択肢4(エ)', '正解番号(0〜3)', '解説', 'プリント用解答'];
    const sampleRow = [
      '3',
      'math',
      '「15 ÷ 3」の答えはいくつかな？',
      '5',
      '3',
      '4',
      '6',
      '0',
      '3 × 5 ＝ 15 なので、答えは 5 です。',
      '5'
    ];
    const sampleRow2 = [
      '4',
      'japanese',
      '「猿も木から（　）」入る言葉はどれ？',
      '落ちる',
      '登る',
      '飛ぶ',
      '走る',
      '0',
      'ことわざ「猿も木から落ちる」は、名人でも失敗することがあるという意味です。',
      '落ちる'
    ];

    const escape = text => `"${String(text).replace(/"/g, '""')}"`;
    const rows = [
      headers.join(','),
      sampleRow.map(escape).join(','),
      sampleRow2.map(escape).join(',')
    ];

    const csvContent = '\uFEFF' + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.triggerDownload(blob, `wakuwaku_question_template.csv`);
  }

  triggerDownload(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  // --------------------------------------------------------------------------
  // インポート機能 (JSON / CSV パース)
  // --------------------------------------------------------------------------

  importFromJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!Array.isArray(data)) {
        throw new Error('JSONデータが配列ではありません。');
      }

      let count = 0;
      data.forEach(item => {
        if (item.question && item.options && item.options.length >= 2) {
          this.addQuestion({
            grade: item.grade || this.app.currentGrade,
            subject: item.subject || this.app.currentSubject,
            question: item.question,
            options: item.options.length >= 4 ? item.options.slice(0, 4) : [...item.options, '選択肢3', '選択肢4'].slice(0, 4),
            answerIndex: item.answerIndex !== undefined ? item.answerIndex : 0,
            explanation: item.explanation || '',
            printAnswer: item.printAnswer || item.options[item.answerIndex || 0],
            author: item.author || 'teacher'
          });
          count++;
        }
      });
      return count;
    } catch (e) {
      console.error('JSON import error:', e);
      throw new Error('JSONの読み込みに失敗しました: ' + e.message);
    }
  }

  importFromCSV(csvText) {
    try {
      // BOM除去
      const cleanText = csvText.replace(/^\uFEFF/, '');
      const lines = cleanText.split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length <= 1) {
        throw new Error('データ行が見つかりません。');
      }

      // 簡易CSVパーサー（引用符・カンマ対応）
      const parseCSVLine = text => {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (c === '"') {
            if (inQuotes && text[i + 1] === '"') {
              cur += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (c === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
          } else {
            cur += c;
          }
        }
        result.push(cur.trim());
        return result;
      };

      let count = 0;
      // 1行目はヘッダーと仮定
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVLine(lines[i]);
        if (cols.length >= 7) {
          const grade = parseInt(cols[0], 10) || this.app.currentGrade;
          const subject = cols[1] || this.app.currentSubject;
          const question = cols[2];
          const opt0 = cols[3];
          const opt1 = cols[4];
          const opt2 = cols[5] || '選択肢3';
          const opt3 = cols[6] || '選択肢4';
          const ansIdx = parseInt(cols[7], 10) || 0;
          const exp = cols[8] || '';
          const pAns = cols[9] || opt0;

          if (question && opt0) {
            this.addQuestion({
              grade,
              subject,
              question,
              options: [opt0, opt1, opt2, opt3],
              answerIndex: ansIdx,
              explanation: exp,
              printAnswer: pAns,
              author: 'teacher'
            });
            count++;
          }
        }
      }
      return count;
    } catch (e) {
      console.error('CSV import error:', e);
      throw new Error('CSVの読み込みに失敗しました: ' + e.message);
    }
  }
}

window.TeacherManager = TeacherManager;


if (typeof module !== 'undefined' && module.exports) {
  module.exports = TeacherManager;
}
