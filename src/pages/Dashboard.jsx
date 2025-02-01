import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthState } from '../hooks/useAuthState';
import QRCode from 'react-qr-code';
import CreateCardForm from '../components/CreateCardForm';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

function Dashboard() {
  const { user } = useAuthState();
  const [cards, setCards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchCards = async () => {
    if (!user) return;
    
    const q = query(
      collection(db, 'cards'),
      where('userId', '==', user.uid)
    );
    
    const querySnapshot = await getDocs(q);
    const cardsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    setCards(cardsData);
  };

  useEffect(() => {
    fetchCards();
  }, [user]);

  const handleCardCreated = () => {
    setShowCreateForm(false);
    fetchCards();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Kartvizitlerim</h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showCreateForm ? 'İptal' : 'Yeni Kartvizit'}
            </button>
          </div>

          {showCreateForm && (
            <div className="bg-white shadow sm:rounded-lg mb-6 p-6">
              <CreateCardForm onCardCreated={handleCardCreated} />
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div key={card.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{card.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{card.title}</p>
                  {card.company && (
                    <p className="mt-1 text-sm text-gray-500">{card.company}</p>
                  )}
                  <div className="mt-4 flex flex-col items-center">
                    <div id={`qr-wrapper-${card.id}`} className="bg-white p-2">
                      <QRCode
                        value={`${window.location.origin}/card/${card.id}`}
                        size={128}
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 w-full">
                      <a
                        href={`/card/${card.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Görüntüle
                      </a>
                      <button
                        onClick={() => {
                          const url = `${window.location.origin}/card/${card.id}`;
                          navigator.clipboard.writeText(url);
                          toast.success('Bağlantı kopyalandı!');
                        }}
                        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Bağlantıyı Kopyala
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const qrElement = document.getElementById(`qr-wrapper-${card.id}`);
                            if (!qrElement) {
                              toast.error('QR kod elementi bulunamadı');
                              return;
                            }

                            const canvas = await html2canvas(qrElement, {
                              backgroundColor: '#ffffff',
                              scale: 2,
                              logging: false,
                              useCORS: true,
                              allowTaint: true
                            });
                            
                            const image = canvas.toDataURL('image/png');
                            
                            if (navigator.share) {
                              try {
                                const blob = await (await fetch(image)).blob();
                                const file = new File([blob], `qr-code-${card.name}.png`, { type: 'image/png' });
                                await navigator.share({
                                  title: `${card.name} - QR Kod`,
                                  files: [file],
                                });
                              } catch (error) {
                                console.log('Paylaşım iptal edildi veya hata oluştu:', error);
                                const link = document.createElement('a');
                                link.download = `qr-code-${card.name}.png`;
                                link.href = image;
                                link.click();
                              }
                            } else {
                              const link = document.createElement('a');
                              link.download = `qr-code-${card.name}.png`;
                              link.href = image;
                              link.click();
                            }
                          } catch (error) {
                            console.error('QR kod dönüştürme hatası:', error);
                            toast.error('QR kod paylaşılırken bir hata oluştu');
                          }
                        }}
                        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Paylaş/İndir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard