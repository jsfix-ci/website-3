import React from 'react';
import ReactJson from 'react-json-view-ssr';

const convertToArray = (content) =>
  Object.entries(content).map((e, i) => {
    return { [`${e[0]}`]: e[1] };
  });
const flattenObj = (obj, parent, res = {}) => {
  for (const key of Object?.keys(obj || {})) {
    const propName = parent ? parent + '.' + key : key;
    if (typeof obj[key] === 'object') {
      flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};
function deepen(obj) {
  const result = {};

  // For each object path (property key) in the object
  for (const objectPath in obj) {
    // Split path into component parts
    const parts = objectPath.split('.');

    // Create sub-objects along path as needed
    let target = result;
    while (parts.length > 1) {
      const part = parts.shift();
      target = target[part] = target[part] || {};
    }

    // Set value at end of path
    target[parts[0]] = obj[objectPath];
  }

  return result;
}
const ZestyExplorer = ({ content }) => {
  const [search, setSearch] = React.useState();
  const flaten1 = flattenObj(content);
  const flaten2 = convertToArray(flaten1);
  const flaten3 = flaten2.find((e) => {
    const obj123 = Object.values(e);
    console.log(obj123, 'qqqqqqqqqqq');
    if (Object.keys(e)[0].includes(search)) {
      return e;
    }
    return null;
  });

  //   const content1 = Object.entries(content).map((e, i) => {
  //     return { [`${e[0]}`]: e[1] };
  //   });
  //   const searchKey1 = content1.find((e, i, arr) => {
  //     return e[search];
  //   });
  console.log(deepen(flaten3), 'gggggg');
  const deepen1 = deepen(flaten3);
  const data = { search: search ? deepen1 : content };
  //   const searchKey2 = content1.map((e, i, arr) => {
  //     if (e[search]) {
  //       return e[search];
  //     }
  //     if (
  //       typeof Object.values(e)[0] === 'string' &&
  //       Object.values(e)[0] === search
  //     )
  //       console.log(typeof Object.values(e)[0], 9999999999);
  //     return 'darwin';
  //   });

  //   console.log(searchKey2, 3333333333333333333333333);
  //   console.log(flaten3, 2222222222222222222);
  //   const recursivelyFindKeyValue = (key, keyValue, list) => {
  //     console.log('Searching list: ', list);

  //     for (let i = 0; i < list.length; i++) {
  //       const item = list[i];

  //       for (const key of Object.keys(item)) {
  //         //check if its array of more options, search it
  //         if (Array.isArray(item[key])) {
  //           console.log('child array found, searching', item);
  //           const res = recursivelyFindKeyValue(key, keyValue, item[key]);
  //           if (res.found === true) return res;
  //         }
  //         //Test the keyValue
  //         else if (item[key] === keyValue) {
  //           //found, return the list
  //           console.log('found ', keyValue);
  //           return { found: true, containingArray: list };
  //         }
  //       }
  //     }

  //     return { found: false, containingArray: [] };
  //   };
  //   const res = recursivelyFindKeyValue('type', 'images', content1);

  return (
    <>
      <input
        placeholder="search for Key..........."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ReactJson
        src={data}
        theme="monokai"
        collapsed={false}
        displayObjectSize
        displayDataTypes={false}
        enableClipboard={false}
      />
    </>
  );
};

export default ZestyExplorer;
