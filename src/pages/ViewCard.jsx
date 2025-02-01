import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ViewCard() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const docRef = doc(db, 'cards', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCard({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Kartvizit bulunamadı');
        }
      } catch (err) {
        setError('Kartvizit yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900">{card.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{card.title}</p>
          
          <div className="mt-4 space-y-4">
            {card.email && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{card.email}</p>
              </div>
            )}
            
            {card.phone && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                <p className="mt-1">{card.phone}</p>
              </div>
            )}
            
            {card.company && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Şirket</h3>
                <p className="mt-1">{card.company}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;