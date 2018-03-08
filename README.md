# react-sidemenu

Lightweight side menu component written in React.js. No jQuery, just CSS3.

<img src="https://s18.postimg.org/m1fhnu0wp/react_sidemenu.png" width="300">

## Features
 - Pure React.js, no external dependencies
 - Configure via JSON or via React components
 - Packed with default ready-to-use styling
 - Easy to customize styling guide
 - Custom rendering, collapse control, right-to-left etc.

## Usage
Install the component with NPM:

    npm install react-sidemenu --save
Import the component in your React.js application:

ES6 syntax:

    import {SideMenu} from 'react-sidemenu';
ES5 syntax:

    var SideMenu = require('react-sidemenu').SideMenu;

## Demo & Examples
[Demo](http://react-sidemenu-demo.herokuapp.com/) showcasing the functionalities & code examples (wait for it to load a bit as it is on free plan on Heroku). We use Font Awesome as a CDN for the example icons to show.

You can run examples by yourself. Clone the repo and do:

    npm install
    gulp dev

## Options

< SideMenu > - main component

|**Option**|**Default**|**Description**|
| --- | --- | --- |
| items | null | Property for the JSON configuration of the component SideMenu component. Check out the [demo](http://react-sidemenu-demo.herokuapp.com/) to find out how it works. |
| activeItem | null | Preset starting active item. Also used for opening and closing menu items from code (e.g. from a button). |
| collapse | true | This property gives you the capability to enable or disable collapsing menu when other elements of the menu are clicked. |
| theme | 'default' | This sets a class for the component that you can use to apply custom styling. The class will be Side-menu-[theme_name]. **Note:** our default theme uses Font Awesome icons. See [demo](http://react-sidemenu-demo.herokuapp.com/) for an detailed example.  |
| renderMenuItemContent({ icon: icon, value: value, label: label }) | null | This property enables you to provide a custom render method for items. Function is passed one parameter, representing the menu item being rendered. It receives an object with attributes: icon, label and value. [Demo](http://react-sidemenu-demo.herokuapp.com/)|
| onMenuItemClick | `(value, extras) => window.location.href = '#' + value` | This property enables you to provide custom onClick method for items. The function gets passed one parameter which is the value of the clicked item. If you do not provide an onMenuItemClick. [Demo](react-sidemenu.demo.com/#custom-click )|
| rtl | false | This property enables you to use the sidemenu in a right-to-left page. [Example](http://react-sidemenu-demo.herokuapp.com/) |
| shouldTriggerClickOnParents | false | This property enables triggering 'onMenuItemClick' on parent items that have children. |

< Item > - this component is for the non-JSON config of the menu

|**Option**|**Description**|
| --- | --- |
| value | This is the link where you will be redirected after you click the item or the value attribute inside method onMenuItemClick |
| label | This is the representative value of the item |
| icon | This is the representative icon of the item. It should be [font-awesome](http://fontawesome.io/)  class name.
| onClick | Custom on click method specific for this item (overrides onMenuItemClick).
| extras | Container for additional data. (Not required)

## Roadmap

Any contribution is welcome.

To be done:

 - tests & CI support
