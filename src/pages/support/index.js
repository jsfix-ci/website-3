import React from "react";
import Support from "./[...slug]";


// Support Index delivery
function SupportIndex(content){
    return <Support {...content} />
}

// export support index
export default SupportIndex;

// server side props -- gets called every request
// commented out to allow rendering until server side props is defined
// export async function getServerSideProps(ctx){
//     // returns what for support?
//     return;
// }
