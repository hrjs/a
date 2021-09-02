(async () => {
    const sqhfo4 = 'sqhfo4'.split('').map(v => v.charCodeAt() - 1).map(v => String.fromCharCode(v)).join('');
    const {importAll, getScript} = await import(`https://${sqhfo4}.github.io/mylib/export/import.mjs`);
    await getScript('https://code.jquery.com/jquery-3.6.0.js');
    getScript('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js');
    const $ = window.$;
    const html = $('body').empty().css({
        'text-align': 'center',
        padding: '1em',
        'user-select': 'none'
    });
    const head = $('<div>').appendTo(html),
          body = $('<div>').appendTo(html),
          foot = $('<div>').appendTo(html);
    const _ = await importAll([
        'input',
        'css'
    ].map(v => `https://${sqhfo4}.github.io/mylib/export/${v}.mjs`));
    const {set, get} = await import(`https://${sqhfo4}.github.io/midi/export/${sqhfo4.slice(0,-1)}.mjs`);
    const {addTab} = await import('https://hrjs.github.io/a/mjs/addTab.mjs');
    const g_dqList = {
        '初期座標': 'HERO',
        'BGM': 'BGM',
        '壁紙': 'BGIMG',
        '地面': 'FLOOR',
        '物': 'MAP',
        '人': 'HUMAN',
        '宝箱': 'TBOX',
        '移動地点': 'MPOINT',
        '調べる箇所': 'SPOINT',
        'イベント': 'EPOINT',
    };
    const tabA = $('<div>'),
          tabB = $('<div>').text('output'),
          tabC = $('<div>').text('output');
    addTab(foot,{
        list: {
            'Edit': tabA,
            'Output': tabB,
            'Bookmarklet': tabC,
        }
    });
    _.addInputStr(body,{
        value: get(),
        copy: true
    });
    const addBtn = (ttl, func) => $('<button>').appendTo(body).text(ttl).on('click', func);
    addBtn('clear', () => $('#load').val(''));
    const inputCode = _.addInputStr(body,{
        label: 'load'
    });
    inputCode.elm.on('change', () => analysis(LZString.decompressFromEncodedURIComponent(inputCode().replace(/^L1/,''))));
    let g_dqObj = {};
    const analysis = dqFile => {
        g_dqObj = {};
        for(const k in g_dqList) {
            const key = g_dqList[k],
                  m = dqFile.match(new RegExp('(?<=#' + key + ')(.|\n)*?(?=#END)', 'g'));
            g_dqObj[key] = m ? m.map(v => '#' + key + v + '#END').join('\n\n') : '';
        };
        select.set('HERO');
        select.elm.trigger('change');
    };
    let g_editingKey = '';
    const select = _.addSelect(tabA,{
        label: 'edit',
        list: g_dqList
    });
    select.elm.on('change', () => {
        g_editingKey = select();
        inputEdit.set(g_dqObj[g_editingKey]);
        inputEdit.elm.trigger('change');
    });
    const inputEdit = _.addInputStr(tabA,{
        label: 'edit',
        textarea: true
    });
    inputEdit.elm.on('change', () => {
        g_dqObj[g_editingKey] = inputEdit();
    });
    addBtn('output',() => {
        const result = set(Object.keys(g_dqObj).map(k=>g_dqObj[k]).join('\n\n'));
        _.addInputStr(tabB.empty(),{
            value: result.data,
            copy: true
        });
        _.addInputStr(tabC.empty(),{
            value: result,
            copy: true
        });
    }).css({
        color:'yellow',
        backgroundColor:'red',
        fontSize: '2em',
    });
    body.children().after('<br>');
})();
