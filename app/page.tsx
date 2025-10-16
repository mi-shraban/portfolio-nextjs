import Sidebar from '@/components/Sidebar'
import AboutMe from '@/components/sections/AboutMe'
import Education from '@/components/sections/Education'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Experience from '@/components/sections/Experience'
import ReachOut from '@/components/sections/ReachOut'

export default function HomePage() {
	return (
		<div className="shell">
			<Sidebar />
			<main className="main">
				<AboutMe />
				<Education />
				<Skills />
				<Projects />
				<Research />
				<Experience />
				<ReachOut />
			</main>
		</div>
	)
}
