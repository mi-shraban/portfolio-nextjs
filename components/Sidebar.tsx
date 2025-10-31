"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname  } from "next/navigation";
import Navbar from './Navbar'

const sections = [
	{ id: 'aboutme', label: 'About Me' },
	{ id: 'education', label: 'Education' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'research', label: 'Research' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'reachout', label: 'Reach Out' }
]

export default function Sidebar(){
	const containerRef = useRef<HTMLElement | null>(null)
	const hoverLockRef = useRef<boolean>(false)
	const [showMobileNavbar, setShowMobileNavbar] = useState(false)
	const router = useRouter()
	const pathname = usePathname()

	// IntersectionObserver for active nav link highlighting
	useEffect(() => {
		const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a'))
		const observer = new IntersectionObserver(
			entries => {
				if (hoverLockRef.current) return
				for (const e of entries) {
					const link = links.find(l => l.getAttribute('href') === `#${e.target.id}`)
					if (!link) continue
					if (e.isIntersecting) link.classList.add('active')
					else link.classList.remove('active')
				}
			},
			{ rootMargin: '-40% 0px -55% 0px', threshold: 0.1 }
		)

		const secNodes = sections.map(s => document.getElementById(s.id)).filter(Boolean) as Element[]

		// Hover handlers to activate corresponding nav link
		const onEnter = (id: string) => {
			hoverLockRef.current = true
			links.forEach(l => l.classList.remove('active'))
			const link = links.find(l => l.getAttribute('href') === `#${id}`)
			if (link) link.classList.add('active')
		}
		const onLeave = () => {
			hoverLockRef.current = false
		}

		const enterHandlers: Array<{ el: Element; fn: (ev: Event) => void }> = []
		const leaveHandlers: Array<{ el: Element; fn: (ev: Event) => void }> = []

		secNodes.forEach(n => {
			observer.observe(n)
			const enter = () => onEnter((n as HTMLElement).id)
			const leave = () => onLeave()
			n.addEventListener('mouseenter', enter)
			n.addEventListener('mouseleave', leave)
			enterHandlers.push({ el: n, fn: enter })
			leaveHandlers.push({ el: n, fn: leave })
		})

		return () => {
			observer.disconnect()
			enterHandlers.forEach(({ el, fn }) => el.removeEventListener('mouseenter', fn))
			leaveHandlers.forEach(({ el, fn }) => el.removeEventListener('mouseleave', fn))
		}
	}, [pathname])
	
	// Handler for smooth scrolling to sections
	const handleNavClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        // Ensure background can scroll before initiating smooth scroll
        document.body.classList.remove('no-scroll')

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
	
	// Detect when sidebar goes out of view to show mobile navbar
	useEffect(() => {
		const handleScroll = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect()
				setShowMobileNavbar(rect.top < -415)
			}
		}
		window.addEventListener('scroll', handleScroll)
		handleScroll()
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<aside className="sidebar" ref={containerRef as any}>
				<div>
					<div className="profile">
						<div className="profilePic">
							<Image src="/photos/profile.png" alt="Profile" width={512} height={512} />
						</div>
						<h2 className="name">
							MD. MONOWARUL ISLAM
							<br />
							<small>Computer Science Graduate</small>
						</h2>
					</div>
					{/* Desktop nav */}
					<nav className="nav" role="navigation" aria-label="Section navigation">
						{sections.map(s => (
							<a key={s.id} href={`#${s.id}`} onClick={handleNavClick(s.id)}>
								{s.label}
							</a>
						))}
					</nav>
				</div>
				<div className="socials">
					<Link href="https://www.linkedin.com/in/md-monowarul-islam-b7657b341/" target="_blank">
						<Image src="/icons/linkedin-white.svg" alt="LinkedIn" width={28} height={28} />
					</Link>
					<Link href="https://github.com/mi-shraban" target="_blank">
						<Image src="/icons/github-white.svg" alt="GitHub" width={28} height={28} />
					</Link>
					<Link href="https://leetcode.com/u/xordan77/" target="_blank">
						<Image src="/icons/leetcode-white.svg" alt="LeetCode" width={28} height={28} />
					</Link>
					<Link href="https://codeforces.com/profile/xordan.-" target="_blank">
						<Image src="/icons/codeforces-white.svg" alt="Codeforces" width={28} height={28} />
					</Link>
				</div>
			</aside>
			
			{/* Mobile Navbar Component */}
			<Navbar showMobileNavbar={showMobileNavbar} />
		</>
	)
}