# Medley FE Tech Test

The frontend test assessment required me to build the Payouts page as per the given Figma designs. I have used React.js along with styled-components to build a near replica of the designs. I have used typescript as per the requirements as well.

_Developed UI_
<img width="1440" alt="image" src="https://github.com/Gaurav1327/medley-fe-test/assets/42798689/babc9c21-dcc6-4c4b-9872-d3efc92b75c4">

## Approach and some Explanations
I will now try to discuss quickly about some of the components in my submitted solution and provide some explanations around them.

- **Components** – I have tried to build components that are generic in nature and can be re-used at other pages if needed. I preferred building them from scratch since external npm packages sometimes add an overhead in terms of their sizes. If we only need some functionalities, we should rather prefer to add them in our own code.
<br><br> I will discuss a bit about the `Table` components, since its one of the key parts of the frontend. I broke down the entire component into 3 parts: `Filters`, `Main Table` and `Pagination`. All 3 parts are set to be nearly stateless with respect to actual data. These components can be used for any data, with more or a smaller number of columns and the table component won’t break.
Functionalities of the Payout Table include `Sorting of columns` by clicking on the column name, filter using `STATUS`, change the number of rows per page,
<br><br>I have exposed an interface – `FormattedRecords`, and the input data for the table has just be in this shape.
<br><br>
```
export interface FormattedRecords {
    tableTitle: string;
    filterValues?: Record<string, string[]>;
    columnsMetadata: {
        key: string;
        displayName: string;
    }[];
    data: Record<
        string,
        {
            value: any;
            renderValue: ReactElement<any>;
        }
    >[];
}
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For `Filters` as well, we just need to set the column key in `filterValues` while passing the data to add more filters. Currently, only equality filters have been added, we can further support other comparisons like `gt` or `lt`. In the actual example I have added a filter for ‘STATUS’ column. <br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**External Dependencies**: react-skeleton-loader (to show loaders in table). I have used this package to show skeleton loader for better UI. Apart from this, all the parts are designed using pure css (styled-components).

- **Debounce for Search** – For search using username implementation, we have to pass the searchQuery as an API param to get the filtered results. But in real-world scenario, we cannot send an API call continuously as the user keeps typing. So, to avoid such scenario, I have used a concept called ‘debounce’. Debouncing is an optimization technique to limit the number of times a task occurs. Basically, every time the user types, we put a timer of 500ms to update the `debouncedQuery`. If the user update the query again in that interval, we remove the previous timer and again add a time to update the `debouncedQuery`. And finally the API call is only made when there is a change in the `debouncedQuery`. This helps us to reduce the number of API calls while searching. I have added a `useDebounce` hook to acheive this.

- **Responsiveness** – Although, I have not fully optimized the responsive nature of the page yet, I have ensured during the development that the UI does not break or misbehaves in smaller screens, and the user is able to view all the functionalities.

- **Some best practices** – I have added support for `eslint` and `prettier` for better code readability and clarity as well as to avoid some runtime issues. Also I have added routing only to make this more extendible, otherwise it was not necessary for the given single page UI.

- **Some Alternatives I considered** - There were a few different code and design changes that I thought of.
<br>Firstly I decided to use react-query for fetching the Payout records since it will give more features like caching the response etc, but then I decided to use plain fetch for this simpler usecase, where we have to deal with only single API and not much load on it. This can definitely be changed if required, with a few lines of code.
<br>Also I thought of showing the entire user fetched from the SEARCH query in the table component itself, instead of showing the dropdown of username, but I thought that since the search functionality is only on the basis of username, it would make more sense to show only the usernames instead.

- **Tests** - I have added tests for the utils functions like pagination numbers formatting and data formatting, to ensure that there is no functional mis-functioning data-related logic.
   
- **Concern related to API** - As the per the response for `/payouts` API, we get a value `totalCount` in the metadata. I could not figure out what value actually it is, whether it is the total count of records or total number of pages. I tested for response of payouts/page=1001&limit=500 and it gave 500 records, which means that totalCount is neither total pages or records. For the sake of this test, I have assumed totoalCount to be the number of records and calculated pagination details as per that.

## How to run?
- Clone the repository using `git clone https://github.com/Gaurav1327/medley-fe-test.git`
- Change the directory `cd medley-fe-test`
- Install the dependencies using `yarn` or `npm i`
- Run the application on localhost:3000 using `npm start` or `yarn start`
