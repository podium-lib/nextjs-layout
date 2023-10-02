import fastifyPodlet from '@podium/fastify-podlet';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import Podlet from '@podium/podlet';
import cors from '@fastify/cors'

const app = Fastify({
    logger: true
});

await app.register(cors, {});

const podlet = new Podlet({
    pathname: '/',
    version: '2.0.0',
    name: 'header',
    development: true
});

podlet.js({
    value: '/static/podlet-client.js',
    type: 'module',
});

app.register(fastifyPodlet, podlet);

app.register(fastifyStatic, {
    root: new URL('./static', import.meta.url),
    prefix: '/static',
});

app.get('/', async (request, reply) => {
    console.log(reply.app.podium.context);
    reply.podiumSend(`
    <menu-toggle>
    <template shadowrootmode="open">
        <button>
        <slot></slot>
        </button>
    </template>
    Web Component - Requested by: ${reply.app.podium.context.requestedBy}
    </menu-toggle>
    <script>
    // From: https://github.com/web-platform-tests/wpt/blob/master/resources/declarative-shadow-dom-polyfill.js
    window.dsd = (root) => {
        if (HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode')) {
            return;
        }

        const element = root ? root : document?.currentScript?.previousElementSibling;

        element.querySelectorAll("template[shadowrootmode]").forEach(template => {
            const mode = template.getAttribute("shadowrootmode");
            const delegatesFocus = template.hasAttribute("shadowrootdelegatesfocus");
            const shadowRoot = template.parentNode.attachShadow({ mode, delegatesFocus });
            shadowRoot.appendChild(template.content);
            template.remove();                            
            window.dsd(shadowRoot);
        });
    }
    </script>
  `);
});

app.get(podlet.manifest(), async (request, reply) => {
    reply.send(podlet);
});

try {
  await app.listen({ port: 7070 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}