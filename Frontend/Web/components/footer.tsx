import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#FFB343] text-black">
            <div   className="mx-auto max-w-7xl px-4 py-12">
                <div  className="grid gap-8 md:grid-cols-4">

                    {/* Logo & Description */}
                 <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold">Navigo</h2>
                  <p className="mt-4 text-black">Your trusted companion for exploring India safely and authentically.
                  </p>
                </div>

                  {/* Quick Links */}
                 <div>
                  <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                  <ul className="space-y-2">
                   <li>
                       <Link href="/about" className="text-black hover:text-white">
                       About Us
                       </Link>
                   </li>
                   <li>
                       <Link href="/destinations" className="text-black hover:text-white">
                       Destinations
                       </Link>
                  </li>
                  <li>
                      <Link href="/advantages" className="text-black hover:text-white">
                      Advantages
                      </Link>
                  </li>
                  <li>
                      <Link href="/contact" className="text-black hover:text-white">
                      Contact
                      </Link>
                 </li>
                </ul>
                </div>
               </div>

               {/* Social Links */}
             <div>
                    <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-gray-600 hover:text-red-500">
                          <Instagram className="h-6 w-6" />
                        </Link>

                        <Link href="#" className="text-gray-600 hover:text-blue-500">
                         <Facebook className="h-6 w-6" />
                        </Link>

                        <Link href="#" className="text-gray-600 hover:text-white">
                         <Twitter className="h-6 w-6" />
                        </Link>

                        <Link href="#" className="text-gray-600 hover:text-red-700">
                         <Mail className="h-6 w-6" />
                        </Link>
                    </div>
             </div>
          

         <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-black">
                <p>&copy; {new Date().getFullYear()} Navigo. All rights reserved.</p>
         </div>
      </div>        
   </footer>
    )
}