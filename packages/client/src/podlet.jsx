import Script from 'next/script'

const ServerSide = ({ content }) => {
    return (<section dangerouslySetInnerHTML={{ __html: content }} suppressHydrationWarning />);
}

// Expects an array of objects of this shape: https://github.com/podium-lib/utils/blob/master/lib/asset-js.js
const  ClientSide = ({ js }) => {
    const scripts = js.map((script, index) => {
        return (<Script key={index} src={script.value} type={script.type} strategy="afterInteractive" />)
    });

    return (<>
        {scripts}
    </>)
}

// Expects this object shape: https://github.com/podium-lib/client/blob/master/lib/response.js
export function Podlet({ render }) {    
    return (
        <>
            <ServerSide content={render.content} />
            <ClientSide js={render.js} />
        </>
    )
}
