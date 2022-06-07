var ELEMS = [];
var TEXTS = [];

figma.showUI(__html__, {width: 300, height: 215});

figma.on('run', () => {
    checkSelection();
});

figma.on('selectionchange', () => {
    checkSelection();
});

figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-text') {
        const {selection} = figma.currentPage;

        if (selection) {
            ELEMS = [];
            TEXTS = [];

            selection.forEach((node) => {
                const elem: any = node;
                const {type} = node;

                if (type !== 'TEXT') {
                    const textElems = elem.findAll((n) => n.type === 'TEXT');
                    if (textElems) {
                        ELEMS = [...ELEMS, ...textElems];
                    }
                } else {
                    ELEMS = [...ELEMS, node];
                }
            });

            ELEMS.forEach((elem) => {
                TEXTS.push({Text: elem.characters});
            });

            figma.ui.postMessage({type: 'get-translate', texts: TEXTS});
        } else {
            figma.ui.postMessage({type: 'done'});
        }
    }

    if (msg.type === 'update-text') {
        const {data} = msg;

        ELEMS.forEach((elem, index) => {
            const translate = data[index].translations[0].text;
            figma.loadFontAsync(elem.fontName).then(() => {
                elem.characters = translate;
            });
        });

        figma.ui.postMessage({type: 'done'});
    }

    // figma.closePlugin();
};

function checkSelection() {
    const {selection} = figma.currentPage;
    figma.ui.postMessage({
        type: 'check-selection',
        status: typeof selection !== 'undefined' && selection.length > 0,
    });
}
