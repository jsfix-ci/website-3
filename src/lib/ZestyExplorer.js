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

// finding the zuid in objects of data
const transFromData = (data) => {
  const originalData = data;

  // remove not necessary fields
  delete originalData.meta;
  delete originalData.zestyBaseURL;
  delete originalData.zestyInstanceZUID;
  delete originalData.zestyProductionMode;

  // find the objects and convert to array of objects
  const convertedData = Object.entries(originalData)
    .filter((e) => typeof e[1] === 'object' && e[1] !== null)
    .map((e) => {
      return { [e[0]]: e[1].data[0].zuid || e[1].data[0].meta.zuid };
    });

  // merge the two big objects to form 1 object
  const finalObject = {
    ...originalData,
    ...Object.assign({}, ...convertedData),
  };

  return finalObject;
};

const getToken = () => {
  const token = ('; ' + document.cookie)
    .split(`; APP_SID=`)
    .pop()
    .split(';')[0];

  return token;
};
const ZestyExplorerBrowser = ({ content, children }) => {
  // const [modal, setModal] = React.useState(false);
  const [search, setSearch] = React.useState();
  // convert obj to dot
  const flaten1 = flattenObj(content);

  // convert to array of objects
  const flaten2 = convertToArray(flaten1);

  // generate columns for search
  const columns = flaten2.map((e) => {
    const res = Object.keys(e);
    return res.toString().replace(/.[0-9]/g, '');
  });

  // search options
  const options = {
    includeScore: true,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    findAllMatches: true,
    threshold: 0,
    isCaseSensitive: false,
    minMatchCharLength: 1,
    keys: columns,
  };

  // search func
  const fuse = new Fuse([content], options);

  const result = fuse.search(search || '');

  // convert as key value pairs
  const result2 =
    result &&
    result[0]?.matches
      ?.map((e) => {
        return { [`${e.key}`]: e.value };
      })
      .map((e) => deepen(e));

  // display the result of search
  const data = search ? result2 : { content };
  let divStyles = {
    marginBottom: '4em',
    justifyContent: 'center',
  };

  let searchBarStyles = {
    padding: '5px',
    margin: '10px',
    borderRadius: '28px',
  };

  let linkStyles = {
    padding: '5px',
    display: 'inline-block',

    color: '#497edf',
  };

  const handleEdit = async (e) => {
    const url = `https://${content.zestyInstanceZUID}.api.zesty.io/v1/content/models/${content.meta.model.zuid}/items/${content.meta.zuid}`;

    const data = transFromData(e.updated_src.content);

    const web = {
      metaDescription: content.meta.web.seo_meta_description,
      metaTitle: content.meta.web.seo_meta_title,
      metaLinkText: content.meta.web.seo_link_text,
      metaKeywords: content.meta.web.seo_meta_keywords,
      parentZUID: content.meta.zuid || '0',
      pathPart: content.meta.web.fragment,
      path: content.meta.web.uri,
      sitemapPriority: content.meta.web.sitemap_priority,
      canonicalTagMode: content.meta.web.sitemap_priority,
      canonicalQueryParamWhitelist:
        content.meta.web.canonical_query_param_whitelist,
      canonicalTagCustomValue: content.meta.web.canonical_tag_custom_value,
      createdByUserZUID: content.meta.zuid,
    };
    const meta = {
      ZUID: content.meta.zuid,
      masterZUID: content.meta.zuid,
      contentModelZUID: content.meta.model.zuid,
      contentModelName: content.meta.model.name,
      sort: content.meta.sort,
      listed: content.meta.listed,
      version: content.meta.version,
      langID: content.meta.langID,
      createdAt: content.meta.createdAt,
      updatedAt: content.meta.updatedAt,
    };

    const payload = {
      data,
      meta,
      web,
    };

    const token = getToken() || 'd281f0e9adc7c4864dca4f27ac7e8146e6029747';

    const putMethod = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(payload),
    };

    const res = await fetch(url, putMethod);

    res.status === 200 &&
      res.json().then((e) => {
        console.log(e);
        window.location.reload();
      });
    res.status !== 200 && res.json().then((e) => console.log(e, 'err'));
  };

  return (
    <div
      style={{
        background: '#ddd',
        boxShadow: '0,0,5px,#333',
        borderRadius: '4px',
      }}
    >
      <div style={{ width: '80vw', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <img
            src="https://storage.googleapis.com/brand-assets.zesty.io/zesty-io-app-icon-transparent.png"
            width="22px"
            height="22px"
            alt="Zesty.io Logo"
          />
          <input
            type="text"
            placeholder="Search Content Values"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            style={searchBarStyles}
          />
          <span>
            Browsing item <strong> {content.meta.web.seo_link_text} </strong>
            from the <strong>{content.meta.model_alternate_name} </strong>
            Content Model
          </span>
          <a
            style={linkStyles}
            target="_blank"
            href={`https://accounts.zesty.io/instances/${content.zestyInstanceZUID}`}
          >
            Open Zesty Account
          </a>
          <a
            style={linkStyles}
            target="_blank"
            href={`https://${content.zestyInstanceZUID}.manager.zesty.io/content/${content.meta.model.zuid}/${content.meta.zuid}`}
          >
            Open Zesty Manager
          </a>

          <a
            style={linkStyles}
            target="_blank"
            href={`https://${content.zestyInstanceZUID}.manager.zesty.io/schema/${content.meta.model.zuid}`}
          >
            Open Schema
          </a>
          {children}
        </div>
        {/* {JSON.stringify(result2)} */}
        <ReactJson
          style={{ height: '80vh', overflowY: 'scroll' }}
          name={'data'}
          src={data}
          theme="flat"
          iconStyle="square"
          indentWidth={4}
          collapsed={false}
          displayObjectSize
          displayDataTypes={false}
          enableClipboard={true}
          onEdit={(e) => handleEdit(e)}
        />
      </div>
    </div>
  );
};

function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}
export const ZestyExplorer = ({ content }) => {
  const [open, setOpen] = React.useState(false);
  let searchObject = { ...content };
  // unset navigations for faster search
  delete searchObject.navigationTree;
  // custom nav tree building
  delete searchObject.navigationCustom;

  let buttonStyles = {
    borderRadius: '5px',
    padding: '12px 24px 12px 16px',
    background: '#1b202c',
    color: 'white',
    border: '1px #5B667D solid',
    boxShadow: '3px 3px 8px rgba(0,0,0,.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };
  let zestyStyles = {
    flex: '1',
    display: 'inline-block',
    alignSelf: 'center',
    marginLeft: '12px',
    fontSize: '18px',
    color: '#C7D4EA',
    letterSpacing: '1px',
    fontFamily: "'Arial Rounded MT Bold','Helvetica Rounded',Arial,sans-serif",
  };

  if (!canUseDOM()) {
    return null;
  }
  return (
    <div
      style={{
        overflow: 'hidden',
        width: 'auto',
        background: 'transparent',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999999999999999',
        padding: '2rem',
      }}
    >
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={buttonStyles}
        >
          <img
            src="https://storage.googleapis.com/brand-assets.zesty.io/zesty-io-app-icon-transparent.png"
            width="32px"
            height="32px"
            alt="Zesty.io Logo"
          />
          <span style={zestyStyles}>Explorer</span>
        </button>
      )}
      {open && (
        <div>
          <ZestyExplorerBrowser content={searchObject}>
            <button onClick={() => setOpen(false)}>Close</button>
          </ZestyExplorerBrowser>
        </div>
      )}
    </div>
  );
};

export default React.memo(ZestyExplorer);
