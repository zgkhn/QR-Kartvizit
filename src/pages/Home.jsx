import { Link } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuthState';
import { FaQrcode, FaShare, FaNetworkWired } from "react-icons/fa";

function Home() {
  const { user } = useAuthState();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Digital Kartvizit Platformu
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            QR kod ile paylaşılabilen dijital kartvizitler oluşturun. Modern ve profesyonel bir şekilde iletişim bilgilerinizi paylaşın.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {!user ? (
              <>
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-300"
                  >
                    Kayıt Ol
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition duration-300"
                  >
                    Giriş Yap
                  </Link>
                </div>
              </>
            ) : (
              <div className="rounded-md shadow">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-300"
                >
                  Panele Git
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="rounded-full bg-indigo-100 p-4">
                <FaQrcode className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <div className="pt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kolay Oluşturma</h3>
              <p className="text-gray-600">Dakikalar içinde profesyonel bir dijital kartvizit oluşturun ve QR kodunuzu alın.</p>
            </div>
          </div>

          <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="rounded-full bg-indigo-100 p-4">
                <FaShare className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <div className="pt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Anında Paylaşım</h3>
              <p className="text-gray-600">QR kodunuzu paylaşarak iletişim bilgilerinizi anında aktarın.</p>
            </div>
          </div>

          <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="rounded-full bg-indigo-100 p-4">
                <FaNetworkWired className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <div className="pt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Profesyonel Ağ</h3>
              <p className="text-gray-600">İş ağınızı genişletin ve profesyonel bağlantılarınızı güçlendirin.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home