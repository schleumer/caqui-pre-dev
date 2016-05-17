import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createStore, combineReducers, applyMiddleware, compose, bindActionCreators} from 'redux';
import {Router, Route, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';

import * as Caqui from '../../../lib/index';

const {
    Components: {
        Page,
        Form,
        TextInput,
        Row,
        Column,
        ModelDump,
        ComboBox,
        ListOfItems,
        DateTime,
        Container,
        FakeTextInput,
        Table,
        Password,
        ValuedTabs
    },
    Helpers: {
        createModel, PagedStore: {pagedRemoteStore}
    }
} = Caqui;

export const reducer = combineReducers(Object.assign({}, {
    routing: routerReducer
}, Caqui.Reducers));

const storeFn = compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(hashHistory))
//, devTools()
//, persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
);

export const store = storeFn(createStore)(reducer);


const githubApi = (query, limit, page) =>
    //`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}`;
    `/example.json`;

const githubApiResponse = (res) => {
    const {data} = res;

    return ({items: data.items, total: data.total_count})
};

class KitchenSink2 extends Component {
    constructor() {
        super();

        this.displayName = 'KitchenSink2';

        this.test1Adapter = pagedRemoteStore(githubApi, githubApiResponse, 30);
    }

    render() {
        const extraCell = (row, index) => {
            return (
                <a href={ `/edit/${row.id}` }>Editar</a>
            );
        };

        return (
            <Row style={{paddingTop: 20}}>
                <Column>
                    <Table adapter={this.test1Adapter}>
                        <Table.Column name={ "Nome" } cell={ <Table.SimpleCell valueKey="name" /> }/>
                        <Table.Column name={ "Nome 2" } cell={ <Table.SimpleCell valueKey="full_name" /> }/>
                        <Table.Column name={ "Controles" } cell={ extraCell }/>
                    </Table>
                </Column>
            </Row>
        );
    }
}

class KitchenSink extends Component {
    constructor() {
        super();

        this.displayName = 'KitchenSink';

        this.test4Adapter = pagedRemoteStore(githubApi, githubApiResponse);
        this.test5Adapter = pagedRemoteStore(githubApi, githubApiResponse);
        this.test6Adapter = pagedRemoteStore(githubApi, githubApiResponse);
        this.test7Adapter = pagedRemoteStore(githubApi, githubApiResponse);
        this.test9Adapter = pagedRemoteStore(githubApi, githubApiResponse);
    }

    render() {
        return (
            <div style={{paddingTop: 20}}>
                <Row>
                    <Column size={ Column.from(4) }>
                        <TextInput name="test_1" label="Campo de Teste 1"/>
                    </Column>
                    <Column size={ Column.from(4) }>
                        <TextInput name="test_2" label="Campo de Teste 2"/>
                    </Column>
                    <Column size={ Column.from(4) }>
                        <TextInput name="test_3" label="Campo de Teste 3"/>
                    </Column>
                </Row>
                <Row>
                    <Column size={ Column.from(4) }>
                        <FakeTextInput name="test_1" label="Campo fake de Teste 1"/>
                    </Column>
                </Row>
                <Row>
                    <Column size={ Column.from(3) }>
                        <ComboBox adapter={ this.test4Adapter } name="test_4" label="Campo de Teste 4"/>
                    </Column>
                    <Column size={ Column.from(3) }>
                        <ComboBox adapter={ this.test5Adapter } name="test_5" label="Campo de Teste 5"/>
                    </Column>
                    <Column size={ Column.from(3) }>
                        <ComboBox adapter={ this.test6Adapter } name="test_6" label="Campo de Teste 6"/>
                    </Column>
                    <Column size={ Column.from(3) }>
                        <ComboBox adapter={ this.test7Adapter } name="test_7" label="Campo de Teste 7"/>
                    </Column>
                </Row>
                <Row>
                    <Column size={ Column.from(4) }>
                        <ListOfItems name="test_8" label="Campo de Teste 8">
                            <TextInput />
                        </ListOfItems>
                    </Column>
                    <Column size={ Column.from(4) }>
                        <ListOfItems name="test_9" itemKey={ _ => _.id } itemLabel={ _ => _.name }
                                     uniqueBy={ _ => _.name } label="Campo de Teste 9">
                            <ComboBox adapter={ this.test9Adapter }/>
                        </ListOfItems>
                    </Column>
                    <Column size={ Column.from(4) }>
                        <ListOfItems name="test_12" itemKey={ _ => _.unix() }
                                     itemLabel={ _ => _.format("L LT") } label="Campo de Teste 12">
                            <DateTime displayFormat="L LT"/>
                        </ListOfItems>
                    </Column>
                </Row>
                <Row>
                    <Column size={ Column.from(4) }>
                        <ListOfItems name="test_13" before={ _ => ({phone: _})} itemLabel={ _ => _.phone }
                                     itemKey={ _ => _.phone } label="Campo de Teste 13">
                            <TextInput />
                        </ListOfItems>
                    </Column>
                </Row>
                <Row>
                    <Column size={ Column.from(4) }>
                        <DateTime name="test_10" displayFormat="L LT" label="Campo de Teste 10"/>
                    </Column>
                    <Column size={ Column.from(4) }>
                        <DateTime name="test_11" displayFormat="L" time={false} label="Campo de Teste 11"/>
                    </Column>
                    <Column size={ Column.from(4) }>
                        <Password name="test_14" label="Campo de Teste 14"/>
                    </Column>
                </Row>
            </div>
        );
    }
}

function select(state) {
    return state;
}

KitchenSink = connect(select)(KitchenSink);
KitchenSink2 = connect(select)(KitchenSink2);

class App extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';

        this.formModel = createModel({
            page: 'page1'
        });

        this.formModel2 = createModel({
            page: 'page1'
        });
    }

    render() {
        return (
            <Container>
                <Page header="Teste de Componentes" icon="home">
                    <Page.Container>
                        <Form model={ this.formModel } name="tests">
                            <ValuedTabs name="page">
                                <KitchenSink id="page1" header="Pagina 1"/>
                                <KitchenSink2 id="page2" header="Pagina 2"/>
                            </ValuedTabs>
                            <Row>
                                <Column>
                                    <ModelDump />
                                </Column>
                            </Row>
                        </Form>
                    </Page.Container>
                </Page>
            </Container>
        );
    }
}

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('app')
);

