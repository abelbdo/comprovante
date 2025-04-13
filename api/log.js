export default async function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'IP desconhecido';

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.dce97ce9b0e01f}`);
    const data = await response.json();

    const [latitude, longitude] = (data.loc || '').split(',');

    const visitante = {
      ip,
      cidade: data.city || 'desconhecido',
      estado: data.region || 'desconhecido',
      país: data.country || 'desconhecido',
      coordenadas: `${latitude},${longitude}`,
      hora: new Date().toISOString(),
    };

    console.log('Novo visitante:', visitante);

    res.status(200).json({ status: 'OK', visitante });
  } catch (error) {
    console.error('Erro ao buscar IP info:', error);
    res.status(500).json({ error: 'Erro ao buscar localização' });
  }
}
