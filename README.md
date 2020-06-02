## Installation

### `npm install`

Begin setup by running `npm install` to install dependencies and set up project.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

### Deployment

Refer to: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

Refer to: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Tehnical decisions

Given that the requirements for this assignment dictated the creation of a simple shopping cart interface, I chose to create a single-page front-end application using React.js.

The primary layout of the application is organized into three primary sections:

1. Title header ("Shopping Cart")
2. Main cart (Where product items are rendered)
3. Summary (Where subtotals, tax, shipping, and grand total is calculated)

Since most of the application data derives from the order data retrieved from requests to GoPuff API located in the main cart section, I chose to maintain seperation of concerns by implementing a top-down architecture with all data state and API data manipulation to be managed only in the primary "Cart" component.

To obtain all necessary data for each product item in the cart, 2 API requests needed to be made: one to retrieve the primary list of items, and one to retrieve relational metadata pertaining to each of the items in the primary list. 

To simplify this process, I combined the two requests into one call through sequential asynchronous axios requests made when the main cart component initially mounts. This ensures that all requests are only made once and are only made in this top-level state-derived component. All other components are React functional components (ie ItemRows), which will only take the data that is required to render its individual functionality. 

1. The first request retrieves the list of items, where logic is then implemented to parse out the product Ids from that request to be used in generating the query parameter string to be used in a bulk request to the second Api. 

2. Once the query parameter string is generated after the first call, it is immediately passed down into "getProductData()" which takes in both primary list data as well as the paremeter query to make the second "bulkd" request based solely on the list retrieved from the first call as to prevent multiple request iterations.

3. To minimize complexity, pertinent product data to be stored in state is not generated until both calls have been made and all necessary information from both calls have been organized into a data object containing only the data to be rendered. This way, setState() is only called once, which will update the Cart component state will all the cart item data and metadata when the component first mounts.

All downstream components involving changes in this list (ie handleQuantityChange()) are passed down as props as to keep primary application state isolated to the main cart component. 

## Improvements

Given time constraints and basic functionality requirements of this assignment, I chose this top-down level design to maintain core functionality and readability. Retrospectively, I think if I were to redo this, or if more functionality was required in the context of a more complex application (ie additional API calls, databases updates, additional pages, user-specific accessibility, etc.), I would have chosen to leverage the application state management through Redux to be better able to isolate funcinoatlity and normalize state shape. 

The data for each product item derives from relational data from two seperate sources with additional nested properties that could potentially require updating. Therefore if it were to be implemented on a larger sale context, the management of this data could be more effecively organized and utilzed through a Redux store, almost as if it were its own database. Especially if individual "users" are taken into account, a Redux store could help maintain the data in a normalized form where each type of data gets its own "table" in state with references to individual items or users done by storing Ids. This way, each item is only defined in one place, precluding the need to make changes in multiple places if it were to be updated. Additionally, with a more complex data structure, it would reduce having to deal with deepr levels of nesting.

Also, I would have been able to further simplify the code if I had used React hooks. Especially when it comes to readability in the context of updating items details like quantity, or removing items. With hooks, it would have been a simpler process of managing updates to be saved in local store with the use of useEffect() functionality to "hook" to changes made in the product list state. 