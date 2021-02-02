Interview_Project_Assignment Notes
===

## Future Goals

- Make changes with targeted commits and good commit messages.
- Create Merge Requests so they can be reviewed and commented on.
- [x] Improve Typings Accuracy (fleshing out tsconfig may help here)
- [x] Improve Organization of Pages/Components
- Implement Zip Code API to verify ZIP Codes
    - https://www.usps.com/business/web-tools-apis/welcome.htm#api
- [ ] Implement Testing
- [x] Implement Dotenv
- [x] Implement Material UI
- Implement Redux


## Code Issues

### App.tsx
- [x] API credentials should not be exposed in committed code. (`App.tsx`, 59:100)
- [x] Response from API should be typed. (`App.tsx`, 61:13)
- [x] Typo in `currentStaus` and `setcurrentStaus` and `setcurrentStaus` is not properly camelCased. (`App.tsx`, 16:5)
- [x] `timer` has a type of `any`. This should be typed to match its use (`ReturnType<typeof setTimeout> | null`) rather than using `any`.
- [x] `pulledList` and `popupDetails` should be typed to help avoid confusion. (Related to first item under `PopUp.tsx`)

### Content.tsx


### DisplayTemp.tsx


### PopUp.tsx
- [x] This component only ever displays one `WeatherItemType` at a time, so the `pointed` prop should be changed to `WeatherItemType` and `popupDetails` in `App.tsx` should be typed to match.
- [x] The `closePopUp` function prop (`closeDetailed()` in `App.tsx`) is called with a boolean, but the declared function does not accept a parameter. (`PopUp.tsx`, 26:58)

### Recommendations.tsx
- [x] `recommendations` is being mutated directly instead of using `setRecommendations`. (`Recommendations.tsx`, 24:25)
- [x] `if (!fetching)...` not needed because the `onClick` handler will not fire while the button is disabled. (`Recommendations.tsx`, 22:21)

### Searchbar.tsx
- [x] "Clear All" button has a type of "submit" that's being used to reset the chosen locations. The `pulledList` array should be reset to an empty array instead of using a submit button to reset the app state.
- [x] `handleSubmit()` is being used for two different buttons. Each button should have its own function for the `onClick` property.
- [x] `clearList()` in `App.tsx` does not accept a parameter, but you're passing an empty array. (`Searchbar.tsx`, 32:13)
- [x] `searchState` should have a more appropriate name that matches what it is used for. Since it is used to disable the "Search" button, something like `isSearchDisabled` would be more appropriate.

### Status.tsx


### USZipCodes.js


### WeatherList.tsx
- [x] The `onClick` function for the Fahrenheit/Celsius button could be changed to simply `flipTemp` and the function in `App.tsx` changed to `setTempFormat(!tempFormat)` because `App.tsx` is already aware of `tempFormat` and controls the state for it.

### index.css


### index.tsx


### react-app-env.d.ts


### types.d.ts
- [x] Function types in `types.d.ts` use `WeatherItem` as a type, but `WeatherItem` is never declared. This causes the uses of the type to implicitly convert to `any`, which allows incorrect uses of the type. If the type is changed to `WeatherItemType`, which is what I'm guessing it was supposed to be, TS throws errors for two uses as shown below:
    ![](https://s3-us-east-2.amazonaws.com/velocity-codimd/uploads/upload_38492bab6e1cbd3dd2bd81e45c9c4602.png)
- [x] The type declarations for several functions do not match their actual uses.
    - [x] `clearList()` in `App.tsx` is declared with a type of `removeItem`, but the function signature does not match the declared type.
    - [x] `closeDetailed()` in `App.tsx` is declared with a type of `seenItem`, but the function signature does not match the declared type.
    - [x] `addItem` should have a return type of `Promise<void>` instead of `void` because it is an async function.

### useFetch.tsx
- [x] Actual error returned from API in `UseFetch()` is never logged or displayed to the user. A message is logged only if the fetch is aborted.
- [x] In the catch block of the fetch call in `UseFetch()`, a message is logged to the console, but the ability to abort the fetch is not implemented, making this pointless.
- [x] The file extension should be `.ts` because there is no jsx generated in this file.

### Not file-specific
- [x] Use `const` instead of `let` for variables that are never modified.
- [x] Interfaces for component props should follow a naming convention such as `<ComponentName>Props`. You have a different `WeatherItemProp` declared in several of your files, which will cause confusion and potential conflicts if you decide to export the interfaces for use elsewhere in your app.

## Code Style Issues
- [x] `UseFetch()` should match the casing of the file it is in. Since it is a function and not a class, `useFetch()` would be more appropriate.
- [x] The `Content` component could be removed and the single enclosing `div` could be added to the `WeatherList` component instead. If we wanted to keep it for some reason, using `useContext()` would alleviate the need to pass the props into `Content` just to be passed along to `WeatherList`.
- [x] For components with 3 or more props, one prop per line and alphabetized would make it much easier to see all the props associated with that particular component.
    ```js
    <Content
        flipTemp={flipTemp}
        pulledList={pulledList}
        removeItem={removeItem}
        showDetailed={showDetailed}
        tempFormat={tempFormat}
        title={"Current Weather"}
    />
    // versus
    <Content pulledList={pulledList} title={"Current Weather"} removeItem={removeItem} showDetailed={showDetailed} tempFormat={tempFormat} flipTemp={flipTemp}/>
    ```
- [x] String manipulation and calculations should be assigned to variables instead of being inserted directly into template literals. This also makes the jsx easier to read.
    - Calculation in `DisplayTemp.tsx`, 10:26.
    - String manipulation in `PopUp.tsx`, 31:43.
- [x] The variable names used for the arguments in the function declarations in `types.d.ts` should probably match the actual function, but if nothing else the argument should be named something other than the function name.
    ```ts
    type removeItem = (removeItem : WeatherItem) => void;
    type seenItem = (seenItem : boolean) => void;
    type showDetailed  = (showDetailed : WeatherItem) => void;
    type addItem = (addItem: string) => void;
    type updateStatus = (updateStatus: string) => void;
    type flipTemp = (flipTemp : boolean) => void;
    ```
## General Suggestions
- [x] Get the user's current location and use that to display the first `WeatherList` component.
- [x] Display both a Celsius and Fahrenheit button and use styling to indicate which is selected. When I first opened the app it was not readily apparent how to switch to Fahrenheit from Celsius.
- Use user's current location to default to Fahrenheit or Celsius by default.
- Use an API to get zip codes rather than a hard-coded file.
- [x] Use flexbox instead of `float: "left"|"right"` to style components. (`Recommendations.tsx`, 18:22; `Status.tsx`, 15:26)
