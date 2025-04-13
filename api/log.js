export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude, precisão } = req.body;
    console.log('📍 Nova localização recebida:', { latitude, longitude, precisão });
    res.status(200).json({ status: 'OK', recebido: true });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
