export default function handler(req, res) {
    if (req.method === 'POST') {
      const { code } = req.body;
      const correctCode = process.env.ACCESS_CODE; // Usa una variabile d'ambiente
  
      if (code === correctCode) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Codice errato' });
      }
    } else {
      res.status(405).json({ message: 'Metodo non consentito' });
    }
  }