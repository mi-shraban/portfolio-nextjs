"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import topSvg from '../icons/scroll-to-top.svg'

export default function ScrollToTop() {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 300)
		window.addEventListener('scroll', onScroll)
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<button
			className={`btn scrollTop ${show ? 'show' : ''}`}
			aria-label="Scroll to top"
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		>
			<Image src={topSvg} alt={'scrollToTop'} width={22} height={22}></Image>
		</button>
	)
}