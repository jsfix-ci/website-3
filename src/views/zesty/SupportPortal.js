/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Support Portal 
 * Name: support_portal 
 * Model ZUID: 6-e09983b2d4-8nkd81
 * File Created On: Wed Jun 15 2022 11:15:42 GMT-0700 (Pacific Daylight Time)
 * 
 * Model Fields:
 * 
  * title (text)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-e09983b2d4-8nkd81
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React, {useState, useEffect }  from 'react';
// needed for auth token cookie and instance zuid
import { getCookie } from "cookies-next";
// import for ZestyAPI fetchwrapper
import { useZestyStore } from 'store';


function SupportPortal({content}) {
    // dummy data
    const dummyObj = {
        instanceZUID: '8-c0ada7edaf-lm0bh4',
        userAppSID: 'ed8f637f6f3ff4ed7a7369ffbca4f4b101f24824',
        devAppSID: '679e4f9c114b3bb1b63c285619350fcd7bc681d4',
        userZUID: '5-a2a7e180eb-48041b'
    };
    // ZestyAPI config
    const ZestyAPI = useZestyStore((state) => state.ZestyAPI);
    
    // states
    const [user, setUser] = useState({})
    // cookies needed to trigger ZestyAPI
    const instanceZUID = getCookie('ZESTY_WORKING_INSTANCE');
    const userAppSID = getCookie('APP_SID');
    // ZestyAPI instantiation
    // const ZestyAPI = new Zesty.FetchWrapper(dummyObj.instanceZUID, dummyObj.userAppSID);

    const getUser = async (userZUID) => {
        try {
            const userData = await ZestyAPI.getUser(userZUID);

            console.log(userData);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const verifyUser = async () => {
        try {
            console.log(userAppSID);
            console.log(dummyObj.userAppSID);
            // for production
            // const verifyData = await ZestyAPI.verify(userAppSID);
            // for dev
            const verifyData = await ZestyAPI.verify(dummyObj.devAppSID);

            console.log(verifyData);

            if(verifyData.status === 'OK'){
                console.log(verifyData.meta);
                // setUser(verifyData.meta);
                // getUser(user.userZuid);
            };
            
        } catch (error) {
            console.log(error);
        };
    }

    // useeffect - no endless loops
    useEffect(() => {
        // verify user and get user zuid
        verifyUser();
    },[])



    return (
        <>
            {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
            <h1 dangerouslySetInnerHTML={{__html:content.meta.web.seo_meta_title}}></h1>
            <div>{content.meta.web.seo_meta_description}</div>
            <div style={{background: '#eee', border: '1px #000 solid', margin: '10px', padding: '20px'}}>
                <h2>Accessible Zesty.io JSON Object</h2>
                <pre>{JSON.stringify(content, null, 2)}</pre>
            </div>
            {/* End of Zesty.io output example */}
        </>
    );
}
  
export default SupportPortal;
