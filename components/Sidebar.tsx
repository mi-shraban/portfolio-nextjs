"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import profilePng from '../photos/profile.png'
import linkedinSvg from '../icons/linkedin-white.svg'
import githubSvg from '../icons/github-white.svg'
import leetcodeSvg from '../icons/leetcode-white.svg'
import cfSvg from '../icons/codeforces-white.svg'

const sections = [
  { id: 'aboutme', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' }
]

export default function Sidebar() {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a'))
    const observer = new IntersectionObserver(
      entries => {
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
    secNodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="sidebar" ref={containerRef as any}>
      <div>
        <div className="profile">
          <div className="profilePic">
            <Image src={profilePng} alt="Profile"/>
          </div>
          <h2 className="name">MD. MONOWARUL ISLAM<br /><small>Computer Science Student</small></h2>
        </div>
        <nav className="nav">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`}>{s.label}</a>
          ))}
        </nav>
      </div>
      <div className="socials">
        <Link href="https://www.linkedin.com/in/md-monowarul-islam-b7657b341/" target="_blank"><Image src={linkedinSvg} alt="LinkedIn" width={28} height={28} /></Link>
        <Link href="https://github.com/mi-shraban" target="_blank"><Image src={githubSvg} alt="GitHub" width={28} height={28} /></Link>
        <Link href="https://leetcode.com/u/xordan77/" target="_blank"><Image src={leetcodeSvg} alt="LeetCode" width={28} height={28} /></Link>
        <Link href="https://codeforces.com/profile/xordan.-" target="_blank"><Image src={cfSvg} alt="Codeforces" width={28} height={28} /></Link>
      </div>
    </aside>
  )
}
