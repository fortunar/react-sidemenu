import React from 'react';
import { render } from 'react-dom';

import "./app.less";
import "src/side-menu.less";

import ExampleNormal from './example-normal';
import ExampleActiveItem from './example-active-item';
import ExampleNoCollapse from './example-no-collapse';
import ExampleCustomRender from './example-custom-render';
import ExampleCustomClick from './example-custom-click';
import ExampleCustomTheme from './example-custom-theme';
import ExampleRTL from './example-rtl';


render(<ExampleNormal />, document.getElementById('example-normal'));
render(<ExampleActiveItem />, document.getElementById('example-active-item'));
render(<ExampleNoCollapse />, document.getElementById('example-no-collapse'));
render(<ExampleCustomRender />, document.getElementById('example-custom-render'));
render(<ExampleCustomClick />, document.getElementById('example-custom-click'));
render(<ExampleCustomTheme />, document.getElementById('example-custom-theme'));
render(<ExampleRTL />, document.getElementById('example-rtl')); 
