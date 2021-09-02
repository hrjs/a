export const addTab = (holder, p) => {
    const ui = $('<div>').appendTo(holder),
          area = $('<div>').appendTo(holder),
          btns = {};
    let activTabName;
    for(const k in p.list){
        btns[k] = $('<button>').appendTo(ui).text(k).click(() => {
            activTabName = k;
            ui.find('button').css('backgroundColor','gray');
            btns[k].css('backgroundColor','yellow');
            area.children().hide();
            p.list[k].show();
            $(window).resize();
        });
        area.append(p.list[k]);
    }
    if(btns[p.value]) btns[p.value].click();
    else holder.find('button').first().click();
    return () => activTabName;
};
