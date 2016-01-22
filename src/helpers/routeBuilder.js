import React from 'react';

import { Route } from 'react-router';

import * as system from '../system';

//import * as actions from '../actions';

function test(level, route) {
  return function(a, b, c) {
    let back = null;

    if (a && a.location && a.location.pathname) {
      back = a.location.pathname;
    }

    const state = system.store.getState();
    if (state.auth.authenticated) {
      c();
    } else {
      c(b(null, '/login', {
        back
      }));
    }
  //c();
  }
}

function routeBuilder(routes) {
  return routes.reduce(function(a, b) {
    if (b.hasOwnProperty('children')) {
      if (b.path && b.component) {
        a.push(<Route key={ b.path } component={ b.component }>
                 { routeBuilder(b.children) }
               </Route>);
      } else {
        a = a.concat(
          routeBuilder(b.children)
        );
      }
    } else {
      const {component, path, free} = b;
      const props = {
        component,
        path
      };

      if (!free) {
        props.onEnter = test('user', b);
      }

      a.push(<Route key={ path } {...props} />);
    }
    return a;
  }, []);
}


export default routeBuilder;