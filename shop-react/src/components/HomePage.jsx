
import '../index.css'

export default function HomePage({ setSelectedShop, shops}){
    return(
      <>
       
        <div className=" min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
          {/* Navbar */}
          

          {/* Shop Grid */}
          <div className="max-w-6xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-8  mx-auto">
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="bg-white rounded-xl shadow-lg border border-indigo-200 grid grid-cols-1 sm:grid-cols-2 p-6 hover:shadow-xl transition transform hover:-translate-y-1 gap-2"
              ><div>
                <img onClick={()=>setSelectedShop(shop)} className="h-40 w-60 align-center mb-2" 
                     src={shop.image_url && shop.image_url.trim() !== "" ? 
shop.image_url :  "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0fGVufDB8fDB8fHww" } ></img>
                
                </div>
                <div className='text-center my-auto'>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {shop.shopName}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Owner:</span> {shop.ownerName}
                </p>
                
                <button
                  onClick={()=>setSelectedShop(shop)}
                  className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
                >
                  Visit Shop
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      
      </>
    )
}