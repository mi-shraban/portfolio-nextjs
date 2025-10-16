import Image from 'next/image'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>

      <div className="card project">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>
            <a className="ab_link" href="https://github.com/mi-shraban/Blood-Donation-Services" target="_blank">
              Blood Donation Services
            </a>
          </h3>
          <ul>
            <li>Tools: <i>HTML, CSS, Tailwind, PHP, MySql</i></li>
            <li>Developed a website for blood donors and requests with response flows.</li>
          </ul>
        </div>
        <div className="projectThumb">
          <a href="https://github.com/mi-shraban/Blood-Donation-Services" target="_blank">
            <Image className="projectImg" src="https://repository-images.githubusercontent.com/927801658/2f8c3dcf-5fd6-432e-ad75-a1ea50529f78?v=2" alt="Blood Donation Services" width={800} height={420} />
          </a>
        </div>
      </div>

      <div className="card project">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>
            <a className="ab_link" href="https://github.com/mi-shraban/DSE-Stock-Closing-Price-Prediction/blob/main/422_Project_SVR_RFR_LR_LSTM_CNN.ipynb" target="_blank">
              DSE Stock Closing Price Prediction
            </a>
          </h3>
          <ul>
            <li>Tools: <i> Python, NumPy, Pandas, Matplotlib, Scikit-Learn</i></li>
            <li>Compared SVR, RFR, LR, LSTM and CNN for stock trend prediction.</li>
          </ul>
        </div>
        <div className="projectThumb">
          <a href="https://github.com/mi-shraban/DSE-Stock-Closing-Price-Prediction/blob/main/422_Project_SVR_RFR_LR_LSTM_CNN.ipynb" target="_blank">
            <Image className="projectImg" src="https://repository-images.githubusercontent.com/920718087/ca6947da-ae19-44e7-9c31-7446971f5dca" alt="DSE Stock Closing Price Prediction" width={800} height={420} />
          </a>
        </div>
      </div>

      <div className="card project">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>
            <a className="ab_link" href="https://github.com/mi-shraban/Exam-Hall-Monitoring-System" target="_blank">
              Exam Hall Monitoring System
            </a>
          </h3>
          <ul>
            <li>Tools: <i>Python, C++, Arduino, OpenCV, YOLOv3, CNN, ESP32-s3</i></li>
            <li>Autonomous navigation + live video processing for violation detection.</li>
          </ul>
        </div>
        <div className="projectThumb">
          <a href="https://github.com/mi-shraban/Exam-Hall-Monitoring-System" target="_blank">
            <Image className="projectImg" src="https://opengraph.githubassets.com/9c83a99f458cd6021b13c775a2bcaf85679ac4e996c7516a9f70469a3efa8bdd/mi-shraban/Exam-Hall-Monitoring-System" alt="Exam Hall Monitoring System" width={800} height={420} />
          </a>
        </div>
      </div>

      <div className="card project">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>
            <a className="ab_link" href="https://github.com/mi-shraban/BloodAid" target="_blank">
              Blood Aid
            </a>
          </h3>
          <ul>
            <li>Tools: <i>HTML, CSS, Tailwind, Python, Flask, SQLite</i></li>
            <li>Improved security with Bcrypt and modernized stack using Flask.</li>
          </ul>
        </div>
        <div className="projectThumb">
          <a href="https://github.com/mi-shraban/BloodAid" target="_blank">
            <Image className="projectImg" src="https://repository-images.githubusercontent.com/1047299205/0f64c7c4-d72f-4db0-8039-10a01f376854" alt="Blood Aid" width={800} height={420} />
          </a>
        </div>
      </div>

      <div className="card project">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>
            <a className="ab_link" href="https://github.com/mi-shraban/Anomaly-Detection-in-Network-Traffic/blob/main/Anomaly_Detection_in_Network_Traffic.ipynb" target="_blank">
              Anomaly Detection in Network Traffic
            </a>
          </h3>
          <ul>
            <li>Tools: <i>Python, Pandas, Scikit-Learn, XGBoost, CatBoost, TensorFlow</i></li>
            <li>Compared ensemble vs deep learning for intrusion detection.</li>
          </ul>
        </div>
        <div className="projectThumb">
          <a href="https://github.com/mi-shraban/Anomaly-Detection-in-Network-Traffic/blob/main/Anomaly_Detection_in_Network_Traffic.ipynb" target="_blank">
            <Image className="projectImg" src="https://opengraph.githubassets.com/b8e5a84ffccf0404b9d849bc502aaf0172ea3dc27097c4676e9cfd6817944297/mi-shraban/Anomaly-Detection-in-Network-Traffic" alt="Anomaly Detection in Network Traffic" width={800} height={420} />
          </a>
        </div>
      </div>
    </section>
  )
}
