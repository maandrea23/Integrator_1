import { steps } from "./steps.js";

export default function HowItWorks() {

    const cards = steps.map(step => `
        <div class="step-card">

            <span class="step-number">${step.id}</span>

            <div class="step-icon">
                ${step.icon}
            </div>

            <h3>${step.title}</h3>

            <p>${step.description}</p>

        </div>
    `).join("");

    return `
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

                ${cards}

            </div>

        </section>
    `;
}