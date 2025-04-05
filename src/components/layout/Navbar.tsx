'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navItems = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        Kristiyan Cholakov
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-6">
                        {navItems.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {label}
                            </Link>
                        ))}
                        <Button asChild size="sm" className="ml-4">
                            <a href="/Kristiyan_Cholakov_Resume.pdf" target="_blank" rel="noopener noreferrer">
                                Resume
                            </a>
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <nav className="space-y-2 mt-2">
                        {navItems.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="block text-sm font-medium transition-colors hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        <Button asChild size="sm" className="mt-2 w-full">
                            <a href="/Kristiyan_Cholakov_Resume.pdf" target="_blank" rel="noopener noreferrer">
                                Resume
                            </a>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}