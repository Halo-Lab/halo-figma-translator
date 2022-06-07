import * as React from 'react';
import './styles/ui.css';
import styles from './styles/main.module.css';

import Select from './components/Select/Select';
import Icons from './components/Icons/Icons';

declare function require(path: string): any;

var TimeoutID;

const App = ({}) => {
    const [active, setActive] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [source, setSource] = React.useState(null);
    const [target, setTarget] = React.useState(null);

    const ref = React.useRef(null);

    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type} = event.data.pluginMessage;
            if (type === 'check-selection') {
                const {status} = event.data.pluginMessage;
                setActive(status);
            }

            if (type === 'get-translate') {
                const {texts} = event.data.pluginMessage;
                var xhr = new XMLHttpRequest();
                xhr.open(
                    'POST',
                    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${source}&to=${target}`,
                    true
                );
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Ocp-Apim-Subscription-Key', process.env.KEY);
                xhr.setRequestHeader('Ocp-Apim-Subscription-Region', process.env.REGION);
                xhr.onload = function () {
                    try {
                        const data = JSON.parse(this.responseText);
                        parent.postMessage(
                            {
                                pluginMessage: {
                                    type: 'update-text',
                                    data,
                                },
                            },
                            '*'
                        );
                    } catch (error) {
                        setLoading(false);
                        btnStates('error');
                    }
                };
                xhr.send(JSON.stringify(texts));
            }

            if (type === 'done') {
                setLoading(false);
                btnStates('done');
            }
        };
    }, [source, target]);

    const onTranslate = () => {
        if (!loading) {
            setLoading(true);
            parent.postMessage(
                {
                    pluginMessage: {
                        type: 'get-text',
                    },
                },
                '*'
            );
        }
    };

    const btnText = !active ? 'Выберите элемент' : loading ? 'Перевожу...' : 'Перевести';

    const btnStates = (state: string = '') => {
        if (!ref.current) {
            return;
        }

        const el = ref.current;
        switch (state) {
            case 'done':
                el.textContent = 'Готово!';
                el.style.cssText = `
                    color: var(--color-white);
                    background: var(--color-done);
                    border-color: var(--color-done);
                `;
                break;

            case 'error':
                el.textContent = 'Ошибка :(';
                el.style.cssText = `
                    color: var(--color-white);
                    background: var(--color-error);
                    border-color: var(--color-error);
                `;
                break;

            default:
                el.textContent = btnText;
                el.style.cssText = `
                    color: inherit;
                    background: inherit;
                    border-color: inherit;
                `;
        }

        if (state !== '') {
            clearTimeout(TimeoutID);
            TimeoutID = setTimeout(() => {
                btnStates();
            }, 2000);
        }
    };

    return (
        <div className={styles.content}>
            <Select
                data={[
                    {key: 'uk', name: 'Українська'},
                    {key: 'ru', name: 'Русский'},
                ]}
                onSelected={(item) => {
                    setSource(item.key);
                }}
            />
            <div className={styles.separator}>
                <Icons icon="transfer" />
            </div>
            <Select
                data={[{key: 'en', name: 'English'}]}
                onSelected={(item) => {
                    setTarget(item.key);
                }}
            />
            <button
                ref={ref}
                className={`${styles.btn} ${loading ? styles.btn__active : ''}`}
                onClick={() => onTranslate()}
                disabled={!active}
            >
                {btnText}
            </button>
        </div>
    );
};

export default App;
