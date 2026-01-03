import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoOne from "../../assest/logoOne.png"

const navLinks = [
    {
        name: "Services",
        href: "/"
    },
    {
        name: "Tour",
        href: "/about"
    },
    {
        name: "Blog",
        href: "/blog"
    }
]

export default function Navbar() {
  return (
    <div className='flex justify-between items-center px-16  py-4 max-w-10xl mx-auto'>
        <div>
            <Image src={LogoOne} alt="logo" width={100} height={100} />
        </div>
        <div className='flex gap-4 text-gray-500 font-medium'>
            {
                navLinks.map((link) => (
                    <Link href={link.href} key={link.name}
                    className='hover:text-gray-700 '>{link.name}</Link>
                ))
            }
        </div>
    </div>
  )
}