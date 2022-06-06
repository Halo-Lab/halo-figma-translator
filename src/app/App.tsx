import * as React from 'react';
import './styles/ui.css';
import styles from './styles/main.module.css';

import Select from './components/Select/Select';
import Icons from './components/Icons/Icons';

declare function require(path: string): any;

const App = ({}) => {
    const [loading, setLoading] = React.useState(false);
    const [source, setSource] = React.useState(null);
    const [target, setTarget] = React.useState(null);

    const onTest = () => {
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

    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, texts} = event.data.pluginMessage;
            if (type === 'get-translate') {
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
                    }
                };
                xhr.send(JSON.stringify(texts));
            }

            if (type === 'done') {
                setLoading(false);
            }
        };
    }, [source, target]);

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
            <button className={`${styles.btn} ${loading ? styles.btn__active : ''}`} onClick={() => onTest()}>
                {loading ? 'Перевожу...' : 'Перевести'}
            </button>
        </div>
    );
};

export default App;
