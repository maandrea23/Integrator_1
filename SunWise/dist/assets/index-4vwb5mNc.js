(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`http://localhost:3000/api`.replace(/\/$/,``),t=e=>new Promise(t=>setTimeout(t,e));async function n(n,r){try{return await fetch(n,r)}catch(i){await t(500);try{return await fetch(n,r)}catch{let t=Error(`No se pudo conectar con la API (${e}). Inicia el proyecto desde Integrator_1 con "npm run dev".`);throw t.code=`API_UNREACHABLE`,t.cause=i,t}}}async function r(t,r={}){let i=localStorage.getItem(`sunwise_token`),a=await n(`${e}${t}`,{...r,headers:{"Content-Type":`application/json`,...i&&{Authorization:`Bearer ${i}`},...r.headers}}),o=a.status===204?null:await a.json().catch(()=>({}));if(!a.ok){let e=Error(o?.error||`No fue posible completar la solicitud`);throw e.status=a.status,e.details=o?.details,a.status===401&&localStorage.removeItem(`sunwise_token`),e}return o}var i=e=>r(`/auth/login`,{method:`POST`,body:JSON.stringify(e)}),a=e=>r(`/auth/register`,{method:`POST`,body:JSON.stringify(e)}),o=()=>r(`/auth/me`),s=`sunwise_user`,c=`sunwise_token`;function l(e){localStorage.setItem(c,e.token),localStorage.setItem(s,JSON.stringify(e.user))}function u(){localStorage.removeItem(c),localStorage.removeItem(s)}function d(){try{return JSON.parse(localStorage.getItem(s))}catch{return null}}var f=()=>!!localStorage.getItem(c);async function ee(){if(!f())return null;try{let{user:e}=await o();return localStorage.setItem(s,JSON.stringify(e)),e}catch{return u(),null}}function p(e=d()?.role){return{admin:`/admin`,installer:`/installer`,provider:`/provider`,user:`/dashboard`}[e]||`/login`}var m=(e=``)=>String(e).replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e]);function h(e,t,n=`error`){e&&(e.textContent=t,e.className=`form-feedback ${n}`)}var g=e=>new Intl.NumberFormat(`es-CO`,{style:`currency`,currency:`COP`,maximumFractionDigits:0}).format(Number(e||0)),_=(e,t=1)=>new Intl.NumberFormat(`es-CO`,{maximumFractionDigits:t}).format(Number(e||0));function v(){let e=d(),t=window.location.hash.slice(1).split(`?`)[0]||`/`,n=(e,n,r)=>`<a href="#${e}" id="${n}" class="nav-btn${t===e?` active`:``}" ${t===e?`aria-current="page"`:``}>${r}</a>`,r=e?`<a href="#${p(e.role)}" class="btn-outline">${m(e.name.split(` `)[0])}</a><button id="btn-logout" class="btn-primary">Salir</button>`:`<a href="#/register" id="btn-register" class="btn-outline">Registrarse</a><a href="#/login" class="btn-primary">Ingresar</a>`;return`<header class="navbar">
    <a class="logo" href="#/" aria-label="Ir al inicio"><span>Sun</span>wise</a>
    <nav class="nav-center">
      ${n(`/`,`btn-home`,`Inicio`)}
      ${n(`/wizard`,`btn-wizard`,`Simular`)}
      ${n(`/marketplace`,`btn-marketplace`,`Marketplace`)}
      ${n(`/installers`,`btn-installers`,`Instaladores`)}
    </nav>
    <div class="nav-right">${r}</div>
    <button class="menu-hamburger" type="button" aria-label="Abrir menú"><span></span><span></span><span></span></button>
  </header>`}function y(){document.getElementById(`btn-logout`)?.addEventListener(`click`,()=>{u(),window.location.hash=`/`});let e=document.querySelector(`.menu-hamburger`),t=document.querySelector(`.nav-center`);e&&t&&(e.addEventListener(`click`,()=>t.classList.toggle(`show`)),t.querySelectorAll(`a`).forEach(e=>e.addEventListener(`click`,()=>t.classList.remove(`show`))))}function te(){return`
  <!--green side stripe -->
  <div class="hero-stripe"></div>
  
  <section class="hero">
      <div class="overlay"></div>

      <div class="hero-content">
        <div class="left">
          <div class="badge-top">
            ✨ Dimensionamiento fotovoltaico moderno y gratuito
          </div>

          <h1>
            Tu sistema solar,<br>
            <span>dimensionado</span> en minutos
          </h1>

          <p>
            Sin complicaciones técnicas. Ingresa tu consumo actual y obtén el número exacto de paneles, inversores y costos aproximados en tiempo récord.
          </p>

          <div class="cta">
            <a href="#/wizard" class="btn-primary big">Calcular mi sistema →</a>
            <a href="#/installers" class="btn-outline big">Ver instaladores</a>
          </div>
        </div>
  `}function ne(){return`
            <div class="card">
                <div class="badge-free">¡100% gratis!</div>   

                <div class="card-header">
                    <div class="icon-avatar">⚡</div>
                <div>
                    <p class="small">RESULTADO ESTIMADO</p>
                    <h3>Sistema Residencial 5 kWp</h3>
                </div>
            </div>    
            <div class="grid">
              <div class="box gray">
                <p>Paneles solares</p>
                <strong>10 un.</strong>
              </div>

              <div class="box gray">
                <p>Inversor</p>
                <strong>5 kW</strong>
              </div>

              <div class="box green">
                <p>Producción/mes</p>
                <strong>580 kWh</strong>
              </div>

              <div class="box orange">
                <p>Ahorro mensual</p>
                <strong>$180.000</strong>
              </div>
            </div>   

            <div class="bottom">
              <div>
                <p>Inversión estimada</p>
                <strong>$12.500.000</strong>
              </div>

              <div>
                <p>Retorno</p>
                <strong class="green-text">6.2 años</strong>
              </div>
            </div> 

            <div class="progress-container">
              <div class="progress"></div>
            </div>
        </div>
      </div>
    </section>
  </div>
  `}function re(){return`
    <section class="stats-bar">
        <div class="stats-container">
          <div class="stat-item">
            <h2>4,200+</h2>
            <p>Simulaciones realizadas</p>
          </div>    
          <div class="stat-item">
            <h2>312</h2>
            <p>Instaladores certificados</p>
          </div>    
          <div class="stat-item">
            <h2>98%</h2>
            <p>Precisión de cálculo</p>
          </div>    
          <div class="stat-item">
            <h2>$0</h2>
            <p>Costo de la simulación</p>
          </div>
        </div>
      </section>
  `}var b=[{id:1,icon:`📝`,title:`Ingresa tus datos`,description:`Escribe tu consumo mensual o responde unas preguntas sobre tu vivienda.`},{id:2,icon:`⚡`,title:`Calculamos tu sistema`,description:`Nuestro algoritmo estima paneles, inversor y producción necesaria.`},{id:3,icon:`📊`,title:`Revisa los resultados`,description:`Visualiza ahorro, inversión, retorno y producción mensual.`},{id:4,icon:`📄`,title:`Descarga tu reporte`,description:`Obtén una cotización lista para compartir con un instalador.`}];function x(){return`
        <section class="how-it-works">

            <div class="section-title">

                <span class="tag">
                    ¿Cómo funciona?
                </span>

                <h2>
                    Dimensiona tu sistema en 4 pasos
                </h2>

                <p>
                    Obtén una estimación completa en pocos minutos.
                </p>

            </div>

            <div class="steps">

                ${b.map(e=>`
        <div class="step-card">

            <span class="step-number">${e.id}</span>

            <div class="step-icon">
                ${e.icon}
            </div>

            <h3>${e.title}</h3>

            <p>${e.description}</p>

        </div>
    `).join(``)}

            </div>

        </section>
    `}var ie=[{icon:`🔬`,title:`Cálculo Preciso`,description:`Nuestro algoritmo calcula el número ideal de paneles e inversores según tu consumo.`},{icon:`💰`,title:`Análisis Financiero`,description:`Conoce el costo estimado, el ahorro mensual y el tiempo de retorno de tu inversión.`},{icon:`🌍`,title:`Impacto ambiental`,description:`Descubre cuánto CO₂ dejarás de emitir al utilizar energía solar.`}];function ae(){return`

        <section class="benefits">

            <div class="section-title">

                <span class="tag">
                    ¿Por qué Sunwise?
                </span>

                <h2>
                    Todo lo que necesitas para decidir
                </h2>

                <p>
                    Herramientas inteligentes para calcular tu sistema fotovoltaico.
                </p>

            </div>

            <div class="benefits-grid">

                ${ie.map(e=>`
        <div class="benefit-card">

            <div class="benefit-icon">
                ${e.icon}
            </div>

            <h3>${e.title}</h3>

            <p>${e.description}</p>

        </div>
    `).join(``)}

            </div>

        </section>

    `}function oe(){return`
    <section class="cta-home">

        <div class="cta-home-container">

            <span class="cta-home-badge">
                ⚡ Empieza gratis
            </span>

            <h2 class="cta-home-title">
                ¿Listo para calcular tu sistema solar?
            </h2>

            <p class="cta-home-text">
                Obtén una estimación personalizada en menos de 2 minutos.
                Descubre cuánto puedes ahorrar con energía solar.
            </p>

            <div class="cta-home-buttons">

                <a class="btn-primary" href="#calculator">
                    Calcular mi sistema
                </a>

                <a class="btn-secondary" href="#installers">
                    Ver instaladores
                </a>

            </div>
        </div>
    </section>
    `}function S(){return`

    <footer class="footer">

        <div class="footer-container">

            <div class="footer-top">

                <div class="footer-brand">

                    <h2>
                         <span>Sun</span>wise
                    </h2>

                    <p>
                        Calcula tu sistema de energía solar de forma rápida,
                        sencilla y precisa.
                    </p>

                </div>

                <div class="footer-links">

                    <div class="footer-column">

                        <h3>Producto</h3>

                        <a href="#/wizard">Simular</a>

                        <a href="#/marketplace">Marketplace</a>

                        <a href="#/installers">Instaladores</a>

                    </div>

                    <div class="footer-column">

                        <h3>Empresa</h3>

                        <a href="#">Sobre nosotros</a>

                        <a href="#">Blog</a>

                        <a href="#">Contacto</a>

                    </div>

                    <div class="footer-column">

                        <h3>Legal</h3>

                        <a href="#">Privacidad</a>

                        <a href="#">Términos</a>

                        <a href="#">Cookies</a>

                    </div>

                </div>

            </div>

            <div class="footer-bottom">

                <p>
                    © 2026 Sunwise. Todos los derechos reservados.
                </p>

                <div class="footer-social">

                    <a href="#">🌐</a>

                    <a href="#">💼</a>

                    <a href="#">📷</a>

                </div>

            </div>

        </div>

    </footer>

    `}function se(){return setTimeout(()=>{y()},0),`
    ${v()}
    ${te()}
    ${ne()}
    ${re()}
    ${x()}
    ${ae()}
    ${oe()}
    ${S()}
  `}var ce=e=>r(`/estimates`,{method:`POST`,body:JSON.stringify(e)}),C=()=>r(`/estimates`),le=e=>r(`/estimates/${e}`),ue=e=>r(`/estimates/${e}`,{method:`DELETE`}),w=(e,t)=>r(`/estimates/${e}/contacts`,{method:`POST`,body:JSON.stringify(t)}),de=()=>r(`/catalog/cities`),fe=()=>r(`/catalog/appliances`);function pe(){return setTimeout(async()=>{y();let e=document.getElementById(`estimate-form`),t=document.getElementById(`cityHspId`),n=document.getElementById(`appliance-list`);try{let[{cities:e},{appliances:r}]=await Promise.all([de(),fe()]);t.innerHTML=`<option value="">Selecciona tu ciudad</option>${e.map(e=>`<option value="${e.id}">${m(e.city)} — ${e.hsp} HSP</option>`).join(``)}`,n.innerHTML=r.map(e=>`<label class="appliance-row"><input type="checkbox" data-appliance-id="${e.id}" data-power="${e.standardPowerW}" data-coincidence="${e.coincidenceFactor}"><span>${m(e.name)} <small>${e.standardPowerW} W</small></span><input class="quantity" type="number" min="1" value="1" aria-label="Cantidad"><input class="hours" type="number" min="0.1" step="0.1" value="${e.defaultHoursPerDay}" aria-label="Horas por día"></label>`).join(``)}catch(e){h(document.getElementById(`wizard-feedback`),e.message)}document.querySelectorAll(`[name=inputMethod]`).forEach(e=>e.addEventListener(`change`,()=>{let t=e.value===`appliances`&&e.checked;document.getElementById(`consumption-fields`).hidden=t,document.getElementById(`inventory-fields`).hidden=!t})),e?.addEventListener(`submit`,async t=>{if(t.preventDefault(),!f()){sessionStorage.setItem(`sunwise_return`,`/wizard`),window.location.hash=`/login`;return}let n=Object.fromEntries(new FormData(e));n.inputMethod===`appliances`&&(n.appliances=[...document.querySelectorAll(`.appliance-row`)].filter(e=>e.querySelector(`[type=checkbox]`).checked).map(e=>({applianceId:Number(e.querySelector(`[type=checkbox]`).dataset.applianceId),powerW:Number(e.querySelector(`[type=checkbox]`).dataset.power),coincidenceFactor:Number(e.querySelector(`[type=checkbox]`).dataset.coincidence),quantity:Number(e.querySelector(`.quantity`).value),hoursPerDay:Number(e.querySelector(`.hours`).value)})));try{let{estimate:e}=await ce(n);window.location.hash=`/results?id=${e.id}`}catch(e){h(document.getElementById(`wizard-feedback`),e.details?.join(`. `)||e.message)}})},0),`${v()}<main class="app-page wizard-page"><header class="page-heading centered"><span class="badge-top">Cálculo técnico</span><h1>Dimensiona tu sistema</h1><p>Elige el camino que mejor describe la información que tienes.</p></header><form id="estimate-form" class="wizard-card"><div class="method-selector"><label><input type="radio" name="inputMethod" value="monthly_consumption" checked><strong>Conozco mi consumo</strong><span>Usa los kWh de tu factura.</span></label><label><input type="radio" name="inputMethod" value="appliances"><strong>Inventario de equipos</strong><span>Estimamos desde tus cargas.</span></label></div><div class="form-grid"><label class="form-field"><span>Ciudad *</span><select id="cityHspId" name="cityHspId" required><option>Cargando…</option></select></label><label class="form-field"><span>Eficiencia global</span><input name="efficiency" type="number" min="0.75" max="0.80" step="0.01" value="0.78"></label></div><section id="consumption-fields" class="form-grid"><label class="form-field"><span>Consumo mensual (kWh) *</span><input name="monthlyConsumptionKwh" type="number" min="0.01" step="0.01" value="300"></label><label class="form-field"><span>Potencia coincidente pico (W) *</span><input name="peakCoincidentPowerW" type="number" min="1" value="2500"></label></section><section id="inventory-fields" hidden><div class="appliance-head"><strong>Equipo</strong><span>Cantidad · Horas/día</span></div><div id="appliance-list"></div></section><details class="technical-details"><summary>Parámetros técnicos</summary><div class="form-grid"><label class="form-field"><span>Panel nominal (W)</span><input name="panelNominalPowerW" type="number" min="1" value="550"></label><label class="form-field"><span>Isc del panel (A)</span><input name="panelIscA" type="number" min="0.01" step="0.01" value="13.9"></label><label class="form-field"><span>Voc del panel (V)</span><input name="panelVocV" type="number" min="0.01" step="0.01" value="49.9"></label><label class="form-field"><span>Voltaje del sistema (V)</span><input name="systemVoltageV" type="number" min="1" value="48"></label><label class="form-field"><span>Días de autonomía</span><input name="autonomyDays" type="number" min="0.1" step="0.1" value="1"></label><label class="form-field"><span>DOD batería</span><input name="batteryDod" type="number" min="0.1" max="1" step="0.1" value="0.8"></label></div></details><div id="wizard-feedback" aria-live="polite"></div><button class="btn-primary big" type="submit">Calcular sistema →</button></form></main>`}function T(e=`Cargando información…`){return`<div class="loading-state"><span class="loader"></span><p>${e}</p></div>`}function E({id:e,title:t,content:n}){return`<dialog id="${e}" class="app-modal"><div class="modal-head"><h2>${t}</h2><button class="icon-button" data-close-modal="${e}" aria-label="Cerrar">×</button></div>${n}</dialog>`}function D(e=document){e.querySelectorAll(`[data-close-modal]`).forEach(e=>e.addEventListener(`click`,()=>document.getElementById(e.dataset.closeModal)?.close()))}var O=(e=``)=>r(`/catalog/products${e?`?category=${encodeURIComponent(e)}`:``}`),k=()=>r(`/providers/me`),A=e=>r(`/providers/me`,{method:`PATCH`,body:JSON.stringify(e)}),j=()=>r(`/providers/products`),M=e=>r(`/providers/products`,{method:`POST`,body:JSON.stringify(e)}),N=(e,t)=>r(`/providers/products/${e}`,{method:`PATCH`,body:JSON.stringify(t)}),P=e=>r(`/providers/products/${e}`,{method:`DELETE`}),F=()=>r(`/providers/contacts`);function I(){let e=null,t=async(t=``)=>{let n=document.getElementById(`product-grid`);n.innerHTML=T();try{let{products:r}=await O(t);n.innerHTML=r.length?r.map(e=>`<article class="product-card"><div class="product-visual">${{panel:`▦`,inverter:`⚡`,battery:`▣`,cable:`⌁`,protection:`◈`}[e.category]}</div><span class="product-category">${m(e.category)}</span><h3>${m(e.name)}</h3><p>${m(e.description||`${e.brand||``} ${e.model||``}`)}</p><div class="product-bottom"><strong>${g(e.price)}</strong><small>${e.stock} disponibles</small></div><div class="provider-line"><span>${m(e.provider.storeName)} · ★ ${e.provider.rating}</span><button class="btn-outline" data-contact-provider="${e.provider.id}">Contactar</button></div></article>`).join(``):`<div class="empty-state">No hay productos en esta categoría.</div>`,n.querySelectorAll(`[data-contact-provider]`).forEach(t=>t.addEventListener(`click`,async()=>{if(!f()||d()?.role!==`user`){window.location.hash=`/login`;return}e=Number(t.dataset.contactProvider);let{estimates:n}=await C();document.getElementById(`contact-estimate`).innerHTML=n.map(e=>`<option value="${e.id}">Cotización #${e.id} · ${e.cityHsp.city}</option>`).join(``),document.getElementById(`contact-modal`).showModal()}))}catch(e){n.innerHTML=`<div class="empty-state error">${m(e.message)}</div>`}};return setTimeout(()=>{y(),D(),t(),document.getElementById(`category-filter`)?.addEventListener(`change`,e=>t(e.target.value)),document.getElementById(`contact-form`)?.addEventListener(`submit`,async t=>{t.preventDefault();try{await w(t.currentTarget.estimateId.value,{providerId:e,message:t.currentTarget.message.value}),h(document.getElementById(`contact-feedback`),`Solicitud enviada al proveedor.`,`success`)}catch(e){h(document.getElementById(`contact-feedback`),e.message)}})},0),`${v()}<main class="app-page catalog-page"><header class="page-heading"><span class="badge-top">Proveedores verificados</span><h1>Marketplace solar</h1><p>Encuentra equipos y materiales publicados por tiendas aprobadas.</p></header><div class="catalog-toolbar"><label>Filtrar por categoría <select id="category-filter"><option value="">Todos</option><option value="panel">Paneles</option><option value="inverter">Inversores</option><option value="battery">Baterías</option><option value="cable">Cables</option><option value="protection">Protecciones</option></select></label></div><section id="product-grid" class="product-grid">${T()}</section></main>${E({id:`contact-modal`,title:`Contactar proveedor`,content:`<form id="contact-form" class="app-form"><label class="form-field"><span>Cotización</span><select id="contact-estimate" name="estimateId"></select></label><label class="form-field"><span>Mensaje</span><textarea name="message" required>Quiero información y disponibilidad para los materiales de mi cotización.</textarea></label><div id="contact-feedback"></div><button class="btn-primary" type="submit">Enviar solicitud</button></form>`})}${S()}`}var L=(e=``)=>r(`/catalog/installers${e?`?city=${encodeURIComponent(e)}`:``}`),R=()=>r(`/installers/me`),z=e=>r(`/installers/me`,{method:`PATCH`,body:JSON.stringify(e)}),B=()=>r(`/installers/contacts`),me=(e,t)=>r(`/installers/contacts/${e}`,{method:`PATCH`,body:JSON.stringify({status:t})});function he(){let e=null;return setTimeout(async()=>{y(),D();let t=document.getElementById(`installer-grid`);try{let{installers:n}=await L();t.innerHTML=n.length?n.map(e=>`<article class="installer-card"><div class="installer-avatar">${m(e.companyName.slice(0,2).toUpperCase())}</div><div><span class="status-badge approved">Verificado</span><h3>${m(e.companyName)}</h3><p>${m(e.bio||`Especialista en sistemas fotovoltaicos.`)}</p><div class="installer-meta"><span>⌖ ${m(e.city)}</span><span>★ ${e.rating}</span><span>${e.available?`Disponible`:`No disponible`}</span></div></div><button class="btn-primary" data-contact-installer="${e.id}" ${e.available?``:`disabled`}>Solicitar contacto</button></article>`).join(``):`<div class="empty-state">No hay instaladores verificados disponibles.</div>`,t.querySelectorAll(`[data-contact-installer]`).forEach(t=>t.addEventListener(`click`,async()=>{if(!f()||d()?.role!==`user`){window.location.hash=`/login`;return}e=Number(t.dataset.contactInstaller);let{estimates:n}=await C();document.getElementById(`installer-estimate`).innerHTML=n.map(e=>`<option value="${e.id}">Cotización #${e.id} · ${e.cityHsp.city}</option>`).join(``),document.getElementById(`installer-modal`).showModal()}))}catch(e){t.innerHTML=`<div class="empty-state error">${m(e.message)}</div>`}document.getElementById(`installer-contact-form`)?.addEventListener(`submit`,async t=>{t.preventDefault();try{await w(t.currentTarget.estimateId.value,{installerId:e,message:t.currentTarget.message.value}),h(document.getElementById(`installer-feedback`),`Solicitud enviada al instalador.`,`success`)}catch(e){h(document.getElementById(`installer-feedback`),e.message)}})},0),`${v()}<main class="app-page catalog-page"><header class="page-heading centered"><span class="badge-top">Red profesional</span><h1>Instaladores verificados</h1><p>Comparte tu cálculo con profesionales aprobados por SunWise.</p></header><section id="installer-grid" class="installer-grid">${T()}</section></main>${E({id:`installer-modal`,title:`Solicitar contacto`,content:`<form id="installer-contact-form" class="app-form"><label class="form-field"><span>Cotización</span><select id="installer-estimate" name="estimateId"></select></label><label class="form-field"><span>Mensaje</span><textarea name="message" required>Quiero recibir una propuesta de instalación para esta cotización.</textarea></label><div id="installer-feedback"></div><button class="btn-primary" type="submit">Enviar solicitud</button></form>`})}${S()}`}function V({id:e,name:t=e,label:n,type:r=`text`,value:i=``,required:a=!1,min:o,max:s,step:c,placeholder:l=``}){return`<label class="form-field" for="${e}"><span>${n}${a?` *`:``}</span><input id="${e}" name="${t}" type="${r}" value="${i}" placeholder="${l}" ${a?`required`:``} ${o===void 0?``:`min="${o}"`} ${s===void 0?``:`max="${s}"`} ${c===void 0?``:`step="${c}"`}></label>`}function ge(){return setTimeout(()=>{y(),document.getElementById(`login-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`login-feedback`),n=e.currentTarget.querySelector(`button`);n.disabled=!0;try{let t=await i(Object.fromEntries(new FormData(e.currentTarget)));l(t);let n=t.user.role===`user`?sessionStorage.getItem(`sunwise_return`):null;sessionStorage.removeItem(`sunwise_return`),window.location.hash=n||p(t.user.role)}catch(e){h(t,e.details?.join(`. `)||e.message)}finally{n.disabled=!1}})},0),`${v()}<main class="auth-page"><section class="auth-card"><span class="badge-top">Bienvenido de nuevo</span><h1>Inicia sesión</h1><p>Consulta tus cotizaciones y continúa diseñando tu sistema solar.</p><form id="login-form" class="app-form">${V({id:`email`,label:`Correo electrónico`,type:`email`,required:!0})}${V({id:`password`,label:`Contraseña`,type:`password`,required:!0})}<div id="login-feedback" aria-live="polite"></div><button class="btn-primary big" type="submit">Ingresar</button></form><p class="auth-switch">¿Aún no tienes cuenta? <a href="#/register">Regístrate</a></p></section></main>`}function _e(){return setTimeout(()=>{y();let e=document.getElementById(`role`),t=document.getElementById(`professional-fields`),n=()=>{let n=[`installer`,`provider`].includes(e.value);t.hidden=!n,document.getElementById(`company-label`).textContent=e.value===`provider`?`Nombre de la tienda *`:`Nombre de la empresa *`};e.addEventListener(`change`,n),n(),document.getElementById(`register-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=Object.fromEntries(new FormData(e.currentTarget));t.role===`installer`&&(t.companyName=t.company),t.role===`provider`&&(t.storeName=t.company),delete t.company;let n=document.getElementById(`register-feedback`),r=e.currentTarget.querySelector(`button`);r.disabled=!0;try{let e=await a(t);l(e),window.location.hash=p(e.user.role)}catch(e){h(n,e.details?.join(`. `)||e.message)}finally{r.disabled=!1}})},0),`${v()}<main class="auth-page"><section class="auth-card wide"><span class="badge-top">Únete a SunWise</span><h1>Crea tu cuenta</h1><p>Los instaladores y proveedores quedan pendientes hasta la revisión del administrador.</p><form id="register-form" class="app-form form-grid">${V({id:`name`,label:`Nombre completo`,required:!0})}${V({id:`email`,label:`Correo electrónico`,type:`email`,required:!0})}${V({id:`phone`,label:`Teléfono`,type:`tel`,required:!0,placeholder:`+57 300 000 0000`})}${V({id:`password`,label:`Contraseña (mínimo 8 caracteres)`,type:`password`,required:!0})}<label class="form-field"><span>Tipo de cuenta *</span><select id="role" name="role"><option value="user">Usuario</option><option value="installer">Instalador</option><option value="provider">Proveedor</option></select></label><div id="professional-fields" class="professional-fields"><label class="form-field"><span id="company-label">Nombre de empresa *</span><input name="company"></label>${V({id:`city`,label:`Ciudad`})}</div><div id="register-feedback" class="full-field" aria-live="polite"></div><button class="btn-primary big full-field" type="submit">Crear cuenta</button></form><p class="auth-switch">¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a></p></section></main>`}var ve={user:`Mi energía`,admin:`Administración`,installer:`Panel instalador`,provider:`Panel proveedor`};function H({title:e,subtitle:t,content:n}){let r=d();return`${v()}<main class="app-page dashboard-page"><header class="page-heading"><span class="badge-top">${ve[r?.role]||`SunWise`}</span><h1>${e}</h1><p>${t}</p></header>${n}</main>`}function U({label:e,value:t,icon:n=`☀`}){return`<article class="summary-card"><span class="summary-icon">${n}</span><div><p>${e}</p><strong>${t}</strong></div></article>`}function ye(){let e=d();return setTimeout(async()=>{y();let e=document.getElementById(`client-summary`);try{let{estimates:t}=await C(),n=t[0];e.innerHTML=`<div class="summary-grid">${U({label:`Cotizaciones`,value:t.length,icon:`▤`})}${U({label:`Último consumo`,value:n?`${_(n.monthlyConsumptionKwh)} kWh`:`—`,icon:`⚡`})}${U({label:`Paneles sugeridos`,value:n?.panelCount||`—`,icon:`▦`})}</div><div class="quick-actions"><a class="action-card" href="#/wizard"><span>☀</span><div><h3>Nueva simulación</h3><p>Calcula otro escenario solar.</p></div></a><a class="action-card" href="#/history"><span>▤</span><div><h3>Ver historial</h3><p>Recupera recetas anteriores.</p></div></a><a class="action-card" href="#/marketplace"><span>◫</span><div><h3>Marketplace</h3><p>Explora materiales verificados.</p></div></a></div>`}catch(t){e.innerHTML=`<div class="empty-state error">${t.message}</div>`}},0),H({title:`Hola, ${be(e?.name?.split(` `)[0]||``)}`,subtitle:`Aquí tienes el estado de tus proyectos solares.`,content:`<div id="client-summary">${T()}</div>`})}function be(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function W({headers:e,rows:t,empty:n=`No hay registros todavía.`}){return t.length?`<div class="table-wrap"><table class="data-table"><thead><tr>${e.map(e=>`<th>${e}</th>`).join(``)}</tr></thead><tbody>${t.join(``)}</tbody></table></div>`:`<div class="empty-state">${n}</div>`}function xe(){let e=async()=>{let t=document.getElementById(`history-content`);try{let{estimates:n}=await C();t.innerHTML=W({headers:[`Fecha`,`Ciudad`,`Consumo`,`Paneles`,`Estado`,`Acciones`],rows:n.map(e=>`<tr><td>${new Date(e.createdAt).toLocaleDateString(`es-CO`)}</td><td>${e.cityHsp.city}</td><td>${_(e.monthlyConsumptionKwh)} kWh</td><td>${e.panelCount}</td><td><span class="status-badge ${e.status}">${e.status}</span></td><td><a href="#/results?id=${e.id}" class="table-link">Ver</a><button class="table-link danger" data-delete-estimate="${e.id}">Eliminar</button></td></tr>`),empty:`Aún no has generado cotizaciones.`}),t.querySelectorAll(`[data-delete-estimate]`).forEach(t=>t.addEventListener(`click`,async()=>{confirm(`¿Eliminar esta cotización?`)&&(await ue(t.dataset.deleteEstimate),await e())}))}catch(e){t.innerHTML=`<div class="empty-state error">${e.message}</div>`}};return setTimeout(()=>{y(),e()},0),H({title:`Historial de cotizaciones`,subtitle:`Consulta cada cálculo y su receta de materiales.`,content:`<div id="history-content">${T()}</div>`})}var Se=e=>r(`/users/me`,{method:`PATCH`,body:JSON.stringify(e)});function Ce(){let e=d();return setTimeout(()=>{y(),document.getElementById(`profile-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=Object.fromEntries(new FormData(e.currentTarget));t.password||delete t.password;try{await Se(t),await ee(),h(document.getElementById(`profile-feedback`),`Perfil actualizado correctamente.`,`success`)}catch(e){h(document.getElementById(`profile-feedback`),e.message)}})},0),H({title:`Mi perfil`,subtitle:`Mantén tus datos de contacto actualizados.`,content:`<section class="app-card profile-card"><form id="profile-form" class="app-form form-grid">${V({id:`name`,label:`Nombre`,value:m(e?.name),required:!0})}${V({id:`email`,label:`Correo`,type:`email`,value:m(e?.email),required:!0})}${V({id:`phone`,label:`Teléfono`,type:`tel`,value:m(e?.phone),required:!0})}${V({id:`password`,label:`Nueva contraseña (opcional)`,type:`password`})}<div id="profile-feedback" class="full-field"></div><button class="btn-primary full-field" type="submit">Guardar cambios</button></form></section>`})}function we({query:e}){return setTimeout(async()=>{y();let t=document.getElementById(`result-content`);try{let{estimate:n}=await le(e.get(`id`));t.innerHTML=`<div class="summary-grid">${U({label:`Potencia del arreglo`,value:`${_(n.arrayPowerWp,0)} Wp`,icon:`☀`})}${U({label:`Paneles`,value:`${n.panelCount} unidades`,icon:`▦`})}${U({label:`Inversor`,value:`${_(n.inverterPowerW,0)} W`,icon:`⚡`})}${U({label:`Banco de baterías`,value:`${_(n.batteryBankAh,0)} Ah`,icon:`▣`})}</div><section class="app-card result-tech"><h2>Protecciones calculadas</h2><div class="metric-list"><div><span>Corriente de diseño</span><strong>${_(n.designCurrentA,2)} A</strong></div><div><span>Breaker CC (Isc × 1.4)</span><strong>${_(n.dcBreakerA,2)} A</strong></div><div><span>DPS (Voc total × 1.25)</span><strong>${_(n.surgeProtectionVoltageV,2)} V</strong></div></div></section><section class="app-card"><div class="section-row"><div><span class="badge-top">Receta técnica</span><h2>Materiales recomendados</h2></div><a class="btn-outline" href="#/installers">Contactar instalador</a></div><div class="recipe-grid">${n.materials.map(e=>`<article><span>${m(e.category)}</span><h3>${m(e.itemName)}</h3><strong>${_(e.quantity,2)} ${m(e.unit)}</strong><p>${m(e.specification||``)}</p></article>`).join(``)}</div></section>`}catch(e){t.innerHTML=`<div class="empty-state error">${m(e.message)}</div>`}},0),`${v()}<main class="app-page"><header class="page-heading"><span class="badge-top">Resultado guardado</span><h1>Tu sistema solar</h1><p>Dimensionamiento técnico calculado con los parámetros de tu proyecto.</p></header><div id="result-content">${T(`Calculando presentación de resultados…`)}</div></main>`}var Te=()=>r(`/admin/dashboard`),G=e=>r(`/admin/${e}`),Ee=(e,t)=>r(`/admin/${e}`,{method:`POST`,body:JSON.stringify(t)}),K=(e,t,n)=>r(`/admin/${e}/${t}`,{method:`PATCH`,body:JSON.stringify(n)}),De=(e,t)=>r(`/admin/${e}/${t}`,{method:`DELETE`}),Oe=[[`user`,`Usuario`],[`admin`,`Administrador`],[`installer`,`Instalador`],[`provider`,`Proveedor`]],q=[[`pending`,`Pendiente`],[`approved`,`Aprobado`],[`rejected`,`Rechazado`]],J=[[`panel`,`Panel`],[`inverter`,`Inversor`],[`battery`,`Batería`],[`cable`,`Cable`],[`protection`,`Protección`]],ke=[...J,[`structure`,`Estructura`],[`other`,`Otro`]],Y={installers:{label:`Instaladores`,fields:[{name:`name`,label:`Nombre responsable`,required:!0,source:`user`},{name:`email`,label:`Correo`,type:`email`,required:!0,source:`user`},{name:`phone`,label:`Teléfono`,type:`tel`,required:!0,source:`user`},{name:`password`,label:`Contraseña`,type:`password`,createRequired:!0},{name:`companyName`,label:`Empresa`,required:!0},{name:`city`,label:`Ciudad`,required:!0},{name:`certification`,label:`Certificación`},{name:`bio`,label:`Descripción`,type:`textarea`},{name:`verificationStatus`,label:`Verificación`,type:`select`,options:q,default:`pending`},{name:`rating`,label:`Calificación`,type:`number`,min:0,max:5,step:.1,default:0},{name:`available`,label:`Disponible`,type:`checkbox`,default:!0}]},providers:{label:`Proveedores`,fields:[{name:`name`,label:`Nombre responsable`,required:!0,source:`user`},{name:`email`,label:`Correo`,type:`email`,required:!0,source:`user`},{name:`phone`,label:`Teléfono`,type:`tel`,required:!0,source:`user`},{name:`password`,label:`Contraseña`,type:`password`,createRequired:!0},{name:`storeName`,label:`Tienda`,required:!0},{name:`city`,label:`Ciudad`,required:!0},{name:`description`,label:`Descripción`,type:`textarea`},{name:`verificationStatus`,label:`Verificación`,type:`select`,options:q,default:`pending`},{name:`rating`,label:`Calificación`,type:`number`,min:0,max:5,step:.1,default:0}]},products:{label:`Productos`,fields:[{name:`providerId`,label:`Proveedor`,type:`providerSelect`,required:!0},{name:`name`,label:`Producto`,required:!0},{name:`category`,label:`Categoría`,type:`select`,options:J,required:!0},{name:`brand`,label:`Marca`},{name:`model`,label:`Modelo`},{name:`price`,label:`Precio COP`,type:`number`,min:0,step:.01,required:!0},{name:`stock`,label:`Existencias`,type:`number`,min:0,step:1,required:!0},{name:`description`,label:`Descripción`,type:`textarea`},{name:`isActive`,label:`Publicado`,type:`checkbox`,default:!0}]},users:{label:`Usuarios`,fields:[{name:`name`,label:`Nombre`,required:!0},{name:`email`,label:`Correo`,type:`email`,required:!0},{name:`phone`,label:`Teléfono`,type:`tel`,required:!0},{name:`password`,label:`Contraseña`,type:`password`,createRequired:!0},{name:`role`,label:`Rol`,type:`select`,options:Oe,required:!0,default:`user`},{name:`isActive`,label:`Cuenta activa`,type:`checkbox`,default:!0}]},cities:{label:`Ciudades HSP`,fields:[{name:`city`,label:`Ciudad`,required:!0},{name:`department`,label:`Departamento`,required:!0},{name:`hsp`,label:`HSP`,type:`number`,min:.01,step:.01,required:!0}]},appliances:{label:`Electrodomésticos`,fields:[{name:`name`,label:`Nombre`,required:!0},{name:`standardPowerW`,label:`Potencia estándar (W)`,type:`number`,min:.01,required:!0},{name:`defaultHoursPerDay`,label:`Horas por día`,type:`number`,min:0,step:.1,required:!0},{name:`coincidenceFactor`,label:`Factor de coincidencia`,type:`number`,min:0,max:1,step:.01,required:!0}]},materials:{label:`Materiales`,fields:[{name:`estimateId`,label:`ID cotización`,type:`number`,min:1,required:!0},{name:`category`,label:`Categoría`,type:`select`,options:ke,required:!0},{name:`itemName`,label:`Material`,required:!0},{name:`quantity`,label:`Cantidad`,type:`number`,min:.01,step:.01,required:!0},{name:`unit`,label:`Unidad`,required:!0},{name:`specification`,label:`Especificación`,type:`textarea`}]},estimates:{label:`Cotizaciones`,createDisabled:!0,fields:[{name:`status`,label:`Estado`,type:`select`,options:[[`draft`,`Borrador`],[`completed`,`Completada`],[`archived`,`Archivada`]],required:!0}]}},X=e=>m(e??`—`);function Ae(){let e=`installers`,t=[],n=[],r=(e,t=`error`)=>h(document.getElementById(`admin-feedback`),e,t),i=async()=>{try{let{summary:e}=await Te();document.getElementById(`admin-summary`).innerHTML=[U({label:`Usuarios`,value:e.users,icon:`♙`}),U({label:`Instaladores pendientes`,value:e.installersPending,icon:`⌂`}),U({label:`Proveedores pendientes`,value:e.providersPending,icon:`◫`}),U({label:`Cotizaciones`,value:e.estimates,icon:`▤`})].join(``)}catch(e){r(e.message)}},a=e=>({main:e.name||e.companyName||e.storeName||e.itemName||e.city||`Cotización #${e.id}`,detail:e.email||e.user?.email||e.provider?.storeName||e.department||e.category||`${e.monthlyConsumptionKwh||``} kWh`,status:e.verificationStatus||e.status||(e.isActive===!1?`inactivo`:`activo`)}),o=async(e,t)=>{try{await e(),r(t,`success`),await Promise.all([s(),i()])}catch(e){r(e.details?.join(`. `)||e.message)}},s=async()=>{let n=document.getElementById(`admin-table`);n.innerHTML=T();try{let r=await G(e);t=r.items||r.estimates||[],n.innerHTML=W({headers:[`ID`,`Registro`,`Estado`,`Acciones`],rows:t.map(t=>{let{main:n,detail:r,status:i}=a(t),o=[`installers`,`providers`].includes(e)?`<button class="table-link" data-status="approved" data-id="${t.id}">Aprobar</button><button class="table-link danger" data-status="rejected" data-id="${t.id}">Rechazar</button>`:``;return`<tr><td>#${t.id}</td><td><strong>${X(n)}</strong><small>${X(r)}</small></td><td><span class="status-badge ${X(i)}">${X(i)}</span></td><td>${o}<button class="table-link" data-edit="${t.id}">Editar</button><button class="table-link danger" data-delete="${t.id}">Eliminar</button></td></tr>`}),empty:`No hay ${Y[e].label.toLowerCase()} registrados.`}),n.querySelectorAll(`[data-status]`).forEach(t=>t.addEventListener(`click`,()=>o(()=>K(e,t.dataset.id,{verificationStatus:t.dataset.status}),`Estado actualizado.`))),n.querySelectorAll(`[data-edit]`).forEach(e=>e.addEventListener(`click`,()=>u(`edit`,t.find(t=>t.id===Number(e.dataset.edit))))),n.querySelectorAll(`[data-delete]`).forEach(t=>t.addEventListener(`click`,()=>{confirm(`¿Eliminar este registro definitivamente?`)&&o(()=>De(e,t.dataset.delete),`Registro eliminado.`)}))}catch(e){n.innerHTML=`<div class="empty-state error">${X(e.message)}</div>`}},c=(e,t)=>e.source===`user`?t?.user?.[e.name]:t?.[e.name],l=(e,t,r)=>{let i=c(e,t),a=i??e.default??``,o=e.required||r===`create`&&e.createRequired;if(e.type===`checkbox`)return`<label class="switch-field admin-switch"><input type="checkbox" name="${e.name}" ${i??e.default?`checked`:``}><span>${e.label}</span></label>`;let s;if(e.type===`textarea`)s=`<textarea name="${e.name}" ${o?`required`:``}>${X(a)}</textarea>`;else if([`select`,`providerSelect`].includes(e.type)){let t=e.type===`providerSelect`?n.map(e=>[String(e.id),e.storeName]):e.options;s=`<select name="${e.name}" ${o?`required`:``}><option value="">Selecciona…</option>${t.map(([e,t])=>`<option value="${X(e)}" ${String(e)===String(a)?`selected`:``}>${X(t)}</option>`).join(``)}</select>`}else s=`<input name="${e.name}" type="${e.type||`text`}" value="${X(a)}" ${o?`required`:``} ${e.min===void 0?``:`min="${e.min}"`} ${e.max===void 0?``:`max="${e.max}"`} ${e.step===void 0?``:`step="${e.step}"`}>`;return`<label class="form-field"><span>${e.label}${o?` *`:``}</span>${s}</label>`},u=async(t,r=null)=>{e===`products`&&!n.length&&(n=(await G(`providers`)).items);let i=document.getElementById(`admin-entity-form`);i.dataset.mode=t,i.dataset.entity=e,i.dataset.id=r?.id||``,document.getElementById(`admin-modal-title`).textContent=`${t===`create`?`Crear`:`Editar`} ${Y[e].label.toLowerCase()}`,i.querySelector(`.admin-form-fields`).innerHTML=Y[e].fields.map(e=>l(e,r,t)).join(``),document.getElementById(`admin-modal-feedback`).textContent=``,document.getElementById(`admin-entity-modal`).showModal()},d=(e,t)=>{let n=Object.fromEntries(new FormData(e));return t.fields.filter(e=>e.type===`checkbox`).forEach(t=>{n[t.name]=e.elements[t.name].checked}),n.password||delete n.password,n};return setTimeout(async()=>{y(),await Promise.all([i(),s()]);let t=document.getElementById(`admin-open-create`),n=()=>{t.hidden=!!Y[e].createDisabled,t.textContent=`Crear ${Y[e].label.toLowerCase()}`};n(),document.getElementById(`admin-tabs`).addEventListener(`click`,async t=>{let r=t.target.closest(`[data-entity]`);r&&(e=r.dataset.entity,document.querySelectorAll(`[data-entity]`).forEach(e=>e.classList.toggle(`active`,e===r)),n(),document.getElementById(`admin-feedback`).textContent=``,await s())}),t.addEventListener(`click`,()=>u(`create`)),document.getElementById(`close-admin-entity`).addEventListener(`click`,()=>document.getElementById(`admin-entity-modal`).close()),document.getElementById(`admin-entity-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=e.currentTarget,n=t.dataset.entity,a=Y[n],o=d(t,a),c=t.querySelector(`button[type=submit]`);c.disabled=!0;try{t.dataset.mode===`create`?await Ee(n,o):await K(n,t.dataset.id,o),document.getElementById(`admin-entity-modal`).close(),r(`Registro guardado correctamente.`,`success`),await Promise.all([s(),i()])}catch(e){h(document.getElementById(`admin-modal-feedback`),e.details?.join(`. `)||e.message)}finally{c.disabled=!1}})},0),H({title:`Centro de administración`,subtitle:`Gestiona cuentas, verificaciones, catálogo técnico y cotizaciones.`,content:`<div id="admin-summary" class="summary-grid">${T()}</div><section class="app-card admin-manager"><nav id="admin-tabs" class="dashboard-tabs">${Object.entries(Y).map(([e,t],n)=>`<button class="${n===0?`active`:``}" data-entity="${e}">${t.label}</button>`).join(``)}</nav><div class="admin-toolbar"><div id="admin-feedback" aria-live="polite"></div><button id="admin-open-create" class="btn-primary" type="button">Crear</button></div><div id="admin-table">${T()}</div></section><dialog id="admin-entity-modal" class="app-modal admin-entity-modal"><div class="modal-head"><h2 id="admin-modal-title">Gestionar registro</h2><button id="close-admin-entity" class="icon-button" type="button">×</button></div><form id="admin-entity-form" class="app-form"><div class="admin-form-fields form-grid"></div><div id="admin-modal-feedback" class="full-field"></div><button class="btn-primary full-field" type="submit">Guardar cambios</button></form></dialog>`})}function je(){let e=async()=>{let e=document.getElementById(`installer-dashboard-content`);try{let[{installer:t},{contacts:n}]=await Promise.all([R(),B()]);e.innerHTML=`<div class="summary-grid">${U({label:`Estado`,value:t.verificationStatus,icon:`✓`})}${U({label:`Calificación`,value:`${t.rating} / 5`,icon:`★`})}${U({label:`Solicitudes`,value:n.length,icon:`▤`})}</div><div class="dashboard-columns"><section class="app-card"><h2>Perfil profesional</h2><form id="installer-profile-form" class="app-form"><label class="form-field"><span>Empresa</span><input name="companyName" value="${m(t.companyName)}" required></label><label class="form-field"><span>Ciudad</span><input name="city" value="${m(t.city)}" required></label><label class="form-field"><span>Descripción</span><textarea name="bio">${m(t.bio||``)}</textarea></label><label class="switch-field"><input name="available" type="checkbox" ${t.available?`checked`:``}><span>Disponible para nuevos proyectos</span></label><div id="installer-profile-feedback"></div><button class="btn-primary" type="submit">Guardar perfil</button></form></section><section class="app-card"><h2>Cotizaciones recibidas</h2><div id="installer-contact-table">${W({headers:[`Cliente`,`Proyecto`,`Estado`],rows:n.map(e=>`<tr><td><strong>${m(e.estimate.user.name)}</strong><small>${m(e.estimate.user.phone)}</small></td><td>#${e.estimateId} · ${e.estimate.panelCount} paneles</td><td><select data-contact-status="${e.id}"><option value="sent" ${e.status===`sent`?`selected`:``}>Enviado</option><option value="read" ${e.status===`read`?`selected`:``}>Leído</option><option value="answered" ${e.status===`answered`?`selected`:``}>Respondido</option></select></td></tr>`),empty:`Aún no has recibido solicitudes.`})}</div></section></div>`,document.getElementById(`installer-profile-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=Object.fromEntries(new FormData(e.currentTarget));t.available=e.currentTarget.available.checked;try{await z(t),h(document.getElementById(`installer-profile-feedback`),`Perfil actualizado.`,`success`)}catch(e){h(document.getElementById(`installer-profile-feedback`),e.message)}}),e.querySelectorAll(`[data-contact-status]`).forEach(e=>e.addEventListener(`change`,()=>me(e.dataset.contactStatus,e.value)))}catch(t){e.innerHTML=`<div class="empty-state error">${m(t.message)}</div>`}};return setTimeout(()=>{y(),e()},0),H({title:`Panel de instalador`,subtitle:`Gestiona tu disponibilidad y atiende solicitudes de usuarios.`,content:`<div id="installer-dashboard-content">${T()}</div>`})}function Me(){let e=[],t=async()=>{let t=document.getElementById(`provider-content`);try{let[{provider:i},a,o]=await Promise.all([k(),j(),F()]);e=a.products,t.innerHTML=`<div class="summary-grid">${U({label:`Estado`,value:i.verificationStatus,icon:`✓`})}${U({label:`Calificación`,value:`${i.rating} / 5`,icon:`★`})}${U({label:`Productos`,value:e.length,icon:`◫`})}${U({label:`Solicitudes`,value:o.contacts.length,icon:`▤`})}</div><section class="app-card compact-profile"><form id="provider-profile-form" class="inline-form"><div class="inline-fields"><input name="storeName" value="${m(i.storeName)}" placeholder="Tienda" required><input name="city" value="${m(i.city)}" placeholder="Ciudad" required><input name="description" value="${m(i.description||``)}" placeholder="Descripción"></div><button class="btn-outline" type="submit">Actualizar tienda</button></form><div id="provider-profile-feedback"></div></section><div class="dashboard-columns provider-columns"><section class="app-card"><h2>Publicar producto</h2><form id="product-form" class="app-form"><input type="hidden" name="id"><label class="form-field"><span>Nombre</span><input name="name" required></label><label class="form-field"><span>Categoría</span><select name="category"><option value="panel">Panel</option><option value="inverter">Inversor</option><option value="battery">Batería</option><option value="cable">Cable</option><option value="protection">Protección</option></select></label><div class="form-grid"><label class="form-field"><span>Precio COP</span><input name="price" type="number" min="0" required></label><label class="form-field"><span>Stock</span><input name="stock" type="number" min="0" required></label></div><label class="form-field"><span>Descripción</span><textarea name="description"></textarea></label><div id="product-feedback"></div><button class="btn-primary" type="submit">Guardar producto</button></form></section><section class="app-card"><h2>Mis productos</h2><div id="own-products">${n()}</div></section></div>`,r(),document.getElementById(`provider-profile-form`).addEventListener(`submit`,async e=>{e.preventDefault();try{await A(Object.fromEntries(new FormData(e.currentTarget))),h(document.getElementById(`provider-profile-feedback`),`Tienda actualizada.`,`success`)}catch(e){h(document.getElementById(`provider-profile-feedback`),e.message)}})}catch(e){t.innerHTML=`<div class="empty-state error">${m(e.message)}</div>`}},n=()=>W({headers:[`Producto`,`Precio`,`Stock`,`Acciones`],rows:e.map(e=>`<tr><td><strong>${m(e.name)}</strong><small>${m(e.category)}</small></td><td>${g(e.price)}</td><td>${e.stock}</td><td><button class="table-link" data-edit-product="${e.id}">Editar</button><button class="table-link danger" data-delete-product="${e.id}">Eliminar</button></td></tr>`),empty:`Publica tu primer producto.`}),r=()=>{let n=document.getElementById(`product-form`);n.addEventListener(`submit`,async e=>{e.preventDefault();let r=Object.fromEntries(new FormData(n)),i=r.id;delete r.id;try{i?await N(i,r):await M(r),await t()}catch(e){h(document.getElementById(`product-feedback`),e.message)}}),document.querySelectorAll(`[data-edit-product]`).forEach(t=>t.addEventListener(`click`,()=>{let r=e.find(e=>e.id===Number(t.dataset.editProduct));for(let[e,t]of Object.entries(r))n.elements[e]&&(n.elements[e].value=t??``);window.scrollTo({top:n.offsetTop,behavior:`smooth`})})),document.querySelectorAll(`[data-delete-product]`).forEach(e=>e.addEventListener(`click`,async()=>{confirm(`¿Eliminar este producto?`)&&(await P(e.dataset.deleteProduct),await t())}))};return setTimeout(()=>{y(),t()},0),H({title:`Panel de proveedor`,subtitle:`Administra tu catálogo y consulta el interés de clientes.`,content:`<div id="provider-content">${T()}</div>`})}function Z(){return setTimeout(y,0),`${v()}<main class="auth-page"><section class="auth-card centered"><span class="badge-top">Error 404</span><h1>Página no encontrada</h1><p>La ruta que buscas no existe o fue movida.</p><a class="btn-primary big" href="#/">Volver al inicio</a></section></main>`}var Ne={"/":se,"/wizard":pe,"/marketplace":I,"/installers":he,"/login":ge,"/register":_e,"/dashboard":ye,"/history":xe,"/profile":Ce,"/results":we,"/admin":Ae,"/installer":je,"/provider":Me},Q={"/dashboard":[`user`],"/history":[`user`],"/profile":[`user`,`installer`,`provider`,`admin`],"/results":[`user`,`admin`],"/admin":[`admin`],"/installer":[`installer`],"/provider":[`provider`]};function $(){let e=document.getElementById(`app`),[t,n=``]=(window.location.hash.slice(1)||`/`).split(`?`);if(Q[t]){let e=d();if(!f()||!e){window.location.hash=`/login`;return}if(!Q[t].includes(e.role)){window.location.hash=p(e.role);return}}if([`/login`,`/register`].includes(t)&&f()){window.location.hash=p();return}e.innerHTML=(Ne[t]||Z)({path:t,query:new URLSearchParams(n)}),window.scrollTo({top:0})}function Pe(){$(),window.addEventListener(`hashchange`,$)}Pe();