export default function Hero() {
  return `
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
  `;
}