// ...existing code...
import '../index.css'

export default function HomePage({ setSelectedShop, shops}){
    return(
      <>
        {/* Hero Section */}
     
<div className="relative min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-pink-700 overflow-hidden">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-overlay filter blur-xl opacity-55 animate-pulse"
      style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.20), rgba(249,115,22,0))' }}
    ></div>
    <div
      className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-overlay filter blur-xl opacity-45 animate-pulse"
      style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.16), rgba(236,72,153,0))' }}
    ></div>
    <div
      className="absolute top-40 left-1/2 w-80 h-80 rounded-full mix-blend-overlay filter blur-xl opacity-40 animate-pulse"
      style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(236,72,153,0))' }}
    ></div>
  </div>

  {/* Floating Elements */}
  <div className="absolute top-20 left-10 w-4 h-4 bg-white/80 rounded-full opacity-80 animate-bounce"></div>
  <div
    className="absolute top-40 right-20 w-3 h-3 rounded-full opacity-80 animate-bounce"
    style={{ background: 'linear-gradient(90deg, rgba(249,115,22,0.9), rgba(236,72,153,0.9))', animationDelay: '1s' }}
  ></div>
  <div
    className="absolute bottom-40 left-20 w-5 h-5 rounded-full opacity-80 animate-bounce"
    style={{ background: 'linear-gradient(90deg, rgba(236,72,153,0.9), rgba(249,115,22,0.7))', animationDelay: '2s' }}
  ></div>

  {/* Main Content */}
  <div className="relative z-10">
    {/* Welcome Section */}
    <div className="text-center pt-16 pb-8">
      <h1 className="text-6xl font-bold text-white mb-2 animate-fade-in">
        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Radar Shop</span>
      </h1>
      <p className="text-xl text-white/90  animate-fade-in-delay">
        Discover amazing products from local shops around you
      </p>
    </div>

    {/* Shop Grid */}
    <div className="max-w-7xl mx-auto  pb-1">
      <h2 className="text-3xl font-bold text-white text-center mb-8 animate-fade-in-delay-3">
        Explore Our Shops
      </h2>
     
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shops.map((shop, index) => (
                  <div
                    key={shop._id}
                    className="group bg-gray-800 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.06}s` }}
                  >
                    <div
                      className="relative cursor-pointer h-52 w-full overflow-hidden rounded-t-xl"
                      onClick={() => setSelectedShop(shop)}
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                        src={
                          shop.image_url && shop.image_url.trim() !== ""
                            ? shop.image_url
                            : "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0fGVufDB8fDB8fHww"
                        }
                        alt={shop.shopName}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="absolute left-4 bottom-4 text-gray-100 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium bg-gray-900/60 px-2 py-1 rounded">Click to visit</p>
                      </div>
                    </div>

                    <div className="px-5 py-4 bg-gray-900">
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">
                        {shop.shopName}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3">
                        <span className="font-medium text-indigo-300">Owner:</span> {shop.ownerName}
                      </p>

                      <div className="flex items-center justify-between gap-4">
                        <div className="text-sm text-gray-300">
                          <div>{shop.city || ''}</div>
                          <div className="mt-1">{shop.phone || ''}</div>
                        </div>

                        <button
                          onClick={() => setSelectedShop(shop)}
                          className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 hover:bg-gray-600 hover:scale-105 transition-all duration-200 font-medium"
                        >
                          Visit Shop
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {shops.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Shops Available</h3>
                  <p className="text-gray-300">Check back later for new shops!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
}
