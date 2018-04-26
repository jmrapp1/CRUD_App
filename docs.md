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
text|node|no||
onClick|func|no||
className|string|no||
-----
**..\..\client\src\views\common\components\containers\Container.jsx**

### 1. Container




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
children|node|no||
padding|number|no|30|
className|string|no|&lt;See the source code&gt;|
shadow|bool|no|true|
round|bool|no|true|
-----
**..\..\client\src\views\common\components\inputs\TextInput.jsx**

### 1. TextInput




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
name|string|no||
placeholder|string|no|&lt;See the source code&gt;|
value|string|no|&lt;See the source code&gt;|
onChange|func|no|&lt;See the source code&gt;|
type|string|no|&lt;See the source code&gt;|
-----
**..\..\client\src\views\common\components\nav\LinkNavItem.jsx**

### 1. LinkNavItem




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
children|node|no||
href|string|no||
-----
**..\..\client\src\views\common\components\table\PageButton.jsx**

### 1. PageButton




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
text|node|no||
onClick|func|no||
className|string|no||
-----
**..\..\client\src\views\common\components\table\PaginatedTable.jsx**

### 1. PaginatedTable




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
columns|array|no||
data|array|no||
currentPage|number|no||
total|number|no||
pageSize|number|no||
mapData|func|no||
onPageClick|func|no||
onRowClick|func|no||
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




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
loggedIn|bool|no||
logout|func|no||
history|any|no||
user|node|no||
-----
**..\..\client\src\views\pages\about\About.jsx**

### 1. About




-----
**..\..\client\src\views\pages\home\BrandView.jsx**

### 1. BrandView




-----
**..\..\client\src\views\pages\home\HomePage.jsx**

### 1. HomePage




-----
**..\..\client\src\views\pages\index\customer\Customer.jsx**

### 1. Customer




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
user|object|no||
-----
**..\..\client\src\views\pages\index\employee\Employee.jsx**

### 1. Employee




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
employee|object|yes||
location|object|no||
-----
**..\..\client\src\views\pages\index\employee\ManageCustomer.jsx**

### 1. ManageCustomer




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
customers|array|no||
totalCustomers|number|no||
getCustomers|func|no||
getTotalCustomers|func|no||
pageSize|number|no||
-----
**..\..\client\src\views\pages\index\manager\AddEmployee.jsx**

### 1. AddEmployee




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
register|func|no||
user|node|yes||
history|any|yes||
-----
**..\..\client\src\views\pages\index\manager\ManageEmployee.jsx**

### 1. ManageEmployee




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
employees|array|no||
totalEmployees|number|no||
getEmployees|func|no||
getTotalEmployees|func|no||
pageSize|number|no||
history|object|yes||
user|node|yes||
-----
**..\..\client\src\views\pages\index\manager\Manager.jsx**

### 1. Manager




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
user|object|no||
loggedIn|bool|no||
history|object|yes||
-----
**..\..\client\src\views\pages\login\LoginPage.jsx**

### 1. LoginPage




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
login|func|no||
history|any|no||
-----
**..\..\client\src\views\pages\signup\SignUpPage.jsx**

### 1. SignUpPage




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
register|func|no||
history|any|yes||
-----

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>
