"use client"
import Image from 'next/image'
import Link from 'next/link'
import resumePdf from '../public/pdfs/CV_Md._Monowarul_Islam.pdf'
import { useEffect, useState } from 'react'
import {usePathname, useRouter} from "next/navigation";

const sections = [
	{id: 'home', label: 'Home'},
	{ id: 'aboutme', label: 'About Me' },
	{ id: 'education', label: 'Education' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'research', label: 'Research' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'reachout', label: 'Reach Out' }
]

interface NavbarProps {
	showMobileNavbar: boolean
}

export default function Navbar({ showMobileNavbar }: NavbarProps){
	const [menuOpen, setMenuOpen] = useState(false)
	const router = useRouter()
	const pathname = usePathname()

	// Lock body scroll when menu is open and close on Escape
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMenuOpen(false)
		}
		document.addEventListener('keydown', onKey)
		if (menuOpen) document.body.classList.add('no-scroll')
		else document.body.classList.remove('no-scroll')
		return () => {
			document.removeEventListener('keydown', onKey)
			document.body.classList.remove('no-scroll')
		}
	}, [menuOpen])

	// Handler for smooth scrolling to sections
	const handleNavClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // Ensure background can scroll before initiating smooth scroll
        document.body.classList.remove('no-scroll')
        setMenuOpen(false)
		
		// logic for home button
		if (id === 'home') {
			if (pathname === '/') {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			} else {
				window.scrollTo({ top: 0, behavior: 'smooth' })
				router.push('/')
			}
			return
		}
		
		// logic for other section buttons
		if (pathname === '/') {
			const el = document.getElementById(id)
			if (el) {
				// Smooth scroll into view and update URL hash without jump
				el.scrollIntoView({ behavior: 'smooth', block: 'start' })
				history.pushState(null, '', `#${id}`)
			}
		} else {
			router.push(`/#${id}`)
		}
    }

	// Handler for scrolling to top when clicking profile picture
	const handleProfileClick = () => {
		document.body.classList.remove('no-scroll')
		setMenuOpen(false)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<>
			{/* Mobile navbar island with hamburger - shows when scrolled */}
			<div className={`mobileNavbar ${showMobileNavbar ? 'visible' : ''}`}>
				<div className="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
					<div className="profilePic">
						<Image src="/photos/profile.png" alt="Profile" width={512} height={512}/>
					</div>
				</div>
				<span className="mobileNavbarName">MD. MONOWARUL ISLAM</span>
				<button
					className="hamburger"
					aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
					aria-controls="mobileNav"
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen(o => !o)}
				>
					<Image
						src={menuOpen ? '/icons/cross.svg' : '/icons/burger-menu.svg'}
						alt="menu"
						width={22}
						height={22}
					/>
				</button>
			</div>

			{/* Mobile overlay and dropdown menu */}
			<div
				className={`mobileOverlay ${menuOpen ? 'show' : ''}`}
				onClick={() => setMenuOpen(false)}
			/>
			<nav
				id="mobileNav"
				className={`mobileNav ${menuOpen ? 'open' : ''}`}
				role="navigation"
				aria-label="Mobile section navigation"
			>
				{sections.map(s => (
					<a
						key={s.id}
						href={`#${s.id}`}
						onClick={handleNavClick(s.id)}
					>
						{s.label}
					</a>
				))}
				<div className='nav-bottom'>
					<a className="btn" href={resumePdf} download>
						Download my Resume
					</a>
					<div className="socials">
						<Link href="https://www.linkedin.com/in/md-monowarul-islam-b7657b341/" target="_blank">
							<Image src="/icons/linkedin-white.svg" alt="LinkedIn" width={28} height={28}/>
						</Link>
						<Link href="https://github.com/mi-shraban" target="_blank">
							<Image src="/icons/github-white.svg" alt="GitHub" width={28} height={28}/>
						</Link>
						<Link href="https://leetcode.com/u/xordan77/" target="_blank">
							<Image src="/icons/leetcode-white.svg" alt="LeetCode" width={28} height={28}/>
						</Link>
						<Link href="https://codeforces.com/profile/xordan.-" target="_blank">
							<Image src="/icons/codeforces-white.svg" alt="Codeforces" width={28} height={28}/>
						</Link>
					</div>
				</div>
			</nav>
		</>
	)
}