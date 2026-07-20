import "dotenv/config";
import bcrypt from "bcryptjs";
import { sequelize, User, Installer, Provider, Product, CityHSP, ApplianceCatalog } from "../models/index.js";

await sequelize.sync();
const passwordHash = await bcrypt.hash("Demo123!", 12);

await User.findOrCreate({
  where: { email: "admin@sunwise.local" },
  defaults: { name: "Administrador SunWise", phone: "+57 300 000 0000", role: "admin", passwordHash: await bcrypt.hash("Admin123!", 12) },
});

await CityHSP.bulkCreate([
  { city: "Bogot\u00e1", department: "Cundinamarca", hsp: 4.2 },
  { city: "Medell\u00edn", department: "Antioquia", hsp: 4.5 },
  { city: "Cali", department: "Valle del Cauca", hsp: 4.8 },
  { city: "Barranquilla", department: "Atl\u00e1ntico", hsp: 5.5 },
], { ignoreDuplicates: true });

await ApplianceCatalog.bulkCreate([
  { name: "Nevera", standardPowerW: 250, defaultHoursPerDay: 8, coincidenceFactor: 1 },
  { name: "Televisor", standardPowerW: 120, defaultHoursPerDay: 5, coincidenceFactor: 0.8 },
  { name: "Iluminaci\u00f3n LED", standardPowerW: 12, defaultHoursPerDay: 6, coincidenceFactor: 0.7 },
  { name: "Lavadora", standardPowerW: 500, defaultHoursPerDay: 1, coincidenceFactor: 0.4 },
  { name: "Aire acondicionado", standardPowerW: 1500, defaultHoursPerDay: 6, coincidenceFactor: 1 },
], { ignoreDuplicates: true });

async function seedInstaller(data) {
  const [user] = await User.findOrCreate({
    where: { email: data.email },
    defaults: { name: data.name, phone: data.phone, role: "installer", passwordHash },
  });
  const [installer] = await Installer.findOrCreate({
    where: { userId: user.id },
    defaults: { companyName: data.companyName, bio: data.bio, city: data.city, certification: data.certification, verificationStatus: "approved", rating: data.rating, available: data.available },
  });
  await installer.update({ verificationStatus: "approved", rating: data.rating, available: data.available });
}

await seedInstaller({ name: "Laura Ram\u00edrez", email: "laura.instalador@sunwise.local", phone: "+57 310 555 0101", companyName: "Solar Andina", city: "Bogot\u00e1", certification: "RETIE - T\u00e9cnico electricista", rating: 4.9, available: true, bio: "Dise\u00f1o e instalaci\u00f3n de sistemas residenciales y comerciales con acompa\u00f1amiento RETIE." });
await seedInstaller({ name: "Carlos Mej\u00eda", email: "carlos.instalador@sunwise.local", phone: "+57 315 555 0102", companyName: "EcoVolt Antioquia", city: "Medell\u00edn", certification: "CONTE TE-4", rating: 4.7, available: true, bio: "Especialistas en sistemas conectados a red, bater\u00edas de respaldo y monitoreo inteligente." });
await seedInstaller({ name: "Valentina Torres", email: "valentina.instalador@sunwise.local", phone: "+57 300 555 0103", companyName: "Caribe Solar Pro", city: "Barranquilla", certification: "RETIE - Instalador certificado", rating: 4.8, available: false, bio: "Soluciones fotovoltaicas para hogares y comercios de la regi\u00f3n Caribe." });

async function seedProvider(data) {
  const [user] = await User.findOrCreate({
    where: { email: data.email },
    defaults: { name: data.name, phone: data.phone, role: "provider", passwordHash },
  });
  const [provider] = await Provider.findOrCreate({
    where: { userId: user.id },
    defaults: { storeName: data.storeName, description: data.description, city: data.city, verificationStatus: "approved", rating: data.rating },
  });
  await provider.update({ verificationStatus: "approved", rating: data.rating });
  return provider;
}

const solMarket = await seedProvider({ name: "Andr\u00e9s Rojas", email: "ventas@solmarket.local", phone: "+57 601 555 0201", storeName: "SolMarket Colombia", city: "Bogot\u00e1", rating: 4.9, description: "Equipos solares certificados y soporte de dimensionamiento." });
const energiaVerde = await seedProvider({ name: "Mariana Londo\u00f1o", email: "ventas@energiaverde.local", phone: "+57 604 555 0202", storeName: "Energ\u00eda Verde Store", city: "Medell\u00edn", rating: 4.8, description: "Componentes fotovoltaicos, protecciones y almacenamiento." });

const products = [
  { providerId: solMarket.id, name: "Panel monocristalino 550 W", category: "panel", brand: "SunPeak", model: "SP-550M", price: 685000, stock: 48, description: "Panel monocristalino de alta eficiencia con garant\u00eda de potencia de 25 a\u00f1os." },
  { providerId: solMarket.id, name: "Inversor on-grid 5 kW", category: "inverter", brand: "Growatt", model: "MIN 5000TL-X", price: 4850000, stock: 12, description: "Inversor monof\u00e1sico con doble MPPT y monitoreo Wi-Fi." },
  { providerId: solMarket.id, name: "Cable solar 6 mm\u00b2", category: "cable", brand: "Centelsa", model: "PV1-F", price: 8900, stock: 600, description: "Cable fotovoltaico resistente a radiaci\u00f3n UV. Precio por metro." },
  { providerId: solMarket.id, name: "DPS CC 600 V", category: "protection", brand: "Schneider", model: "A9L40271", price: 245000, stock: 30, description: "Protecci\u00f3n contra sobretensiones para arreglos fotovoltaicos." },
  { providerId: energiaVerde.id, name: "Bater\u00eda LiFePO4 5.12 kWh", category: "battery", brand: "Pylontech", model: "US5000", price: 8950000, stock: 8, description: "Bater\u00eda de litio modular de 48 V con BMS integrado." },
  { providerId: energiaVerde.id, name: "Inversor h\u00edbrido 6 kW", category: "inverter", brand: "Deye", model: "SUN-6K-SG03", price: 7650000, stock: 7, description: "Inversor h\u00edbrido para red, respaldo y bater\u00edas de litio." },
  { providerId: energiaVerde.id, name: "Breaker CC bipolar 25 A", category: "protection", brand: "Chint", model: "NB1-63DC", price: 118000, stock: 55, description: "Interruptor termomagn\u00e9tico bipolar para circuitos fotovoltaicos." },
  { providerId: energiaVerde.id, name: "Conectores solares MC4", category: "cable", brand: "St\u00e4ubli", model: "MC4-EVO2", price: 42000, stock: 100, description: "Par de conectores originales para cable solar de 4 a 6 mm\u00b2." },
];

for (const product of products) {
  await Product.findOrCreate({ where: { providerId: product.providerId, name: product.name }, defaults: { ...product, isActive: true } });
}

console.log("Datos iniciales creados:");
console.log("- Admin: admin@sunwise.local / Admin123!");
console.log("- Profesionales demo: correos @sunwise.local / Demo123!");
console.log("- Marketplace: 2 proveedores y 8 productos de ejemplo");
await sequelize.close();
