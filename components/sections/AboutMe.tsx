import resumePdf from '../../pdfs/CV_Md._Monowarul_Islam.pdf'

export default function AboutMe() {
  return (
    <section id="aboutme" className="section">
      <h2>About Me</h2>
      <div className="card">
        <p>
          Hello there! This is Monowarul Islam, you can also call me Shraban. I am a Computer Science graduate
          from <a className="ab_link" href="https://bracu.ac.bd" target="_blank">Brac University</a>, awaiting conferral.
          I enjoy programming challenges, I have solved over <a className="ab_link" href="/cfsolves" target="_blank">250 problems on Codeforces</a> and over
          <a className="ab_link" href="https://leetcode.com/u/xordan77/" target="_blank"> 150 problems on LeetCode</a>. On the academic side, my research interests include data science, machine learning and deep learning.
        </p>
        <p>
          I have also gained experience by working on a few projects which required me to study about Machine Learning (<i>Scikit-Learn, TensorFlow</i>), Robotics (<i>ESP32, Arduino Uno, C++</i>) and Web Development (<i>PHP, HTML, CSS</i>).
          Recently, I have defended my undergrad thesis which was a research project on Cyber-Security that incorporated machine learning based intrusion detection with traditional solutions.
        </p>
        <p>
          You can find my resume <a className="ab_link" href={resumePdf} target="_blank">here</a>.
        </p>
      </div>
    </section>
  )
}
