import Link from 'next/link'
import Image from 'next/image'
import Logo from './360.png'

export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt='Eswnpi'
        width={90}
        placeholder='blur'
        quality={100}
      />
      <h1>Scan & Pay</h1>
      <Link href="/">Create QR code </Link>
      <Link href="/tickets">My QR codes</Link>
    </nav>
  )
}