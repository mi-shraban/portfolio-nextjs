export default function ReachOut() {
	return (
		<section id="reachout" className="section">
			<h2>Reach Out</h2>
			<div className="card">
				<h3 style={{ textAlign: 'center' }}>
					You can reach out to me by filling out this form
					<br />
					<small className="muted">I will mail you back as soon as possible.</small>
				</h3>
				<br />
				<form action="https://formspree.io/f/mblyeyvz" target="_blank" method="POST">
					<div className="formRow">
						<div className="formGroup">
							<label htmlFor="name">Name</label>
							<input type="text" id="name" name="name" placeholder="Your Name" required />
						</div>
						<div className="formGroup">
							<label htmlFor="email">Email</label>
							<input type="email" id="email" name="_replyto" placeholder="Your Email Address" required />
						</div>
						<div className="formGroup">
							<label htmlFor="subject">Subject</label>
							<input type="text" id="subject" name="_subject" placeholder="Topic" required />
						</div>
					</div>
					<br />
					<div className="formRow">
						<div className="formGroup">
							<label htmlFor="message">Message</label>
							<textarea id="message" name="message" rows={4} placeholder="Please elaborate on the topic." required />
						</div>
					</div>
					<br />
					<button type="submit" className="btn">Send Mail</button>
				</form>
			</div>
			<div className="card">
				<h3>My Contact Information</h3>
				<ul>
					<li>Email: <b>monowarul7ii@gmail.com</b></li>
					<li>Discord: <b>xordan77</b></li>
					<li>Telegram: <b>@xordan7</b></li>
				</ul>
			</div>
		</section>
	)
}