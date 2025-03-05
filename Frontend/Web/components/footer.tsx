import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#1E1E1E] text-white">
            <div   className="mx-auto max-w-7xl px-4 py-12">
                <div  className="grid gap-8 md:grid-cols-4">

                    {/* Logo & Description */}
                 <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold">Navigo</h2>
                  <p className="mt-4 text-gray-400">Your trusted companion for exploring India safely and authentically.</p>
                </div>

                  {/* Quick Links */}
                 <div>
                  <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                  <ul className="space-y-2">
                   <li>
                       <Link href="/about" className="text-gray-400 hover:text-white">
                       About Us
                       </Link>
                   </li>
                   <li>
                       <Link href="/destinations" className="text-gray-400 hover:text-white">
                       Destinations
                       </Link>
                  </li>
                  <li>
                      <Link href="/advantages" className="text-gray-400 hover:text-white">
                      Advantages
                      </Link>
                  </li>
                  <li>
                      <Link href="/contact" className="text-gray-400 hover:text-white">
                      Contact
                      </Link>
                 </li>
                </ul>
                </div>
               </div>
          </div>






        
        </footer>
    )
}