
import localFont from "next/font/local";

const libertinus = localFont({
  src: "./fonts/LibertinusSans-Regular.ttf",
});


import '@/app/_styles/globals.css'
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    default: "The Wild Oasis Cabin",
  },
  description: "Luxurious cabin hotel",
};



export default function RootLayout({children}){


  return( 
  <html lang="en">

<body

    className={`${libertinus.className} antialiased
  text-primary-100 min-h-screen bg-primary-950 flex flex-col relative`}>

    <Header />    

    <div className="flex-1 px-8 py-12 grid">

    <main className="max-w-7xl w-full  mx-auto " >
      <ReservationProvider>
      {children}
      </ReservationProvider>
    </main>

    </div>

      <footer>
      </footer>
  </body>

  </html>
)}