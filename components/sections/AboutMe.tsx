import React from "react";

const resumePdf = '/pdfs/CV_Md._Monowarul_Islam.pdf'

export default function AboutMe() {
    return (
        <section id="aboutme" className="section">
            <h2>About Me</h2>
                <div className="card">
                    <p>
                        Hello there! This is <strong>Monowarul Islam</strong>, you can also call me <strong>Shraban</strong>.
                        I am a Computer Science graduate from <a href="https://bracu.ac.bd" className="ab_link" target="_blank">
                            Brac University</a>, awaiting conferral. I enjoy programming challenges,
                        I have solved over <a className="ab_link" href="/cfsolves">280 problems on Codeforces</a><span> </span>
                        and more than <a href="https://leetcode.com/u/xordan77/" className="ab_link" target="_blank">180 problems on LeetCode</a>.
                        On the academic side, my research interests include data science, machine learning and deep
                        learning. I have also gained experience by working on projects which required me to study
                        about <strong>Machine Learning</strong> (<i>Scikit-Learn, TensorFlow</i>), <strong>Robotics</strong> (<i>ESP32, Arduino Uno, C++</i>) and
                        <strong> Web Development</strong> (<i>PHP, HTML, CSS</i>). Recently, I have defended my undergrad thesis
                        which was a research project on Cyber-Security that incorporated machine learning based
                        intrusion detection with traditional solutions. My research role included optimizing ML models, handling
                        large datasets and implementing the ML algorithms to produce optimal results. Currently, I am working on
                        furthering the research works from the thesis. Alongside that, I am also looking for opportunities to gain
                        industry experience and implement my skills in the real world environment. You can find my <strong>resume</strong> <a
                            className="ab_link"
                            href={resumePdf} target="_blank">here</a>.
                    </p>
                    <p>
                        On my free time, I enjoy playing video games, solving programming problems, watching movies, TV series and
                        anime. Some of my favorites are <span> </span>
                        <a href="https://www.imdb.com/title/tt6161168/" className="as_link" target="_blank">Red Dead
                            Redemption II</a>,<span> </span>
                        <a href="https://www.imdb.com/title/tt0111161/" className="as_link" target="_blank">The
                            Shawshank Redemption</a>,<span> </span>
                        <a href="https://www.imdb.com/title/tt0903747/" className="as_link" target="_blank">Breaking
                            Bad</a> and <span> </span>
                        <a href="https://www.imdb.com/title/tt0434706/" className="as_link" target="_blank">Monster</a>.
                    </p>
                </div>
        </section>
    )
}
