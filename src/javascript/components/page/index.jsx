import React from 'react';

import Icon from '../icon';

import Menu from './menu';
import Container from './container';

import Base from '../base';

class Page extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'Page';
    }

    render() {
        const {icon, header, children} = this.props;

        let iconEl = null;
        let menu = null;
        let body = null;

        if (icon) {
            iconEl = <Icon className="caqui-page-header-icon" name={ icon }
                           style={{width: false,  height: false,  fill: 'white',  marginRight: '10px'}}/>;
        }

        if (Array.isArray(children)) {
            React.Children.forEach(children, (child) => {
                switch (child.type.name) {
                    case 'Menu':
                        menu = child;
                        break;
                    case 'Container':
                        body = child;
                        break;
                    default:
                        body = child;
                }
            });
        } else if (children) {
            body = children;
        }

        return (
            <div className="row-fluid caqui-page-header">
                <div className="row-fluid">
                    <h2 className="caqui-page-header-title pull-left"
                        style={{marginBottom: '0px',  marginTop: '15px',  marginLeft: '15px',  marginRight: '15px'}}>
                        { iconEl }
                        <span>{ header }</span>
                    </h2>
                    <div className="pull-right">
                        { menu }
                    </div>
                    <div style={{clear: 'both'}}/>
                </div>
                <hr style={{margin: '10px 0'}}/>
                <div className="row-fluid">
                    <div className="col-xs-12">
                        { body }
                    </div>
                </div>
            </div>
        );
    }
}

Page.Menu = Menu;
Page.Container = Container;

export default Page;