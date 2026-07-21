import { benefits } from "./benefitsData.js";

export default function Benefits() {

    const cards = benefits.map(item => `
        <div class="benefit-card">

            <div class="benefit-icon">
                ${item.icon}
            </div>

            <h3>${item.title}</h3>

            <p>${item.description}</p>

        </div>
    `).join("");

    return `

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

                ${cards}

            </div>

        </section>

    `;
}