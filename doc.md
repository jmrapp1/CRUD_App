Components
----------

**..\..\client\src\views\App.jsx**

### 1. App

Creates the App   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
history|object|yes||Keeps the history of the page
dispatch|func|yes||Talks to redux
-----
**..\..\client\src\views\common\components\buttons\AlertButton.jsx**

### 1. AlertButton

Creates the alert button
@param text
@param onClick
@param className
@returns {*}
@constructor   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
text|node|no||Alert message
onClick|func|no||Function called when clilcked
className|string|no||Class Name
-----
**..\..\client\src\views\common\components\buttons\PrimaryButton.jsx**

### 1. PrimaryButton

Creates the primary button
@param text
@param onClick
@param className
@returns {*}
@constructor   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
text|node|no||Primary Text
onClick|func|no||Function called when clicked
className|string|no||Class Name
-----
**..\..\client\src\views\common\components\buttons\SecondaryButton.jsx**

### 1. SecondaryButton

Creates the secondary button
@param text
@param onClick
@param className
@returns {*}
@constructor   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
text|node|no||Secondary Button&#x27;s Text
onClick|func|no||Function called when clicked
className|string|no||Secondary Button&#x27;s class Name
-----
**..\..\client\src\views\common\components\containers\Container.jsx**

### 1. Container

Creates Container Components
@param children
@param padding
@param className
@param shadow
@param round
@returns {*}
@constructor   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
children|node|no||Child Node
padding|number|no|30|Container&#x27;s Padding
className|string|no|&lt;See the source code&gt;|Container&#x27;s Class Name
shadow|bool|no|true|Container&#x27;s Shadow
round|bool|no|true|Is the Container&#x27;s edge rounded or not
-----
**..\..\client\src\views\common\components\inputs\TextInput.jsx**

### 1. TextInput

Creates Text Input Component
@param name
@param placeholder
@param value
@param type
@param onChange
@returns {*}
@constructor   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
name|string|no||Text Input name
placeholder|string|no|&lt;See the source code&gt;|Text Input place holder text
value|string|no|&lt;See the source code&gt;|Text Input value
onChange|func|no|&lt;See the source code&gt;|onChange function
type|string|no|&lt;See the source code&gt;|Text Input type
-----
**..\..\client\src\views\common\components\nav\LinkNavItem.jsx**

### 1. LinkNavItem

Creates a LinkNavItem when clicked brings you to the employee page
@param props
@returns {*}
@constructor   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
children|node|no||The employee root
href|string|no||Link to the employee page
-----
**..\..\client\src\views\common\components\table\PageButton.jsx**

### 1. PageButton

Creates Page Button Components
@param text
@param onClick
@param className
@returns {*}
@constructor   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
text|node|no||Page Button Text
onClick|func|no||onClick function
className|string|no||Page Button class name
-----
**..\..\client\src\views\common\components\table\PaginatedTable.jsx**

### 1. PaginatedTable

Create Paginated Table component   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
columns|array|no||Column Array
data|array|no||Data Array
currentPage|number|no||Current Page Value
total|number|no||Total Page Value
pageSize|number|no||Page Size
mapData|func|no||Function to map data
onPageClick|func|no||Function to change page
onRowClick|func|no||Function when row is clicked
-----
**..\..\client\src\views\layout\Content.jsx**

### 1. Content

Create the main content of the website dynamically   




-----
**..\..\client\src\views\layout\Footer.jsx**

### 1. Footer




-----
**..\..\client\src\views\layout\Header.jsx**

### 1. Header

Create the main header   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
loggedIn|bool|no||See&#x27;s if the user is logged in
logout|func|no||Loggin out function
history|any|no||Previous history
user|node|no||User date
-----
**..\..\client\src\views\pages\about\About.jsx**

### 1. About

Creates About Page   




-----
**..\..\client\src\views\pages\home\BrandView.jsx**

### 1. BrandView

Creates Clouds and UManage text   




-----
**..\..\client\src\views\pages\home\HomePage.jsx**

### 1. HomePage

Calls BrandView   




-----
**..\..\client\src\views\pages\index\customer\Customer.jsx**

### 1. Customer

Customer landing page (Not Used)   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
user|object|no||User info
-----
**..\..\client\src\views\pages\index\employee\Employee.jsx**

### 1. Employee

Creates Employee Landing Page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
employee|object|yes||Employee Data
location|object|no||Location Object
-----
**..\..\client\src\views\pages\index\employee\ManageCustomer.jsx**

### 1. ManageCustomer

Creates Manage Employee Page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
customers|array|no||Customer List
totalCustomers|number|no||Total Customer Number
getCustomers|func|no||Function to get customers
getTotalCustomers|func|no||Function to get total customer number
pageSize|number|no||Page Size Number
-----
**..\..\client\src\views\pages\index\manager\AddEmployee.jsx**

### 1. AddEmployee

Creates Add Employee Page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
register|func|no||Register function
user|node|yes||User Data
history|any|yes||User History
-----
**..\..\client\src\views\pages\index\manager\ManageEmployee.jsx**

### 1. ManageEmployee

Creates Manage Employee Page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
employees|array|no||Employee List
totalEmployees|number|no||Total Employee Number
getEmployees|func|no||Function to get employee
getTotalEmployees|func|no||Function to get total employee number
pageSize|number|no||Page Size
history|object|yes||User history
user|node|yes||User data
-----
**..\..\client\src\views\pages\index\manager\Manager.jsx**

### 1. Manager

Creates Manager Landing Page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
user|object|no||USer Data
loggedIn|bool|no||Checks if logged in
history|object|yes||History data
-----
**..\..\client\src\views\pages\login\LoginPage.jsx**

### 1. LoginPage

Creates Login Page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
login|func|no||Login function
history|any|no||History data
-----
**..\..\client\src\views\pages\signup\SignUpPage.jsx**

### 1. SignUpPage

Creates Sign Up Page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
register|func|no||Register function
history|any|yes||History data
-----

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>
