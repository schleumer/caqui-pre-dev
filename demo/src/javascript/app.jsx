import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { hashHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as Caqui from '../../../lib/index'
import KitchenSink1 from './kitchenSink1'
import KitchenSink2 from './kitchenSink2'
import KitchenSink3 from './kitchenSink3'
import KitchenSink4 from './kitchenSink4'

const { Components: { Page, Form, Container, ValuedTabs }, Helpers: { createModel } } = Caqui

export const reducer = combineReducers(Object.assign({}, {
  routing: routerReducer
}, Caqui.Reducers))

const storeFn = compose(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(hashHistory))
//, devTools()
//, persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)

export const store = storeFn(createStore)(reducer)

class App extends Component {
  constructor(props) {
    super(props)
    this.displayName = 'App'

    this.formModel = createModel({
      page: 'page4',
      test_checkbox2: true,
      test_tags2: [
        {
          'id': 1,
          'name': 'hehe'
        }
      ]
    })
  }

  render() {
    return (
      <Container>
        <Page
          header="Teste de Componentes"
          icon="home">
          <Page.Container>
            <Form
              model={ this.formModel }
              name="tests">
              <ValuedTabs name="page">
                <KitchenSink4
                  id="page4"
                  header="Pagina 4"/>
                <KitchenSink3
                  id="page3"
                  header="Pagina 3"/>
                <KitchenSink2
                  id="page2"
                  header="Pagina 2"/>
                <KitchenSink1
                  id="page1"
                  header="Pagina 1"/>
              </ValuedTabs>
              {/*<Row>*/}
                {/*<Column>*/}
                  {/*<ModelDump />*/}
                {/*</Column>*/}
              {/*</Row>*/}
            </Form>
          </Page.Container>
        </Page>
      </Container>
    )
  }
}

ReactDOM.render((
    <Provider store={ store }>
      <App />
    </Provider>
  ),
  document.getElementById('app')
)
