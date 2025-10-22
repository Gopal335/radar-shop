import RegistrationPage from './components/RegistrationPage'
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { useEffect, useState } from 'react'
import StoreProducts from './components/StoreProducts'
import { set } from 'mongoose'
import ProductsCart from './components/ProductCart'
import UserDetails from './components/UserDetails'
import OwnerDetails from './components/OwnerDetails'

function App() {

  const [registrationPage, setRegistrationPage] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [loginPage, setLogedinPage] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [shops, setShops] = useState([]);
  const [loginType, setLoginType] = useState("owner"); // "owner" or "user"
  const [user, setUser] = useState(null);
  const [cartList, setCartList] = useState(false);
  const [userIcon, setUserIcon] = useState(false);
  const [ownerIcon, setOwnerIcon] = useState(false);
 

  useEffect(() => {
    
    fetch("http://localhost:3000/find-owner", {
      method: "POST", // since your backend uses POST
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched shops:", data); // check in browser console
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
  <nav className="flex justify-between items-center bg-white/80 backdrop-blur-md px-[150px] py-4 shadow-md">
  {
  logedIn ?(
    <>{loginType == "owner" ? (
      ownerIcon ?(  <>
      <h1 onClick={()=>setOwnerIcon(false)} className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
      <button
                onClick={()=>{setLogedIn(false);
                              returnHome();
                            setOwnerIcon(false)}}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
              >
                logout
              </button>
      </>):(
      <>
      <h1 onClick={()=>{returnHome(); setLogedIn(false);}} className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
      <div className="flex justify-between space-between align-center gap-4">
      <img onClick={()=>setOwnerIcon(true)} src="../public/@facial-recognition-windows-hello.gif" className='h-10 rounded-full w-10' ></img>
      <button
                onClick={()=>setLogedIn(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
              >
                logout
              </button>
              </div>
              </>
      )
    ): (
      userIcon ?(  <>
      <h1 onClick={()=>setUserIcon(false)} className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
      <button
                onClick={()=>{setLogedIn(false);
                              returnHome();
                            setUserIcon(false)}}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
              >
                logout
              </button>
      </>):
      
      cartList ? (
      <>
      <h1 onClick={()=>setCartList(false)} className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
      <div className="flex justify-between space-between align-center gap-4">
      <img onClick={()=>setUserIcon(true)} src="../public/@facial-recognition-windows-hello.gif" className='h-10 rounded-full w-10' ></img>
     
      <button
                onClick={()=>{setLogedIn(false);
                              returnHome();}}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
              >
                logout
              </button>
              </div>
      </>
    ):
      (
        <>
      <h1 onClick={()=>returnHome()} className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
    
    <div className="flex justify-between space-between align-center gap-4">
      <img onClick={()=>setUserIcon(true)} src="../public/@facial-recognition-windows-hello.gif" className='h-10 rounded-full w-10' ></img>
      <button onClick={()=>setCartList(true)} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition">
       View Cart
      </button>
              <button
                onClick={()=>setLogedIn(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
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
    <h1 onClick={()=>returnHome()} className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
    <div className="space-x-4">
    <button onClick={()=>{setLogedinPage(true); setRegistrationPage(false);}}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
              >
                Log in
              </button>
              </div>
              </>
  ):
  loginPage ?(
    <>
    <h1 onClick={()=>returnHome()} className="text-2xl font-bold text-indigo-600 cursor-pointer" >Shop App</h1>
    <div className="space-x-4">
              <button
                onClick={()=>{setRegistrationPage(true); setLogedinPage(false); }}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
              >
                Register
              </button>
              </div>
              </>
  ):
  selectedShop ?(
    <>
    <h1 onClick={()=>setSelectedShop(null)} className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
  <div className="space-x-4">
              <button
                onClick={()=>setRegistrationPage(true)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
              >
                Register
              </button>
              <button
                onClick={() => setLogedinPage(true)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
              >
                Log in
              </button>
            </div>
             </>
  ):
  (
    <>
            <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer">Shop App</h1>
            <div className="space-x-4">
              <button
                onClick={()=>setRegistrationPage(true)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
              >
                Register
              </button>
              <button
                onClick={() => setLogedinPage(true)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
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
        <HomePage
          setRegistrationPage={() => setRegistrationPage(true)}
          setSelectedShop={setSelectedShop}
          setLogedinPage={()=>setLogedinPage(true)}
          shops={shops}
         
        />
  
      )
    
    )}

 
 
    </>
  )
}

export default App
