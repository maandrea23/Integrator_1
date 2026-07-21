export default function estimateCard() {
  return `
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
  `;
}
