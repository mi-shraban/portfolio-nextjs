const resumePdf = '/pdfs/CV_Md._Monowarul_Islam.pdf'

export default function Experience() {
    return (
        <section id="experience" className="section">
            <h2>Experience</h2>
            <div className="card">
                <p>
                    I have voluntary teaching experience, from conducting few classes on <b>Data Structures,</b> and <b>Algorithms</b>
                    to help friends and juniors from my university. I have also conducted
                    introductory classes on <b>Competitive Programming</b> where I glanced over the basic topics
                    and frequently used concepts (e.g. <b>Prefix Array</b>, <b>Trie</b>, <b>Hashing</b>, <b>Segment Tree</b>
                    , <b>Number Theory</b> etc.) in sports programming. These efforts did
                    not just help my fellows, it also helped me practice and hone my skills.
                </p>
                <p className="muted">Currently, I am looking for opportunities in fields related to software engineering.</p>
                <div style={{marginTop: 8}}>
                    <a className="btn" href={resumePdf} download>Download my Resume</a>
                </div>
            </div>
        </section>
    )
}
