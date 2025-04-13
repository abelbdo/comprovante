export default async function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.connection?.remoteAddress ||
    'IP não identificado';

  try {
    const geoRes = await fetch(`https://ipinfo.io/${ip}/json?token=dce97ce9b0e01f`);
    const geoData = await geoRes.json();

    const info = {
      ip,
      cidade: geoData.city,
      estado: geoData.region,
      país: geoData.country,
      coordenadas: geoData.loc,
      hora: new Date().toISOString(),
    };

    // Aqui você decide o que fazer com a informação:
    // Salvar em banco, enviar pro seu e-mail, logar no console, etc.
    console.log('Novo visitante:', info);

    res.status(200).json({ status: 'OK', recebido: true });
  } catch (err) {
    console.error('Erro ao buscar localização:', err);
    res.status(500).json({ erro: 'Falha na geolocalização' });
  }
}