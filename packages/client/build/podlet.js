import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Script from "next/script";
const ServerSide = ({ content }) => {
  return /* @__PURE__ */ jsx("section", { dangerouslySetInnerHTML: { __html: content }, suppressHydrationWarning: true });
};
const ClientSide = ({ js }) => {
  const scripts = js.map((script, index) => {
    return /* @__PURE__ */ jsx(Script, { src: script.value, type: script.type, strategy: "afterInteractive" }, index);
  });
  return /* @__PURE__ */ jsx(Fragment, { children: scripts });
};
function Podlet({ render }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ServerSide, { content: render.content }),
    /* @__PURE__ */ jsx(ClientSide, { js: render.js })
  ] });
}
export {
  Podlet
};
