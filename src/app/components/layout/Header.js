import Link from "next/link";


export default function Header() {
    return (
      <header className="flex items-center justify-between font-bold">
    <Link className="text-primary font-semibold   text-5xl" href="">Portion restaurante</Link>
    <nav className="flex items-center gap-5 text-gray-800 font-semibold">
      <Link href ={''}>Home</Link>
      <Link href ={''}>Menu</Link>
      <Link href ={''}>About</Link>
      <Link href ={''}>Contact</Link>
      <Link href ={''}className="bg-primary rounded-full text-white px-6 py-2">Login</Link>
    </nav>
   </header>
    );
}