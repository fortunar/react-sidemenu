# react-sidemenu

Lightweight side menu component written in React.js. No jQuery, just CSS3.

##Features
 - Pure React.js, no external dependencies
 - Configure with JSON or via React components
 - Packed with default ready-to-use styling
 - Easy to customize styling guide
 - Support of custom properties

##Usage
Install the component with NPM:

    npm install react-sidemenu --save
Import the component in your React.js application:

ES6 syntax:

    import {SideMenu} from 'react-sidemenu';
ES5 syntax:

    //todo

##Demo & Examples
[Demo](http://react-sidemenu-demo.herokuapp.com/) showcasing basic usage with code.

You can run examples by yourself. Clone the repo and do:

    npm install
    gulp dev

##Options

< SideMenu >

|**Option**|**Default**|**Description**|
| --- | --- | --- |
| items | Property for the JSON version of the component. Read further on for example how to set it. | |
| collpase | true | This property enables you to enable or disable collapsing menu when other elements of the menu are clicked. |
| theme | 'default' | This property enables you to set different theme of the menu by providing a themename, where you should have class 'Side-menu-themename' [Example](react-sidemenu.demo.com/#custom-theme)  |
| renderMenuItemContent(item) | null | This property enables you to provide custom render method for items. Function has one attribute which is the object with attributes icon, label and value. [Example](react-sidemenu.demo.com/#custom-render)|
| onMenuItemClick | null | This property enables you to provide custom click method for items. Function has one attribute which is the value of the clicked item. [Example](react-sidemenu.demo.com/#custom-click) |
| rtl | false | This property enables you to use the sidemenu inside the right-to-left page. [Example](react-sidemenu.demo.com/#rtl) |

< Item >

|**Option**|**Description**|
| --- | --- |
| value | This is the link where you will be redirected after you click the item or the value attribute inside method onMenuItemClick |
| label | This is the representative value of the item |
| icon | This is the representative icon of the item. It should be [font-awesome](http://fontawesome.io/)  class name.
