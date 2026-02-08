import Image from "next/image"
import Link from "next/link"
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0a1324] to-[#070d1a] text-gray-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo_small.png" alt="Briefy Logo" width={36} height={36} />
              <span className="text-white font-semibold text-lg">Briefy</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              AI-powered email summarization for busy professionals and students.
            </p>

            <div className="flex gap-3 mt-6">
              <Link href="#" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <FaTwitter className="text-white" />
              </Link>
              <Link href="#" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <FaLinkedin className="text-white" />
              </Link>
              <Link href="#" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <FaGithub className="text-white" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">Security</Link></li>
              <li><Link href="#" className="hover:text-white">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-white">GDPR</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">

          <p>© {new Date().getFullYear()} Briefy. All rights reserved.</p>

          <p className="mt-3 md:mt-0 flex items-center gap-2">
            
          </p>

        </div>

      </div>
    </footer>
  )
}
