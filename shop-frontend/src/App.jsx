import RegistrationPage from './components/RegistrationPage'
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { useEffect, useState } from 'react'
import StoreProducts from './components/StoreProducts'
import { apiFetch } from './utils/api';
import ProductsCart from './components/ProductCart'
import UserDetails from './components/UserDetails'
import OwnerDetails from './components/OwnerDetails'

function App() {

  const [shops, setShops] = useState([]);
  const [registrationPage, setRegistrationPage] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [loginPage, setLogedinPage] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  
  const [loginType, setLoginType] = useState("owner"); // "owner" or "user"
  const [user, setUser] = useState(null);
  const [cartList, setCartList] = useState(false);
  const [userIcon, setUserIcon] = useState(false);
  const [ownerIcon, setOwnerIcon] = useState(false); 
 

 useEffect(() => {
  apiFetch("https://radar-shop-2.onrender.com/api/find-owner", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  })
    .then((data) => {
      console.log("Fetched shops:", data);
      setShops(data);
    })
    .catch((err) => console.error("Error fetching shops:", err));
}, []);

  function returnHome(){
    setLogedinPage(false);
    setRegistrationPage(false);
    setSelectedShop(null);
    setCartList(false);
  }

  

  return(
  <>
  <nav className="flex justify-between items-center bg-white/90 backdrop-blur-lg px-[150px] py-4 shadow-lg border-b border-white/20 sticky top-0 z-50">
  {
  logedIn ?(
    <>{loginType == "owner" ? (
      ownerIcon ?(  <>
      <h1 onClick={()=>setOwnerIcon(false)} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
      <button
                onClick={()=>{setLogedIn(false);
                              returnHome();
                            setOwnerIcon(false)}}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                logout
              </button>
      </>):(
      <>
      <h1 onClick={()=>{returnHome(); setLogedIn(false);}} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
      <div className="flex justify-between space-between align-center gap-4">
      <button
  onClick={() => setOwnerIcon(true)}
  className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
  title="Owner Profile"
>
  <i className="fas fa-user text-lg"></i>
</button>
      <button
                onClick={()=>setLogedIn(false)}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                logout
              </button>
              </div>
              </>
      )
    ): (
      userIcon ?(  <>
      <h1 onClick={()=>setUserIcon(false)} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
      <button
                onClick={()=>{setLogedIn(false);
                              returnHome();
                            setUserIcon(false)}}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                logout
              </button>
      </>):
      
      cartList ? (
      <>
      <h1 onClick={()=>setCartList(false)} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
      <div className="flex justify-between space-between align-center gap-4">
      <button
  onClick={() => setUserIcon(true)}
  className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
  title="User Profile"
>
  <i className="fas fa-user-circle text-lg"></i>
</button>
     
      <button
                onClick={()=>{setLogedIn(false);
                              returnHome();}}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                logout
              </button>
              </div>
      </>
    ):
      (
        <>
      <h1 onClick={()=>returnHome()} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
    
    <div className="flex justify-between space-between align-center gap-4">
      <button
  onClick={() => setUserIcon(true)}
  className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
  title="User Profile"
>
  <i className="fas fa-user-circle text-lg"></i>
</button>
      <button onClick={()=>setCartList(true)} className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
       View Cart
      </button>
              <button
                onClick={()=>setLogedIn(false)}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                logout
              </button>
     </div>
              </>
      )
    )
}
              </>
  
  ):
  registrationPage ?(
    <>
    <h1 onClick={()=>returnHome()} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
    <div className="space-x-4">
    <button onClick={()=>{setLogedinPage(true); setRegistrationPage(false);}}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Log in
              </button>
              </div>
              </>
  ):
  loginPage ?(
    <>
    <h1 onClick={()=>returnHome()} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300" >Radar Shop</h1>
    <div className="space-x-4">
              <button
                onClick={()=>{setRegistrationPage(true); setLogedinPage(false); }}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Register
              </button>
              </div>
              </>
  ):
  selectedShop ?(
    <>
    <h1 onClick={()=>setSelectedShop(null)} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
  <div className="space-x-4">
              <button
                onClick={()=>setRegistrationPage(true)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Register
              </button>
              <button
                onClick={() => setLogedinPage(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Log in
              </button>
            </div>
             </>
  ):
  (
    <>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Radar Shop</h1>
            <div className="space-x-4">
              <button
                onClick={()=>setRegistrationPage(true)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Register
              </button>
              <button
                onClick={() => setLogedinPage(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Log in
              </button>
            </div>
            </>
  )
             }
          </nav>

{/* Main page */}
{
  registrationPage ?(
     <RegistrationPage setRegistrationPage={()=>setRegistrationPage(false)}>

  </RegistrationPage>
  ):
  ownerIcon ? (<OwnerDetails  setOwnerIcon={()=>setOwnerIcon(false)} shop={selectedShop}></OwnerDetails>): ( 
     loginPage ? (  <LoginPage setLogedinPage={()=>setLogedinPage(false)} 
                               setLogedIn={()=>setLogedIn(true)} 
                               shop={selectedShop} 
                               logedIn={logedIn} 
                               setSelectedShop={setSelectedShop} 
                               shops={shops} 
                               setShops={setShops}
                               setLoginType={setLoginType}
                               loginType={loginType}
                               setUser={setUser}></LoginPage> ):
         userIcon ? (<UserDetails user={user} setUserIcon={()=>setUserIcon(false)} setUser={setUser}></UserDetails>):
         
         cartList ? (<ProductsCart user={user} ></ProductsCart>):
        selectedShop ? (
        <StoreProducts shop={selectedShop}  logedIn={logedIn} goBack={()=>setSelectedShop(null)} user={user}/>
    )
       : (  
        <HomePage setSelectedShop={setSelectedShop}
                  shops={shops}
        />
      )
    )}
    </>
  )
}
export default App
