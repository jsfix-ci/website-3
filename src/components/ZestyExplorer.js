import React from 'react';
import ReactJson from 'react-json-view-ssr';
import Fuse from 'fuse.js';

// convert the obj to array of objectsj
const convertToArray = (content) =>
  Object.entries(content).map((e, i) => {
    return { [`${e[0]}`]: e[1] };
  });
// convert obj to dot
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
// convert dot to object
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
  const columns = flaten2.map((e) => {
    const res = Object.keys(e);
    return res.toString().replace(/.[0-9]/g, '');
  });

  const options = {
    includeScore: true,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    findAllMatches: true,
    threshold: 0,
    isCaseSensitive: false,
    minMatchCharLength: 3,
    keys: columns,
  };

  const fuse = new Fuse([content], options);

  const result = fuse.search(search || '');

  const result2 =
    result &&
    result[0]?.matches
      ?.map((e) => {
        return { [`${e.key}`]: e.value };
      })
      .map((e) => deepen(e));

  const data = search ? result2 : { content };

  return (
    <>
      <div style={{ width: '80vw', margin: '0 auto' }}>
        <input
          style={{ margin: '0 auto', width: '100%', height: '5rem' }}
          placeholder="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* {JSON.stringify(result2)} */}
        <ReactJson
          name={'data'}
          src={data}
          theme="monokai"
          collapsed={false}
          displayObjectSize
          displayDataTypes={false}
          enableClipboard={true}
        />
      </div>
    </>
  );
};

export default ZestyExplorer;
